# cs-wiki Benchmark Trajectory

면접용 CS 지식을 OKF 위키로 정리하고 유지하는 스킬의 측정 기록이다.

| Iter | Date | Change | Comparison | Result | Record |
|---|---|---|---|---|---|
| 01 | 2026-06-17 | initial draft | no-skill 비교 | pass rate 1.00, baseline 0.53 | [iter-01](./iter-01-initial.md) |
| 02 | 2026-07-03 | 대화 탐색과 추천 | v2 결정론 채점 | floor 16/16, recall 1.0, 추천 정밀도 1.0 | [iter-02](./iter-02-explore-modes.md) |

## Eval set

정본은 `skills/cs-wiki/evals/evals.json`이다.

1. **new-concept**: 승인된 운영체제 로드맵에 프로세스와 스레드 개념을 추가하고 큰 토픽 배치를 검사한다.
2. **update-crosslink**: 기존 TCP 페이지가 있는 위키에 3-way handshake를 추가하고 역링크를 검사한다.
3. **lint-report**: 모순, 고아, 누락이 심긴 위키를 수정하지 않고 보고하는지 검사한다.
4. **recommend-gaps**: 작성되지 않은 개념만 추천하는지 검사한다.
5. **explore-missing-only**: 대화형 탐색에서 승인 전 파일을 쓰거나 사용자 답변을 만들지 않는지 검사한다.

## 채점

- 회귀 바닥: 파일과 산출물 구조를 결정론적으로 검사한다.
- 진행 지표: recall, 정밀도, 링크 그래프, 토큰 비용을 연속값으로 기록한다.
- 확장 eval: 구조 바닥이 포화될 때 더 어려운 시나리오를 추가한다.

큰 토픽 배치는 `index_link_under_heading`으로 검사한다. 내용 품질과 실제 대화의 자연스러움은 이
검사만으로 증명되지 않으며 별도의 실행 검토가 필요하다.
