# cs-interview — Changelog

두 스킬의 반복 개선 이력을 합쳐서 기록한다. 측정 수치는 [`benchmarks/`](./benchmarks/) 참고.

---

## 2026-07-02 — 프로젝트 구조 · 경로 (유지보수)

oh-my-younggi-ai Organization 이관에 따른 구조 정비. **스킬 동작 로직 변경은 없음.**

- **지식 베이스 공개** — `knowledge/`(23p) 를 repo 에 포함. 면접관이 낼 공유 지식으로 공개.
- **단일 소스화** — `wiki_root` → `cs-interview/knowledge`, `records_root` → `cs-interview/records` 로 repoint. 위키 편집 = repo 편집(push 하면 공개본 갱신).
- **개인 데이터 격리** — 면접 기록을 `records/` 로 이동 + `.gitignore`(`records/`·`.obsidian/`·`*-workspace/`). 공개 안 됨.
- **경로 정리** — CHANGELOG 의 벤치 기록 경로를 repo 내 `benchmarks/` 로 수정.
- **README** — 동작·결과물·사용법·업데이트 정리 루틴 문서화.

---

## cs-wiki

### iter-02 · 2026-07-03 — 대화 탐색 · 추천 모드
- ingest 진입 3모드화(직접 / 대화 탐색 / 추천). 신규 `step-explore.md` + 라우팅/INVARIANT.
- 대화 키워드를 위키와 대조해 **없는 것만** 정리, 추천은 위키 갭에서, ingest 전 승인.
- evals 3→5. A/B 수치는 측정 대기.

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
