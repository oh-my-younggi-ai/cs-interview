#!/usr/bin/env node
/**
 * cs-wiki deterministic grader — METRICS.md 스펙 구현.
 * LLM judge 없음: 위키 디렉터리 상태 + 응답 텍스트에 대한 스크립트 predicate만.
 *
 * Usage:
 *   node grader.mjs health <wiki-dir>
 *       live 위키 건강검진 (그래프 지표만)
 *   node grader.mjs grade --evals <evals.json> --case <id> \
 *       --fixture <seed-dir|empty> --result <wiki-dir> --response <file> [--tokens with,base]
 *       eval 1건 채점: floor(pass/fail) + metrics(연속값) JSON 출력
 */
import fs from 'node:fs';
import path from 'node:path';

// ---------- fs helpers ----------

const SKIP_DIRS = new Set(['.obsidian', '.git', 'records']);
const NON_CONCEPT = new Set(['index.md', 'log.md', 'readme.md']);

function listMd(root) {
  if (root === 'empty' || !fs.existsSync(root)) return [];
  const out = [];
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) {
        if (!SKIP_DIRS.has(e.name)) walk(path.join(dir, e.name));
      } else if (e.name.endsWith('.md')) {
        out.push(path.relative(root, path.join(dir, e.name)));
      }
    }
  };
  walk(root);
  return out.sort();
}

const isConcept = (rel) => !NON_CONCEPT.has(path.basename(rel).toLowerCase());
const listConcepts = (root) => listMd(root).filter(isConcept);
const read = (root, rel) => fs.readFileSync(path.join(root, rel), 'utf8');
const tryRead = (root, rel) => {
  try { return read(root, rel); } catch { return null; }
};

// ---------- parsing ----------

function frontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].trim();
  }
  return fm;
}

/** 내부(.md) 링크 추출. http(s) 링크는 제외. */
function mdLinks(text) {
  return [...text.matchAll(/\]\(([^)\s]+\.md)\)/g)]
    .map((m) => m[1])
    .filter((l) => !/^https?:/.test(l));
}

const base = (p) => path.basename(p, '.md').toLowerCase();
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9가-힣]+/g, '');

/** 위키의 개념 집합: concept id·slug·frontmatter title (정규화). */
function conceptNames(root) {
  const names = new Set();
  for (const rel of listConcepts(root)) {
    names.add(norm(base(rel)));
    const fm = frontmatter(read(root, rel));
    if (fm?.title) names.add(norm(fm.title));
  }
  return names;
}

/** 응답에서 추천/제안 불릿 추출: "- **이름** — ..." 형태 우선, 없으면 일반 불릿. */
function bullets(text) {
  const lines = text.split('\n').filter((l) => /^\s*[-*]\s+\S/.test(l));
  const bold = lines.filter((l) => /\*\*[^*]+\*\*/.test(l));
  return (bold.length ? bold : lines).map((l) => {
    const b = l.match(/\*\*([^*]+)\*\*/);
    return { name: b ? b[1] : l.replace(/^\s*[-*]\s+/, ''), line: l };
  });
}

// ---------- graph metrics (진행 지표) ----------

function graphMetrics(root) {
  const pages = listConcepts(root);
  const ids = new Set(pages.map(base));
  let totalLinks = 0;
  const outbound = new Map(); // page-slug -> Set(target-slug)
  for (const rel of pages) {
    const links = mdLinks(read(root, rel)).map(base).filter((t) => t !== base(rel));
    totalLinks += links.length;
    outbound.set(base(rel), new Set(links));
  }
  // backlink completeness: 존재하는 페이지 간 링크쌍 중 양방향 비율
  let pairs = 0, mutual = 0;
  for (const [from, tos] of outbound) {
    for (const to of tos) {
      if (!ids.has(to)) continue; // 아직 안 쓴 지식(허용)은 쌍에서 제외
      pairs++;
      if (outbound.get(to)?.has(from)) mutual++;
    }
  }
  // orphan: 다른 개념 페이지로부터 인바운드 0
  const inbound = new Set();
  for (const [from, tos] of outbound) for (const to of tos) inbound.add(to);
  const orphans = [...ids].filter((id) => !inbound.has(id));

  const r = (x) => Math.round(x * 100) / 100;
  return {
    pages: pages.length,
    crosslink_density_ref: pages.length ? r(totalLinks / pages.length) : 0, // 참고치(비점수)
    backlink_completeness: pairs ? r(mutual / pairs) : null,
    orphan_ratio: ids.size ? r(orphans.length / ids.size) : null,
    orphan_pages: orphans,
  };
}

