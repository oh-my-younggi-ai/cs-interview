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

## Headline result — 측정 대기 (pending)

> **아직 A/B 수치 미측정.** 신규 eval 2건은 **대화형(interactive)** 이라 iter-01의 단발
> harness로는 부분만 측정된다: diff·추천 로직(어느 개념을 후보로 내는가)은 단발로 검증 가능하지만,
> 다중 턴 대화(discuss)는 **스크립트된 사용자 턴**이 있어야 재현된다. harness 실행 시
> `with_skill(iter-02)` vs `iter-01` 로 측정 예정.

| Config | Pass rate | 비고 |
|--------|-----------|------|
| iter-02 (new) | — | 측정 대기 |
| iter-01 (prev) | — | 기준선 |

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
