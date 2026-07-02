# cs-wiki — Changelog

Full benchmark records: `~/.claude/skill-benchmarks/cs-wiki/`

## iter-01 · 2026-06-17 — initial draft

**Pass rate:** 1.00 (15/15) vs baseline 0.53 · **Δ** +0.47 · **Token cost** ≈ 1.46×

- 스킬 첫 버전. step-file 아키텍처(route → ingest/query/lint) + OKF 포맷 + LLM Wiki 운영 패턴
- 자매 스킬 `cs-interviewer`의 "정답 기준"으로 쓰이도록 개념 페이지에 면접 질문/함정 섹션·difficulty·frequency 포함
- **핵심 INVARIANT:** 지식 위키(`~/Desktop/code/claud/cs-wiki`)는 깨끗하게, 면접 기록은 `cs-interview-records/`에 격리
- Δ는 거의 전부 **구조 + 규율**에서 발생 (그린필드 정리, lint의 no-autofix 규율). 내용 품질은 baseline Sonnet과 동률
- **Next:** eval-1(시드 위키)은 변별력 약함 — iter-02에서 구조를 추론해야 하는 더 어려운 유지보수 케이스로 보강
