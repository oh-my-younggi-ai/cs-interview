---
type: CS Concept
title: 영속성 컨텍스트
description: 엔티티를 영구 저장하는 논리적 환경. 1차 캐시·더티 체킹·쓰기 지연의 무대.
tags: [jpa, persistence-context, core]
difficulty: hard
frequency: high
timestamp: 2026-06-18T10:00:00Z
---

# 한 줄 정의

영속성 컨텍스트(Persistence Context)는 엔티티를 영구 저장하는 **논리적 환경**으로, `EntityManager`가 엔티티를 보관·관리하는 1차 캐시 공간이며 [JPA](/jpa/jpa.md)의 거의 모든 핵심 기능이 여기서 일어난다.

# 핵심 개념

`EntityManager`를 통해 엔티티를 영속화하면 영속성 컨텍스트가 관리한다. 이 컨텍스트가 제공하는 이점:

| 기능 | 설명 |
|------|------|
| [1차 캐시](/jpa/first-level-cache.md) | 같은 트랜잭션 내 동일 식별자 조회 시 DB 대신 캐시 반환 |
| 동일성 보장 | 같은 식별자의 엔티티는 `==` 비교가 true (같은 인스턴스) |
| [쓰기 지연](/jpa/write-behind.md) | INSERT/UPDATE SQL을 모았다가 flush 시 한 번에 전송 |
| [더티 체킹](/jpa/dirty-checking.md) | 스냅샷 비교로 변경을 자동 감지해 UPDATE |
| [지연 로딩](/jpa/fetch-type.md) | 연관 엔티티를 실제 사용하는 시점에 프록시로 조회 |

- 영속성 컨텍스트는 보통 **트랜잭션 범위**로 생성·종료된다 (Spring 기본).
- [엔티티 생명주기](/jpa/entity-lifecycle.md)의 "영속(managed)" 상태란 곧 영속성 컨텍스트가 관리 중인 상태를 말한다.

# 면접 단골 질문

- Q: 영속성 컨텍스트가 무엇이고 어떤 이점이 있나요?
  - 포인트: 1차 캐시, 동일성 보장, 쓰기 지연, 더티 체킹, 지연 로딩 — 5가지를 엮어 설명.
- Q: 영속성 컨텍스트의 생명주기는?
  - 포인트: Spring에서는 보통 트랜잭션 시작 시 생성, 커밋/롤백 시 종료. 종료 시점과 [LazyInitializationException](/jpa/lazy-initialization-exception.md)의 연결.
- Q: `EntityManager`와 영속성 컨텍스트는 1:1인가요?
  - 포인트: 일반적으로 EntityManager가 영속성 컨텍스트를 관리. Spring은 트랜잭션 단위로 공유.

# 헷갈리는 점 / 함정

- 영속성 컨텍스트에 엔티티를 넣는다고 즉시 DB에 INSERT 되는 게 아니다 — [flush](/jpa/flush.md) 시점에 SQL이 나간다.
- 트랜잭션(=영속성 컨텍스트)이 끝난 뒤 지연 로딩을 시도하면 [LazyInitializationException](/jpa/lazy-initialization-exception.md)이 터진다.
- 1차 캐시는 트랜잭션 범위로 매우 짧다. 애플리케이션 전역 캐시(2차 캐시)와 혼동하지 말 것.

# 관련 개념

- [1차 캐시](/jpa/first-level-cache.md)
- [더티 체킹](/jpa/dirty-checking.md)
- [쓰기 지연](/jpa/write-behind.md)
- [엔티티 생명주기](/jpa/entity-lifecycle.md)
- [Flush](/jpa/flush.md)
- [트랜잭션 전파](/jpa/transaction-propagation.md)
