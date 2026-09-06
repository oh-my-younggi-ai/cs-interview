# CS Wiki 변경 로그

## 2026-09-06
* **갱신**: 동시성과 동기화 지식을 [Race Condition](/operating-systems/race-condition.md), [임계 구역](/operating-systems/critical-section.md), [Mutex](/operating-systems/mutex.md), [Semaphore](/operating-systems/semaphore.md), [뮤텍스와 세마포어](/operating-systems/mutex-semaphore.md)로 분리하고 교차링크와 인덱스를 갱신.
* **갱신**: 시험용으로 작성했던 TCP vs UDP, 3-way Handshake, B-Tree 인덱스 개념 페이지를 제거하고 관련 인덱스와 링크를 정리.

## 2026-09-05
* **정리**: [Race Condition과 임계 구역](/operating-systems/race-condition.md) 신규 작성. 큰 토픽: 동시성과 동기화 (Concurrency and Synchronization). 공유 가변 상태, 읽기-수정-쓰기의 비원자성, 갱신 유실, Mutex와 Semaphore의 역할 경계를 정리.

## 2026-09-04
* **정리**: [뮤텍스와 세마포어](/operating-systems/mutex-semaphore.md) 신규 작성. 큰 토픽: 동시성과 동기화 (Concurrency and Synchronization). Critical Section, Race Condition, permit, Lock 순서 기반 Deadlock 예방을 정리하고 [프로세스 vs 스레드]에 역링크를 추가.

## 2026-08-13
* **갱신**: 루트 인덱스를 분야 링크 전용 카탈로그로 전환하고 운영체제, 네트워크, 데이터베이스, JPA에 한국어와 영어를 병기한 큰 토픽 로드맵을 추가. 기존 개념 링크를 대응하는 큰 토픽 아래로 이동했으며 개념 파일과 경로는 변경하지 않음.
* **갱신**: 신규 12개 대주제에 한국어와 영어를 병기하고, 각 주제의 학습 범위를 큰 토픽 헤딩으로 고정. 개념 페이지와 하위 디렉터리는 추가하지 않음.
* **정리**: Computer Science, Data Structure, Algorithm, Programming Language, Design Pattern, Software Engineering, Web, Security, Distributed System, System Design, AI, Harness 대주제 인덱스 신규 구성. 세부 개념 페이지는 추가하지 않음.

## 2026-07-12
* **점검**: index 설명 동기화 - [B-Tree 인덱스](/database/b-tree-index.md) 페이지 description 갱신분이 루트/database index에 반영 안 된 drift 수정.

## 2026-07-06
* **점검**: 전체 lint(17페이지) - 모순 0건, 고아 2건, 단방향 역링크 18쌍, 낡은 인용 2건, 미완성 1건 발견 -> 승인 후 수정.
* **갱신**: [B-Tree 인덱스](/database/b-tree-index.md) 핵심 개념/함정/관련 개념 완성(시드 수준 -> 정식 페이지).
* **갱신**: 역링크 보강 - [1차 캐시](/jpa/first-level-cache.md), [더티 체킹](/jpa/dirty-checking.md), [쓰기 지연](/jpa/write-behind.md), [영속성 컨텍스트](/jpa/persistence-context.md), [Spring Data JPA](/jpa/spring-data-jpa.md)의 관련 개념에 단방향 쌍 역링크 추가.
* **갱신**: 고아 해소 - [N+1 문제](/jpa/n-plus-one.md)->[B-Tree 인덱스](/database/b-tree-index.md), [트랜잭션 전파](/jpa/transaction-propagation.md)->[프로세스 vs 스레드](/operating-systems/process-vs-thread.md) 연결.
* **갱신**: [3-way Handshake](/network/three-way-handshake.md) 인용 RFC 793 -> RFC 9293(현행). [TCP vs UDP](/network/tcp-vs-udp.md) 용례에 QUIC(HTTP/3) 반영.

## 2026-06-18
* **정리**: [N+1 문제](/jpa/n-plus-one.md), [트랜잭션 전파](/jpa/transaction-propagation.md) 2개 개념 신규 작성. [Fetch Type](/jpa/fetch-type.md), [LazyInitializationException](/jpa/lazy-initialization-exception.md), [영속성 컨텍스트](/jpa/persistence-context.md)에 역링크 추가.
* **정리**: JPA 디렉터리 신규 생성. [ORM](/jpa/orm.md), [JPA](/jpa/jpa.md), [Spring Data JPA](/jpa/spring-data-jpa.md), [영속성 컨텍스트](/jpa/persistence-context.md), [1차 캐시](/jpa/first-level-cache.md), [쓰기 지연](/jpa/write-behind.md), [더티 체킹](/jpa/dirty-checking.md), [엔티티 생명주기](/jpa/entity-lifecycle.md), [Flush](/jpa/flush.md), [Fetch Type](/jpa/fetch-type.md), [LazyInitializationException](/jpa/lazy-initialization-exception.md) 11개 개념 신규 작성 (사용자 13개 질문 커버, 상호 교차링크).

## 2026-06-17
* **초기화**: 번들 구조 생성.
* **정리**: TCP vs UDP, 3-way Handshake, 프로세스 vs 스레드, B-Tree 인덱스 4개 개념 시드.
