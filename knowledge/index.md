# CS Wiki

# Network

* [TCP vs UDP](/network/tcp-vs-udp.md) - 연결지향 TCP와 비연결 UDP의 차이, 신뢰성과 속도의 트레이드오프. (freq: high)
* [3-way Handshake](/network/three-way-handshake.md) - TCP 연결 수립의 SYN·SYN-ACK·ACK 3단계 절차. (freq: high)

# Operating Systems

* [프로세스 vs 스레드](/operating-systems/process-vs-thread.md) - 메모리 구조·스케줄링 단위 차이, 컨텍스트 스위치 비용. (freq: high)

# Database

* [B-Tree 인덱스](/database/b-tree-index.md) - 균형 트리로 키를 정렬 보관해 범위/정렬 검색을 O(log N)에 처리하는 DB 인덱스의 표준 구조. (freq: medium)

# JPA

* [ORM](/jpa/orm.md) - 객체와 관계형 DB 테이블을 매핑해 객체 중심으로 영속성을 다루는 기술. (freq: high)
* [JPA](/jpa/jpa.md) - 자바 ORM 표준 명세(인터페이스). Hibernate 등이 구현한다. (freq: high)
* [Spring Data JPA](/jpa/spring-data-jpa.md) - JPA를 추상화해 리포지토리 인터페이스만으로 CRUD/쿼리를 제공하는 스프링 모듈. (freq: high)
* [영속성 컨텍스트](/jpa/persistence-context.md) - 엔티티를 영구 저장하는 논리적 환경. 1차 캐시·더티 체킹·쓰기 지연의 무대. (freq: high)
* [1차 캐시](/jpa/first-level-cache.md) - 영속성 컨텍스트 내부의 엔티티 캐시. 동일성 보장과 DB 조회 절감. (freq: medium)
* [쓰기 지연](/jpa/write-behind.md) - INSERT/UPDATE SQL을 쓰기 지연 저장소에 모았다가 flush 시 한 번에 전송. (freq: medium)
* [더티 체킹](/jpa/dirty-checking.md) - 영속 엔티티의 스냅샷과 현재 상태를 비교해 변경을 자동 감지·UPDATE. (freq: high)
* [엔티티 생명주기](/jpa/entity-lifecycle.md) - 비영속/영속/준영속/삭제 — 엔티티의 4가지 상태. (freq: high)
* [Flush](/jpa/flush.md) - 영속성 컨텍스트의 변경 내용을 DB에 동기화(SQL 전송)하는 작업과 그 발생 시점. (freq: high)
* [Fetch Type](/jpa/fetch-type.md) - 연관 엔티티를 언제 로딩할지 결정하는 전략(EAGER/LAZY)과 기본값. (freq: high)
* [LazyInitializationException](/jpa/lazy-initialization-exception.md) - 영속성 컨텍스트가 닫힌 뒤 지연 로딩 프록시에 접근할 때 발생하는 예외. (freq: high)
* [N+1 문제](/jpa/n-plus-one.md) - 연관 엔티티를 조회할 때 쿼리 1번 + 결과 N건마다 추가 쿼리 N번이 나가는 성능 문제. (freq: high)
* [트랜잭션 전파](/jpa/transaction-propagation.md) - @Transactional 메서드가 다른 트랜잭션 메서드를 호출할 때 트랜잭션을 합칠지 새로 열지 결정하는 규칙. (freq: high)
