"""
STACKS AND QUEUES IN PYTHON
----------------------------
Stack -> LIFO (Last In, First Out) — like a stack of plates
Queue -> FIFO (First In, First Out) — like a line at a counter

Python doesn't have separate Stack/Queue classes for most use cases.
You use list for stacks and collections.deque for queues.
"""

# ═══════════════════════════════════════════════════════════
# PART 1: STACK (using list)
# ═══════════════════════════════════════════════════════════

stack = []

# Push -> append to end
stack.append("a")    # O(1)
stack.append("b")    # O(1)
stack.append("c")    # O(1)
print(stack)         # ['a', 'b', 'c']

# Peek -> look at top without removing
print(stack[-1])     # 'c'   O(1)

# Pop -> remove from end
print(stack.pop())   # 'c'   O(1)
print(stack.pop())   # 'b'   O(1)
print(stack)         # ['a']

# Check if empty
if not stack:
    print("Stack is empty")

# ── REAL USE CASE: balanced parentheses checker ────────────
def is_balanced(s):
    stack = []
    pairs = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in "({[":
            stack.append(char)
        elif char in ")}]":
            if not stack or stack[-1] != pairs[char]:
                return False
            stack.pop()
    return len(stack) == 0

print(is_balanced("({[]})"))   # True
print(is_balanced("({[})"))    # False
print(is_balanced("((())"))    # False

# ── REAL USE CASE: reverse a string using stack ────────────
def reverse_string(s):
    stack = list(s)
    result = ""
    while stack:
        result += stack.pop()
    return result

print(reverse_string("Sunitha"))  # "ahtimuS"

# ═══════════════════════════════════════════════════════════
# PART 2: QUEUE (using collections.deque)
# ═══════════════════════════════════════════════════════════
# Why NOT use a list as a queue?
# list.pop(0) is O(n) because it shifts all elements.
# deque.popleft() is O(1) — always use deque for queues!

from collections import deque

queue = deque()

# Enqueue -> append to right (end)
queue.append("first")    # O(1)
queue.append("second")   # O(1)
queue.append("third")    # O(1)
print(queue)             # deque(['first', 'second', 'third'])

# Peek -> front element
print(queue[0])          # 'first'  O(1)

# Dequeue -> remove from left (front)
print(queue.popleft())   # 'first'   O(1)
print(queue.popleft())   # 'second'  O(1)
print(queue)             # deque(['third'])

# deque also supports O(1) operations on both ends (double-ended queue)
queue.appendleft("new_first")   # O(1) add to front
queue.append("new_last")        # O(1) add to back
print(queue.pop())              # O(1) remove from back
print(queue.popleft())          # O(1) remove from front

# ── REAL USE CASE: BFS (Breadth-First Search) with queue ──
def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    order = []

    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order

graph = {
    "A": ["B", "C"],
    "B": ["D", "E"],
    "C": ["F"],
    "D": [], "E": [], "F": []
}
print(bfs(graph, "A"))   # ['A', 'B', 'C', 'D', 'E', 'F']

# ═══════════════════════════════════════════════════════════
# PART 3: PRIORITY QUEUE (heapq — min-heap)
# ═══════════════════════════════════════════════════════════
import heapq

pq = []
heapq.heappush(pq, 5)    # O(log n)
heapq.heappush(pq, 1)    # O(log n)
heapq.heappush(pq, 3)    # O(log n)

print(pq[0])              # 1 -> peek at minimum  O(1)
print(heapq.heappop(pq))  # 1 -> remove minimum   O(log n)
print(heapq.heappop(pq))  # 3

# Convert existing list to heap in-place
nums = [5, 3, 8, 1, 2]
heapq.heapify(nums)       # O(n)
print(nums[0])            # 1 -> smallest element

"""
TIME COMPLEXITY SUMMARY
-----------------------
Stack (list):
  push (append)   : O(1)
  pop             : O(1)
  peek ([-1])     : O(1)

Queue (deque):
  enqueue (append)      : O(1)
  dequeue (popleft)     : O(1)
  peek ([0])            : O(1)
  ❌ list.pop(0)        : O(n) — never use list for queue

Priority Queue (heapq):
  push (heappush)  : O(log n)
  pop (heappop)    : O(log n)
  peek ([0])       : O(1)
  heapify          : O(n)

WHEN TO USE WHICH:
  Stack  -> undo/redo, DFS, bracket matching, backtracking
  Queue  -> BFS, task scheduling, level-order traversal
  Heap   -> "find top K elements", Dijkstra's, always-need-min/max
"""
