# OKF 스키마 - CS Wiki 규칙

이 위키는 YAML frontmatter를 가진 마크다운 파일로 구성된 OKF(Open Knowledge Format)를 따른다.
독립적인 지식 단위 하나를 파일 하나로 관리하고 모든 정리, 질의, 점검 작업에서 아래 규칙을 지킨다.

## 1. 디렉터리 구조와 로드맵

```text
cs-wiki/
├── index.md
├── log.md
├── operating-systems/
│   ├── index.md
│   ├── mutex.md
│   ├── semaphore.md
│   └── mutex-semaphore.md
└── ...
```

로드맵은 세 단계로 해석한다.

1. 루트 `index.md`의 분야 링크
2. 분야별 `index.md`의 `##` 큰 토픽
3. 큰 토픽 아래 실제 개념 페이지를 가리키는 목록 링크

- 루트와 분야별 `index.md`에 이미 있는 분야와 큰 토픽이 고정 로드맵이다.
- 큰 토픽은 디렉터리가 아니다. `network/transport-layer/` 같은 하위 디렉터리를 만들지 않는다.
- 독립적으로 정의하고 면접 질문을 만들 수 있는 개념은 각각 파일로 분리한다.
- 둘 이상의 개념을 선택하거나 대비하는 일이 핵심이면 비교를 별도 지식 단위로 둘 수 있다. 비교 페이지는 각 개념의 상세 설명을 반복하지 않고 차이와 선택 기준에 집중한다.
- 여러 개념을 조합해 해결하는 문제나 패턴은 적용 지식 단위로 분리할 수 있다.
- 한 번의 학습 대화에서 여러 지식 단위가 나오면 여러 파일로 저장한다. 대화 하나 또는 체크리스트 하나를 파일 하나에 대응시키지 않는다.
- 각 지식 단위는 하나의 주 분야와 하나의 큰 토픽에만 등록한다. 다른 영역과의 관계는 페이지의 교차링크로 표현한다.
- 개념이 여러 큰 토픽에 걸치면 핵심 학습 맥락을 기준으로 하나를 선택한다. 맥락만으로 결정할 수 없으면 사용자에게 한 번 묻는다.
- 기존 로드맵에 맞는 위치가 없으면 분야나 큰 토픽을 자동 생성하지 않는다. 변경안을 제시하고 사용자 승인을 기다린다.
- 파일명은 영문 `kebab-case`로 쓴다.
- concept ID는 경로에서 `.md`를 뗀 값이다. `operating-systems/mutex.md`의 ID는 `operating-systems/mutex`다.

## 2. 개념 페이지 frontmatter

```yaml
---
type: CS Concept
title: Mutex
description: 하나의 실행 흐름만 임계 구역에 진입하도록 소유권 기반 상호 배제를 제공하는 동기화 도구.
tags: [operating-systems, concurrency, mutex]
difficulty: medium
frequency: high
timestamp: 2026-06-17T14:30:00Z
---
```

- 필수 필드는 `type`이며 값은 `CS Concept`로 통일한다.
- `difficulty`는 `easy` | `medium` | `hard` 중 하나다.
- `frequency`는 `low` | `medium` | `high` 중 하나다.
- `difficulty`와 `frequency`는 `cs-interviewer`의 출제 우선순위에 사용하므로 가능한 한 채운다.
- 본문의 `# 핵심 개념`, `# 면접 단골 질문`, `# 헷갈리는 점 / 함정`, `# 관련 개념`을 가능한 한 채운다.
- 페이지 본문 형식은 `concept-template.md`를 따른다.

## 3. 교차링크

- 루트 `/`로 시작하는 bundle-relative 링크를 기본으로 쓴다.
- 본문에서 다른 개념을 언급하면 링크를 건다.
- 대상 페이지가 아직 없어도 본문 교차링크는 허용한다. 이는 아직 작성하지 않은 지식을 표시한다.
- 새 개념을 만들면 관련된 기존 페이지의 `# 관련 개념`에도 새 개념으로 향하는 역링크를 추가한다.

## 4. index.md

`index.md`에는 frontmatter를 쓰지 않는다. 루트와 분야별 인덱스의 역할을 분리한다.

### 루트 index.md

```markdown
# CS Wiki

* [운영체제 (Operating Systems)](/operating-systems/index.md)
* [네트워크 (Network)](/network/index.md)
* [데이터베이스 (Database)](/database/index.md)
```

- 분야별 `index.md`를 가리키는 링크만 둔다.
- 개념 페이지 링크를 루트에 중복 등록하지 않는다.
- 링크된 분야가 로드맵의 전체 분야 목록이다.

### 분야별 index.md

```markdown
# 운영체제 (Operating Systems)

## 동시성과 동기화 (Concurrency and Synchronization)

* [Mutex](/operating-systems/mutex.md) - 소유권 기반 상호 배제 도구. (freq: high)
* [Semaphore](/operating-systems/semaphore.md) - permit 기반 동시 접근 제어 도구. (freq: high)

## 교착 상태와 진행 보장 (Deadlock and Progress Guarantees)
```

- `#`는 분야 이름, `##`는 고정된 큰 토픽이다. `###` 이하의 분류를 추가하지 않는다.
- `##` 제목만 있는 상태는 학습 영역만 마련되고 작성된 개념이 없는 상태다.
- 작성 완료 여부는 실제로 존재하는 개념 페이지를 가리키는 목록 링크로만 판단한다.
- 모든 개념 링크는 대응하는 `##` 아래에 두고 분야별 인덱스 전체에서 정확히 한 번만 등록한다.
- 설명은 페이지 frontmatter의 `description`을 가져오고 빈출도가 있으면 `(freq: ...)`를 덧붙인다.
- 큰 토픽 제목과 순서는 사용자가 승인한 로드맵이다. 승인 없이 추가, 삭제, 이름 변경, 재정렬하지 않는다.

## 5. log.md

변경 로그는 append-only이며 최신 날짜를 위에 둔다. 날짜 헤딩은 ISO `YYYY-MM-DD`를 사용한다.

```markdown
# CS Wiki 변경 로그

## 2026-06-17
* **정리**: [Mutex](/operating-systems/mutex.md), [Semaphore](/operating-systems/semaphore.md) 신규 작성. 두 개념의 비교 페이지와 교차링크 추가.
* **점검**: process-vs-thread와 thread 페이지 모순 발견 -> 사용자 확인 대기.
```

접두 굵은 단어는 `정리`, `갱신`, `점검`, `초기화`를 사용한다.
