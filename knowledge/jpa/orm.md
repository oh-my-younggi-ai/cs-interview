---
type: CS Concept
title: ORM
description: 객체와 관계형 DB 테이블을 매핑해 객체 중심으로 영속성을 다루는 기술.
tags: [jpa, orm, database]
difficulty: easy
frequency: high
timestamp: 2026-06-18T10:00:00Z
---

# 한 줄 정의

ORM(Object-Relational Mapping)은 객체지향 언어의 **객체**와 관계형 DB의 **테이블/레코드**를 자동으로 매핑해, SQL이 아니라 객체 중심으로 데이터를 다루게 해주는 기술이다.

# 핵심 개념

- **패러다임 불일치 해소**: 객체(상속·연관·다형성)와 관계형 모델(테이블·외래키·조인) 사이의 구조적 차이를 ORM이 중간에서 변환한다.
- 개발자는 객체 그래프를 다루고, ORM이 그에 맞는 SQL을 생성·실행한다.
- 자바 진영의 ORM 표준 명세가 [JPA](/jpa/jpa.md)이고, 대표 구현체가 Hibernate다.

| 항목 | ORM 사용 | 순수 JDBC/SQL Mapper |
|------|----------|----------------------|
| 데이터 단위 | 객체(엔티티) | ResultSet/행 |
| SQL 작성 | 대부분 자동 생성 | 직접 작성 |
| DB 종속성 | 방언(Dialect)으로 추상화 | DB별 SQL 직접 관리 |
| 생산성 | 높음 (CRUD 보일러플레이트 제거) | 낮음 |
| 세밀한 튜닝 | 상대적으로 어려움 | 자유로움 |

# 면접 단골 질문

- Q: ORM이란 무엇이고 왜 쓰나요?
  - 포인트: 객체-테이블 매핑, 패러다임 불일치 해소, 생산성/유지보수성, SQL 직접작성 감소.
- Q: ORM의 단점은?
  - 포인트: 복잡한 통계/조인 쿼리에서의 한계, 자동 생성 SQL에 대한 이해 부족 시 성능 문제(N+1 등), 학습 곡선.
- Q: MyBatis 같은 SQL Mapper와 ORM의 차이는?
  - 포인트: SQL Mapper는 SQL을 직접 작성하고 결과만 객체에 매핑, ORM은 SQL 자체를 추상화.

# 헷갈리는 점 / 함정

- "ORM을 쓰면 SQL을 몰라도 된다"는 오해 — 오히려 생성되는 SQL을 이해해야 N+1, 불필요한 [지연 로딩](/jpa/fetch-type.md) 등 성능 문제를 피한다.
- ORM은 SQL을 **대체**하는 게 아니라 **추상화**한다. 필요하면 네이티브 쿼리도 쓴다.

# 관련 개념

- [JPA](/jpa/jpa.md)
- [Spring Data JPA](/jpa/spring-data-jpa.md)
- [영속성 컨텍스트](/jpa/persistence-context.md)
