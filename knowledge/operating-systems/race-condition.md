---
type: CS Concept
title: Race Condition
description: 여러 실행 흐름이 공유 가변 상태에 동기화 없이 접근해 실행 순서에 따라 결과가 달라지는 오류.
tags: [operating-systems, concurrency, synchronization, race-condition]
difficulty: medium
frequency: high
timestamp: 2026-09-06T00:00:00Z
---

# 한 줄 정의

**Race Condition**은 여러 실행 흐름이 공유 가변 상태에 동기화 없이 접근해 실행 순서에 따라 결과가 달라지는 오류다.

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

## 방지 방법

- 공유 상태를 읽고 변경하는 [임계 구역](/operating-systems/critical-section.md) 전체를 [Mutex](/operating-systems/mutex.md)로 보호한다.
- 언어와 실행 환경이 보장하는 원자적 연산을 사용한다.
- 불변 데이터나 실행 흐름별 상태를 사용해 공유 가변 상태 자체를 줄인다.
- 여러 permit을 허용하는 [Semaphore](/operating-systems/semaphore.md)는 동시 접근 수를 제한하지만 상호 배제를 보장하지 않는다.

# 면접 단골 질문

- Q: Race Condition은 어떤 조건에서 발생하나요?
  - 포인트: 여러 실행 흐름, 공유 가변 상태, 하나 이상의 쓰기, 동기화 또는 원자성 부재, 실행 순서 의존 결과.
- Q: `count++`가 한 줄인데도 Race Condition이 발생하는 이유는 무엇인가요?
  - 포인트: 읽기-수정-쓰기의 비원자성, 중간 스케줄 전환, 갱신 유실 예시.
- Q: Race Condition을 방지하는 방법은 무엇인가요?
  - 포인트: 임계 구역의 상호 배제, 원자적 연산, 공유 가변 상태 축소.

# 헷갈리는 점 / 함정

- **"동시성이 있으면 항상 Race Condition이 발생한다"** - 틀림. 공유 가변 상태를 원자적 연산이나 적절한 동기화로 보호하면 발생하지 않는다.
- **"`count++`는 한 줄이므로 원자적이다"** - 틀림. 언어와 실행 환경이 원자성을 명시적으로 보장하지 않는 한 읽기-수정-쓰기로 분리될 수 있다.
- **"Semaphore가 있으면 공유 데이터도 안전하다"** - 틀림. permit이 여러 개인 Semaphore는 여러 실행 흐름의 동시 진입을 허용한다.
- **"결과가 우연히 항상 같았으므로 Race Condition이 없다"** - 실행 순서에 따라 달라질 가능성이 있으면 재현 빈도와 관계없이 Race Condition이다.

# 관련 개념

- [프로세스 vs 스레드](/operating-systems/process-vs-thread.md)
- [임계 구역](/operating-systems/critical-section.md)
- [Mutex](/operating-systems/mutex.md)
- [Semaphore](/operating-systems/semaphore.md)
- [뮤텍스와 세마포어](/operating-systems/mutex-semaphore.md)
