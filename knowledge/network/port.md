---
type: CS Concept
title: Port
description: 전송 계층이 하나의 호스트 안에서 데이터를 올바른 소켓 endpoint로 분배하기 위해 사용하는 16비트 식별자.
tags: [network, transport-layer, port, socket]
difficulty: easy
frequency: high
timestamp: 2026-09-07T00:00:00Z
---

# 한 줄 정의

**Port**는 전송 계층이 호스트에 도착한 데이터를 해당 소켓 endpoint로 전달하기 위해 사용하는 16비트 식별자다.

# 핵심 개념

## 전송 계층의 다중화와 역다중화

- 하나의 호스트에는 여러 애플리케이션과 소켓이 동시에 통신한다.
- 송신 측은 출발지와 목적지 Port를 전송 계층 헤더에 넣어 여러 소켓의 데이터를 한 네트워크 인터페이스로 다중화한다.
- 수신 측은 목적지 Port를 기준으로 데이터를 소켓에 역다중화한다.

## IP 주소와의 역할 차이

- IP 주소는 네트워크에서 목적지 호스트를 찾는 데 사용한다.
- Port는 그 호스트 안에서 통신 endpoint를 구분한다.
- [TCP](/network/tcp.md) 연결은 일반적으로 출발지 IP, 출발지 Port, 목적지 IP, 목적지 Port의 조합으로 구분한다.

# 면접 단골 질문

- Q: IP 주소와 Port의 역할 차이는 무엇인가요?
  - 포인트: IP 주소는 호스트 식별과 경로 선택, Port는 호스트 내부의 전송 계층 endpoint 식별.
- Q: 하나의 서버가 여러 클라이언트의 TCP 연결을 어떻게 구분하나요?
  - 포인트: 출발지와 목적지의 IP 주소, Port 조합.

# 헷갈리는 점 / 함정

- **"Port가 애플리케이션 하나를 항상 고유하게 식별한다"** - Port는 소켓 endpoint 식별자이며, 운영체제의 소켓 공유 정책에 따라 하나의 Port를 여러 worker가 사용할 수도 있다.
- **"IP 주소만 있으면 수신 프로그램을 찾을 수 있다"** - IP 주소는 호스트까지만 식별하므로 호스트 내부 분배에는 Port가 필요하다.

# 관련 개념

- [TCP](/network/tcp.md)
- [UDP](/network/udp.md)
- [소켓](/network/socket.md)
