# cs-wiki — 벤치 지표 정의 (grader 스펙)

결정론적 채점 기준. 모든 항목은 실행 결과에 대한 **스크립트 검사**로 boolean/숫자를 낸다.
LLM·사람 판단 없음. 3층 모델(floor/진행지표/확장eval)은 [`../../../skills/BENCHMARKING.md`](../../../skills/BENCHMARKING.md).

**구현: [`../grader.mjs`](../grader.mjs)** (Node, 의존성 없음)

```bash
node grader.mjs health <wiki-dir>                     # live 위키 건강검진
node grader.mjs grade --evals <evals.json> --case <id> \
  --result <실행후-위키> --response <응답.md> [--tokens with,base]
```

## 채점 대상
- **위키 상태** — 스킬 실행 후 `{wiki_root}` 디렉터리(개념 페이지·`index.md`·`log.md`).
- **응답 텍스트** — 모델 응답(추천/제안/점검 보고서). 대화형은 `grade_turn`으로 지정한 turn만.

집합 정의: **위키개념집합** = 시드 `index.md`에서 파싱한 concept ID들(`network/tcp-vs-udp` 등).

---

## ① 회귀 바닥 (floor) — pass/fail

| check | 판정 방법 |
|---|---|
| `page_created` | 새 개념 페이지 생성 — **경로 완화**: slug/별칭 basename 매칭(디렉터리 이름 차이 허용) + kebab-case |
| `frontmatter_has` | YAML 파싱 성공 + `type: CS Concept` (필드 존재) |
| `headers_present` | 지정 헤더 문자열이 본문에 존재 (grep) |
| `index_links_page` | `index.md`가 해당 concept 링크를 포함 (grep) |
| `log_grew` | `log.md`에 오늘 날짜 항목이 1줄 이상 추가됨 |
| `links_bundle_relative` | 모든 내부 링크가 `](/[a-z-]+/…\.md)` 정규식 매치 |
| `backlink_present` | B 페이지의 `# 관련 개념`에 A로 향하는 링크 존재 (grep) |
| `content_preserved` | 기존 본문 라인(>10자)의 **80% 이상 잔존** — 해시 대신(정당한 병합·역링크 추가 허용) |
| `no_file_changes` | 작업 후 위키 파일 해시 전부 불변 (lint 승인 전) |
| `no_new_files` | 응답 후 위키에 새 `.md` 0개 (추천/탐색 승인 전) |
| `no_fabricated_user_turn` | 응답에 사용자 답변 블록·2차 Q&A 연쇄 없음 (정규식) |
| `recommend_count` | 추천 불릿 수 ∈ [min, max] |

floor는 전부 green이 목표. 하나라도 fail = 회귀. 점수(진행)에는 넣지 않는다.

---

## ② 진행 지표 (metrics) — 연속값

| metric | 측정식 | 방향 |
|---|---|---|
| `lint_recall` | (보고서가 탐지한 정답키 이슈 그룹 수) / (심어둔 이슈 N) | ↑ |
| `backlink_completeness` | (양방향 링크 쌍 수) / (존재 페이지 간 링크 쌍 수) | ↑ (1.0 = 완전) |
| `orphan_ratio` | (인바운드 링크 0인 페이지 수) / (전체 페이지 수) | ↓ |
| `gap_recommend_precision` | \|추천 ∖ 위키개념집합\| / \|추천\| — slug·title 정규화 매칭 | ↑ (1.0 = 전부 진짜 갭) |
| `explore_missing_precision` | \|제안 ∖ 위키개념집합\| / \|제안\| | ↑ |
| `token_cost` | with_skill 토큰 / baseline 토큰 — **harness가 `--tokens`로 주입**(grader 단독 측정 불가) | ↓ |
| `crosslink_density_ref` | (내부 링크 수) / (페이지 수) — **참고치(비점수)**: 링크 남발로 게임 가능해 방향성 없이 기록만 | 참고 |

- **정답키(lint):** 시드에 심은 이슈 concept ID(모순/고아/누락)를 보고서 텍스트에서 grep 대조 → recall.
- **정밀도(추천/탐색):** 응답에서 개념 slug를 추출해 위키개념집합과 차집합/교집합 → 비율.

## live 위키 건강검진 (health 모드)

eval 시드(3~4p)는 작아서 그래프 지표가 거칠다. **실제 `knowledge/` 위키에 정기적으로**
`grader.mjs health`를 돌려 성장 궤적을 남긴다 → [`wiki-health.md`](./wiki-health.md) (append-only).

## 헤드룸 유지 (포화 방지)
구조 floor는 곧 100%로 포화 → 진행 측정은 ② 연속 지표가 담당한다.
연속 지표도 포화되지 않게 **시드를 iter마다 더 어렵게** 만든다:
- lint 시드에 **더 미묘한 모순**·비자명 고아를 심어 `lint_recall`에 여지.
- 링크 대상이 자명하지 않은 페이지를 넣어 `crosslink_density`·`backlink_completeness`에 여지.
