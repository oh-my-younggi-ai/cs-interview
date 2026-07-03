---
type: CS Concept
title: LazyInitializationException
description: 영속성 컨텍스트가 닫힌 뒤 지연 로딩 프록시에 접근할 때 발생하는 예외.
tags: [jpa, exception, lazy-loading]
difficulty: medium
frequency: high
timestamp: 2026-06-18T10:00:00Z
---

# 한 줄 정의

LazyInitializationException은 [지연 로딩(LAZY)](/jpa/fetch-type.md)으로 설정된 연관 엔티티(프록시)를, [영속성 컨텍스트](/jpa/persistence-context.md)가 **이미 닫힌(준영속) 상태**에서 접근할 때 발생하는 예외다.

# 핵심 개념

- 지연 로딩 프록시는 실제 데이터를 접근하는 순간 DB 쿼리를 날려 초기화된다.
- 이 초기화에는 **살아있는 영속성 컨텍스트(트랜잭션)**가 필요하다.
- 트랜잭션이 끝나 엔티티가 [준영속 상태](/jpa/entity-lifecycle.md)가 된 뒤 프록시에 접근하면 초기화할 수 없어 예외가 터진다.

```
[트랜잭션 종료/Service 밖] → LAZY 프록시 접근 → 영속성 컨텍스트 없음 → LazyInitializationException
```

전형적 발생 상황: 트랜잭션을 Service 계층에서 끝내고, Controller/View(JSP, 직렬화 등)에서 LAZY 연관에 처음 접근할 때.

## 해결 방법

| 방법 | 설명 |
|------|------|
| Fetch Join / `@EntityGraph` | 필요한 연관을 트랜잭션 안에서 함께 조회 |
| DTO로 변환 | 트랜잭션 안에서 필요한 데이터를 DTO에 담아 반환 |
| 트랜잭션 범위 조정 | 연관 접근이 트랜잭션 안에서 일어나도록 |
| (지양) OSIV | `Open Session In View`로 영속성 컨텍스트를 뷰까지 유지 — 커넥션 점유 등 부작용 |

# 면접 단골 질문

- Q: LazyInitializationException은 왜 발생하나요?
  - 포인트: 영속성 컨텍스트 종료 후 LAZY 프록시 접근 → 초기화 불가.
- Q: 어떻게 해결하나요?
  - 포인트: fetch join/`@EntityGraph`, DTO 변환, 트랜잭션 범위 조정. OSIV는 트레이드오프.
- Q: OSIV란 무엇이고 왜 기본적으로 켜져 있나요/끄나요?
  - 포인트: 영속성 컨텍스트를 응답 끝까지 유지 → 예외는 막지만 DB 커넥션을 오래 점유. 성능 이슈로 운영에선 끄는 경우가 많다.

# 헷갈리는 점 / 함정

- 근본 원인은 "LAZY가 나빠서"가 아니라 **영속성 컨텍스트 밖에서 초기화를 시도**해서다. EAGER로 바꾸는 건 N+1 등 더 큰 문제를 부르는 안티패턴.
- OSIV로 막으면 당장 예외는 사라지지만 커넥션 점유 시간이 늘어난다 — 정석은 fetch join/DTO.

# 관련 개념

- [Fetch Type](/jpa/fetch-type.md)
- [N+1 문제](/jpa/n-plus-one.md)
- [트랜잭션 전파](/jpa/transaction-propagation.md)
- [영속성 컨텍스트](/jpa/persistence-context.md)
- [엔티티 생명주기](/jpa/entity-lifecycle.md)
