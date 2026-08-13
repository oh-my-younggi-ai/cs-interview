# cs-interview

LLM과 대화하며 CS 지식을 축적하고, 축적한 지식을 다시 LLM 면접관의 정답 기준으로 사용하는
Git 기반 **LLM Wiki**다.

지식은 사람이 검토할 수 있는 Markdown 파일로 남는다. `cs-wiki`가 개념을 작성하고 연결하며,
`cs-interviewer`는 실제로 작성된 개념 페이지만 읽어 질문하고 평가한다.

## 핵심 구성

| 구성 | 역할 |
|---|---|
| [`knowledge/`](./knowledge/index.md) | 공개 CS 지식과 학습 로드맵을 담는 LLM Wiki |
| [`cs-wiki`](./skills/cs-wiki/SKILL.md) | 대화, 작성, 갱신, 교차링크, 점검을 담당하는 LLM 스킬 |
| [`cs-interviewer`](./skills/cs-interviewer/SKILL.md) | 위키를 읽기 전용 정답 기준으로 사용하는 LLM 면접관 |
| [`benchmarks/`](./benchmarks/README.md) | 스킬의 동작과 위키 건강도를 검증하는 측정 자료 |
| `records/` | 개인 답변, 점수, 약점을 보관하는 로컬 전용 기록 |

## 파일 형식

지식 번들은 Google Cloud가 공개한
[Open Knowledge Format v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)를
기반으로 한다. 개념 하나를 YAML frontmatter가 있는 UTF-8 Markdown 파일 하나로 저장하고,
표준 Markdown 링크로 개념 사이의 관계를 표현한다.

이 저장소는 OKF 위에 `CS Concept` 타입, 면접 빈출도, 난이도, 고정 학습 로드맵을 추가한
CS 면접용 프로필을 사용한다. 정확한 규칙과 예시는 [위키 파일 형식](./docs/WIKI_FORMAT.md)에 있다.

## 빠른 시작

LLM에게 자연어로 요청하면 된다.

```text
"운영체제에서 다음에 공부할 개념을 추천해줘"
"TCP와 UDP를 이야기하면서 정리하자"
"N+1 문제를 위키에 추가해줘"
"네트워크 위주로 모의 면접 보자"
"위키 구조와 끊긴 링크를 점검해줘"
```

위키에 지식을 추가할 때는 기존 `분야 > 큰 토픽`을 먼저 찾는다. 큰 토픽은 학습 범위이고,
그 아래 링크된 개념 페이지만 작성 완료 지식이다. 맞는 위치가 없으면 LLM이 로드맵 변경안을
제시하고 사용자 승인을 기다린다.

## 문서

- [CS 학습 로드맵](./docs/ROADMAP.md): 전체 분야와 분야별 큰 토픽으로 이동하는 시작점
- [위키 파일 형식](./docs/WIKI_FORMAT.md): OKF 원본 규격과 저장소 전용 확장 규칙
- [사용 및 운영 흐름](./docs/WORKFLOW.md): 지식 축적, 질의, 모의 면접, 설치와 데이터 분리
- [변경 이력](./CHANGELOG.md): 프로젝트와 스킬의 주요 변경 기록

## 공개 범위

`knowledge/`는 공유 가능한 지식이다. 개인 면접 답변, 점수, 숙련도는 `records/`에만 저장하며
Git에 포함하지 않는다. 지식과 개인 기록을 분리해 LLM 면접관의 정답 기준이 사용자 성과 데이터로
오염되지 않게 한다.
