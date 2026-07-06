# cs-wiki — Benchmark Trajectory

면접용 CS 지식을 OKF 위키로 정리·유지하는 스킬. 이 인덱스는 벤치마크된 모든 업데이트를 추적한다.

| Iter | Date | Change | Comparison | Pass rate (skill) | Δ vs baseline | Record |
|------|------|--------|------------|-------------------|---------------|--------|
| 01 | 2026-06-17 | initial draft | vs no-skill | 1.00 (15/15) | +0.47 (base 0.53) | [iter-01](./iter-01-initial.md) |
| 02 | 2026-07-03 | explore modes (대화 탐색·추천) | v2 결정론 채점 | floor 16/16 green · recall 1.0 · 추천정밀도 1.0 | (v2 전환 — 소급 비교 불가) | [iter-02](./iter-02-explore-modes.md) |

> **iter-01 요약:** +0.47은 거의 전부 *구조적/규율적* 이득(OKF frontmatter, index/log 유지, lint no-autofix). *내용* 품질은 baseline Sonnet과 동률. eval-1(시드 위키)은 변별력이 약함 — iter-02에서 evals를 강화해야 함. Token cost ≈ 1.46×.

## Eval set

5 cases — canonically `skills/cs-wiki/evals/evals.json`:

1. **new-concept** — 빈 위키에 "프로세스/스레드" 정리. 그린필드 부트스트랩.
2. **update-crosslink** — 기존 TCP 페이지가 있는 위키에 "3-way handshake" 추가 + 역링크.
3. **lint-report** — 모순/고아/누락이 심긴 위키 점검 (보고만, 자동수정 금지).
4. **recommend-gaps** *(iter-02)* — "뭐 정리하지?"에 위키에 **없는** 개념만 추천.
5. **explore-missing-only** *(iter-02)* — 대화 키워드를 위키와 대조해 **없는 것만** 정리 제안 (대화형, 부분 측정).

## Comparison strategy

- **iter-01:** `with_skill` vs **no-skill** — 스킬의 절대 가치와 첫 수치 확립.
- **iter-02+:** 새 버전 vs **이전 버전** (회귀 가드). 주기적으로 no-skill 재기준선.

## 채점 (v2 — 결정론적 3층)

iter-02부터 LLM judge 없이 **스크립트 grader**로 채점한다. 정의·측정식: [METRICS.md](./METRICS.md).

- **① 회귀 바닥 (floor)** — pass/fail 가드. `file_exists`·`frontmatter_has`·`headers_present`·`index_links_page`·`log_grew`·`links_bundle_relative`·`backlink_present`·`content_preserved`·`no_file_changes`·`no_new_files`·`no_fabricated_user_turn` 등. 항상 green 목표.
- **② 진행 지표 (metrics)** — 연속값. `lint_recall`·`crosslink_density`·`backlink_completeness`·`orphan_ratio`·`gap_recommend_precision`·`explore_missing_precision`·`token_cost`.
- **③ 확장 eval** — 시드를 iter마다 어렵게 → 지표 헤드룸 유지.

내용 품질은 객관 측정 불가 + 비변별이라 **점수에서 제외**한다. (구버전 문자열 어설션 → v2 결정론 검사로 이관)
