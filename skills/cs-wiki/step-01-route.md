# Step 1: 부트스트랩 및 작업 분류

## RULES

- INITIALIZATION에서 `{conventions}`와 `{template}`을 이미 로드했어야 한다.
- **EARLY EXIT** = 이 step을 즉시 중단하고 지정된 파일로 이동한다.


## INSTRUCTIONS

### 1. 번들 부트스트랩

`{wiki_root}`가 없으면 생성하고, 루트 `index.md`와 `log.md`를 초기화한다:

- `index.md`: `# CS Wiki` 헤딩만 있는 빈 카탈로그.
- `log.md`: `# CS Wiki 변경 로그` + 오늘 날짜 `## YYYY-MM-DD` 아래 `* **초기화**: 번들 구조 생성.`

첫 실행이면 한 줄로 알린다:
> CS 위키를 `{wiki_root}`에 새로 만들었습니다.

### 2. 작업 분류

`{request}`(스킬을 발동시킨 사용자 요청)를 읽고 `{operation}`을 정한다:

- **ingest (정리)** — 개념을 위키에 작성/추가/갱신하려는 요청.
  예: "TCP/UDP 정리해줘", "프로세스 스레드 차이 위키에 추가", "이 글 요약해서 넣어줘".
- **query (질의)** — 위키에 정리된 내용을 찾아보거나 종합해 달라는 요청.
  예: "인덱스 관련 정리된 거 보여줘", "네트워크 쪽 뭐 정리돼 있어?".
- **lint (점검)** — 위키 건강검진 요청.
  예: "위키 점검해줘", "빠진 개념이나 모순 있는지 봐줘".

애매하면 사용자에게 짧게 확인한다 (어느 작업인지).

요청에서 대상 개념이 분명하면 `{target_concept}`에 담는다.

### 3. 분기

- `ingest` → **EARLY EXIT** → `./step-ingest.md`
- `query` → **EARLY EXIT** → `./step-query.md`
- `lint` → **EARLY EXIT** → `./step-lint.md`
