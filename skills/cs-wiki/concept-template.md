# 개념 페이지 템플릿 (OKF Concept)

새 개념 페이지는 이 형식으로 작성한다. 섹션은 가능한 한 채우되, 해당 없는 섹션은 비워두지 말고 삭제한다.
frontmatter 필드 규칙은 `conventions.md` §2 참고.

```markdown
---
type: CS Concept
title: TCP vs UDP
description: 연결지향 TCP와 비연결 UDP의 차이, 신뢰성과 속도의 트레이드오프.
tags: [network, transport-layer]
difficulty: medium
frequency: high
timestamp: 2026-06-17T14:30:00Z
---

# 한 줄 정의

한 문장으로 핵심을 못 박는다. 면접에서 "이게 뭐예요?"에 즉답할 수 있는 문장.

# 핵심 개념

면접에서 설명해야 하는 본질. 구조적 마크다운(목록/표)을 산문보다 우선한다.

| 항목 | TCP | UDP |
|------|-----|-----|
| 연결 | 연결지향 (handshake) | 비연결 |
| 신뢰성 | 보장 (재전송/순서) | 미보장 |
| ... | ... | ... |

# 면접 단골 질문

면접관 스킬이 바로 쓸 수 있도록 질문 + 평가 포인트를 함께 적는다.

- Q: TCP와 UDP의 차이를 설명해보세요.
  - 포인트: 연결 수립, 신뢰성/순서 보장, 흐름·혼잡 제어, 헤더 크기, 대표 용례.
- Q: UDP인데 신뢰성이 필요하면?
  - 포인트: 애플리케이션 레벨 재전송, QUIC 사례.

# 헷갈리는 점 / 함정

오해하기 쉬운 부분, 꼬리 질문이 파고들 지점. (예: "3-way handshake가 데이터 신뢰성을 보장한다"는 오해)

# 관련 개념

- [3-way handshake](/network/three-way-handshake.md)
- [QUIC](/network/quic.md)

# Citations

(외부 출처를 참고했을 때만. 없으면 이 섹션 삭제.)
[1] [RFC 793](https://www.rfc-editor.org/rfc/rfc793)
```
