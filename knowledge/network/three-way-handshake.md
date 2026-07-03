---
type: CS Concept
title: 3-way Handshake
description: TCP 연결 수립 시 클라이언트-서버가 SYN·SYN-ACK·ACK 세 단계를 교환해 양방향 통신을 준비하는 절차.
tags: [network, transport-layer, tcp]
difficulty: medium
frequency: high
timestamp: 2026-06-17T14:30:00Z
---

# 한 줄 정의

TCP 연결을 시작할 때 클라이언트와 서버가 SYN → SYN-ACK → ACK 세 패킷을 주고받아 양방향 채널을 확립하는 절차다.

# 핵심 개념

## 목적

- **초기 시퀀스 번호(ISN) 교환** — 양쪽이 독립적인 ISN을 공유해 순서·중복 탐지에 사용한다.
- **양방향 통신 확인** — 클라이언트→서버, 서버→클라이언트 각 방향의 수신 가능 여부를 확인한다.
- **파라미터 협상** — MSS, 윈도우 크기 등 옵션을 합의한다.

## 3단계 절차

```
Client                          Server
  |                               |
  |  SYN (seq=x)                  |   1단계: 클라이언트가 연결 요청
  |------------------------------>|
  |                               |
  |  SYN-ACK (seq=y, ack=x+1)    |   2단계: 서버가 수신 확인 + 자신의 SYN
  |<------------------------------|
  |                               |
  |  ACK (ack=y+1)               |   3단계: 클라이언트가 서버 SYN 확인
  |------------------------------>|
  |                               |
  |   연결 수립 완료 (ESTABLISHED)  |
```

| 단계 | 방향 | 플래그 | 내용 |
|------|------|--------|------|
| 1 | Client → Server | SYN | 클라이언트 ISN(x) 전송, 연결 요청 |
| 2 | Server → Client | SYN + ACK | 서버 ISN(y) 전송, 클라이언트 SYN 확인(ack=x+1) |
| 3 | Client → Server | ACK | 서버 SYN 확인(ack=y+1), 연결 수립 완료 |

## 상태 전이

- Client: `CLOSED` → `SYN_SENT` → `ESTABLISHED`
- Server: `LISTEN` → `SYN_RECEIVED` → `ESTABLISHED`

# 면접 단골 질문

- Q: TCP 3-way handshake가 무엇인지 설명해보세요.
  - 포인트: SYN/SYN-ACK/ACK 3단계, ISN 교환 목적, 양방향 통신 확인.
- Q: 왜 2-way handshake가 아니라 3-way인가요?
  - 포인트: 2-way는 서버→클라이언트 방향의 신뢰성을 확인하지 못한다. 서버가 ACK를 보내도 클라이언트가 수신했는지 알 수 없다.
- Q: SYN Flood 공격이 무엇인가요?
  - 포인트: 대량의 SYN만 보내고 ACK를 보내지 않아 서버의 SYN 큐를 고갈시키는 DoS 공격. SYN Cookie로 방어.
- Q: 3-way handshake가 완료되면 데이터 신뢰성이 보장되나요?
  - 포인트: 연결 수립과 데이터 신뢰성은 별개다. 신뢰성은 이후 ACK/재전송/흐름제어 메커니즘이 담당.

# 헷갈리는 점 / 함정

- **"3-way handshake = 신뢰성 보장"은 오해.** 연결 수립 절차일 뿐, 데이터 신뢰성은 이후 ACK·재전송으로 보장한다.
- **ISN은 0이 아니다.** 보안과 이전 연결 세그먼트와의 혼동 방지를 위해 OS가 랜덤 값으로 생성한다.
- **4-way handshake와 혼동.** 3-way는 연결 수립, 4-way는 연결 해제 절차다 — FIN/ACK를 두 번씩 교환한다.
- **SYN_RECEIVED 상태.** 서버가 SYN-ACK를 보낸 뒤 클라이언트 ACK를 기다리는 하프-오픈 상태. SYN Flood가 이를 고갈시킨다.

# 관련 개념

- [TCP vs UDP](/network/tcp-vs-udp.md)
- [4-way Handshake](/network/four-way-handshake.md)
- [TCP 흐름 제어 / 혼잡 제어](/network/tcp-flow-congestion-control.md)

# Citations

[1] [RFC 793 — Transmission Control Protocol](https://www.rfc-editor.org/rfc/rfc793)
