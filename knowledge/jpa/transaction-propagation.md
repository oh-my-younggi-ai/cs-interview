---
type: CS Concept
title: 트랜잭션 전파
description: @Transactional 메서드가 다른 트랜잭션 메서드를 호출할 때 트랜잭션을 합칠지 새로 열지 결정하는 규칙.
tags: [spring, transaction, propagation, jpa]
difficulty: hard
frequency: high
timestamp: 2026-06-18T11:00:00Z
---

# 한 줄 정의

트랜잭션 전파(Transaction Propagation)는 `@Transactional`이 걸린 메서드가 **이미 트랜잭션이 진행 중인 상태에서 호출될 때**, 기존 트랜잭션에 참여할지·새 트랜잭션을 열지·트랜잭션 없이 실행할지를 결정하는 스프링의 규칙이다.

# 핵심 개념

전파 속성은 `@Transactional(propagation = ...)`로 지정한다. 주요 옵션:

| 전파 옵션 | 진행 중 트랜잭션 있을 때 | 없을 때 |
|-----------|--------------------------|---------|
| **REQUIRED** (기본) | 기존 트랜잭션에 참여 | 새로 생성 |
| **REQUIRES_NEW** | 기존을 보류하고 **새 트랜잭션** 생성 | 새로 생성 |
| **SUPPORTS** | 참여 | 트랜잭션 없이 실행 |
| **MANDATORY** | 참여 | 예외 발생 |
| **NOT_SUPPORTED** | 보류하고 트랜잭션 없이 실행 | 트랜잭션 없이 실행 |
| **NEVER** | 예외 발생 | 트랜잭션 없이 실행 |
| **NESTED** | 중첩(savepoint) 트랜잭션 | 새로 생성 |

- 기본값 **REQUIRED**: 하나의 논리 트랜잭션으로 묶인다. 내부 메서드에서 예외로 롤백되면 **전체가 롤백**된다(물리 트랜잭션 공유).
- **REQUIRES_NEW**: 바깥 트랜잭션과 독립. 로그 적재처럼 바깥이 롤백돼도 남겨야 하는 작업에 쓴다.
- 트랜잭션은 [영속성 컨텍스트](/jpa/persistence-context.md)의 생명주기를 결정한다 — 트랜잭션이 곧 영속성 컨텍스트 범위이므로, 전파 방식에 따라 [LazyInitializationException](/jpa/lazy-initialization-exception.md) 가능성도 달라진다.

# 면접 단골 질문

- Q: 트랜잭션 전파란 무엇인가요?
  - 포인트: 트랜잭션 중첩 호출 시 합칠지/새로 열지 결정. 기본 REQUIRED.
- Q: REQUIRED와 REQUIRES_NEW의 차이는?
  - 포인트: REQUIRED는 한 트랜잭션 공유(같이 롤백), REQUIRES_NEW는 독립 물리 트랜잭션(별도 커밋/롤백).
- Q: 같은 클래스 내부에서 `@Transactional` 메서드를 호출하면 전파가 적용되나요?
  - 포인트: 아니다(self-invocation). 프록시 AOP 기반이라 내부 호출은 프록시를 거치지 않아 트랜잭션이 적용되지 않는다.
- Q: 전파와 격리 수준(isolation)의 차이는?
  - 포인트: 전파 = 트랜잭션 경계를 어떻게 합치/나눌지, 격리 = 동시 트랜잭션 간 데이터 가시성 수준.

# 헷갈리는 점 / 함정

- **self-invocation 함정**: 프록시 기반이라 같은 빈 내부 메서드 호출(`this.method()`)에는 `@Transactional`/전파가 먹지 않는다.
- **REQUIRES_NEW 남용**: 새 트랜잭션은 별도 DB 커넥션을 점유한다 → 커넥션 풀 고갈/데드락 위험.
- REQUIRED로 묶인 내부 메서드에서 예외가 나면 바깥에서 잡아도 전체 트랜잭션이 rollback-only로 표시되어 결국 롤백될 수 있다 (`UnexpectedRollbackException`).

# 관련 개념

- [영속성 컨텍스트](/jpa/persistence-context.md)
- [LazyInitializationException](/jpa/lazy-initialization-exception.md)
- [Spring Data JPA](/jpa/spring-data-jpa.md)
- [프로세스 vs 스레드](/operating-systems/process-vs-thread.md) — 동시성·데드락·커넥션 경합의 기반 개념
