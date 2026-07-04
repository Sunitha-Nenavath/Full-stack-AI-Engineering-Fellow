"""
ARRAYS / LISTS IN PYTHON
------------------------
Python's built-in `list` is a dynamic array — it resizes automatically.
It can hold mixed types, supports negative indexing, and has O(1) access by index.
"""

# ── CREATION ──────────────────────────────────────────────────────────────────
empty = []
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]
zeros = [0] * 5                      # [0, 0, 0, 0, 0]
squares = [x**2 for x in range(6)]   # list comprehension: [0, 1, 4, 9, 16, 25]

# ── ACCESS ────────────────────────────────────────────────────────────────────
print(numbers[0])    # 1       -> first element       O(1)
print(numbers[-1])   # 5       -> last element        O(1)
print(numbers[1:4])  # [2,3,4] -> slicing (start:end, end exclusive)
print(numbers[::-1]) # [5,4,3,2,1] -> reversed slice

# ── COMMON OPERATIONS & TIME COMPLEXITY ───────────────────────────────────────
numbers.append(6)        # O(1) amortized  -> add to end
numbers.insert(0, 0)     # O(n)            -> insert at position (shifts elements)
numbers.pop()            # O(1)            -> remove & return last element
numbers.pop(0)           # O(n)            -> remove at index (shifts elements)
numbers.remove(3)        # O(n)            -> remove first occurrence of value
print(len(numbers))      # O(1)            -> length

# ── SEARCHING ─────────────────────────────────────────────────────────────────
fruits = ["apple", "banana", "cherry"]
print("banana" in fruits)        # True  O(n) linear search
print(fruits.index("cherry"))    # 2     O(n) linear search

# ── SORTING ───────────────────────────────────────────────────────────────────
nums = [3, 1, 4, 1, 5, 9]
nums.sort()                      # O(n log n) in-place
sorted_copy = sorted(nums)       # O(n log n) returns new list
nums.sort(reverse=True)          # descending

# ── ITERATION PATTERNS ────────────────────────────────────────────────────────
colors = ["red", "green", "blue"]

for color in colors:             # basic iteration
    print(color)

for i, color in enumerate(colors):   # with index
    print(i, color)

for a, b in zip([1, 2, 3], ["a", "b", "c"]):  # two lists together
    print(a, b)

# ── 2D LIST (MATRIX) ──────────────────────────────────────────────────────────
matrix = [[1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]]

print(matrix[1][2])   # 6 -> row 1, col 2

for row in matrix:
    for val in row:
        print(val, end=" ")
    print()

"""
TIME COMPLEXITY SUMMARY
-----------------------
Access by index    : O(1)
Append to end      : O(1) amortized
Insert at position : O(n)
Delete by index    : O(n)
Search (in)        : O(n)
Sort               : O(n log n)
Length (len)       : O(1)
"""
