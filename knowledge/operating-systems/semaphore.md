---
type: CS Concept
title: Semaphore
description: permit counter를 이용해 제한된 수의 실행 흐름이 자원이나 작업에 접근하도록 제어하는 동기화 도구.
tags: [operating-systems, concurrency, synchronization, semaphore, permit]
difficulty: medium
frequency: high
timestamp: 2026-09-06T00:00:00Z
---

# 한 줄 정의

**Semaphore**는 사용 가능한 자원의 수를 permit counter로 관리하고, permit 수만큼의 실행 흐름에 동시 접근을 허용하는 동기화 도구다.

# 핵심 개념

## acquire와 release

- `acquire` 또는 `wait`는 permit 하나를 획득하고 counter를 감소시킨다.
- permit이 없으면 호출한 실행 흐름은 permit을 얻을 수 있을 때까지 대기한다.
- `release` 또는 `signal`은 permit을 반환하고 counter를 증가시켜 대기 중인 실행 흐름이 진행할 기회를 만든다.
- permit 확인과 counter 변경은 원자적으로 수행되어야 한다.

## Counting Semaphore와 Binary Semaphore

- **Counting Semaphore**는 여러 permit을 관리하며 DB 커넥션 풀이나 외부 API 동시 요청 수 제한에 적합하다.
- **Binary Semaphore**는 상태가 0 또는 1이지만, 일반적으로 특정 실행 흐름의 소유권을 강제하지 않는다.
- 따라서 A가 `wait`한 Binary Semaphore를 B가 `signal`할 수 있으며, 실행 흐름 사이의 사건 통지에도 사용할 수 있다.

## 자원 수와 permit의 불변식

- 성공한 `acquire`는 실제 자원 획득과 대응해야 한다.
- `release`는 실제 자원 반환과 대응해야 한다.
- 작업이 끝나기 전에 다른 실행 흐름이 `release`하거나 중복 호출하면 실제 자원 수보다 permit이 많아지는 permit 누수가 발생할 수 있다.

# 면접 단골 질문

- Q: Counting Semaphore는 언제 사용하나요?
  - 포인트: 유한한 동일 자원 집합, permit 수만큼 동시 접근, 획득과 반환의 대응.
- Q: Binary Semaphore와 Mutex의 차이는 무엇인가요?
  - 포인트: permit과 소유권, 다른 실행 흐름의 signal 가능 여부, 사건 통지와 상호 배제의 사용 의도.
- Q: Semaphore에서 잘못된 release가 어떤 문제를 만드나요?
  - 포인트: permit 누수, 실제 자원 수와 counter 불일치, 허용량 초과 접근.

# 헷갈리는 점 / 함정

- **"Semaphore가 있으면 공유 데이터도 안전하다"** - permit이 여러 개면 여러 실행 흐름이 같은 상태를 동시에 변경할 수 있다.
- **"Binary Semaphore와 Mutex는 완전히 같다"** - 둘 다 한 번에 하나의 진입만 허용할 수 있지만 소유권과 사용 의도가 다르다.
- **"release는 어느 시점에 호출해도 counter만 복구한다"** - 실제 자원 반환보다 이른 release는 다른 실행 흐름의 잘못된 접근을 허용한다.

# 관련 개념

- [프로세스 vs 스레드](/operating-systems/process-vs-thread.md)
- [임계 구역](/operating-systems/critical-section.md)
- [Race Condition](/operating-systems/race-condition.md)
- [Mutex](/operating-systems/mutex.md)
- [뮤텍스와 세마포어](/operating-systems/mutex-semaphore.md)
- [생산자-소비자 문제](/operating-systems/producer-consumer.md)
