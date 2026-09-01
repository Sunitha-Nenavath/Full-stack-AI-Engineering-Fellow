# Heap / Priority Queue — Solutions & Approach Notes

**Fellow:** Nenavath Sunitha  
**Program:** Dev Weekends Fellowship 2026  
**Task:** 8. Heap / Priority Queue  
**Worth:** 10 Points  
**Problems Solved:** 5 / 5 ✅

https://leetcode.com/u/Nenavath_Sunitha_02/

## Concepts Learned

- Min Heap and Max Heap
- Priority Queue
- Heap Push/Pop — **O(log n)**
- Peek — **O(1)**
- Top-K problems
- Two Heaps
- Scheduling with Priority Queue

## Problem Tracker

| # | Problem | Approach | Time | Space |
|---|---|---|---|---|
| 46 | Kth Largest Element | Min Heap of size K | O(n log k) | O(k) |
| 47 | Top K Frequent Elements | Hash Map + Min Heap | O(n log k) | O(n) |
| 48 | Find Median from Data Stream | Two Heaps | O(log n) | O(n) |
| 49 | Merge k Sorted Lists | Min Heap | O(N log k) | O(k) |
| 50 | Task Scheduler | Max Heap + Queue | O(n log n) | O(n) |

## Key Approaches

### 1. Kth Largest Element
Maintain a **min heap of size K**. The root gives the kth largest element.

### 2. Top K Frequent Elements
Count frequencies using a **hash map**, then use a min heap to maintain the top K elements.

### 3. Find Median from Data Stream
Use **two heaps**:
- Max heap → smaller half
- Min heap → larger half

### 4. Merge k Sorted Lists
Put the first node from each list into a **min heap** and repeatedly extract the smallest node.

### 5. Task Scheduler
Use a **max heap** to select the most frequent task and a queue to manage cooldown periods.

## Important Heap Rules

```text
Kth Largest      → Min Heap of size K
Top K            → Hash Map + Heap
Median           → Two Heaps
Merge K Lists    → Min Heap
Scheduling       → Max Heap + Queue
```

## Reflection

This task helped me understand when to use heaps and priority queues instead of sorting or brute force. I learned practical heap patterns for Top-K problems, streaming median, merging sorted data, and task scheduling.

## Completion

**Min/Max Heap:** ✅  
**Priority Queue:** ✅  
**5/5 Problems Solved:** ✅  
**Task Completed:** ✅
