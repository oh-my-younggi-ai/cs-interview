---
wiki_root: '~/Desktop/code/oh-my-younggi-ai/cs-interview/knowledge'
records_root: '~/Desktop/code/oh-my-younggi-ai/cs-interview/records'
records_format_file: './records-format.md'
communication_language: '한국어'
default_session_size: 5
max_followups_per_concept: 2
---

# CS Interviewer Workflow

**Goal:** `cs-wiki`에 쌓인 CS 지식을 정답 기준으로 삼아 모의 면접을 진행한다. 약점 개념을
우선 출제하면서 전체 위키에서 랜덤하게 섞고 사용자 답변의 키워드로 꼬리 질문을 이어간다.
세션이 끝나면 평가와 약점을 면접 기록에 남긴다.

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
