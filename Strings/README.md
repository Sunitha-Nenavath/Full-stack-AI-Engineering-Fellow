

# Strings — Solutions & Approach Notes

**Fellow:** Nenavath Sunitha
**Program:** Dev Weekends Fellowship 2026
**Task:** 2. Strings (Worth 10 Points)
**LeetCode Profile:**https://leetcode.com/u/Nenavath_Sunitha_02/
**Problems Solved:** 9 / 9 ✅


# Problem Tracker

| #  | Problem                                        | Difficulty | Approach                  | Time   | Space  |
| -- | ---------------------------------------------- | ---------- | ------------------------- | ------ | ------ |
| 11 | Reverse String                                 | Easy       | Two Pointers              | O(n)   | O(1)   |
| 12 | Merge Strings Alternately                      | Easy       | Two Pointers              | O(n+m) | O(n+m) |
| 13 | Longest Substring Without Repeating Characters | Medium     | Sliding Window + Hash Set | O(n)   | O(n)   |
| 14 | Valid Parentheses                              | Easy       | Stack                     | O(n)   | O(n)   |
| 15 | Roman to Integer                               | Easy       | Hash Map + Traversal      | O(n)   | O(1)   |
| 16 | Integer to Roman                               | Medium     | Greedy                    | O(1)   | O(1)   |
| 17 | Repeated Substring Pattern                     | Easy       | String Pattern Check      | O(n)   | O(n)   |
| 18 | Isomorphic Strings                             | Easy       | Two Hash Maps             | O(n)   | O(n)   |
| 19 | Is Subsequence                                 | Easy       | Two Pointers              | O(n)   | O(1)   |



# 11. Reverse String

**Link:** [https://leetcode.com/problems/reverse-string/](https://leetcode.com/problems/reverse-string/)

**Difficulty:** Easy ✅

### Problem

Reverse the given character array in-place.

### Approach (Two Pointers)

* Place one pointer at the beginning.
* Place another at the end.
* Swap both characters.
* Move pointers toward the center.
* Continue until both pointers meet.

### Plain English

Imagine holding the string from both ends. Keep swapping the first and last characters until you reach the middle.

### Key Insight

Two pointers allow reversing the string in-place without extra memory.

---

# 12. Merge Strings Alternately

**Link:** [https://leetcode.com/problems/merge-strings-alternately/](https://leetcode.com/problems/merge-strings-alternately/)

**Difficulty:** Easy ✅

### Problem

Merge two strings by taking one character alternately from each.

### Approach

* Traverse both strings together.
* Add one character from each string.
* Append remaining characters if one string is longer.

### Plain English

Take turns picking letters from each word until both are finished.

### Key Insight

Process both strings simultaneously using two indices.

---

# 13. Longest Substring Without Repeating Characters

**Link:** [https://leetcode.com/problems/longest-substring-without-repeating-characters/](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

**Difficulty:** Medium ✅

### Problem

Find the length of the longest substring without repeating characters.

### Approach (Sliding Window)

* Maintain a window using left and right pointers.
* Store characters in a hash set.
* Remove duplicates while expanding the window.
* Track maximum length.

### Plain English

Stretch the window until a duplicate appears. Remove characters from the left until the duplicate disappears.

### Key Insight

Sliding Window avoids checking every substring.

---

# 14. Valid Parentheses

**Link:** [https://leetcode.com/problems/valid-parentheses/](https://leetcode.com/problems/valid-parentheses/)

**Difficulty:** Easy ✅

### Problem

Determine whether every opening bracket has the correct closing bracket.

### Approach (Stack)

* Push opening brackets.
* When a closing bracket appears, compare with stack top.
* Return false if mismatch.
* Stack should be empty at the end.

### Plain English

A stack remembers the latest opening bracket. Every closing bracket must match it.

### Key Insight

Stack naturally handles nested parentheses.

---

# 15. Roman to Integer

**Link:** [https://leetcode.com/problems/roman-to-integer/](https://leetcode.com/problems/roman-to-integer/)

**Difficulty:** Easy ✅

### Problem

Convert a Roman numeral into an integer.

### Approach

* Store Roman values in a hash map.
* Traverse from left to right.
* If current value is smaller than next, subtract it.
* Otherwise add it.

### Plain English

Normally add numbers, but subtract when a smaller numeral comes before a larger one.

### Key Insight

Compare current symbol with the next symbol.

---

# 16. Integer to Roman

**Link:** [https://leetcode.com/problems/integer-to-roman/](https://leetcode.com/problems/integer-to-roman/)

**Difficulty:** Medium ✅

### Problem

Convert an integer into Roman numerals.

### Approach (Greedy)

* Store Roman values from largest to smallest.
* Repeatedly subtract the largest possible value.
* Append its Roman symbol.

### Plain English

Always choose the biggest Roman numeral that fits the remaining number.

### Key Insight

Greedy works because Roman numerals follow fixed values.

---

# 17. Repeated Substring Pattern

**Link:** [https://leetcode.com/problems/repeated-substring-pattern/](https://leetcode.com/problems/repeated-substring-pattern/)

**Difficulty:** Easy ✅

### Problem

Check whether the string is made by repeating one substring multiple times.

### Approach

* Double the string.
* Remove first and last characters.
* Check whether original string exists inside.

### Plain English

If the string is built by repeating a pattern, it will appear inside the doubled string.

### Key Insight

Uses a neat string manipulation trick.

---

# 18. Isomorphic Strings

**Link:** [https://leetcode.com/problems/isomorphic-strings/](https://leetcode.com/problems/isomorphic-strings/)

**Difficulty:** Easy ✅

### Problem

Determine whether characters in one string can be replaced to form another.

### Approach

* Maintain mappings in both directions.
* Ensure one-to-one mapping.
* Return false if mapping conflicts.

### Plain English

Each letter must always map to the same letter.

### Key Insight

Two hash maps guarantee consistency.

---

# 19. Is Subsequence

**Link:** [https://leetcode.com/problems/is-subsequence/](https://leetcode.com/problems/is-subsequence/)

**Difficulty:** Easy ✅

### Problem

Check whether one string is a subsequence of another.

### Approach (Two Pointers)

* One pointer scans the first string.
* Another scans the second string.
* Move both pointers when characters match.
* Move only the second pointer otherwise.

### Plain English

Try matching each character in order without changing the sequence.

### Key Insight

Two pointers solve the problem in one pass.

---

# Key Patterns Summary

## Two Pointers

**Used in**

* Reverse String
* Merge Strings Alternately
* Is Subsequence

---

## Sliding Window

**Used in**

* Longest Substring Without Repeating Characters

---

## Stack

**Used in**

* Valid Parentheses

---

## Hash Maps

**Used in**

* Roman to Integer
* Isomorphic Strings

---

## Greedy

**Used in**

* Integer to Roman

---

## String Manipulation

**Used in**

* Repeated Substring Pattern

---

# Reflections

Working through these string problems helped me understand several fundamental techniques used in interviews. Two pointers made string traversal efficient, sliding windows simplified substring problems, stacks handled bracket matching naturally, and hash maps provided fast character lookups. The most challenging problem was **Longest Substring Without Repeating Characters**, as it required careful management of the sliding window. After solving these problems, I became much more comfortable with common string patterns frequently asked in coding interviews.
