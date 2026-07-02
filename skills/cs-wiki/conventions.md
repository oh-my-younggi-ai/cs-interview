# OKF 스키마 — CS Wiki 규칙

이 위키는 **OKF(Open Knowledge Format)** 를 따른다: YAML frontmatter를 가진 마크다운 파일들의
디렉터리. 각 개념 = 파일 1개. 모든 작업(정리/질의/점검)은 이 규칙을 지킨다.


## 1. 디렉터리 구조와 분류

번들 루트는 `{wiki_root}`. 주제별 하위 디렉터리로 개념을 묶는다.

```
cs-wiki/
├── index.md                     # 루트 카탈로그
├── log.md                       # 변경 이력 (시간순)
├── network/
│   ├── index.md                 # 주제 카탈로그
│   ├── tcp-vs-udp.md            # 개념 페이지
│   └── three-way-handshake.md
├── operating-systems/
└── ...
```

분류는 고정이 아니다. 개념에 맞는 디렉터리가 없으면 새로 만든다. 흔한 CS 면접 주제 후보:
`network`, `operating-systems`, `database`, `data-structure`, `algorithm`,
`computer-architecture`, `design-pattern`, `web`, `security`, `language`, `system-design`.

- 파일명: `kebab-case`, 영문. (예: `tcp-vs-udp.md`)
- concept ID: 경로에서 `.md`를 뗀 값. (`network/tcp-vs-udp.md` → `network/tcp-vs-udp`)


## 2. 개념 페이지 frontmatter

```yaml
---
type: CS Concept            # REQUIRED — OKF 필수 필드
title: TCP vs UDP
description: 한 문장 요약 (index.md가 이 값을 가져감)
tags: [network, transport-layer]
difficulty: medium          # easy | medium | hard (면접 난이도)
frequency: high             # low | medium | high (면접 빈출도)
timestamp: 2026-06-17T14:30:00Z   # 마지막 수정 시각 (ISO 8601)
---
```

- **필수는 `type` 하나.** 값은 `CS Concept`로 통일한다.
- `difficulty`/`frequency`는 `cs-interviewer`가 출제 우선순위를 정하는 데 쓰므로 가급적 채운다.
- 면접 활용을 위해 본문의 `# 핵심 개념`, `# 면접 단골 질문`, `# 헷갈리는 점`, `# 관련 개념`
  섹션을 가능한 한 채운다 — 이게 면접관의 질문·꼬리질문·평가 재료다.
- 페이지 본문 형식은 `concept-template.md`를 따른다.


## 3. 교차링크

- **bundle-relative 링크**(루트 `/`로 시작)를 기본으로 쓴다: `[3-way handshake](/network/three-way-handshake.md)`.
  파일이 디렉터리 안에서 이동해도 안정적이다.
- 본문에서 다른 개념을 언급하면 링크를 건다. **대상 페이지가 아직 없어도 링크는 건다** —
  OKF는 깨진 링크를 "아직 안 쓴 지식"으로 허용한다.
- 새 개념을 만들면, 그와 관련된 *기존* 페이지의 `# 관련 개념`에도 새 개념으로 향하는 역링크를 한 줄 추가한다.


## 4. index.md (내용 카탈로그)

모든 디렉터리에 둘 수 있다. **frontmatter 없음.** 섹션별 목록.

```markdown
# Network

* [TCP vs UDP](/network/tcp-vs-udp.md) - 연결지향/비연결 트레이드오프. (freq: high)
* [3-way Handshake](/network/three-way-handshake.md) - TCP 연결 수립 절차. (freq: medium)

# Operating Systems

* [프로세스 vs 스레드](/operating-systems/process-vs-thread.md) - 메모리/스케줄링 단위 차이.
```

- 설명은 페이지 frontmatter의 `description`을 가져온다.
- 빈출도가 있으면 `(freq: ...)`로 덧붙인다.
- 루트 `index.md`는 주제 디렉터리 전체를, 주제 `index.md`는 그 디렉터리 페이지를 나열한다.


## 5. log.md (시간순 이력)

append-only. **최신이 위.** 날짜 헤딩은 ISO `YYYY-MM-DD`.

```markdown
# CS Wiki 변경 로그

## 2026-06-17
* **정리**: [TCP vs UDP](/network/tcp-vs-udp.md) 신규 작성. [3-way handshake]에 역링크 추가.
* **점검**: process-vs-thread 와 thread 페이지 모순 발견 → 사용자 확인 대기.

## 2026-06-15
* **초기화**: 번들 구조 생성.
```

- 접두 굵은 단어(`**정리**`, `**갱신**`, `**점검**`, `**초기화**`)는 관례다.
- 일관된 형식 덕에 `grep "^## " log.md | head` 로 최근 이력을 빠르게 본다.
