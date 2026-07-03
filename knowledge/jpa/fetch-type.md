---
type: CS Concept
title: Fetch Type
description: 연관 엔티티를 언제 로딩할지 결정하는 전략(EAGER/LAZY)과 기본값.
tags: [jpa, fetch, performance, association]
difficulty: medium
frequency: high
timestamp: 2026-06-18T10:00:00Z
---

# 한 줄 정의

Fetch Type은 연관 관계로 매핑된 엔티티를 **언제 DB에서 로딩할지** 결정하는 전략으로, 즉시 로딩(`EAGER`)과 지연 로딩(`LAZY`) 두 가지가 있다.

# 핵심 개념

| 타입 | 동작 | 특징 |
|------|------|------|
| `LAZY` (지연 로딩) | 연관 엔티티를 **실제 사용하는 시점**에 프록시로 조회 | 필요할 때만 쿼리 → 불필요한 조인/조회 방지 |
| `EAGER` (즉시 로딩) | 엔티티 조회 시 **연관 엔티티도 즉시 함께** 조회(주로 조인) | 항상 함께 쓰는 경우 편하나, N+1·불필요 조회 위험 |

- 지연 로딩은 연관 필드를 **프록시 객체**로 채워두고, 접근하는 순간 [영속성 컨텍스트](/jpa/persistence-context.md)를 통해 실제 쿼리를 날린다.

## Fetch 기본값

연관관계 애너테이션마다 기본 fetch 타입이 다르다 — **"다(多)에 가까울수록 LAZY"**:

| 애너테이션 | 기본 Fetch | 이유 |
|-----------|-----------|------|
| `@ManyToOne` | **EAGER** | 단일 연관, 보통 항상 필요 |
| `@OneToOne` | **EAGER** | 단일 연관 |
| `@OneToMany` | **LAZY** | 컬렉션(다수) — 즉시 로딩 시 비용 큼 |
| `@ManyToMany` | **LAZY** | 컬렉션(다수) |

- **실무 권장: 모든 연관관계를 `LAZY`로 설정**하고, 필요할 때만 fetch join이나 `@EntityGraph`로 함께 조회한다. (`@ManyToOne(fetch = FetchType.LAZY)`)

# 면접 단골 질문

- Q: Fetch 타입의 기본값은?
  - 포인트: `@ManyToOne`/`@OneToOne` = EAGER, `@OneToMany`/`@ManyToMany` = LAZY. "ToOne은 EAGER, ToMany는 LAZY".
- Q: EAGER와 LAZY의 차이와 각각의 특징은?
  - 포인트: 로딩 시점(즉시 vs 사용 시점), 프록시, N+1 위험, 실무에선 LAZY 권장.
- Q: 왜 EAGER를 지양하나요?
  - 포인트: 예측 못한 조인/조회, N+1 문제, 쿼리 튜닝 어려움. LAZY + fetch join이 안전.
- Q: 지연 로딩 프록시에 접근했는데 예외가 났다면?
  - 포인트: [LazyInitializationException](/jpa/lazy-initialization-exception.md) — 영속성 컨텍스트 종료 후 접근.

# 헷갈리는 점 / 함정

- 기본값을 외울 때 "ToOne(@ManyToOne/@OneToOne) = EAGER, ToMany = LAZY"로 묶으면 쉽다.
- EAGER는 N+1 문제를 유발하기 쉽다. LAZY로 두고 **fetch join**/`@EntityGraph`로 해결하는 게 정석.
- LAZY 연관을 트랜잭션 밖(준영속)에서 접근하면 [LazyInitializationException](/jpa/lazy-initialization-exception.md).

# 관련 개념

- [N+1 문제](/jpa/n-plus-one.md)
- [LazyInitializationException](/jpa/lazy-initialization-exception.md)
- [영속성 컨텍스트](/jpa/persistence-context.md)
- [엔티티 생명주기](/jpa/entity-lifecycle.md)
