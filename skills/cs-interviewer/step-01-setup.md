# Step 1: 셋업 — 위키 로드, 기록 부트스트랩, 출제 계획

## RULES

- `{wiki_root}`는 읽기만 한다.
- **EARLY EXIT** = 이 step을 즉시 중단하고 지정된 파일로 이동한다.


## INSTRUCTIONS

### 1. 위키 로드 (읽기 전용)

`{wiki_root}`가 존재하는지 확인한다.

- **없거나 비어 있으면** HALT:
  > 아직 정리된 CS 위키가 없습니다. 먼저 `cs-wiki` 스킬로 개념을 정리한 뒤 면접을 보러 오세요.

- 있으면 루트 `index.md`(필요 시 주제 `index.md`)를 읽어 `{wiki_concepts}`를 구성한다:
  각 concept ID와 가능하면 `frequency`/`difficulty`/`description`을 함께 파악한다.

### 2. 기록 저장소 부트스트랩

`{records_root}`가 없으면 생성하고 `{records_format}`에 따라 초기화한다:
- `log.md`: `# 면접 기록 로그` 헤딩.
- `mastery.md`: `# 숙련도 (Mastery)` + 빈 표 헤더.
- `sessions/` 디렉터리.

`mastery.md`를 읽어 `{mastery}`(개념별 시도/최근평가/약점 상태)를 로드한다. 처음이면 비어 있다.

### 3. 세션 범위·길이 결정

사용자에게 짧게 묻는다 (요청에 이미 단서가 있으면 생략):

> 어떤 면접을 볼까요?
> - 주제: 특정 영역(예: 네트워크)만 볼지, 전체에서 볼지
> - 길이: 몇 개 개념을 물어볼지 (기본 {default_session_size}개)

- 사용자가 주제를 지정하면 `{topic_scope}`로 설정, 아니면 전체.
- 길이를 지정하면 `{session_size}`, 아니면 `default_session_size`.

### 4. 출제 계획 — 약점 가중 + 전체 랜덤 혼합

`{topic_scope}`로 후보 풀을 좁힌다(없으면 전체 `{wiki_concepts}`).

`{plan}`을 다음 비율로 구성한다 (총 `{session_size}`개, 중복 없이):

- **약점 우선 (~60%)**: `{mastery}`에서 `약점 ✓`이거나 최근 평가가 `보통` 이하인 개념을 우선 선택.
- **랜덤 혼합 (~40%)**: 나머지는 후보 풀에서 무작위로 뽑되, 같은 빈출도면 `frequency: high`를 약간 우대.
- `{mastery}`가 비어 있으면(첫 세션) 전부 랜덤으로 뽑되 `frequency: high`를 우대한다.
- 후보가 `{session_size}`보다 적으면 있는 만큼만.

계획을 사용자에게 제시한다:

> 오늘 면접: {N}개 개념 ({주제 범위})
> 1. {concept} {약점 표시 시 "(약점 보강)"}
> 2. ...
>
> 준비되면 시작합니다. (난이도/주제 바꾸려면 알려주세요)

HALT하고 사용자 확인(또는 조정 요청)을 기다린다. 조정 요청이면 `{plan}`을 고쳐 다시 제시한다.

`{current_index} = 0`으로 설정한다.

**EARLY EXIT** → `./step-02-interview.md`
