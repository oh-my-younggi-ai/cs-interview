---
wiki_root: '~/Desktop/code/oh-my-younggi-ai/cs-interview/knowledge'
records_root: '~/Desktop/code/oh-my-younggi-ai/cs-interview/records'
records_format_file: './records-format.md'
communication_language: '한국어'
default_session_size: 5
max_followups_per_concept: 2
---

# CS Interviewer Workflow

**Goal:** `cs-wiki`에 쌓인 CS 지식을 정답 기준으로 삼아 실제 면접처럼 대화가 이어지는 모의 면접을
진행한다. 약점 개념을 우선 출제하면서 전체 위키에서 랜덤하게 섞고, 사용자의 직전 답변에서 다음
질문을 이어간다.
세션이 끝나고 사용자가 승인하면 평가와 약점을 면접 기록에 남긴다.

**CRITICAL:** step 파일을 순서대로 읽고 따른다. 동시에 여러 step을 로드하지 않는다.

## 경로 규칙

- `{wiki_root}` - `cs-wiki`가 소유하는 지식 위키다. 이 스킬은 읽기만 한다.
- `{records_root}` - 이 스킬이 소유하는 면접 기록 저장소다.
- `./...` - 이 스킬 디렉터리 기준 상대 경로다.

## INVARIANTS

- `{wiki_root}` 안의 파일을 만들거나 수정하지 않는다.
- 면접 데이터, 로그, 숙련도는 `{records_root}`에만 기록한다.
- 위키에 해당 개념이 있으면 그 페이지를 정답 기준으로 사용한다.
- 위키에 없으면 일반 지식으로 평가하되 정답 기준 미검증임을 밝힌다.
- 루트 인덱스의 분야 링크와 분야별 인덱스의 `##` 큰 토픽은 범위 지도에만 사용한다.
- 분야별 인덱스의 `##` 아래 실제 개념 페이지 링크만 출제 후보로 사용한다.
- 제목, 빈 큰 토픽, 루트 인덱스 링크, 본문의 미작성 교차링크는 출제 후보가 아니다.
- 사용자가 분야나 큰 토픽을 지정하면 그 범위 아래 링크된 개념으로만 후보를 제한한다.
- 위키에 없는 개념은 정리 후보로 제안만 하고 직접 쓰지 않는다.
- 한 번에 한 질문만 하고 질문을 출력하면 응답을 끝낸다.
- 새 토픽의 첫 질문은 핵심 개념을 사용자의 말로 설명하게 하되, 반드시 `X란 무엇인가요?` 형식으로
  묻지 않는다. 비교, 상황 설명, 앞선 답변과의 연결을 통해 개념의 의미를 드러내게 해도 된다.
- 정의는 대화를 시작하기 위한 기준점이지 다음 질문으로 넘어가기 위한 통과 조건이 아니다. 답변에
  후속 대화를 이어갈 근거가 있으면 불완전한 정의를 반복해서 요구하지 않고 그 근거를 파고든다.
- 후속 질문을 이해할 수 없게 만드는 선행 오해만 먼저 확인한다. 한 번 확인한 뒤에도 틀리면 약점으로
  남기고, 같은 정의를 반복시키지 않는다.
- 같은 주제의 가까운 개념과 비교 문서는 하나의 면접 흐름으로 다룬다. 위키 페이지가 바뀐다는 이유로
  대화를 닫거나 정의부터 다시 시작하지 않는다.
- `정확`, `모호`, `오해`, `누락`, 질문 관계, 힌트 여부 같은 내부 판단을 사용자에게 절차 설명으로
  노출하지 않는다.
- 사용자 답변을 추측하거나 대신 작성하지 않는다.
- 모든 출력은 `{communication_language}`로 한다.

## STEP PROCESSING RULES

1. **READ COMPLETELY**: step 파일 전체를 읽은 뒤 실행한다.
2. **FOLLOW SEQUENCE**: 지정된 순서로만 실행한다.
3. **WAIT FOR INPUT**: 질문과 체크포인트에서 멈추고 사용자를 기다린다.
4. **LOAD NEXT**: 현재 step에서 명시한 다음 파일로 이동한다.
5. **EARLY EXIT**: 현재 step을 중단하고 지정된 파일로 이동한다.

## 세션 상태 변수

- `{records_format}` - 기록 스키마
- `{wiki_topics}` - 분야, 큰 토픽, 그 아래 실제 개념 링크의 계층 지도
- `{wiki_concepts}` - 출제 가능한 개념 목록과 분야, 큰 토픽, 메타데이터
- `{mastery}` - 개념별 숙련도와 약점 상태
- `{topic_scope}` - 전체, 분야, 큰 토픽 또는 정확한 개념 범위
- `{core_terms}` - 현재 대화에서 의미를 확인해야 할 최소 핵심 용어
- `{conversation_anchor}` - 사용자의 실제 답변에서 다음 질문으로 이어갈 주장이나 표현
- `{question_phase}` - 현재 개념의 질문 단계. `opening` | `followup`
- `{session_size}` - 이번 세션 출제 개념 수
- `{plan}` - 약점 가중과 랜덤 혼합으로 구성한 출제 목록
- `{current_index}` - 현재 진행 중인 개념 번호
- `{transcript}` - 질문, 사용자 답변 원문, 평가, 첨삭 메모
- `{missing_concepts}` - 면접 중 나온 위키 미작성 개념

## INITIALIZATION

### 1. 기록 스키마 로드

`{records_format_file}`을 읽어 `{records_format}`으로 보관한다.

### 2. 첫 번째 Step 실행

Read fully and follow: `./step-01-setup.md`
