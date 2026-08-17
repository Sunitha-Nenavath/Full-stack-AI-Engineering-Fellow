# Linked List — Solutions & Approach Notes

**Fellow:** Nenavath Sunitha
**Program:** Dev Weekends Fellowship 2026
**Task:** 6. Linked List
**Worth:** 10 Points
**LeetCode Profile:** Nenavath_Sunitha_02

**Problems Solved:** 5 / 5 ✅

---

## Problem Tracker

| #   | LeetCode Problem                 | Difficulty | Approach                       | Time        | Space                           |
| --- | -------------------------------- | ---------- | ------------------------------ | ----------- | ------------------------------- |
| 206 | Reverse Linked List              | Easy       | Iterative & Recursive Reversal | O(n)        | O(1) iterative / O(n) recursive |
| 21  | Merge Two Sorted Lists           | Easy       | Two Pointers                   | O(n + m)    | O(1)                            |
| 141 | Linked List Cycle                | Easy       | Floyd's Fast/Slow Pointers     | O(n)        | O(1)                            |
| 19  | Remove Nth Node From End of List | Medium     | Fast/Slow Pointers             | O(n)        | O(1)                            |
| 2   | Add Two Numbers                  | Medium     | Linked List Traversal + Carry  | O(max(n,m)) | O(max(n,m))                     |

---

# Linked List Basics

A linked list is a linear data structure where each node contains:

```text
+-------+------+
| Data  | Next |
+-------+------+
```

The `next` pointer stores the reference to the next node.

Example:

```text
Head
 ↓
[1 | •] → [2 | •] → [3 | None]
```

Unlike arrays, linked list elements are not stored in contiguous memory.

---

# Pointer Diagram Convention

During the problems, I used diagrams to understand pointer movement before implementing the solution.

Common pointers used:

```text
prev
 ↓
[1] → [2] → [3] → None
       ↑
      curr
```

For fast/slow pointer problems:

```text
slow
 ↓
[1] → [2] → [3] → [4] → None
             ↑
            fast
```

The diagrams help visualize how links are changed and how pointers move through the list.

---

# 206. Reverse Linked List

**Difficulty:** Easy ✅

### Problem

Given the head of a singly linked list, reverse the list and return the new head.

Example:

```text
Before:

1 → 2 → 3 → 4 → None

After:

4 → 3 → 2 → 1 → None
```

### Approach — Iterative Reversal

Use three pointers:

```text
prev
curr
next
```

Initially:

```text
prev = None
curr = head
```

At every step:

1. Store the next node.
2. Reverse the current node's pointer.
3. Move `prev` forward.
4. Move `curr` forward.

### Pointer Diagram

```text
prev     curr
 ↓        ↓
None    [1] → [2] → [3] → None
```

After reversing the first link:

```text
None ← [1]    [2] → [3] → None
        ↑
       prev
```

Continue until `curr` becomes `None`.

Final:

```text
None ← [1] ← [2] ← [3]
                    ↑
                   prev
```

Return `prev`.

### Recursive Approach

The recursive solution reaches the end of the list first and then reverses the links while returning back through the recursion.

### Plain English

Start from the first node and change each `next` pointer so that it points backward instead of forward.

### Key Insight

The `next` node must be saved before changing the current node's pointer.

**Iterative Time:** O(n)
**Iterative Space:** O(1)

**Recursive Time:** O(n)
**Recursive Space:** O(n) because of the recursion stack.

---

# 21. Merge Two Sorted Lists

**Difficulty:** Easy ✅

### Problem

Merge two sorted linked lists into one sorted linked list.

Example:

```text
List 1:

1 → 3 → 5

List 2:

2 → 4 → 6
```

Result:

```text
1 → 2 → 3 → 4 → 5 → 6
```

### Approach — Two Pointers

Maintain pointers for both lists.

Compare the current nodes:

```text
list1 value < list2 value
```

Attach the smaller node to the result list and move that pointer forward.

### Pointer Diagram

```text
list1
  ↓
[1] → [3] → [5]

list2
  ↓
[2] → [4] → [6]

result
  ↓
[1] → [2] → ...
```

Continue until one list becomes empty, then attach the remaining nodes.

### Plain English

Compare the first available node from both lists and always choose the smaller value.

### Key Insight

Because both lists are already sorted, we only need one traversal through the two lists.

**Time:** O(n + m)
**Space:** O(1)

---

# 141. Linked List Cycle

**Difficulty:** Easy ✅

### Problem

Determine whether a linked list contains a cycle.

Example:

```text
[1] → [2] → [3] → [4]
              ↑     ↓
              ← ← ←
```

### Approach — Floyd's Fast/Slow Pointer

Use two pointers:

```text
slow → moves one step
fast → moves two steps
```

Initially:

```text
slow = head
fast = head
```

Move them repeatedly:

```python
slow = slow.next
fast = fast.next.next
```

If they meet:

```text
slow == fast
```

then a cycle exists.

### Pointer Diagram

```text
        ┌───────────────┐
        ↓               │
[1] → [2] → [3] → [4] ─┘
       ↑
     slow
```

The fast pointer eventually catches the slow pointer if a cycle exists.

### Plain English

Imagine two runners on a circular track. A faster runner will eventually catch the slower runner.

### Key Insight

Floyd's algorithm detects a cycle without using extra memory such as a set.

**Time:** O(n)
**Space:** O(1)

---

# 19. Remove Nth Node From End of List

**Difficulty:** Medium ✅

### Problem

Remove the `nth` node from the end of a linked list.

Example:

```text
Input:

1 → 2 → 3 → 4 → 5

n = 2
```

Output:

```text
1 → 2 → 3 → 5
```

