---
type: CS Concept
title: 더티 체킹
description: 영속 엔티티의 스냅샷과 현재 상태를 비교해 변경을 자동 감지·UPDATE.
tags: [jpa, persistence-context, dirty-checking]
difficulty: medium
frequency: high
timestamp: 2026-06-18T10:00:00Z
---

# 한 줄 정의

더티 체킹(Dirty Checking, 변경 감지)은 [영속성 컨텍스트](/jpa/persistence-context.md)가 관리하는 엔티티의 **최초 스냅샷과 현재 상태를 비교**해 변경된 필드를 자동 감지하고, [flush](/jpa/flush.md) 시점에 UPDATE SQL을 자동 생성·실행하는 기능이다.

# 핵심 개념

- 엔티티가 [영속 상태](/jpa/entity-lifecycle.md)가 될 때 JPA는 그 시점의 상태를 **스냅샷**으로 떠둔다.
- flush 시점에 스냅샷 ↔ 현재 엔티티를 필드 단위로 비교한다.
- 차이가 있으면 UPDATE SQL을 쓰기 지연 저장소에 생성 → DB 반영.
- **따라서 `update()`/`save()` 같은 명시적 호출 없이도, 영속 엔티티의 필드만 바꾸면 변경이 DB에 반영된다.**

```java
Member m = em.find(Member.class, 1L); // 영속 상태, 스냅샷 저장
m.setName("new");                      // 필드만 변경
// save() 호출 없음 → 커밋 시 더티 체킹이 UPDATE 자동 실행
```

- 기본 UPDATE 전략은 **변경 여부와 무관하게 모든 필드**를 포함한다 (`@DynamicUpdate`로 변경된 필드만 포함 가능).

# 면접 단골 질문

- Q: 더티 체킹이 무엇이고 어떻게 동작하나요?
  - 포인트: 스냅샷 비교, 영속 상태에서만 동작, flush 시점에 UPDATE 자동 생성.
- Q: 영속 엔티티의 값을 바꾸기만 했는데 DB에 반영되는 이유는?
  - 포인트: 더티 체킹. 명시적 save 불필요.
- Q: 더티 체킹이 동작하지 않는 경우는?
  - 포인트: [준영속/비영속 상태](/jpa/entity-lifecycle.md)의 엔티티는 감지 대상이 아님.

# 헷갈리는 점 / 함정

- 더티 체킹은 **영속 상태**에서만 동작한다. `detach`/`clear` 후 변경하거나, 트랜잭션 밖에서 변경한 값은 반영되지 않는다.
- 준영속 엔티티의 변경을 반영하려면 `merge()`가 필요하다.
- UPDATE는 기본적으로 모든 컬럼을 포함하므로, 컬럼이 많거나 부분 갱신이 잦으면 `@DynamicUpdate` 고려.

# 관련 개념

- [영속성 컨텍스트](/jpa/persistence-context.md)
- [엔티티 생명주기](/jpa/entity-lifecycle.md)
- [Flush](/jpa/flush.md)
- [쓰기 지연](/jpa/write-behind.md)
- [1차 캐시](/jpa/first-level-cache.md)
- [JPA](/jpa/jpa.md)
