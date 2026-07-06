---
type: CS Concept
title: TCP vs UDP
description: 연결지향 TCP와 비연결 UDP의 차이, 신뢰성과 속도의 트레이드오프.
tags: [network, transport-layer]
difficulty: medium
frequency: high
timestamp: 2026-06-15T10:00:00Z
---

# 한 줄 정의

TCP는 연결을 수립하고 신뢰성을 보장하는 프로토콜, UDP는 연결 없이 빠르게 보내는 프로토콜이다.

# 핵심 개념

| 항목 | TCP | UDP |
|------|-----|-----|
| 연결 | 연결지향 (handshake) | 비연결 |
| 신뢰성 | 보장 (재전송/순서) | 미보장 |
| 속도 | 상대적으로 느림 | 빠름 |
| 용례 | HTTP, 파일 전송 | 스트리밍, DNS, 게임 |

# 면접 단골 질문

- Q: TCP와 UDP의 차이를 설명해보세요.
  - 포인트: 연결 수립, 신뢰성/순서, 흐름·혼잡 제어, 헤더 크기, 용례.

# 헷갈리는 점 / 함정

- "UDP는 무조건 빠르고 나쁘다"는 오해 — 용도에 따라 적합한 선택일 수 있다.

# 관련 개념

(아직 없음)
