---
type: CS Concept
title: 엔티티 생명주기
description: 비영속/영속/준영속/삭제 — 엔티티의 4가지 상태.
tags: [jpa, entity, lifecycle]
difficulty: medium
frequency: high
timestamp: 2026-06-18T10:00:00Z
---

# 한 줄 정의

JPA 엔티티는 [영속성 컨텍스트](/jpa/persistence-context.md)와의 관계에 따라 **비영속 · 영속 · 준영속 · 삭제** 4가지 생명주기 상태를 가진다.

# 핵심 개념

| 상태 | 영문 | 설명 | 전이 메서드 |
|------|------|------|-------------|
| 비영속 | new/transient | `new`로 만들었을 뿐, 영속성 컨텍스트와 무관 | (객체 생성) |
| 영속 | managed | 영속성 컨텍스트가 관리 중. [1차 캐시](/jpa/first-level-cache.md)·[더티 체킹](/jpa/dirty-checking.md) 적용 | `persist()`, `find()`, JPQL 조회 |
| 준영속 | detached | 한때 영속이었으나 컨텍스트에서 분리됨 | `detach()`, `clear()`, `close()`, 트랜잭션 종료 |
| 삭제 | removed | 삭제하기로 표시된 상태 | `remove()` |

```
new Member()        → 비영속(transient)
em.persist(member)  → 영속(managed)
em.detach(member)   → 준영속(detached)
em.remove(member)   → 삭제(removed)
```

- **영속 상태에서만** [더티 체킹](/jpa/dirty-checking.md), [지연 로딩](/jpa/fetch-type.md) 등이 동작한다.
- 준영속 상태에서 지연 로딩 프록시에 접근하면 [LazyInitializationException](/jpa/lazy-initialization-exception.md)이 발생한다.

# 면접 단골 질문

- Q: 엔티티의 4가지 상태를 설명해보세요.
  - 포인트: 비영속/영속/준영속/삭제 + 각 전이 메서드 + 영속 상태에서만 변경 감지가 동작.
- Q: 준영속 상태란 무엇이고 언제 발생하나요?
  - 포인트: 영속 → 분리. `detach/clear/close`, 트랜잭션 종료. 더티 체킹 미적용.
- Q: 준영속 엔티티의 변경을 DB에 반영하려면?
  - 포인트: `merge()`로 다시 영속 상태의 새 엔티티를 만든다 (merge는 원본을 영속화하는 게 아니라 병합본 반환).

# 헷갈리는 점 / 함정

- `merge()`는 인자로 받은 준영속 객체를 영속 상태로 "바꾸는" 게 아니라, **병합된 새 영속 엔티티를 반환**한다. 이후엔 반환값을 써야 한다.
- 트랜잭션이 끝나면 영속 → 준영속이 되므로, 이후 [지연 로딩](/jpa/fetch-type.md) 접근은 예외를 던진다.

# 관련 개념

- [영속성 컨텍스트](/jpa/persistence-context.md)
- [더티 체킹](/jpa/dirty-checking.md)
- [LazyInitializationException](/jpa/lazy-initialization-exception.md)
