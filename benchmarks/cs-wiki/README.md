# cs-wiki — Benchmark Trajectory

면접용 CS 지식을 OKF 위키로 정리·유지하는 스킬. 이 인덱스는 벤치마크된 모든 업데이트를 추적한다.

| Iter | Date | Change | Comparison | Pass rate (skill) | Δ vs baseline | Record |
|------|------|--------|------------|-------------------|---------------|--------|
| 01 | 2026-06-17 | initial draft | vs no-skill | 1.00 (15/15) | +0.47 (base 0.53) | [iter-01](./iter-01-initial.md) |
| 02 | 2026-07-03 | explore modes (대화 탐색·추천) | vs iter-01 | — (측정 대기) | — | [iter-02](./iter-02-explore-modes.md) |

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

## Assertions (정량 측정 항목)

- 구조: `okf_frontmatter`, `subject_dir_kebab`, `index_updated`, `log_updated`, `bundle_relative_links`
- 면접 활용: `interview_sections`
- 유지보수: `backlink_added`, `existing_preserved`, `new_page_okf`
- lint: `contradiction_found`, `orphan_found`, `missing_concept_found`, `no_autofix`, `report_produced`

비변별(둘 다 통과) 어설션은 가드레일로 유지하되 가치 측정에서는 제외해 해석한다.
