---
type: CS Concept
title: B-Tree 인덱스
description: 균형 트리 기반 데이터베이스 인덱스.
tags: [database, index]
difficulty: medium
frequency: medium
timestamp: 2026-06-14T10:00:00Z
---

# 한 줄 정의

B-Tree 인덱스는 균형 트리로 키를 정렬 보관해 범위/정렬 검색을 빠르게 한다.

# 핵심 개념

리프 노드가 정렬되어 있어 범위 검색에 유리하다. (어떤 페이지도 이 페이지를 링크하지 않음 → 고아)

# 면접 단골 질문

- Q: B-Tree 인덱스가 범위 검색에 유리한 이유는?
  - 포인트: 정렬된 리프, 균형 높이.
