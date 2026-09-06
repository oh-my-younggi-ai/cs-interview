---
type: CS Concept
title: 뮤텍스와 세마포어
description: Mutex와 Semaphore의 소유권, 허용 동시성, 사용 목적을 비교하고 선택 기준을 설명하는 문서.
tags: [operating-systems, concurrency, synchronization, mutex, semaphore]
difficulty: medium
frequency: high
timestamp: 2026-09-06T00:00:00Z
---

# 한 줄 정의

**Mutex**는 임계 구역에 한 실행 흐름만 들어가게 하는 소유권 기반 Lock이고, **Semaphore**는 permit 수만큼의 실행 흐름에 자원 접근을 허용하는 카운터 기반 동기화 도구다.

# 핵심 개념

## 선택 기준

- 하나의 공유 가변 상태를 보호해야 하면 [Mutex](/operating-systems/mutex.md)를 사용한다.
- 제한된 수의 동일 자원이나 동시 작업 수를 관리해야 하면 [Semaphore](/operating-systems/semaphore.md)를 사용한다.
- permit이 1인 Binary Semaphore도 한 번에 하나의 진입만 허용할 수 있지만, 일반적으로 Mutex와 같은 소유권을 강제하지 않는다.

| 항목 | Mutex | Semaphore |
|---|---|---|
| 허용 동시성 | 1개 | 초기 permit 수만큼 |
| 핵심 목적 | 하나의 공유 가변 상태 보호 | 제한된 수의 자원 접근 제어 |
| 소유권 | 획득한 실행 흐름이 해제 | 일반적으로 permit 반납이 핵심이며 소유권 모델은 구현에 따라 다름 |
| 예시 | 주문 상태 객체 수정 | DB 커넥션 10개 풀 |

## 함께 사용할 때

- Semaphore가 10개 작업의 진입을 허용해도, 그 작업들이 같은 가변 데이터를 수정하면 [Race Condition](/operating-systems/race-condition.md)은 남는다.
- 이 경우 Semaphore로 자원 사용량을 제한하고, 공유 데이터의 [임계 구역](/operating-systems/critical-section.md)은 Mutex로 별도 보호한다.

# 면접 단골 질문

- Q: Mutex와 Semaphore의 차이를 설명해보세요.
  - 포인트: Mutex는 하나의 공유 가변 상태를 위한 상호 배제와 소유권, Semaphore는 permit 수로 표현하는 제한된 동시 접근.
- Q: DB 커넥션 풀이 10개일 때 어떤 동기화 도구를 쓰겠어요?
  - 포인트: 초기값 10인 Semaphore, 사용 후 `release`, 커넥션 내부의 별도 공유 상태는 Mutex가 필요할 수 있음.
- Q: Semaphore가 있으면 Race Condition을 막을 수 있나요?
  - 포인트: permit이 1이면 상호 배제를 만들 수 있지만, permit이 여러 개면 같은 가변 데이터를 동시에 수정할 수 있으므로 별도 Mutex 필요.

# 헷갈리는 점 / 함정

- **"Semaphore는 내부에서 Mutex를 건다"** - Semaphore의 본질은 permit counter 관리다. 여러 permit을 허용하면 상호 배제가 보장되지 않는다.
- **"Mutex가 느리므로 Semaphore를 쓰면 공유 데이터도 안전하다"** - 틀림. 도구 선택 기준은 속도보다 보호 대상과 허용 동시성이다.
- **"Semaphore와 Mutex는 항상 서로 대체 가능하다"** - permit 1인 Semaphore가 상호 배제처럼 동작할 수는 있어도, 소유권과 사용 의도가 달라 Mutex를 대체하는 기본 선택이 아니다.

# 관련 개념

- [프로세스 vs 스레드](/operating-systems/process-vs-thread.md)
- [Race Condition](/operating-systems/race-condition.md)
- [임계 구역](/operating-systems/critical-section.md)
- [Mutex](/operating-systems/mutex.md)
- [Semaphore](/operating-systems/semaphore.md)
- [Monitor와 Condition Variable](/operating-systems/monitor-condition-variable.md)
