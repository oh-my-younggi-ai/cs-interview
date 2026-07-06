# knowledge/ 위키 건강검진 로그 (append-only)

`node benchmarks/grader.mjs health knowledge` 실측. 최신이 위. **이전 항목을 지우지 않는다.**

| 날짜 | 페이지 | backlink 완전성 ↑ | orphan 비율 ↓ | 밀도(참고) | orphan 페이지 |
|---|---|---|---|---|---|
| 2026-07-06 (lint 수정 후) | 17 | **0.91** | **0** | 7.65 | 없음 |
| 2026-07-06 (기준선) | 17 | 0.70 | 0.12 | 6.53 | b-tree-index, process-vs-thread |

## 2026-07-06 (수정 후) — 첫 "측정→수정→재측정" 루프 완성
- cs-wiki lint가 기준선의 문제(고아 2·단방향 18쌍·미완성 1·낡은 인용 2)를 지목 → 승인 후 수정 → **backlink 0.70→0.91, orphan 0.12→0**.
- 단방향 7쌍은 의미 약한 연결(예: spring-data→flush)이라 **의도적 미보강** — 지표를 위해 링크를 만들지 않는다.

## 2026-07-06 — 첫 기준선
- 역링크 30%가 단방향 → cs-wiki ingest의 역링크 규율이 다음 개선 대상.
- 고아 2개(b-tree-index, process-vs-thread): 다른 주제와 연결이 없음 → 교차링크 보강 후보.
