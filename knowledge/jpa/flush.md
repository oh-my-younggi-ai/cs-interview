---
type: CS Concept
title: Flush
description: 영속성 컨텍스트의 변경 내용을 DB에 동기화(SQL 전송)하는 작업과 그 발생 시점.
tags: [jpa, flush, persistence-context]
difficulty: medium
frequency: high
timestamp: 2026-06-18T10:00:00Z
---

# 한 줄 정의

Flush는 [영속성 컨텍스트](/jpa/persistence-context.md)의 변경 내용(쓰기 지연 SQL 저장소에 쌓인 INSERT/UPDATE/DELETE와 [더티 체킹](/jpa/dirty-checking.md) 결과)을 **DB에 동기화**, 즉 SQL을 DB로 전송하는 작업이다.

# 핵심 개념

- Flush는 **DB에 SQL을 보내는 것**이지, 트랜잭션을 커밋하는 것이 아니다 (커밋은 별개).
- Flush가 일어나도 영속성 컨텍스트는 **비워지지 않는다** (1차 캐시 유지). 단지 변경분을 DB에 반영할 뿐이다.
- 동작 순서: 더티 체킹으로 UPDATE 생성 → 쓰기 지연 저장소의 SQL을 DB에 전송.

## Flush가 일어나는 시점 (3가지)

| 시점 | 설명 |
|------|------|
| **트랜잭션 커밋** | 커밋 직전 자동 flush → 변경분 DB 반영 후 commit |
| **JPQL 쿼리 실행 직전** | 쿼리 정합성 보장을 위해 자동 flush (변경분이 쿼리 결과에 반영되도록) |
| **`em.flush()` 직접 호출** | 개발자가 강제로 즉시 flush |

```java
em.persist(memberA);   // 쓰기 지연 저장소에 INSERT A
// JPQL 실행 직전 → 자동 flush → INSERT A 가 DB에 반영된 뒤 쿼리 수행
List<Member> r = em.createQuery("select m from Member m", Member.class).getResultList();
```

- `FlushModeType`: 기본 `AUTO`(커밋 + 쿼리 전 flush), `COMMIT`(커밋 시에만 flush).

# 면접 단골 질문

- Q: Flush란 무엇인가요?
  - 포인트: 영속성 컨텍스트 변경분을 DB에 동기화(SQL 전송). 커밋과 구분.
- Q: Flush는 언제 발생하나요?
  - 포인트: ① 트랜잭션 커밋 ② JPQL 실행 직전 ③ `flush()` 직접 호출.
- Q: Flush하면 1차 캐시가 비워지나요?
  - 포인트: 아니다. flush는 동기화일 뿐, 컨텍스트/1차 캐시는 유지. (비우는 건 `clear()`)
- Q: 왜 JPQL 실행 전에 flush가 일어나나요?
  - 포인트: 쓰기 지연으로 아직 DB에 없는 변경분을 쿼리 결과에 반영해 정합성을 맞추기 위해.

# 헷갈리는 점 / 함정

- **Flush ≠ Commit**: flush는 SQL 전송, commit은 트랜잭션 확정. flush 후에도 롤백 가능.
- **Flush ≠ 영속성 컨텍스트 초기화**: flush는 1차 캐시를 비우지 않는다.
- 식별자 전략이 `IDENTITY`면 `persist()` 시 이미 INSERT가 나가므로 [쓰기 지연](/jpa/write-behind.md)/flush 효과가 제한된다.

# 관련 개념

- [쓰기 지연](/jpa/write-behind.md)
- [더티 체킹](/jpa/dirty-checking.md)
- [영속성 컨텍스트](/jpa/persistence-context.md)
