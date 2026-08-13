# cs-wiki 벤치 지표 정의

결정론적 채점 기준이다. 모든 항목은 실행 결과에 대한 스크립트 검사로 boolean 또는 숫자를 낸다.
LLM 판단은 사용하지 않는다. 구현은 [`../grader.mjs`](../grader.mjs)에 있다.

```bash
node grader.mjs health <wiki-dir>
node grader.mjs grade --evals <evals.json> --case <id> \
  --result <실행후-위키> --response <응답.md> [--tokens with,base]
```

## 채점 대상

- 위키 상태: 실행 후 `{wiki_root}`의 개념 페이지, `index.md`, `log.md`
- 응답 텍스트: 추천, 제안, 점검 보고서
- 위키 개념 집합: 시드 위키에 존재하는 개념 페이지의 slug와 title

## 회귀 바닥

| check | 판정 방법 |
|---|---|
| `page_created` | 새 개념 페이지의 slug 또는 별칭과 kebab-case 확인 |
| `frontmatter_has` | frontmatter의 `type: CS Concept` 확인 |
| `headers_present` | 지정한 본문 헤더 존재 확인 |
| `index_links_page` | 인덱스 중 하나에 개념 링크가 있는지 확인 |
| `index_link_under_heading` | 개념 링크가 지정한 분야별 `##` 큰 토픽 아래에 정확히 한 번 있는지 확인 |
| `log_grew` | `log.md`가 실행 전보다 길어졌는지 확인 |
| `links_bundle_relative` | 개념 페이지의 내부 링크가 bundle-relative 형식인지 확인 |
| `backlink_present` | 관련 기존 페이지에 역링크가 있는지 확인 |
| `content_preserved` | 기존 본문 중 10자 초과 라인의 80% 이상이 남았는지 확인 |
| `no_file_changes` | 승인 전 점검에서 위키 파일이 바뀌지 않았는지 확인 |
| `no_new_files` | 추천과 탐색 승인 전에 새 파일이 생기지 않았는지 확인 |
| `no_fabricated_user_turn` | 모델이 사용자 답변을 만들어 이어가지 않았는지 확인 |
| `recommend_count` | 추천 개수가 지정 범위 안인지 확인 |

회귀 바닥은 전부 통과해야 한다. 통과는 구조 회귀가 없다는 뜻이며 내용 품질을 증명하지 않는다.

## 진행 지표

| metric | 측정식 | 방향 |
|---|---|---|
| `lint_recall` | 보고서가 찾은 정답 키 이슈 그룹 수 / 전체 이슈 그룹 수 | 높을수록 좋음 |
| `backlink_completeness` | 양방향 링크 쌍 수 / 존재 페이지 간 링크 쌍 수 | 높을수록 좋음 |
| `orphan_ratio` | 인바운드 링크가 없는 페이지 수 / 전체 페이지 수 | 낮을수록 좋음 |
| `gap_recommend_precision` | 추천 중 실행 전 위키에 없던 개념 비율 | 높을수록 좋음 |
| `explore_missing_precision` | 대화 후 제안 중 실행 전 위키에 없던 개념 비율 | 높을수록 좋음 |
| `token_cost` | with_skill 토큰 / baseline 토큰 | 낮을수록 좋음 |
| `crosslink_density_ref` | 내부 링크 수 / 페이지 수 | 참고치 |

내용 품질은 결정론적으로 측정하기 어렵기 때문에 점수에서 제외한다. 구조 검사도 실제 모델이
로드맵을 이해하는지 전부 증명하지 못하므로 실제 대화 forward test가 별도로 필요하다.

## live 위키 건강검진

실제 `knowledge/`에서 정기적으로 `node grader.mjs health <wiki-dir>`를 실행해 그래프 지표를 기록한다.
