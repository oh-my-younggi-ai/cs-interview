---
type: CS Concept
title: TCP vs UDP
description: 연결지향 TCP와 비연결 UDP의 차이.
tags: [network, transport-layer]
difficulty: medium
frequency: high
timestamp: 2026-06-14T10:00:00Z
---

# 한 줄 정의

TCP는 신뢰성 있는 연결형 프로토콜, UDP는 비연결형 프로토콜이다.

# 핵심 개념

UDP도 내부적으로 패킷 순서를 보장하기 때문에 순서가 중요한 곳에 써도 된다.

전송 속도가 중요하면 [QUIC](/network/quic.md)를 고려할 수 있다.

# 면접 단골 질문

- Q: TCP와 UDP 차이는?
  - 포인트: 연결, 신뢰성, 속도.
