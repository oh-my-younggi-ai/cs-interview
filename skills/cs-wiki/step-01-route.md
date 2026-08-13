# Step 1: 부트스트랩 및 작업 분류

## RULES

- INITIALIZATION에서 `{conventions}`와 `{template}`을 이미 로드했어야 한다.
- **EARLY EXIT**는 현재 step을 중단하고 지정된 파일로 이동한다.

## INSTRUCTIONS

### 1. 번들 부트스트랩

`{wiki_root}`가 없으면 만들고 다음 파일을 초기화한다.

- `index.md`: `# CS Wiki` 헤딩만 있는 빈 카탈로그
- `log.md`: `# CS Wiki 변경 로그`와 오늘 날짜 아래 초기화 기록

첫 실행이면 생성 위치를 알린다. 새 번들의 빈 루트 인덱스에는 승인된 로드맵이 없으므로 첫 개념을
정리하기 전에 분야와 큰 토픽 변경안을 제시하고 사용자 승인을 기다린다. 기존 위키에서는 현재
인덱스의 로드맵을 그대로 사용한다.

### 2. 작업 분류

`{request}`를 읽고 `{operation}`을 정한다.

- **ingest**: 대상 개념이 명확한 정리 요청
- **explore discuss**: 주제나 방향을 두고 대화하며 함께 정리하려는 요청
- **explore recommend**: 무엇을 정리하거나 공부할지 추천받으려는 요청
- **query**: 위키에 정리된 내용을 찾거나 종합해 달라는 요청
- **lint**: 위키 구조, 누락, 모순을 점검해 달라는 요청

애매하면 어느 작업인지 짧게 확인한다. 대상 개념이 분명하면 `{target_concept}`에 담는다. 분야나
큰 토픽이 명시되면 `{target_category}`와 `{target_large_topic}`에도 담되 실제 인덱스에서 확인한 뒤 사용한다.

### 3. 분기

- `ingest` -> `./step-ingest.md`
- `explore discuss` -> `{explore_mode}=discuss` 설정 후 `./step-explore.md`
- `explore recommend` -> `{explore_mode}=recommend` 설정 후 `./step-explore.md`
- `query` -> `./step-query.md`
- `lint` -> `./step-lint.md`

분기하면 **EARLY EXIT**한다.
