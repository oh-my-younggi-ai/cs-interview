---
type: CS Concept
title: JPA
description: 자바 ORM 표준 명세(인터페이스). Hibernate 등이 구현한다.
tags: [jpa, orm, spec]
difficulty: easy
frequency: high
timestamp: 2026-06-18T10:00:00Z
---

# 한 줄 정의

JPA(Java Persistence API, 현 Jakarta Persistence)는 자바에서 [ORM](/jpa/orm.md)을 다루는 방법을 정의한 **표준 명세(인터페이스 집합)**이며, 그 자체로 동작하는 라이브러리가 아니라 Hibernate 같은 **구현체**가 실제 기능을 제공한다.

# 핵심 개념

- **명세 vs 구현**: JPA는 `EntityManager`, `@Entity`, `@Id` 등 인터페이스/애너테이션을 정의한다. 실제 구현은 Hibernate(가장 널리 쓰임), EclipseLink, OpenJPA 등이 한다.
- 핵심 동작 무대는 [영속성 컨텍스트](/jpa/persistence-context.md)이며, 이를 통해 [1차 캐시](/jpa/first-level-cache.md), [더티 체킹](/jpa/dirty-checking.md), [쓰기 지연](/jpa/write-behind.md) 같은 기능을 제공한다.
- JPQL(객체 지향 쿼리 언어)로 엔티티 대상 쿼리를 작성한다 — 테이블이 아니라 엔티티를 대상으로 한다.

```
[애플리케이션] → JPA (표준 인터페이스) → Hibernate (구현체) → JDBC → DB
```

# 면접 단골 질문

- Q: JPA와 Hibernate의 관계를 설명해보세요.
  - 포인트: JPA = 표준 명세(인터페이스), Hibernate = 구현체. JPA로 코딩하면 구현체 교체가 쉽다.
- Q: JPA를 쓰면 좋은 점은?
  - 포인트: 객체 중심 개발, 1차 캐시/더티체킹/쓰기지연 등 영속성 컨텍스트 이점, 표준화로 인한 벤더 종속 완화.
- Q: JPA와 [Spring Data JPA](/jpa/spring-data-jpa.md)는 같은 건가요?
  - 포인트: 아니다. Spring Data JPA는 JPA를 한 번 더 추상화한 스프링 모듈.

# 헷갈리는 점 / 함정

- JPA는 라이브러리가 아니라 **명세**다. `import jakarta.persistence.*`는 인터페이스, 실제 구현은 Hibernate가 한다.
- JPA(명세) → Hibernate(구현) → Spring Data JPA(추상화) 의 계층 관계를 섞지 말 것.

# 관련 개념

- [ORM](/jpa/orm.md)
- [영속성 컨텍스트](/jpa/persistence-context.md)
- [Spring Data JPA](/jpa/spring-data-jpa.md)
