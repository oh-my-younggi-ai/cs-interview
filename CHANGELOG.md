# cs-interview — Changelog

두 스킬의 반복 개선 이력을 합쳐서 기록한다. 측정 수치는 [`benchmarks/`](./benchmarks/) 참고.

---

## cs-wiki

### iter-01 · 2026-06-17 — initial draft
- **Pass rate 1.00 (15/15) vs baseline 0.53 · Δ +0.47 · token ≈1.46×**
- step-file 아키텍처(route → ingest/query/lint) + OKF 포맷 + LLM Wiki 운영 패턴
- 자매 스킬 cs-interviewer 의 정답 기준으로 쓰이도록 개념 페이지에 면접 질문/함정 섹션·difficulty·frequency 포함
- Δ는 대부분 **구조 + 규율**에서 발생(그린필드 정리, lint 의 no-autofix 규율). 내용 품질은 baseline 과 동률
- **Next:** eval-1(시드 위키) 변별력 약함 → 구조를 추론해야 하는 더 어려운 유지보수 케이스로 보강 예정

---

## cs-interviewer

### iter-01 · 2026-06-18 — initial draft
- step-file 아키텍처(setup → interview → evaluate-record)
- cs-wiki 를 정답 기준으로 **읽기 전용** 참조, 약점 가중 + 전체 랜덤 혼합 출제
- 답변에서 키워드 추출 → 꼬리 질문(깊이 파기 / 함정 찌르기 / 빈 곳 메우기, 개념당 최대 2개)
- 면접 기록을 `cs-interview-records/` 에 분리 저장(sessions/·log.md·mastery.md)
- **검증:** JPA 5개념 실전 모의면접으로 정성 검증 (A/B 수치 벤치는 미측정 — roadmap)

#### Fixed
- **답변 대필 버그**: 질문 직후 모델이 사용자 답변을 추측·대필하며 넘어가던 문제.
  workflow INVARIANT + step-02 에 "질문 직후 즉시 턴 종료 / 대필 금지 / 실제 입력 후에만 진행" 명시.

#### Changed (보고서 개선)
- 세션 보고서가 질문·답변을 **원문 그대로** 기록
- 채점 rubric(정확성·완전성·깊이)으로 개념별 0~100점 + 종합 점수
- 틀린 답변 바로 아래 `✍️ 첨삭` 인라인 교정
- 보고서 끝에 약점/심화 주제 공부 추천(이유·링크 포함)
