# 위키 파일 형식

## 사용하는 규격

`knowledge/`는 Google Cloud의
[Open Knowledge Format v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)를
기반으로 만든 지식 번들이다.

OKF는 사람과 LLM 에이전트가 함께 읽고 쓸 수 있도록 지식을 다음 형태로 표현하는 공개 규격이다.

- UTF-8 Markdown 파일
- 파일 상단의 YAML frontmatter
- 디렉터리와 `index.md`를 이용한 단계적 탐색
- 표준 Markdown 링크를 이용한 개념 연결
- 선택적인 `log.md` 변경 이력

OKF는 개념 유형과 본문 구조를 고정하지 않는다. 이 저장소는 그 확장 지점에 CS 면접에 필요한
메타데이터와 본문 섹션을 정의한다. 저장소에서 실제로 적용하는 규칙의 정본은
[`skills/cs-wiki/conventions.md`](../skills/cs-wiki/conventions.md)다.

## CS 면접용 OKF 프로필

개념 하나는 `knowledge/<분야>/<개념>.md` 파일 하나로 저장한다. 파일명은 영문 `kebab-case`를
사용하고, 파일 경로에서 `.md`를 제거한 값을 concept ID로 사용한다.

```yaml
---
type: CS Concept
title: TCP vs UDP
description: 연결 지향 전송과 비연결 전송의 차이와 선택 기준.
tags: [network, transport-layer]
difficulty: medium
frequency: high
timestamp: 2026-08-13T00:00:00Z
---
```

| 필드 | 규칙 | 용도 |
|---|---|---|
| `type` | 필수, `CS Concept` | OKF 개념 문서 식별 |
| `title` | 권장 | 사람이 읽는 개념 이름 |
| `description` | 권장 | 인덱스와 검색에 쓰는 한 문장 설명 |
| `tags` | 권장 | 분야를 가로지르는 분류 |
| `difficulty` | `easy`, `medium`, `hard` | 난이도 필터와 면접 계획 |
| `frequency` | `low`, `medium`, `high` | 면접 출제 우선순위 |
| `timestamp` | ISO 8601 | 마지막 지식 갱신 시각 |

`difficulty`, `frequency`, `timestamp`는 이 저장소가 추가한 OKF 확장 필드다. OKF는 생산자가
정의한 추가 frontmatter 필드를 허용하므로 기본 규격과 함께 사용할 수 있다.

## 개념 본문

본문은 자유 형식 Markdown이지만 LLM이 설명과 면접 평가에 활용할 수 있도록 다음 섹션을 사용한다.

- `# 한 줄 정의`
- `# 핵심 개념`
- `# 면접 단골 질문`
- `# 헷갈리는 점 / 함정`
- `# 관련 개념`
- `# Citations`

새 페이지의 작성 원형은 [`concept-template.md`](../skills/cs-wiki/concept-template.md)에 있다.
외부 자료를 사용했다면 `Citations`에 출처를 남긴다.

## 로드맵 구조

이 저장소는 OKF의 디렉터리 탐색 방식 위에 다음 세 단계의 고정 학습 로드맵을 둔다.

1. [`knowledge/index.md`](../knowledge/index.md)의 분야 링크
2. 분야별 `index.md`의 `##` 큰 토픽
3. 큰 토픽 아래 실제 개념 페이지를 가리키는 목록 링크

큰 토픽은 디렉터리가 아니다. 개념 페이지는 분야 디렉터리 바로 아래에 두고 하나의 주 분야와
하나의 큰 토픽에만 등록한다. 다른 분야와의 관계는 개념 페이지의 교차링크로 표현한다.

```text
knowledge/
├── index.md
├── log.md
└── network/
    ├── index.md
    ├── tcp-vs-udp.md
    └── three-way-handshake.md
```

분야별 인덱스에 제목만 있는 큰 토픽은 앞으로 채울 학습 영역이다. 실제 개념 링크가 있어야 작성된
지식으로 취급하며 LLM 면접관도 이 링크만 출제 후보로 사용한다.

## 링크와 변경 이력

내부 링크는 번들 루트 기준 경로를 사용한다.

```markdown
[3-way Handshake](/network/three-way-handshake.md)
```

새 개념을 연결하면 관련 기존 페이지에도 역링크를 추가한다. `knowledge/log.md`는 append-only로
관리하고 최신 날짜를 위에 둔다. 분야, 큰 토픽, 개념 링크의 위치는 사용자 승인 없이 자동으로
추가하거나 재배치하지 않는다.
