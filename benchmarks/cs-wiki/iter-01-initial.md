# cs-wiki — iter-01: initial draft

- **Date:** 2026-06-17
- **Skill commit:** initial draft (this commit)
- **Comparison:** `with_skill` vs `without_skill` (no-skill baseline)
- **Eval set:** 3 cases (new-concept, update-crosslink, lint-report)
- **Runner model:** claude-sonnet-4-6 (eval subagents, 1 run each)

## What this iteration is

step-file 아키텍처(route → ingest/query/lint) + OKF 포맷 + LLM Wiki 운영 패턴으로 만든 첫 end-to-end 초안.
이후 버전이 넘어서야 할 기준선 수치를 확립한다.

## Headline result

> **with_skill 15/15 (1.00) vs baseline 8/15 (0.53), Δ +0.47** — 모든 baseline 실패는 *구조적/규율적* 어설션이다.
> *내용*(개념 설명, 문제 탐지) 품질에서는 baseline Sonnet이 스킬과 동률. 스킬의 입증된 가치는
> **구조(OKF), 유지보수(index/log/교차링크), 검증 규율(lint no-autofix)**. Cost ≈ **1.46× tokens**.

## Quantitative results

| Config | Pass rate | Avg tokens | Avg duration |
|--------|-----------|------------|--------------|
| with_skill | 1.00 | 27,919 | 478.6s ⚠️ |
| baseline (no-skill) | 0.53 | 19,144 | 70.2s |
| **Δ** | **+0.47** | **+8,775 (~1.46×)** | ⚠️ (see note) |

⚠️ **Duration은 신뢰 불가.** with_skill 2개 런이 환경 지연으로 10–12분 소요(이상치). 토큰(~1.46×)이 신뢰 가능한 비용 신호.

### Per-eval

| Eval | with_skill | baseline | 변별 포인트 |
|------|-----------|----------|------|
| new-concept | 5/5 | 0/5 | 그린필드 — baseline은 frontmatter/index/log/주제디렉터리/함정섹션 전무 |
| update-crosslink | 5/5 | 4/5 | 시드 위키가 구조를 노출 → baseline 모방. 차이는 bundle-relative 링크뿐 |
| lint-report | 5/5 | 4/5 | 둘 다 문제 탐지. 차이는 `no_autofix` — baseline은 승인 없이 5파일 자동수정 |

## Qualitative findings

- **가치는 구조·규율, 내용 아님(아직).** baseline Sonnet도 좋은 CS 설명을 쓰고 모순/고아/누락을 다 찾는다.
  baseline의 7개 실패는 전부 스킬이 만들어내는 OKF 구조/유지보수/규율을 baseline이 안 한 것.
- **그린필드에서 격차 최대(eval-0: 5 vs 0).** 빈 위키일수록 스킬의 부트스트랩·포맷·index/log 유지가 결정적.
- **구조가 이미 있으면 격차 축소(eval-1: 5 vs 4).** 시드가 OKF를 노출해 baseline이 따라함 → 변별력 약한 케이스.
- **lint 규율이 깨끗한 변별점(eval-2).** "보고만, 승인 후 수정"은 스킬이 시키지 않으면 baseline이 못 지킴 — 승인 없이 자동수정.

## Decision → next iteration

1. **eval-1 강화.** 시드가 구조를 그대로 노출하지 않도록 — 구조를 추론해야 하거나 올바른 교차링크 대상이 비자명한 유지보수 케이스로 교체해 변별력 확보.
2. **스킬 텍스트는 데이터상 변경 강제 없음.** 설계대로 동작. iter-02의 더 어려운 evals가 실제 결함을 드러낼 때까지 보류(3개 쉬운 케이스 overfit 방지).
3. **토큰 비용(1.46×)은 수용 가능.** 영속 위키 구축·유지의 대가로 적절. query의 fast-path는 이번에 미검증 — 추후 trivial 케이스 추가.
