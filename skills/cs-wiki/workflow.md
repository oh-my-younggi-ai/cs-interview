---
wiki_root: '~/Desktop/code/oh-my-younggi-ai/cs-interview/knowledge'
records_root: '~/Desktop/code/oh-my-younggi-ai/cs-interview/records'
conventions_file: './conventions.md'
concept_template: './concept-template.md'
communication_language: '한국어'
---

# CS Wiki Workflow

**Goal:** CS 면접 지식을 누적되는 영속적 위키로 쌓는다. 한 번 정리한 개념을 OKF 마크다운
페이지로 남기고 새 정보가 들어올 때마다 갱신한다. 시간이 지날수록 교차링크와 면접 질문이
풍부해지는 지식 자산을 만든다.

이 위키는 자매 스킬 `cs-interviewer`의 정답 기준으로도 쓰인다. 각 개념 페이지는 면접관이
질문과 평가에 바로 활용할 수 있는 형태로 작성한다.

**CRITICAL:** step 파일을 순서대로 읽고 따른다. 동시에 여러 step을 로드하지 않는다.

## 경로 규칙

- `{wiki_root}` (`~/Desktop/code/oh-my-younggi-ai/cs-interview/knowledge`) - 지식 위키 번들 루트이며 이 스킬이 소유한다.
- `{records_root}` (`~/Desktop/code/oh-my-younggi-ai/cs-interview/records`) - 면접 기록 저장소이며 `cs-interviewer`가 소유한다. 이 스킬은 쓰지 않는다.
- `./...` - 이 스킬 디렉터리 기준 상대 경로다.

## INVARIANTS

- `{wiki_root}`에는 검증된 CS 지식만 담는다. 면접 성과, 사용자 답변, 점수는 `{records_root}`에만 둔다.
- 모든 출력은 `{communication_language}`로 한다.
- 기존 페이지를 덮어쓰지 않고 구조를 보존하며 병합하거나 갱신한다.
- 페이지를 만들거나 고치면 관련 `index.md`와 `log.md`를 갱신한다.
- 작성, 교차링크, index/log 갱신은 이 스킬이 수행한다.
- 점검에서 발견한 문제는 자동 수정하지 않고 사용자 승인 후 고친다.
- 대화 탐색과 추천에서는 한 번에 한 질문이나 제안만 하고 사용자 답변을 대신 만들지 않는다.
- 루트 `index.md`의 분야 링크와 분야별 `index.md`의 `##` 큰 토픽을 학습 로드맵의 정본으로 삼는다.
- `##` 큰 토픽은 분류와 학습 범위이며 작성된 지식이 아니다. 그 아래 실제 개념 페이지를 가리키는 목록 링크만 작성 완료 지식으로 취급한다.
- 큰 토픽은 분야 안의 논리적 분류다. 큰 토픽별 하위 디렉터리를 만들지 않고 개념 페이지를 분야 디렉터리 바로 아래에 둔다.
- 분야와 큰 토픽은 자동으로 추가, 삭제, 이름 변경, 재정렬하지 않는다. 기존 로드맵에 맞지 않으면 변경안을 제시하고 사용자 승인을 기다린다.
- 대화에서 나온 개념을 실제 개념 링크와 대조한다. 새 개념은 신규 후보, 기존 개념의 새 내용은 갱신 후보, 같은 내용은 변경 없음으로 분류한다.
- 추천은 고정된 큰 토픽과 실제 개념 링크의 격차를 기준으로 한다. 이미 작성된 개념을 신규 후보로 추천하지 않는다.

## STEP PROCESSING RULES

1. **READ COMPLETELY**: step 파일 전체를 읽은 뒤 실행한다.
2. **FOLLOW SEQUENCE**: 지정된 순서와 분기로만 실행한다.
3. **WAIT FOR INPUT**: 체크포인트에서 멈추고 사용자를 기다린다.
4. **LOAD NEXT**: 현재 step에서 명시한 다음 파일로 이동한다.
5. **EARLY EXIT**: 현재 step을 중단하고 지정된 파일로 이동한다.

## 세션 상태 변수

- `{request}` - 스킬을 발동시킨 사용자 요청 원문
- `{operation}` - `ingest` | `explore` | `query` | `lint`
- `{explore_mode}` - `discuss` | `recommend`
- `{target_category}` - 루트 `index.md`에 등록된 분야와 분야 디렉터리
- `{target_large_topic}` - 분야별 `index.md`에 고정된 `##` 큰 토픽
- `{learning_checklist}` - 선택한 개념을 학습하기 위한 세션 내 핵심 항목과 `미시작` | `학습 중` | `완료` 상태. 위키 인덱스의 고정 큰 토픽과 별개이며 파일에 쓰지 않는다.
- `{surfaced_concepts}` - 대화에서 추출한 개념 키워드
- `{surfaced_changes}` - 각 추출 개념의 `신규` | `갱신` | `변경 없음` 분류와 근거
- `{conventions}` - `{conventions_file}`에서 로드한 OKF 스키마와 규칙
- `{template}` - `{concept_template}`에서 로드한 개념 페이지 템플릿
- `{target_concept}` - 정리 또는 질의 대상 개념
- `{touched_files}` - 이번 작업에서 만들거나 고친 파일 목록

## INITIALIZATION

### 1. 규칙과 템플릿 로드

`{conventions_file}`을 읽어 `{conventions}`로, `{concept_template}`을 읽어 `{template}`으로 보관한다.

### 2. 첫 번째 Step 실행

Read fully and follow: `./step-01-route.md`
