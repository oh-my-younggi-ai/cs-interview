# cs-interview — Changelog

두 스킬의 반복 개선 이력을 합쳐서 기록한다. 측정 수치는 [`benchmarks/`](./benchmarks/) 참고.

---

## 2026-07-12 — 문서 정합성 점검 (유지보수)

전체 감사에서 발견된 문서-현실 불일치 수정. 동작 변경 없음.
- `evals.json` 의 `grader` 상대경로 오타 수정 (`../../` → `../../../`).
- knowledge index 설명 동기화 (b-tree-index — 페이지 description 갱신분 미반영 drift).
- `records-format.md` 제목의 옛 폴더명(`cs-interview-records`) → `records/`.
- README 구조 트리에 `records/`(로컬 전용) 표기.
- grader 사각지대 발견: index 설명 drift 미탐지 → `index_desc_sync` floor 후보로 iter-02 기록에 예약.

## 2026-07-06 — iter-02 harness 실측 완료

병렬 서브에이전트 5개로 eval 전 케이스 실행 → grader 결정론 채점. **floor 16/16 green,
lint_recall 1.00 (3/3), gap_recommend_precision 1.00, 대필 0건.** explore 정밀도 0.50은
스킬 결함이 아닌 **측정 아티팩트**(제외-안내 불릿을 제안으로 집계)로 판명 — 그대로 기록하고
iter-03에서 "제안 목록 고정 마커" 계약으로 측정 정상화 예정. 상세: benchmarks/cs-wiki/iter-02.

## 2026-07-06 — grader 구현 + 지표 확정

벤치가 실제로 "돌아가는" 상태가 됨. 지표는 가치 재검토 후 확정(사용자 확인).
- **`benchmarks/grader.mjs`** — METRICS.md 스펙의 결정론적 채점기(Node, 무의존). `grade`(floor+지표) / `health`(live 위키 건강검진) 모드.
- **지표 확정:** `crosslink_density`→참고치(게임 가능), `each_item_has_reason` 삭제(장식), `file_exists`→`page_created`(경로 완화), `content_preserved`→라인 80% 잔존(해시 대신), `token_cost`는 harness 주입.
- **eval fixture를 repo에 포함**(`evals/fixtures/`) — 자급자족 실행 가능.
- **첫 실측:** knowledge/ 17p — backlink 완전성 0.70, orphan 0.12 → [`wiki-health.md`](./benchmarks/cs-wiki/wiki-health.md)(append-only) 기준선. 검증: 합성 케이스 6종(정밀도 1.0/0.5, 대필 감지, floor 시뮬레이션) 통과.

## 2026-07-03 — 벤치 채점 재설계 (결정론적 3층)

수치 채점을 LLM judge 없이 **스크립트 grader**로. 단일 점수 대신 **개선 궤적(지표 델타)**을 남긴다.
- **3층 분리:** 회귀 바닥(pass/fail 가드) + 진행 지표(연속) + 확장 eval(포화 방지).
- 주관·비변별 어설션(내용 품질, "채워짐" 등) **점수에서 제외.** 집합·grep·해시·정규식으로 결정론화.
- `evals.json`→v2, `benchmarks/cs-wiki/METRICS.md`(측정식) 추가, `BENCHMARKING.md` 방법론 갱신.

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
