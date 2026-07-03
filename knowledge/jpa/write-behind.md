---
type: CS Concept
title: 쓰기 지연
description: INSERT/UPDATE SQL을 쓰기 지연 저장소에 모았다가 flush 시 한 번에 전송.
tags: [jpa, persistence-context, performance]
difficulty: medium
frequency: medium
timestamp: 2026-06-18T10:00:00Z
---

# 한 줄 정의

쓰기 지연(Transactional Write-Behind)은 엔티티를 영속화/수정할 때 SQL을 즉시 DB로 보내지 않고 **쓰기 지연 SQL 저장소**에 모아두었다가, [flush](/jpa/flush.md) 시점(보통 트랜잭션 커밋)에 모아서 한 번에 전송하는 [영속성 컨텍스트](/jpa/persistence-context.md)의 동작이다.

# 핵심 개념

- `persist()`를 호출하면 INSERT SQL이 즉시 나가지 않고 쓰기 지연 SQL 저장소에 쌓인다.
- 트랜잭션 커밋 → flush 발생 → 모아둔 SQL을 DB에 전송 → 커밋.
- **이점**:
  - SQL을 모아 보내 네트워크 왕복/실행 횟수를 줄일 수 있다 (JDBC batch와 결합 시 효과적).
  - 트랜잭션 단위로 일관성 있게 처리.

```
persist(A)  → 저장소에 INSERT A
persist(B)  → 저장소에 INSERT B
commit()    → flush: INSERT A, INSERT B 전송 → DB commit
```

# 면접 단골 질문

- Q: 쓰기 지연이란?
  - 포인트: SQL을 모아뒀다가 flush 시 일괄 전송, 영속성 컨텍스트의 쓰기 지연 SQL 저장소.
- Q: 쓰기 지연의 이점은?
  - 포인트: SQL 배치 전송으로 성능 최적화 여지, 트랜잭션 단위 일관 처리.
- Q: 쓰기 지연된 SQL은 언제 DB로 가나요?
  - 포인트: [flush 시점](/jpa/flush.md) — 커밋, JPQL 실행 직전, `flush()` 직접 호출.

# 헷갈리는 점 / 함정

- 식별자 생성 전략이 `IDENTITY`(DB auto increment)면, 식별자를 얻기 위해 `persist()` 시점에 **즉시 INSERT**가 나가 쓰기 지연이 사실상 적용되지 않는다.
- "쓰기 지연 = 나중에 저장"이라 트랜잭션 도중에는 DB에 반영이 안 보일 수 있다 → 같은 트랜잭션 내 JPQL 실행 시 [flush](/jpa/flush.md)가 먼저 일어나 정합성을 맞춘다.

# 관련 개념

- [영속성 컨텍스트](/jpa/persistence-context.md)
- [Flush](/jpa/flush.md)
- [더티 체킹](/jpa/dirty-checking.md)
