# CS 학습 로드맵

이 문서는 LLM Wiki 전체 학습 범위의 시작점이다. 세부 큰 토픽의 정본은 각 분야의 `index.md`이며,
이 문서는 분야를 한눈에 보고 이동하기 위한 상위 지도다.

## 로드맵을 읽는 법

```text
분야 -> 큰 토픽 -> 작성된 개념
```

- 분야는 CS 지식을 나누는 최상위 범위다.
- 큰 토픽은 분야 안에서 학습해야 할 주요 영역이다.
- 큰 토픽 아래의 링크는 이미 작성된 개념 페이지다.
- 링크가 없는 큰 토픽은 누락 오류가 아니라 앞으로 학습할 영역이다.
- 한 개념은 한 분야와 한 큰 토픽에만 두고 다른 영역과의 관계는 교차링크로 연결한다.

## 전체 분야

| 분야 | 다루는 범위 | 큰 토픽 |
|---|---|---|
| [컴퓨터 과학 (Computer Science)](../knowledge/computer-science/index.md) | 계산, 정보 표현, 계산 가능성, CS의 이론적 기반 | [보기](../knowledge/computer-science/index.md) |
| [자료구조 (Data Structure)](../knowledge/data-structure/index.md) | 선형, 비선형, 해시, 트리, 그래프, 영속 자료구조 | [보기](../knowledge/data-structure/index.md) |
| [알고리즘 (Algorithm)](../knowledge/algorithm/index.md) | 설계 기법, 복잡도, 정렬, 탐색, 그래프, 최적화 | [보기](../knowledge/algorithm/index.md) |
| [운영체제 (Operating Systems)](../knowledge/operating-systems/index.md) | 프로세스, 동시성, 메모리, 파일 시스템, 가상화 | [보기](../knowledge/operating-systems/index.md) |
| [네트워크 (Network)](../knowledge/network/index.md) | 계층, 전송, 라우팅, 무선, 보안, 관측 가능성 | [보기](../knowledge/network/index.md) |
| [데이터베이스 (Database)](../knowledge/database/index.md) | 데이터 모델, SQL, 인덱스, 트랜잭션, 분산 저장소 | [보기](../knowledge/database/index.md) |
| [프로그래밍 언어 (Programming Language)](../knowledge/programming-language/index.md) | 타입, 실행 모델, 메모리, 동시성, 언어 구현 | [보기](../knowledge/programming-language/index.md) |
| [디자인 패턴 (Design Pattern)](../knowledge/design-pattern/index.md) | 생성, 구조, 행동 패턴과 아키텍처 패턴 | [보기](../knowledge/design-pattern/index.md) |
| [소프트웨어 공학 (Software Engineering)](../knowledge/software-engineering/index.md) | 요구사항, 설계, 테스트, 품질, 유지보수, 협업 | [보기](../knowledge/software-engineering/index.md) |
| [웹 (Web)](../knowledge/web/index.md) | 브라우저, HTTP, 프론트엔드, 백엔드, API, 성능 | [보기](../knowledge/web/index.md) |
| [보안 (Security)](../knowledge/security/index.md) | 암호학, 인증, 애플리케이션 보안, 인프라 보안 | [보기](../knowledge/security/index.md) |
| [분산 시스템 (Distributed System)](../knowledge/distributed-system/index.md) | 복제, 합의, 일관성, 메시징, 장애 허용 | [보기](../knowledge/distributed-system/index.md) |
| [시스템 설계 (System Design)](../knowledge/system-design/index.md) | 요구사항, 용량 산정, 확장성, 신뢰성, 사례 설계 | [보기](../knowledge/system-design/index.md) |
| [인공지능 (Artificial Intelligence)](../knowledge/ai/index.md) | 머신러닝, 딥러닝, 생성형 AI, LLM, 평가, 운영 | [보기](../knowledge/ai/index.md) |
| [AI 개발 하네스 (AI Development Harness)](../knowledge/harness/index.md) | 프롬프트, 도구, 에이전트, 컨텍스트, eval, 안전성 | [보기](../knowledge/harness/index.md) |
| [자바 영속성 API (Java Persistence API, JPA)](../knowledge/jpa/index.md) | ORM, 영속성 컨텍스트, 조회, 트랜잭션, Hibernate | [보기](../knowledge/jpa/index.md) |

## 학습 순서

로드맵은 고정된 범위이지 하나의 강제 순서는 아니다. 처음 시작한다면 다음 흐름을 기준으로 현재
목표에 필요한 분야를 선택한다.

1. 컴퓨터 과학, 자료구조, 알고리즘으로 기본 언어를 익힌다.
2. 프로그래밍 언어, 운영체제, 네트워크, 데이터베이스로 실행 환경을 이해한다.
3. 웹, 디자인 패턴, 소프트웨어 공학, 보안으로 애플리케이션 개발 역량을 넓힌다.
4. 분산 시스템과 시스템 설계로 여러 컴포넌트가 상호작용하는 구조를 학습한다.
5. 인공지능과 AI 개발 하네스로 모델과 에이전트 기반 개발을 학습한다.
6. JPA처럼 사용하는 기술 스택의 전문 영역을 별도로 깊게 학습한다.

LLM에게 분야나 큰 토픽을 지정하면 해당 범위의 작성 현황을 확인하고 다음 개념을 추천받을 수 있다.