### Approach — Fast/Slow Pointers

Use two pointers with a fixed gap of `n` nodes between them.

A dummy node is useful for handling edge cases such as removing the first node.

### Pointer Diagram

```text
dummy → 1 → 2 → 3 → 4 → 5 → None
  ↑
 slow
```

Move `fast` ahead by `n + 1` positions.

Then move both pointers together until `fast` reaches the end.

At that point:

```text
slow.next
```

is the node that needs to be removed.

### Plain English

Keep the fast pointer `n` nodes ahead of the slow pointer. When fast reaches the end, slow will be positioned immediately before the node that must be removed.

### Key Insight

The fast/slow pointer technique allows us to find the required node in one traversal without calculating the length first.

**Time:** O(n)
**Space:** O(1)

---

# 2. Add Two Numbers

**Difficulty:** Medium ✅

### Problem

Two non-empty linked lists represent two non-negative integers in reverse order. Add the two numbers and return the result as a linked list.

Example:

```text
Input:

2 → 4 → 3
5 → 6 → 4
```

These represent:

```text
342 + 465 = 807
```

Result:

```text
7 → 0 → 8
```

### Approach — Linked List Traversal + Carry

Maintain:

```text
l1 → current node in first list
l2 → current node in second list
carry → carry from the previous addition
```

At every step:

```text
sum = value1 + value2 + carry
```

Then:

```text
digit = sum % 10
carry = sum // 10
```

Create a new node using `digit`.

### Pointer Diagram

```text
l1
 ↓
[2] → [4] → [3]

l2
 ↓
[5] → [6] → [4]

Addition:

2 + 5 = 7
4 + 6 = 10 → digit 0, carry 1
3 + 4 + 1 = 8
```

Result:

```text
[7] → [0] → [8]
```

### Plain English

Add the corresponding digits from both linked lists just like normal addition, while carrying any extra value to the next position.

### Key Insight

The carry must be maintained even when one linked list becomes shorter than the other.

**Time:** O(max(n,m))
**Space:** O(max(n,m)) for the result list.

---

# Key Linked List Patterns

## 1. Iterative Reversal

Used in:

```text
206. Reverse Linked List
```

Main pointers:

```text
prev
curr
next
```

Pattern:

```text
next = curr.next
curr.next = prev
prev = curr
curr = next
```

---

## 2. Recursive Reversal

Used in:

```text
206. Reverse Linked List
```

The recursion reaches the end of the list and reverses the links while returning.

---

## 3. Two Pointers

Used in:

```text
21. Merge Two Sorted Lists
19. Remove Nth Node From End of List
```

Two pointers can be used to traverse linked lists efficiently without requiring additional arrays.

---

## 4. Fast/Slow Pointers

Used in:

```text
141. Linked List Cycle
19. Remove Nth Node From End of List
```

Common pattern:

```text
slow → one step
fast → two steps
```

This technique is useful for cycle detection and finding relative positions in a linked list.

---

## 5. Carry-Based Traversal

Used in:

```text
2. Add Two Numbers
```

The lists are traversed while maintaining a `carry` value for digit addition.

---

# Important Templates Learned

## Iterative Linked List Reversal

```python
prev = None
curr = head

while curr:
    next_node = curr.next
    curr.next = prev
    prev = curr
    curr = next_node

return prev
```

---

## Fast/Slow Pointer

```python
slow = head
fast = head

while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
```

This is the basic pattern for Floyd's cycle detection and other two-pointer linked list problems.

---

# Complexity Summary

| Problem                  |        Time |          Space |
| ------------------------ | ----------: | -------------: |
| Reverse Linked List      |        O(n) | O(1) iterative |
| Merge Two Sorted Lists   |    O(n + m) |           O(1) |
| Linked List Cycle        |        O(n) |           O(1) |
| Remove Nth Node From End |        O(n) |           O(1) |
| Add Two Numbers          | O(max(n,m)) |    O(max(n,m)) |

---

# Reflections

Working through these five Linked List problems helped me understand pointer manipulation and how linked lists differ from array-based data structures.

I first practiced **iterative and recursive linked list reversal**, which helped me understand how `prev`, `curr`, and `next` pointers are used to change the direction of links.

The **Merge Two Sorted Lists** problem helped me understand how two pointers can efficiently combine two already sorted linked lists.

The **Linked List Cycle** problem introduced me to **Floyd's Fast/Slow Pointer Algorithm**, where the fast pointer moves two steps while the slow pointer moves one step. This helped me understand how a cycle can be detected using O(1) extra space.

The **Remove Nth Node From End of List** problem strengthened my understanding of the fast/slow pointer technique and showed how a fixed pointer gap can help locate a node from the end in one traversal.

Finally, **Add Two Numbers** helped me understand how linked list traversal can be combined with arithmetic and carry handling.

Overall, completing these problems strengthened my understanding of linked list operations, pointer movement, cycle detection, and two-pointer techniques. It also improved my confidence in visualizing linked list problems before writing the code.

---

# Key Learnings

* Learned how linked lists store nodes using `next` pointers.
* Learned iterative linked list reversal using `prev`, `curr`, and `next`.
* Practiced recursive linked list reversal.
* Learned how to merge two sorted linked lists efficiently.
* Learned Floyd's Fast/Slow Pointer technique.
* Learned how to detect cycles using O(1) extra space.
* Learned how to remove the Nth node from the end using two pointers.
* Learned how to handle carry while adding numbers represented by linked lists.
* Practiced drawing pointer diagrams before coding.
* Improved understanding of pointer manipulation and linked list edge cases.
* Strengthened DSA problem-solving skills for coding interviews.



**Status: Completed Successfully 🎯**
