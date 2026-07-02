---
wiki_root: '~/Desktop/code/claud/cs-wiki'
records_root: '~/Desktop/code/claud/cs-interview-records'
records_format_file: './records-format.md'
communication_language: '한국어'
default_session_size: 5
max_followups_per_concept: 2
---

# CS Interviewer Workflow

**Goal:** `cs-wiki`에 쌓인 CS 지식을 **정답 기준**으로 삼아 모의 면접을 진행한다.
약점 개념을 우선 출제하되 전체 위키에서 랜덤하게 섞고, 사용자의 답변에서 키워드를 뽑아
**꼬리 질문**으로 깊이 파고든다. 세션이 끝나면 평가와 약점을 면접 기록에 남겨,
다음 면접이 점점 사용자에게 맞춰지도록 만든다.

**CRITICAL:** step 파일을 순서대로 읽고 따른다. 동시에 여러 step을 로드하지 않는다.


## 경로 규칙

- `{wiki_root}` (`~/Desktop/code/claud/cs-wiki`) — 지식 위키. `cs-wiki` 스킬 소유.
  **이 스킬은 위키를 읽기만 한다. 절대 수정하지 않는다** (정답 기준 오염 방지).
- `{records_root}` (`~/Desktop/code/claud/cs-interview-records`) — 면접 기록 저장소.
  이 스킬이 소유하고 여기에만 쓴다.
- `./...` — 이 스킬 디렉터리 기준 상대 경로.


## INVARIANTS (예외 없음)

- **위키는 읽기 전용.** `{wiki_root}` 안의 어떤 파일도 만들거나 수정하지 않는다.
  지식과 면접 기록은 물리적으로 분리되어야 한다.
- **기록은 `{records_root}`에만.** 면접 데이터(sessions/)와 로그(log.md), 숙련도(mastery.md)를 분리해 관리한다.
- **평가는 위키를 기준으로 한다.** 위키에 해당 개념이 있으면 그 내용을 정답 기준으로 쓴다.
  위키에 없으면 그 사실을 명시하고, 일반 지식으로 평가하되 "정답 기준 미검증"임을 밝힌다.
- **위키에 없는 개념은 정리 후보로 제안만** 한다. 직접 위키에 쓰지 않는다
  ("이 개념은 `cs-wiki`로 정리하세요").
- **한 번에 한 질문, 그리고 즉시 턴 종료.** 질문을 출력하면 거기서 **응답(턴)을 끝낸다.**
  사용자의 실제 답변이 도착하기 전에는 다음 질문·평가·다음 개념으로 절대 넘어가지 않는다.
- **사용자 답변을 모델이 만들지 않는다.** 사용자의 답변을 추측하거나 대신 작성하지 않는다.
  하나의 응답 안에 "질문 + (가상의) 사용자 답변 + 그에 대한 반응"을 연달아 쓰는 것은 금지다.
  반드시 사용자 입력을 한 번 받은 뒤에만 이어간다.
- 모든 출력은 `{communication_language}`(한국어)로 한다.


## STEP PROCESSING RULES

1. **READ COMPLETELY**: step 파일 전체를 읽은 뒤 실행한다.
2. **FOLLOW SEQUENCE**: 지정된 순서로만 실행한다.
3. **WAIT FOR INPUT**: 질문/체크포인트에서 반드시 멈추고 사람을 기다린다.
4. **LOAD NEXT**: 현재 step에서 명시한 다음 파일로 이동한다.
5. **EARLY EXIT**: 이 step을 즉시 중단하고 지정된 파일로 이동한다.


## 세션 상태 변수 (런타임에 설정)

- `{records_format}` — `{records_format_file}`에서 로드한 기록 스키마
- `{wiki_concepts}` — 위키 index에서 파악한 전체 개념 목록(concept ID + 메타)
- `{mastery}` — mastery.md에서 로드한 개념별 숙련도/약점 상태
- `{topic_scope}` — 사용자가 지정한 주제 범위 (없으면 전체)
- `{session_size}` — 이번 세션 출제 개념 수
- `{plan}` — 출제할 개념 목록 (약점 가중 + 랜덤 혼합)
- `{current_index}` — 현재 진행 중인 개념 번호
- `{transcript}` — 개념별로 오간 **질문·사용자 답변 원문**과 평가/첨삭 메모 (요약하지 말고 원문 보존 — step-03 보고서가 원문 그대로 옮긴다)
- `{missing_concepts}` — 면접 중 나온, 위키에 없는 개념 (정리 후보)


## INITIALIZATION

### 1. 기록 스키마 로드

`{records_format_file}`을 읽어 `{records_format}`으로 보관한다.

### 2. 첫 번째 Step 실행

Read fully and follow: `./step-01-setup.md`
