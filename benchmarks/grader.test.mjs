import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const benchmarkDir = path.dirname(fileURLToPath(import.meta.url));
const grader = path.join(benchmarkDir, 'grader.mjs');

function grade(indexText) {
  const workspace = mkdtempSync(path.join(tmpdir(), 'cs-wiki-grader-'));
  const result = path.join(workspace, 'result');
  const category = path.join(result, 'operating-systems');
  const evals = path.join(workspace, 'evals.json');
  mkdirSync(category, { recursive: true });
  writeFileSync(path.join(category, 'index.md'), indexText);
  writeFileSync(path.join(category, 'process-vs-thread.md'), '---\ntype: CS Concept\n---\n');
  writeFileSync(evals, JSON.stringify({
    cases: [{
      id: 'topic-placement',
      fixture: 'empty',
      floor: [
        { id: 'page', check: 'page_created', slug: 'process-vs-thread' },
        { id: 'topic', check: 'index_link_under_heading', heading: '프로세스와 스레드' },
      ],
    }],
  }));

  const execution = spawnSync(process.execPath, [
    grader,
    'grade',
    '--evals', evals,
    '--case', 'topic-placement',
    '--result', result,
  ], { encoding: 'utf8' });
  const report = JSON.parse(execution.stdout);
  rmSync(workspace, { recursive: true, force: true });
  return { status: execution.status, report };
}

function health() {
  const workspace = mkdtempSync(path.join(tmpdir(), 'cs-wiki-health-'));
  const result = path.join(workspace, 'result');
  mkdirSync(result, { recursive: true });
  writeFileSync(path.join(result, 'first.md'), '[두 번째](/second.md)\n');
  writeFileSync(path.join(result, 'second.md'), '[첫 번째](/first.md)\n');

  const execution = spawnSync(process.execPath, [grader, 'health', result], {
    encoding: 'utf8',
  });
  const report = JSON.parse(execution.stdout);
  rmSync(workspace, { recursive: true, force: true });
  return { status: execution.status, report };
}

test('개념 링크가 지정한 큰 토픽 아래에 정확히 한 번 있으면 통과한다', () => {
  const result = grade(`# 운영체제 (Operating Systems)\n\n## 프로세스와 스레드 (Processes and Threads)\n\n* [프로세스 vs 스레드](/operating-systems/process-vs-thread.md)\n\n## CPU 스케줄링 (CPU Scheduling)\n`);

  assert.equal(result.status, 0);
  assert.equal(result.report.floor_green, true);
});

test('개념 링크가 다른 큰 토픽 아래에 있으면 실패한다', () => {
  const result = grade(`# 운영체제 (Operating Systems)\n\n## 프로세스와 스레드 (Processes and Threads)\n\n## CPU 스케줄링 (CPU Scheduling)\n\n* [프로세스 vs 스레드](/operating-systems/process-vs-thread.md)\n`);

  assert.equal(result.status, 1);
  assert.equal(result.report.floor_green, false);
  assert.equal(result.report.floor.find((floor) => floor.id === 'topic').pass, false);
});

test('상호 연결된 개념 페이지의 위키 건강도를 계산한다', () => {
  const result = health();

  assert.equal(result.status, 0);
  assert.equal(result.report.pages, 2);
  assert.equal(result.report.backlink_completeness, 1);
  assert.equal(result.report.orphan_ratio, 0);
});
