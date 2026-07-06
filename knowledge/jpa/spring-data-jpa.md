---
type: CS Concept
title: Spring Data JPA
description: JPA를 추상화해 리포지토리 인터페이스만으로 CRUD/쿼리를 제공하는 스프링 모듈.
tags: [jpa, spring, repository]
difficulty: easy
frequency: high
timestamp: 2026-06-18T10:00:00Z
---

# 한 줄 정의

Spring Data JPA는 [JPA](/jpa/jpa.md)를 한 번 더 추상화해, 인터페이스만 선언하면 구현체를 런타임에 프록시로 만들어 **반복적인 CRUD/쿼리 코드를 제거**해주는 스프링 모듈이다.

# 핵심 개념

- **Repository 인터페이스**: `JpaRepository<T, ID>`를 상속하면 `save`, `findById`, `findAll`, `delete` 등 기본 CRUD가 자동 제공된다. 구현 클래스를 직접 작성하지 않는다.
- **쿼리 메서드**: 메서드 이름 규칙으로 쿼리 자동 생성. 예: `findByEmailAndStatus(...)` → 적절한 JPQL 생성.
- **`@Query`**: 복잡한 쿼리는 JPQL/네이티브 SQL을 직접 명시.
- 내부적으로는 결국 JPA/Hibernate의 `EntityManager`를 사용하므로, [영속성 컨텍스트](/jpa/persistence-context.md)·[더티 체킹](/jpa/dirty-checking.md)·[지연 로딩](/jpa/fetch-type.md) 동작은 동일하게 적용된다.

| 계층 | 역할 |
|------|------|
| Spring Data JPA | 리포지토리 추상화, 쿼리 메서드 생성 |
| JPA | 표준 명세 |
| Hibernate | 실제 구현 |
| JDBC | DB 통신 |

# 면접 단골 질문

- Q: Spring Data JPA와 JPA의 차이는?
  - 포인트: JPA는 표준 명세, Spring Data JPA는 그 위의 추상화 모듈(리포지토리/쿼리 메서드). 생산성↑.
- Q: 쿼리 메서드는 어떻게 동작하나요?
  - 포인트: 메서드 이름을 파싱해 JPQL을 자동 생성, 프록시 구현체가 실행.
- Q: `save()`는 INSERT인가요 UPDATE인가요?
  - 포인트: 식별자 유무/엔티티 상태로 판단. 이미 [영속 상태](/jpa/entity-lifecycle.md)면 [더티 체킹](/jpa/dirty-checking.md)으로 UPDATE 처리되므로 명시적 save가 불필요할 수 있다.

# 헷갈리는 점 / 함정

- `JpaRepository.save()`가 항상 즉시 INSERT/UPDATE를 날리는 게 아니다 — [쓰기 지연](/jpa/write-behind.md)/[flush](/jpa/flush.md) 시점에 SQL이 나간다.
- 영속 상태 엔티티는 필드만 바꿔도 [더티 체킹](/jpa/dirty-checking.md)으로 UPDATE 되므로 `save()` 호출이 없어도 변경이 반영된다.
- 쿼리 메서드 이름이 길고 복잡해지면 `@Query`로 명시하는 게 가독성에 낫다.

# 관련 개념

- [JPA](/jpa/jpa.md)
- [영속성 컨텍스트](/jpa/persistence-context.md)
- [더티 체킹](/jpa/dirty-checking.md)
- [ORM](/jpa/orm.md)
- [트랜잭션 전파](/jpa/transaction-propagation.md)
