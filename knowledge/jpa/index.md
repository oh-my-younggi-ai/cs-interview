# 자바 영속성 API (Java Persistence API, JPA)

## ORM 기초와 JPA 구조 (ORM Foundations and JPA Architecture)

* [ORM](/jpa/orm.md) - 객체와 관계형 데이터베이스 테이블을 매핑해 객체 중심으로 영속성을 다루는 기술. (freq: high)
* [JPA](/jpa/jpa.md) - 자바 ORM 표준 명세이며 Hibernate 같은 구현체가 이를 제공한다. (freq: high)

## 엔티티 모델링과 식별자 (Entity Modeling and Identifiers)

## 값 타입, 임베디드 타입, 변환기 (Value Types, Embeddables, and Converters)

## 상속 매핑과 다형성 (Inheritance Mapping and Polymorphism)

## 영속성 컨텍스트와 엔티티 생명주기 (Persistence Context and Entity Lifecycle)

* [영속성 컨텍스트](/jpa/persistence-context.md) - 엔티티를 영구 저장하는 논리적 환경이며 1차 캐시, 더티 체킹, 쓰기 지연이 동작하는 범위. (freq: high)
* [엔티티 생명주기](/jpa/entity-lifecycle.md) - 비영속, 영속, 준영속, 삭제로 구분되는 엔티티의 네 가지 상태. (freq: high)

## 변경 감지, 쓰기 지연, 플러시 (Dirty Checking, Write-Behind, and Flush)

* [쓰기 지연](/jpa/write-behind.md) - INSERT와 UPDATE SQL을 쓰기 지연 저장소에 모았다가 flush 시점에 전송하는 동작. (freq: medium)
* [더티 체킹](/jpa/dirty-checking.md) - 영속 엔티티의 스냅샷과 현재 상태를 비교해 변경을 감지하고 UPDATE를 생성하는 기능. (freq: high)
* [Flush](/jpa/flush.md) - 영속성 컨텍스트의 변경 내용을 SQL로 데이터베이스에 동기화하는 작업과 발생 시점. (freq: high)

## 연관관계 매핑과 방향성 (Association Mapping and Directionality)

## 영속성 전이와 고아 객체 제거 (Cascading and Orphan Removal)

## 지연 로딩, 즉시 로딩, 프록시 (Lazy Loading, Eager Loading, and Proxies)

* [Fetch Type](/jpa/fetch-type.md) - 연관 엔티티를 언제 로딩할지 결정하는 EAGER 및 LAZY 전략과 기본값. (freq: high)
* [LazyInitializationException](/jpa/lazy-initialization-exception.md) - 영속성 컨텍스트가 닫힌 뒤 지연 로딩 프록시에 접근할 때 발생하는 예외. (freq: high)

## JPQL, Criteria, 네이티브 쿼리 (JPQL, Criteria, and Native Queries)

## 조회 최적화와 N+1 문제 (Query Optimization and the N+1 Problem)

* [N+1 문제](/jpa/n-plus-one.md) - 연관 엔티티 조회 시 최초 쿼리 한 번과 결과 N건마다 추가 쿼리가 발생하는 성능 문제. (freq: high)

## 페이징, 배치, 벌크 연산 (Pagination, Batching, and Bulk Operations)

## 트랜잭션 경계와 전파 (Transaction Boundaries and Propagation)

* [트랜잭션 전파](/jpa/transaction-propagation.md) - 트랜잭션 메서드 호출 시 기존 트랜잭션에 참여할지 새로운 트랜잭션을 열지 결정하는 규칙. (freq: high)

## 동시성 제어와 잠금 (Concurrency Control and Locking)

## 1차 캐시, 2차 캐시, 쿼리 캐시 (First-Level, Second-Level, and Query Cache)

* [1차 캐시](/jpa/first-level-cache.md) - 영속성 컨텍스트 내부의 엔티티 캐시이며 동일성 보장과 데이터베이스 조회 절감에 사용된다. (freq: medium)

## Spring Data JPA와 리포지터리 추상화 (Spring Data JPA and Repository Abstraction)

* [Spring Data JPA](/jpa/spring-data-jpa.md) - JPA를 추상화해 리포지터리 인터페이스만으로 CRUD와 쿼리를 제공하는 Spring 모듈. (freq: high)

## 스키마 생성, 검증, 마이그레이션 (Schema Generation, Validation, and Migration)

## 엔티티 이벤트와 감사 (Entity Events and Auditing)

## 도메인 모델링과 애그리거트 경계 (Domain Modeling and Aggregate Boundaries)

## 멀티테넌시, 필터, 소프트 삭제 (Multi-Tenancy, Filters, and Soft Delete)

## Hibernate 구현 세부사항 (Hibernate Implementation Details)

## 성능 분석과 관측 가능성 (Performance Analysis and Observability)

## 테스트 전략과 영속성 검증 (Testing Strategy and Persistence Verification)

## 운영 환경 설정과 장애 처리 (Production Configuration and Failure Handling)
