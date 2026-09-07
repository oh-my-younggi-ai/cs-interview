---
type: CS Concept
title: TCP
description: 연결을 설정한 뒤 순서 있는 신뢰성 바이트 스트림을 제공하는 전송 계층 프로토콜.
tags: [network, transport-layer, tcp, reliability, congestion-control]
difficulty: medium
frequency: high
timestamp: 2026-09-07T00:00:00Z
---

# 한 줄 정의

**TCP(Transmission Control Protocol)**는 연결을 설정한 뒤 Sequence Number, ACK, 재전송으로 순서 있는 신뢰성 바이트 스트림을 제공하는 전송 계층 프로토콜이다.

# 핵심 개념

## 연결과 바이트 스트림

- 통신 전에 연결을 설정하고, 양 끝은 연결 상태를 관리한다.
- 애플리케이션에는 메시지 경계가 아닌 순서 있는 바이트 스트림을 전달한다.
- 연결은 일반적으로 출발지와 목적지의 IP 주소, Port 조합으로 식별한다. [Port](/network/port.md)는 호스트 내부에서 소켓 endpoint를 구분한다.

## 유실과 순서 복구

- 각 바이트 구간에는 **Sequence Number**가 있고, 수신자는 다음에 필요한 바이트 번호를 **ACK**로 알린다.
- 중간 구간이 유실되면 이후 데이터가 도착해도 수신자는 같은 ACK를 반복할 수 있다. 송신자는 중복 ACK 또는 재전송 timeout으로 유실을 추정한다.
- 송신자는 유실 구간을 재전송한다. **SACK(Selective Acknowledgment)** 옵션을 사용하면 수신자가 이미 받은 구간을 알려 주어 빈 구간을 더 정확히 전송할 수 있다.

## 지연의 대가

- 누락된 바이트가 복구될 때까지 뒤 데이터의 애플리케이션 전달이 지연될 수 있다. 이를 TCP의 Head-of-Line Blocking이라고 한다.
- 신뢰성과 순서 보장은 파일 전송, 결제 요청처럼 누락된 데이터가 허용되지 않는 통신에 적합하다.

# 면접 단골 질문

- Q: TCP는 유실된 데이터를 어떻게 감지하고 복구하나요?
  - 포인트: Sequence Number, 누적 ACK, 중복 ACK 또는 timeout, 재전송.
- Q: TCP에서 2번 구간이 유실된 뒤 3번 구간이 도착하면 수신자는 무엇을 하나요?
  - 포인트: 다음에 필요한 2번을 가리키는 ACK를 반복하고, 송신자는 중복 ACK로 유실을 추정할 수 있음.
- Q: TCP가 실시간 위치 갱신에 항상 적합하지 않은 이유는 무엇인가요?
  - 포인트: 유실 복구와 순서 보장 때문에 오래된 데이터까지 기다리는 Head-of-Line Blocking.

# 헷갈리는 점 / 함정

- **"TCP ACK는 수신한 패킷 번호다"** - ACK는 수신자가 다음으로 기대하는 바이트 번호를 알린다.
- **"TCP는 NAK로 유실을 알린다"** - 표준 TCP의 기본 복구는 ACK, timeout, 중복 ACK를 사용한다.
- **"TCP는 메시지 경계를 보존한다"** - TCP는 바이트 스트림이므로 메시지 framing은 애플리케이션 프로토콜의 책임이다.

# 관련 개념

- [Port](/network/port.md)
- [UDP](/network/udp.md)
- [TCP와 UDP](/network/tcp-vs-udp.md)
- [3-way Handshake](/network/three-way-handshake.md)
