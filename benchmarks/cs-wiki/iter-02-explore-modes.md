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

## 측정 결과 — 2026-07-06 harness 실행 (5 cases × 1 run, 병렬 서브에이전트)

채점: **결정론적 3층** ([BENCHMARKING.md](../../../skills/BENCHMARKING.md), [METRICS.md](./METRICS.md)) —
`grader.mjs`가 스크래치 위키 상태 + 첫 응답 텍스트를 스크립트로 채점. LLM judge 0.

### 회귀 바닥 (floor) — **16/16 all green** ✅

| 케이스 | floor | 비고 |
|---|---|---|
| new-concept | 5/5 | 페이지·frontmatter·4섹션·index·log |
| update-crosslink | 6/6 | 역링크·기존 본문 17/18 라인 보존·번들 링크 |
| lint-report | 1/1 | 자동수정 없음 (승인 대기로 종료) |
| recommend-gaps | 2/2 | 5개 추천·승인 전 미기록 |
| explore-missing | 2/2 | 미기록·**대필 없음** (질문 후 즉시 종료) |

### 진행 지표

| 지표 | iter-01 | iter-02 | 해석 |
|---|---|---|---|
| lint_recall | 소급 불가¹ | **1.00** (3/3) | 심어둔 모순·고아·누락 전부 탐지 |
| gap_recommend_precision | (모드 없음) | **1.00** | 추천 5개 전부 위키에 없는 진짜 갭 |
| explore_missing_precision | (모드 없음) | 0.50 ⚠️ | **측정 아티팩트** — 아래 분석 |
| backlink_completeness (update-crosslink) | 소급 불가¹ | 1.00 | 신규↔기존 양방향 완성 |
| 실행 토큰 (참고) | — | 25.9k~35.9k/case (평균 29.9k) | baseline 미실행 → ratio 없음 |

¹ iter-01은 v1 문자열 채점으로 측정돼 v2 지표로 소급 비교 불가. ingest/lint step 텍스트는
iter-01과 동일하므로 해당 케이스의 스킬 행동은 동등하다.

### ⚠️ explore 0.50 분석 — 스킬이 아니라 측정기의 한계

응답 행동은 설계 그대로였다: "TCP vs UDP는 **이미 있으니 중복 정리 제외**, QUIC만 후보" +
한 질문 후 턴 종료. 그러나 grader의 불릿 추출이 **"제외 안내" 불릿(TCP vs UDP)까지 제안으로
집계**해 2개 중 1개가 기존 개념 매칭 → 0.50. 수치를 후처리로 1.0으로 "고치지" 않고 그대로
기록한다 — eval 결함도 벤치의 산출물이다.

## Decision → next iteration

1. **제안 목록 기계-파싱 계약**: 스킬이 정리 후보를 고정 마커(예: `## 정리 후보`) 아래 불릿으로만
   내도록 step-explore에 명시 + grader는 그 블록만 추출 → explore 정밀도 측정 정상화. (iter-03)
2. baseline(no-skill) 재실행으로 token_cost ratio 복원 — 필요성 낮으면 보류.
3. lint 시드 난이도 상향(미묘한 모순)으로 recall 헤드룸 확보 — 현재 3/3 포화.

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
