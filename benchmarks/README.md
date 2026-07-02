# benchmarks

각 스킬의 회차별(iteration) 측정 결과를 파일로 남긴다. 파일 하나 = 한 회차.
**목적은 감사 가능성**: `git log` 자체가 "어떻게 개선해왔는가"의 증거가 되게 한다.

## 파일 규칙
- 파일명: `<skill>-iter-NN.json`
- 회차를 새로 돌릴 때마다 **새 파일을 추가**(기존 파일 수정 금지) → 이력이 append-only 로 쌓임

## 스키마
```jsonc
{
  "project": "cs-interview",
  "skill":   "cs-wiki",
  "iteration": "iter-01",
  "date":    "YYYY-MM-DD",
  "method":  "측정 방법 (A/B eval / 정성검증 등)",
  "result": {
    "pass_rate": 1.0,          // 정성검증이면 null
    "passed": 15, "total": 15,
    "baseline_pass_rate": 0.53,
    "delta": 0.47,
    "token_cost_ratio": 1.46
  },
  "analysis": "왜 이 수치가 나왔나",
  "next":     "다음 회차에서 개선할 것"
}
```
