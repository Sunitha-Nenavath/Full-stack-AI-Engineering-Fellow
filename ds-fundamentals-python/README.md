# Language Data Structures Fundamentals — Python

**Fellow:** Nenavath Sunitha
**Program:** Dev Weekends Fellowship 2026
**Task:** Language Data Structures Fundamentals (Worth 5 points)
**Language:** Python

This repo contains annotated notes and working code for Python's core
data structure APIs — arrays/lists, hash maps, sets, stacks, and queues —
including time complexity for every key operation.

---

## Files

| File | Topic |
|---|---|
| `01_arrays_lists.py` | Lists — creation, access, insert, delete, sorting, iteration |
| `02_hashmaps_sets.py` | dict & set — creation, lookup, insert, delete, patterns |
| `03_stacks_queues.py` | Stack (list), Queue (deque), Priority Queue (heapq) |

Run any file directly:
```bash
python3 01_arrays_lists.py
python3 02_hashmaps_sets.py
python3 03_stacks_queues.py
```

---

## 1. Arrays / Lists

Python's `list` is a **dynamic array** — it resizes automatically and
supports O(1) access by index. It's the most common data structure in
Python and the foundation for implementing stacks.

```python
nums = [1, 2, 3, 4, 5]
nums.append(6)        # O(1)  add to end
nums.insert(0, 0)     # O(n)  insert at position
nums.pop()            # O(1)  remove last
nums.pop(0)           # O(n)  remove at index
nums[2]               # O(1)  access by index
len(nums)             # O(1)  length
```

**Iteration patterns:**
```python
for item in nums:                    # basic
for i, item in enumerate(nums):      # with index
for a, b in zip(list1, list2):       # two lists together
squares = [x**2 for x in range(6)]  # list comprehension
```

**Key time complexities:**

| Operation | Complexity |
|---|---|
| Access by index | O(1) |
| Append to end | O(1) amortized |
| Insert at position | O(n) |
| Delete by index | O(n) |
| Search (`in`) | O(n) |
| Sort | O(n log n) |

---

## 2. Hash Maps (dict) and Sets

### dict — key-value store
Python's `dict` uses hashing internally, giving O(1) average for
lookups, inserts, and deletes. It's the go-to structure for frequency
counting, caching, and grouping.

```python
d = {"name": "Sunitha", "age": 21}
d["role"] = "Fellow"          # O(1) insert
d["age"] = 22                 # O(1) update
d.get("missing", "default")   # O(1) safe lookup with fallback
del d["role"]                 # O(1) delete
"name" in d                   # O(1) key existence check

for key, value in d.items():  # O(n) iteration
    print(key, value)
```

**Frequency counter pattern (extremely common in interviews):**
```python
from collections import Counter
freq = Counter(["a", "b", "a", "c", "a"])
# Counter({'a': 3, 'b': 1, 'c': 1})
freq.most_common(2)   # [('a', 3), ('b', 1)]
```

### set — unique values only
```python
s = {1, 2, 3}
s.add(4)          # O(1)
s.discard(2)      # O(1) safe remove
4 in s            # O(1) — much faster than list's O(n)!

a | b  # union
a & b  # intersection
a - b  # difference
```

**Key insight:** Use a `set` instead of a `list` whenever you only need
to check membership — O(1) vs O(n) makes a huge difference on large inputs.

| Operation | dict / set avg | list |
|---|---|---|
| Lookup (`in`) | O(1) | O(n) |
| Insert | O(1) | O(1) append / O(n) insert |
| Delete | O(1) | O(n) |

---

## 3. Stacks and Queues

### Stack — LIFO (Last In, First Out)
Use Python's `list` — `append()` and `pop()` are both O(1).

```python
stack = []
stack.append("a")   # push   O(1)
stack[-1]           # peek   O(1)
stack.pop()         # pop    O(1)
```

**Classic use cases:** bracket matching, undo/redo, DFS, backtracking.

### Queue — FIFO (First In, First Out)
Use `collections.deque` — `append()` and `popleft()` are both O(1).
**Never use a list as a queue** — `list.pop(0)` is O(n).

```python
from collections import deque
q = deque()
q.append("first")    # enqueue  O(1)
q[0]                 # peek     O(1)
q.popleft()          # dequeue  O(1)
```

**Classic use cases:** BFS, level-order traversal, task scheduling.

### Priority Queue (min-heap)
Use `heapq` — always gives you the smallest element first.

```python
import heapq
pq = []
heapq.heappush(pq, 5)   # O(log n)
heapq.heappush(pq, 1)
pq[0]                    # O(1) peek min
heapq.heappop(pq)        # O(log n) remove min → returns 1
```

**Classic use cases:** Top-K problems, Dijkstra's, always-need-min/max.

---

## Complete Time Complexity Reference

| Structure | Operation | Complexity |
|---|---|---|
| list | Access | O(1) |
| list | Append | O(1) |
| list | Insert/Delete | O(n) |
| list | Search | O(n) |
| dict/set | Lookup/Insert/Delete | O(1) avg |
| dict/set | Iteration | O(n) |
| deque | append / popleft | O(1) |
| heapq | push / pop | O(log n) |
| heapq | peek (index 0) | O(1) |

---

## Key Takeaways

- Python's `list` is a dynamic array — fast at the end, slow at the front.
- `dict` and `set` use hashing — O(1) lookups make them ideal for
  counting, grouping, and deduplication.
- Use `deque` (not `list`) as a queue — `popleft()` is O(1) vs O(n).
- `heapq` gives a min-heap; negate values (`-x`) to simulate a max-heap.
- Choosing the right data structure often matters more than writing
  clever algorithm logic.
