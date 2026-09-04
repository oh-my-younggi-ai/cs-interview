---
type: CS Concept
title: 뮤텍스와 세마포어
description: 공유 자원의 상호 배제와 제한된 동시 접근을 제어하는 Mutex, Semaphore의 역할과 선택 기준.
tags: [operating-systems, concurrency, synchronization, mutex, semaphore, deadlock]
difficulty: medium
frequency: high
timestamp: 2026-09-04T00:00:00Z
---

# 한 줄 정의

**Mutex**는 임계 구역에 한 실행 흐름만 들어가게 하는 소유권 기반 Lock이고, **Semaphore**는 permit 수만큼의 실행 흐름에 자원 접근을 허용하는 카운터 기반 동기화 도구다.

# 핵심 개념

## Critical Section과 Race Condition

- **Critical Section**은 공유 가변 상태를 읽고 수정하는 코드 구간이다.
- `count = count + 1`은 읽기, 증가, 쓰기로 나뉘므로 여러 스레드가 실행을 교차하면 갱신이 유실될 수 있다.
- 이처럼 실행 순서에 따라 결과가 달라지는 오류가 **Race Condition**이다.

## Mutex

- Mutex를 획득한 스레드 하나만 임계 구역에 진입할 수 있다.
- 다른 스레드는 Mutex가 해제될 때까지 대기하거나, 비차단 획득을 선택한 경우 즉시 실패를 받는다.
- 획득한 실행 흐름이 해제해야 한다는 **소유권**이 있으며, 하나의 주문 상태 객체처럼 같은 가변 데이터를 보호할 때 적합하다.

## Semaphore

- Semaphore는 0 이상인 permit counter를 관리한다.
- `acquire`는 permit 하나를 얻어 counter를 감소시키고, permit이 없으면 대기한다.
- `release`는 permit을 반납해 counter를 증가시키고 대기 중인 실행 흐름이 진행할 기회를 만든다.
- 초기값이 10이면 최대 10개 작업을 동시에 허용한다. DB 커넥션 풀이나 외부 API 동시 요청 20건 제한에 적합하다.

| 항목 | Mutex | Semaphore |
|---|---|---|
| 허용 동시성 | 1개 | 초기 permit 수만큼 |
| 핵심 목적 | 하나의 공유 가변 상태 보호 | 제한된 수의 자원 접근 제어 |
| 소유권 | 획득한 실행 흐름이 해제 | 일반적으로 permit 반납이 핵심이며 소유권 모델은 구현에 따라 다름 |
| 예시 | 주문 상태 객체 수정 | DB 커넥션 10개 풀 |

## 함께 사용할 때

- Semaphore가 10개 작업의 진입을 허용해도, 그 작업들이 같은 가변 데이터를 수정하면 Race Condition은 남는다.
- 이 경우 Semaphore로 자원 사용량을 제한하고, 공유 데이터의 Critical Section은 Mutex로 별도 보호한다.

## Deadlock 예방

- 스레드 A가 `사용자 Lock`을 잡고 `주문 Lock`을 기다리며, 스레드 B가 반대 순서로 잡으면 순환 대기가 발생한다.
- 여러 Lock을 함께 획득해야 한다면 모든 코드가 같은 전역 순서로 획득하게 정한다. 예: 항상 `사용자 Lock -> 주문 Lock`.
- timeout은 대기 무한화를 줄이는 회피 또는 복구 수단이지만, Lock 획득 순서 통일을 대체하지 않는다.

# 면접 단골 질문

- Q: Mutex와 Semaphore의 차이를 설명해보세요.
  - 포인트: Mutex는 하나의 공유 가변 상태를 위한 상호 배제와 소유권, Semaphore는 permit 수로 표현하는 제한된 동시 접근.
- Q: DB 커넥션 풀이 10개일 때 어떤 동기화 도구를 쓰겠어요?
  - 포인트: 초기값 10인 Semaphore, 사용 후 `release`, 커넥션 내부의 별도 공유 상태는 Mutex가 필요할 수 있음.
- Q: Semaphore가 있으면 Race Condition을 막을 수 있나요?
  - 포인트: permit이 1이면 상호 배제를 만들 수 있지만, permit이 여러 개면 같은 가변 데이터를 동시에 수정할 수 있으므로 별도 Mutex 필요.
- Q: Lock 두 개를 쓸 때 Deadlock을 어떻게 예방하나요?
  - 포인트: 전역 Lock 획득 순서 통일, 순환 대기 제거, timeout은 보조 수단.

# 헷갈리는 점 / 함정

- **"Semaphore는 내부에서 Mutex를 건다"** - Semaphore의 본질은 permit counter 관리다. 여러 permit을 허용하면 상호 배제가 보장되지 않는다.
- **"Mutex가 느리므로 Semaphore를 쓰면 공유 데이터도 안전하다"** - 틀림. 도구 선택 기준은 속도보다 보호 대상과 허용 동시성이다.
- **"timeout이 Deadlock을 예방한다"** - timeout은 감지 후 포기와 재시도를 가능하게 하지만, 순환 대기 구조 자체를 없애지 않는다.
- **"Semaphore와 Mutex는 항상 서로 대체 가능하다"** - permit 1인 Semaphore가 상호 배제처럼 동작할 수는 있어도, 소유권과 사용 의도가 달라 Mutex를 대체하는 기본 선택이 아니다.

# 관련 개념

- [프로세스 vs 스레드](/operating-systems/process-vs-thread.md)
- [Race Condition과 임계 구역](/operating-systems/race-condition.md)
- [Monitor와 Condition Variable](/operating-systems/monitor-condition-variable.md)
- [Deadlock](/operating-systems/deadlock.md)
