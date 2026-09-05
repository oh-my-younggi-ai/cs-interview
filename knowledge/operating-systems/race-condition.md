---
type: CS Concept
title: Race Condition과 임계 구역
description: 여러 실행 흐름이 공유 가변 상태를 동기화 없이 접근해 실행 순서에 따라 결과가 달라지는 Race Condition과 이를 보호하는 임계 구역.
tags: [operating-systems, concurrency, synchronization, race-condition, critical-section, mutex]
difficulty: medium
frequency: high
timestamp: 2026-09-05T00:00:00Z
---

# 한 줄 정의

**Race Condition**은 여러 실행 흐름이 공유 가변 상태를 동기화 없이 접근해 실행 순서에 따라 결과가 달라지는 오류이고, **Critical Section**은 그 상태를 안전하게 읽거나 변경하도록 보호해야 하는 코드 구간이다.

# 핵심 개념

## 발생 조건

다음 조건이 함께 성립하면 Race Condition이 발생할 수 있다.

- 둘 이상의 실행 흐름이 같은 시점에 실행되거나 실행 순서가 예측 불가능하다.
- 실행 흐름이 같은 공유 가변 상태에 접근한다.
- 하나 이상의 실행 흐름이 그 상태를 변경한다.
- 접근 전체를 원자적으로 보장하거나 동기화하지 않는다.

## 읽기-수정-쓰기와 갱신 유실

`count++`는 코드 한 줄이어도 보통 다음 단계로 나뉜다.

1. `count`를 읽는다.
2. 읽은 값에 `1`을 더한다.
3. 계산한 값을 `count`에 쓴다.

`count`가 `0`일 때 스레드 A와 B가 모두 `0`을 읽고 각각 `1`을 계산한 뒤 쓰면, 두 번의 쓰기 결과는 모두 `1`이다. 기대값 `2`가 아닌 `1`이 남는 현상을 **갱신 유실(Lost Update)** 이라고 한다.

## 임계 구역과 Mutex

- **Critical Section**은 공유 가변 상태에 접근하는 읽기부터 마지막 쓰기까지의 코드 구간이다.
- [Mutex](/operating-systems/mutex-semaphore.md)를 읽기 전에 획득하고 쓰기가 끝난 뒤 해제하면, 하나의 실행 흐름만 임계 구역에 진입할 수 있다.
- Lock 범위가 읽기 이후부터 시작하면 이미 오래된 값을 읽었을 수 있으므로 갱신 유실을 막지 못한다.
- Lock 범위를 불필요하게 넓히면 병렬성이 줄고 Lock 경합이 커진다.

## Semaphore와의 구분

초기 permit이 10인 [Semaphore](/operating-systems/mutex-semaphore.md)는 DB 커넥션처럼 최대 10개 작업의 동시 접근을 제한한다. permit이 여러 개이면 같은 공유 가변 상태를 여러 작업이 동시에 변경할 수 있으므로 Race Condition을 막지 않는다. 공유 상태 보호에는 Mutex를 별도로 사용한다.

# 면접 단골 질문

- Q: Race Condition은 어떤 조건에서 발생하나요?
  - 포인트: 여러 실행 흐름, 공유 가변 상태, 하나 이상의 쓰기, 동기화 또는 원자성 부재, 실행 순서 의존 결과.
- Q: `count++`가 한 줄인데도 Race Condition이 발생하는 이유는 무엇인가요?
  - 포인트: 읽기-수정-쓰기의 비원자성, 중간 스케줄 전환, 갱신 유실 예시.
- Q: Mutex는 어디에 획득하고 해제해야 하나요?
  - 포인트: 공유 상태를 읽기 전 획득하고 마지막 쓰기 후 해제, 임계 구역 전체 보호, 과도한 Lock 범위의 경합 비용.
- Q: DB 커넥션 풀이 10개일 때 Semaphore만으로 공유 상태를 보호할 수 있나요?
  - 포인트: Semaphore는 동시 작업 수 제한, permit이 여러 개면 상호 배제 불가, 공유 가변 상태에는 별도 Mutex 필요.

# 헷갈리는 점 / 함정

- **"동시성이 있으면 항상 Race Condition이 발생한다"** - 틀림. 공유 가변 상태를 원자적 연산이나 적절한 동기화로 보호하면 발생하지 않는다.
- **"`count++`는 한 줄이므로 원자적이다"** - 틀림. 언어와 실행 환경이 원자성을 명시적으로 보장하지 않는 한 읽기-수정-쓰기로 분리될 수 있다.
- **"Semaphore가 있으면 공유 데이터도 안전하다"** - 틀림. permit이 여러 개인 Semaphore는 여러 실행 흐름의 동시 진입을 허용한다.
- **"Mutex를 쓰면 성능 문제가 없다"** - 틀림. Lock 범위와 경합은 처리량과 지연 시간에 영향을 준다.

# 관련 개념

- [프로세스 vs 스레드](/operating-systems/process-vs-thread.md)
- [뮤텍스와 세마포어](/operating-systems/mutex-semaphore.md)
