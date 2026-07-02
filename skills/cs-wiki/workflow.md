---
wiki_root: '~/Desktop/code/claud/cs-wiki'
records_root: '~/Desktop/code/claud/cs-interview-records'
conventions_file: './conventions.md'
concept_template: './concept-template.md'
communication_language: '한국어'
---

# CS Wiki Workflow

**Goal:** CS 면접 지식을 **누적되는 영속적 위키**로 쌓는다. 매번 새로 설명하는 게 아니라,
한 번 정리한 개념을 OKF 마크다운 페이지로 남기고 새 정보가 들어올 때마다 갱신한다.
시간이 지날수록 교차링크와 면접 질문이 풍부해지는 컴파운딩 자산을 만드는 게 목표다.

이 위키는 자매 스킬 **`cs-interviewer`(모의 면접관)** 의 "정답 기준"으로도 쓰인다.
그래서 각 개념 페이지는 면접관이 질문·평가에 바로 활용할 수 있는 형태로 작성한다.

**CRITICAL:** step 파일을 순서대로 읽고 따른다. 동시에 여러 step을 로드하지 않는다.


## 경로 규칙

- `{wiki_root}` (`~/Desktop/code/claud/cs-wiki`) — 지식 위키 번들 루트. 이 스킬이 소유한다.
- `{records_root}` (`~/Desktop/code/claud/cs-interview-records`) — 면접 기록 저장소.
  `cs-interviewer`가 소유한다. **이 스킬은 여기에 절대 쓰지 않는다.**
- `./...` — 이 스킬 디렉터리 기준 상대 경로 (`conventions.md`, 템플릿 등).


## INVARIANTS (예외 없음)

- **지식은 깨끗하게 유지한다.** `{wiki_root}`에는 *검증된 CS 지식*만 담는다.
  면접 성과·사용자 답변·점수 같은 기록은 절대 여기 넣지 않는다 (그건 `{records_root}` 소관).
  데이터 오염 방지가 최우선이다.
- 모든 출력은 `{communication_language}`(한국어)로 한다.
- 페이지를 덮어쓰지 않는다. 기존 페이지는 구조를 보존하며 **병합/갱신**한다.
- 페이지를 만들거나 고치면 반드시 관련 `index.md`와 `log.md`를 갱신한다.
- 사용자는 위키를 직접 쓰지 않는다. 작성·교차링크·index/log 갱신은 전부 이 스킬이 한다.
- 점검(lint)에서 발견한 문제는 자동 수정하지 않고 사용자 승인 후 고친다.


## STEP PROCESSING RULES

1. **READ COMPLETELY**: step 파일 전체를 읽은 뒤 실행한다.
2. **FOLLOW SEQUENCE**: 지정된 순서/분기로만 실행한다.
3. **WAIT FOR INPUT**: 체크포인트에서 반드시 멈추고 사람을 기다린다.
4. **LOAD NEXT**: 현재 step에서 명시한 다음 파일로 이동한다.
5. **EARLY EXIT**: 이 step을 즉시 중단하고 지정된 파일로 이동한다.


## 세션 상태 변수 (런타임에 설정)

- `{request}` — 스킬을 발동시킨 사용자 요청 원문
- `{operation}` — 분류된 작업: `ingest` | `query` | `lint`
- `{conventions}` — `{conventions_file}`에서 로드한 OKF 스키마/규칙 전문
- `{template}` — `{concept_template}`에서 로드한 개념 페이지 템플릿
- `{target_concept}` — 정리/질의 대상 개념 (해당 시)
- `{touched_files}` — 이번 작업에서 만들거나 고친 파일 목록


## INITIALIZATION

### 1. 규칙·템플릿 로드

`{conventions_file}`을 읽어 `{conventions}`로, `{concept_template}`을 읽어 `{template}`로 보관한다.
이후 모든 작업은 이 규칙과 템플릿을 따른다.

### 2. 첫 번째 Step 실행

Read fully and follow: `./step-01-route.md`