// ---------- floor checks ----------

function makeCheckers(ctx) {
  // ctx: { fixture, result, response, createdPage } — createdPage는 page_created가 채움
  const created = () => {
    if (!ctx.createdPage) throw new Error('page_created 검사가 선행돼야 함');
    return read(ctx.result, ctx.createdPage);
  };
  return {
    /** 새 개념 페이지 생성 (경로 완화: basename/별칭 매칭, 디렉터리 무관) */
    page_created(a) {
      const before = new Set(listMd(ctx.fixture));
      const fresh = listConcepts(ctx.result).filter((p) => !before.has(p));
      const wanted = [a.slug, ...(a.aliases ?? [])].map(norm);
      ctx.createdPage = fresh.find((p) => wanted.includes(norm(base(p)))) ?? null;
      const kebab = ctx.createdPage ? /^[a-z0-9-]+\.md$/.test(path.basename(ctx.createdPage)) : false;
      return { pass: !!ctx.createdPage && kebab, detail: ctx.createdPage ?? `새 페이지 없음(기대: ${a.slug})` };
    },
    frontmatter_has(a) {
      const fm = frontmatter(created());
      return { pass: fm?.type === (a.type_equals ?? 'CS Concept'), detail: `type=${fm?.type}` };
    },
    headers_present(a) {
      const text = created();
      const missing = a.headers.filter((h) => !text.includes(h));
      return { pass: missing.length === 0, detail: missing.length ? `누락: ${missing.join(', ')}` : 'all' };
    },
    index_links_page(a) {
      const slug = a.page ? base(a.page) : base(ctx.createdPage);
      const hit = listMd(ctx.result)
        .filter((p) => path.basename(p).toLowerCase() === 'index.md')
        .some((p) => read(ctx.result, p).includes(`${slug}.md`));
      return { pass: hit, detail: `${slug}.md in index` };
    },
    log_grew() {
      const after = tryRead(ctx.result, 'log.md');
      const beforeLen = tryRead(ctx.fixture, 'log.md')?.length ?? 0;
      return { pass: !!after && after.length > beforeLen, detail: `log ${beforeLen}→${after?.length ?? 0} chars` };
    },
    links_bundle_relative() {
      const bad = [];
      for (const rel of listConcepts(ctx.result)) {
        for (const l of mdLinks(read(ctx.result, rel))) {
          if (!/^\/[a-z0-9-]+\/[a-z0-9-]+\.md$/.test(l)) bad.push(`${rel}: ${l}`);
        }
      }
      return { pass: bad.length === 0, detail: bad.slice(0, 3).join(' | ') || 'all bundle-relative' };
    },
    backlink_present(a) {
      const text = tryRead(ctx.result, `${a.from}.md`) ?? '';
      return { pass: text.includes(`${base(a.to)}.md`), detail: `${a.from} → ${base(a.to)}` };
    },
    /** 기존 본문 보존: fixture 본문 라인(>10자)의 80% 이상이 result에 잔존 (해시 대신 — 정당한 병합 허용) */
    content_preserved(a) {
      const beforeLines = (tryRead(ctx.fixture, a.path) ?? '').split('\n').map((l) => l.trim()).filter((l) => l.length > 10);
      const after = tryRead(ctx.result, a.path) ?? '';
      const kept = beforeLines.filter((l) => after.includes(l)).length;
      const ratio = beforeLines.length ? kept / beforeLines.length : 1;
      return { pass: ratio >= 0.8, detail: `${kept}/${beforeLines.length} lines kept` };
    },
    no_file_changes() {
      const before = listMd(ctx.fixture), after = listMd(ctx.result);
      const same = before.length === after.length && before.every((p, i) => p === after[i]
        && read(ctx.fixture, p) === read(ctx.result, p));
      return { pass: same, detail: same ? 'unchanged' : 'wiki modified' };
    },
    no_new_files() {
      const before = new Set(listMd(ctx.fixture));
      const fresh = listMd(ctx.result).filter((p) => !before.has(p));
      return { pass: fresh.length === 0, detail: fresh.join(', ') || 'no new files' };
    },
    recommend_count(a) {
      const n = bullets(ctx.response).length;
      return { pass: n >= a.min && n <= a.max, detail: `${n} bullets` };
    },
    no_fabricated_user_turn() {
      const fab = /^\s*>?\s*\*{0,2}(사용자|지원자|답변|User|You)\*{0,2}\s*[:：]/m.test(ctx.response);
      return { pass: !fab, detail: fab ? 'fabricated user turn detected' : 'clean' };
    },
  };
}

