# cs-interview

면접 대비 CS 지식을 **직접 구축하고, 그 지식으로 스스로를 검증**하는 Claude Code 스킬 한 쌍.

두 스킬은 떼어놓을 수 없는 쌍이다:

| 스킬 | 역할 |
|---|---|
| **cs-wiki** | CS 개념을 OKF(Open Knowledge Format) 마크다운 위키로 정리·교차링크·점검 |
| **cs-interviewer** | 그 위키를 **정답 기준(oracle)** 으로 삼아 AI 면접관이 모의 면접 진행·채점·기록 |

> 설계 철학: 지식을 "쌓는 것"(wiki)과 "검증하는 것"(interviewer)을 분리하되, 후자가 전자를
> oracle 로 참조한다. 위키가 좋아질수록 채점이 정확해지는 선순환.

## 구조

```
cs-interview/
├── README.md            ← 이 문서
├── CHANGELOG.md         ← 두 스킬의 반복 개선 이력
├── benchmarks/          ← 회차별 벤치 결과 (감사 가능한 개선 근거)
└── skills/
    ├── cs-wiki/         ← 설치 단위 스킬
    └── cs-interviewer/  ← 설치 단위 스킬 (cs-wiki 를 읽기 전용 참조)
```

## 핵심 불변식 (INVARIANT)

- **지식과 기록의 분리**: 지식 위키는 깨끗하게 유지하고, 면접 세션 기록은
  `cs-interview-records/` 로 격리한다. 면접이 위키를 오염시키지 않는다.
- **cs-interviewer 는 위키를 읽기만 한다**: 절대 위키를 수정하지 않는다.
  위키에 없는 개념은 "정답 기준 미검증"으로 표시하고 cs-wiki 정리를 제안만 한다.
- **답변 대필 금지**: 면접관은 질문 직후 턴을 종료하고, 실제 사용자 입력이 온 뒤에만 진행한다.

## 설치

Claude Code 는 스킬을 `~/.claude/skills/<name>/SKILL.md` 경로로 인식한다.
두 스킬 폴더를 그대로 복사하면 된다:

```bash
cp -R skills/cs-wiki skills/cs-interviewer ~/.claude/skills/
```

## 사용

```
"프로세스랑 스레드 차이 위키에 정리해줘"      # cs-wiki
"위키 점검해줘"                              # cs-wiki (lint)
"CS 모의 면접 보자"                          # cs-interviewer
```

## 품질 근거

반복 개선 이력은 [`CHANGELOG.md`](./CHANGELOG.md), 측정 수치는
[`benchmarks/`](./benchmarks/) 참고. cs-wiki 는 A/B eval 로 pass rate 를 측정했고
(baseline 0.53 → 1.00), cs-interviewer 는 실전 모의면접으로 정성 검증했다.
