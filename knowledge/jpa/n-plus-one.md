---
type: CS Concept
title: N+1 문제
description: 연관 엔티티를 조회할 때 쿼리 1번 + 결과 N건마다 추가 쿼리 N번이 나가는 성능 문제.
tags: [jpa, performance, n+1, association]
difficulty: medium
frequency: high
timestamp: 2026-06-18T11:00:00Z
---

# 한 줄 정의

N+1 문제는 엔티티를 조회하는 쿼리 1번 때문에, 그 결과 N건 각각의 연관 엔티티를 채우려고 **추가 쿼리가 N번** 더 나가는 성능 문제다 (총 1 + N번).

# 핵심 개념

- 원인: 연관 엔티티를 [지연 로딩(LAZY)](/jpa/fetch-type.md)으로 두고 루프에서 하나씩 접근하거나, [즉시 로딩(EAGER)](/jpa/fetch-type.md)이 각 건마다 개별 조회를 일으킬 때.
- [즉시 로딩이든 지연 로딩이든](/jpa/fetch-type.md) 둘 다 N+1이 발생할 수 있다 — fetch 타입을 바꾸는 것만으로는 해결되지 않는다.

```java
// Member 10명 조회 → 쿼리 1번
List<Member> members = memberRepository.findAll();
for (Member m : members) {
    m.getTeam().getName();   // 각 멤버의 team 조회 → 쿼리 10번 추가
}
// 총 1 + 10 = 11번 쿼리 (N+1)
```

## 해결 방법

| 방법 | 설명 |
|------|------|
| **Fetch Join** | `join fetch`로 연관을 한 방에 조인 조회 → 쿼리 1번 |
| **`@EntityGraph`** | Spring Data JPA에서 fetch join을 선언적으로 지정 |
| **`@BatchSize` / `default_batch_fetch_size`** | 연관 조회를 `IN (...)`으로 묶어 1+N → 1+1 수준으로 |
| **DTO 프로젝션** | 필요한 컬럼만 join해 조회 |

# 면접 단골 질문

- Q: N+1 문제란 무엇이고 왜 발생하나요?
  - 포인트: 1번 조회 + 연관 N번 추가 쿼리. 지연/즉시 로딩 모두에서 발생, 연관을 건건이 조회해서.
- Q: 어떻게 해결하나요?
  - 포인트: fetch join, `@EntityGraph`, `@BatchSize`(IN 절 묶기), DTO 프로젝션.
- Q: 그냥 EAGER로 바꾸면 해결되나요?
  - 포인트: 아니다. EAGER도 N+1을 유발할 수 있고 예측 못한 조인을 만든다. LAZY + fetch join이 정석.
- Q: 컬렉션 fetch join 시 주의점은?
  - 포인트: 일대다 fetch join은 결과 행이 뻥튀기(중복)됨 → `distinct`, 페이징과 함께 쓸 때 메모리 페이징 위험 → `@BatchSize` 권장.

# 헷갈리는 점 / 함정

- fetch 타입(EAGER/LAZY)을 바꾸는 것은 N+1의 **근본 해결책이 아니다**. 로딩 시점만 바뀔 뿐.
- 컬렉션(`@OneToMany`)을 fetch join + 페이징하면 하이버네이트가 전부 메모리로 읽어 페이징하는 위험이 있다 → `@BatchSize`/`default_batch_fetch_size`로 풀어내는 편이 안전.

# 관련 개념

- [Fetch Type](/jpa/fetch-type.md)
- [LazyInitializationException](/jpa/lazy-initialization-exception.md)
- [영속성 컨텍스트](/jpa/persistence-context.md)
