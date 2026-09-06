---
type: CS Concept
title: Mutex
description: 하나의 실행 흐름만 임계 구역에 진입하도록 소유권 기반 상호 배제를 제공하는 동기화 도구.
tags: [operating-systems, concurrency, synchronization, mutex, lock]
difficulty: medium
frequency: high
timestamp: 2026-09-06T00:00:00Z
---

# 한 줄 정의

**Mutex(Mutual Exclusion Lock)**는 Lock을 획득한 실행 흐름 하나만 임계 구역에 진입하게 하고, 그 소유자가 해제하도록 하는 동기화 도구다.

# 핵심 개념

## 상호 배제와 소유권

- Mutex를 획득한 실행 흐름만 보호된 임계 구역을 실행할 수 있다.
- 이미 획득된 Mutex를 다른 실행 흐름이 요청하면 해제될 때까지 대기하거나, 비차단 획득에서는 즉시 실패한다.
- 일반적인 Mutex에는 소유권이 있으므로 획득한 실행 흐름이 해제해야 한다.

## 사용 목적

- 하나의 주문 상태나 공유 카운터처럼 여러 실행 흐름이 함께 읽고 변경하는 상태를 보호한다.
- Lock은 공유 상태를 처음 읽기 전에 획득하고 마지막 쓰기가 끝난 뒤 해제해야 한다.
- 여러 Mutex를 함께 획득한다면 모든 코드에서 동일한 전역 순서를 사용해 순환 대기를 방지해야 한다.

## 비용

- Lock 경합이 발생하면 대기와 스케줄링 비용이 생긴다.
- 임계 구역에 느린 입출력이나 관련 없는 계산을 포함하면 다른 실행 흐름의 대기 시간이 증가한다.

# 면접 단골 질문

- Q: Mutex는 무엇을 보장하나요?
  - 포인트: 상호 배제, 하나의 실행 흐름만 임계 구역 진입, 소유자에 의한 해제.
- Q: Mutex의 Lock 범위는 어떻게 정하나요?
  - 포인트: 공유 상태의 불변식을 지키는 읽기-판단-쓰기 전체, 불필요한 작업 제외.
- Q: 여러 Mutex를 사용할 때 Deadlock을 어떻게 예방하나요?
  - 포인트: 전역 Lock 획득 순서 통일, 순환 대기 제거, timeout은 보조 수단.

# 헷갈리는 점 / 함정

- **"Mutex를 사용하면 Race Condition이 모두 사라진다"** - 같은 공유 상태에 접근하는 모든 경로가 같은 동기화 규칙을 따라야 한다.
- **"Lock을 늦게 획득해도 쓰기만 보호하면 된다"** - 판단에 사용한 읽기 값부터 보호하지 않으면 오래된 값으로 갱신할 수 있다.
- **"timeout이 Deadlock 구조를 제거한다"** - timeout은 포기와 재시도를 가능하게 하지만 순환 대기 구조 자체를 없애지는 않는다.

# 관련 개념

- [프로세스 vs 스레드](/operating-systems/process-vs-thread.md)
- [임계 구역](/operating-systems/critical-section.md)
- [Race Condition](/operating-systems/race-condition.md)
- [Semaphore](/operating-systems/semaphore.md)
- [뮤텍스와 세마포어](/operating-systems/mutex-semaphore.md)
- [Deadlock](/operating-systems/deadlock.md)