// ---------- continuous metrics ----------

function caseMetrics(names, ctx, answerKey, tokens) {
  const g = graphMetrics(ctx.result);
  const wiki = conceptNames(ctx.fixture); // 정밀도는 "실행 전 위키" 기준으로 갭 판단
  const bl = bullets(ctx.response);
  const existing = (b) => [...wiki].some((w) => w.length > 2 && norm(b.name).includes(w));
  const precision = bl.length ? Math.round(((bl.length - bl.filter(existing).length) / bl.length) * 100) / 100 : null;

  const out = {};
  for (const m of names) {
    if (m === 'crosslink_density') out.crosslink_density_ref = g.crosslink_density_ref; // 참고치
    else if (m === 'backlink_completeness') out.backlink_completeness = g.backlink_completeness;
    else if (m === 'orphan_ratio') out.orphan_ratio = g.orphan_ratio;
    else if (m === 'gap_recommend_precision') out.gap_recommend_precision = precision;
    else if (m === 'explore_missing_precision') out.explore_missing_precision = precision;
    else if (m === 'lint_recall' && answerKey) {
      const groups = Object.values(answerKey);
      const found = groups.filter((slugs) => slugs.every((s) => ctx.response.toLowerCase().includes(base(s)))).length;
      out.lint_recall = Math.round((found / groups.length) * 100) / 100;
      out.lint_detail = `${found}/${groups.length} issues`;
    }
  }
  if (tokens) out.token_cost = Math.round((tokens[0] / tokens[1]) * 100) / 100; // harness 입력값
  return out;
}

// ---------- CLI ----------

function arg(name, def) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : def;
}

const cmd = process.argv[2];

if (cmd === 'health') {
  const dir = process.argv[3];
  if (!dir) { console.error('usage: grader.mjs health <wiki-dir>'); process.exit(1); }
  const g = graphMetrics(dir);
  console.log(JSON.stringify({ mode: 'health', wiki: dir, date: new Date().toISOString().slice(0, 10), ...g }, null, 2));
} else if (cmd === 'grade') {
  const evalsPath = arg('evals');
  const caseId = arg('case');
  const spec = JSON.parse(fs.readFileSync(evalsPath, 'utf8'));
  const c = spec.cases.find((x) => x.id === caseId);
  if (!c) { console.error(`case not found: ${caseId}`); process.exit(1); }

  const fixtureArg = arg('fixture', c.fixture);
  const fixture = fixtureArg === 'empty' ? 'empty' : path.resolve(path.dirname(evalsPath), fixtureArg);
  const ctx = {
    fixture,
    result: path.resolve(arg('result')),
    response: arg('response') ? fs.readFileSync(arg('response'), 'utf8') : '',
    createdPage: null,
  };
  const checkers = makeCheckers(ctx);

  const floor = c.floor.map((f) => {
    try {
      const { pass, detail } = checkers[f.check](f);
      return { id: f.id, check: f.check, pass, detail };
    } catch (e) {
      return { id: f.id, check: f.check, pass: false, detail: `error: ${e.message}` };
    }
  });
  const tokens = arg('tokens')?.split(',').map(Number);
  const metrics = caseMetrics(c.metrics ?? [], ctx, c.answer_key, tokens);

  const green = floor.every((f) => f.pass);
  console.log(JSON.stringify({ case: caseId, floor_green: green, floor, metrics }, null, 2));
  process.exit(green ? 0 : 1);
} else {
  console.error('usage: grader.mjs health <wiki-dir> | grade --evals <json> --case <id> --result <dir> --response <file>');
  process.exit(1);
}
