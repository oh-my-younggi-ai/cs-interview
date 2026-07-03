# cs-wiki — iter-02: explore modes (대화 탐색 · 추천)

- **Date:** 2026-07-03
- **Change:** ingest 진입을 3모드로 확장 — 직접(direct) / 대화 탐색(discuss) / 추천(recommend). 신규 `step-explore.md` + `step-01-route` 분기 + workflow INVARIANT.
- **Comparison:** iter-02(new) vs iter-01 (회귀 가드) — **측정 대기(pending)**
- **Eval set:** 5 cases (기존 3 + `recommend-gaps`, `explore-missing-only`)

## What this iteration is

"주제를 던지면 바로 정리"만 있던 진입을, 대화로 함께 개념을 끌어내거나(discuss) 무엇을 정리할지
추천(recommend)하는 모드로 확장했다. 핵심 규율:
- 대화에서 나온 키워드를 위키 `index.md`와 대조해 **없는 것만** 정리 대상으로.
- 추천은 **위키에 아직 없는 갭**에서 (중복 방지 + 학습 격차 메우기).
- ingest 전 항상 사용자 승인, 대화 중 **답변 대필 금지**.

## 측정 — 지표 델타 (pending)

채점을 **결정론적 3층**으로 재설계했다 ([BENCHMARKING.md](../../../skills/BENCHMARKING.md),
[METRICS.md](./METRICS.md)): 회귀 바닥(pass/fail 가드) + 진행 지표(연속) + 확장 eval.
단일 점수 대신 **지표 델타**를 남긴다. 아래 값은 harness 실행 시 채워진다.

| 지표 | iter-01 | iter-02 | Δ |
|---|---|---|---|
| 회귀 바닥 (floor all-green) | — | — | 목표 green |
| lint_recall | — | — | |
| crosslink_density (/page) | — | — | ↑ |
| backlink_completeness | — | — | ↑ |
| orphan_ratio | — | — | ↓ |
| gap_recommend_precision | (신규) | — | ↑ |
| explore_missing_precision | (신규) | — | ↑ |
| token_cost | 1.46× | — | ↓ |

> 신규 대화형 eval(explore)은 **첫 응답 1개만** 관측해 결정론적으로 채점(제안 집합 vs 위키개념집합,
> 새 파일 미생성, 대필 없음) → 전체 대화 재현·judge 불필요.

## 새 eval — 변별 목표

- **recommend-gaps** — "뭐 정리하지?"에 대해 추천이 위키에 **없는** 개념만 포함하는가
  (`recommends_absent_only`), 각 이유 한 줄, 승인 전 미기록(`no_write_without_approval`).
- **explore-missing-only** — 대화 키워드를 위키와 대조해 **있는 건 스킵, 없는 것만** 제안하는가
  (`proposes_missing_only`), 승인 대기(`awaits_approval`), 대필 금지(`no_answer_fabrication`).

## Decision → next iteration

1. **harness로 iter-02 vs iter-01 측정.** 대화형 eval은 스크립트된 사용자 턴으로 다중 턴 재현.
2. iter-01에서 지목된 **eval-1 변별력 약화**도 함께 관찰 — 탐색/추천 모드는 시드 구조 노출에 덜 의존해
   변별력이 나을 것으로 기대(측정으로 확인).
3. 규율 어설션(대필 금지·승인 대기)이 단발 harness에서 안 잡히면, interactive-turn 전용 체커 추가.
