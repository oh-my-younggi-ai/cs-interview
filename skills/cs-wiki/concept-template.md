# 개념 페이지 템플릿 (OKF Concept)

새 개념 페이지는 이 형식으로 작성한다. 섹션은 가능한 한 채우되, 해당 없는 섹션은 비워두지 말고 삭제한다.
frontmatter 필드 규칙은 `conventions.md` §2 참고.

```markdown
---
type: CS Concept
title: Mutex
description: 하나의 실행 흐름만 임계 구역에 진입하도록 소유권 기반 상호 배제를 제공하는 동기화 도구.
tags: [operating-systems, concurrency, mutex]
difficulty: medium
frequency: high
timestamp: 2026-06-17T14:30:00Z
---

# 한 줄 정의

한 문장으로 핵심을 못 박는다. 면접에서 "이게 뭐예요?"에 즉답할 수 있는 문장.

# 핵심 개념

면접에서 설명해야 하는 본질. 구조적 마크다운(목록/표)을 산문보다 우선한다.

- 정의와 동작 원리
- 해결하는 문제와 적용 조건
- 다른 개념과의 경계

# 면접 단골 질문

면접관 스킬이 바로 쓸 수 있도록 질문 + 평가 포인트를 함께 적는다.

- Q: Mutex는 무엇을 보장하나요?
  - 포인트: 상호 배제, 임계 구역, 소유권.

# 헷갈리는 점 / 함정

오해하기 쉬운 부분, 꼬리 질문이 파고들 지점. (예: "Mutex 하나를 사용하면 모든 공유 상태가 자동으로 보호된다"는 오해)

# 관련 개념

- [임계 구역](/operating-systems/critical-section.md)
- [Semaphore](/operating-systems/semaphore.md)

# Citations

(외부 출처를 참고했을 때만. 없으면 이 섹션 삭제.)
[1] [참고 자료 제목](https://example.com)
```
