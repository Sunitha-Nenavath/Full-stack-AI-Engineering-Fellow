# Sliding Window — Solutions & Approach Notes

**Fellow:** Nenavath Sunitha
**Program:** Dev Weekends Fellowship 2026
**Task:** 3. Sliding Window (Worth 10 Points)
**LeetCode Profile:** https://leetcode.com/u/Nenavath_Sunitha_02/

**Problems Solved:** 4 / 5 ✅

---

# Problem Tracker

| #  | Problem                                 | Difficulty | Approach                                | Time | Space |
| -- | --------------------------------------- | ---------- | --------------------------------------- | ---- | ----- |
| 21 | Maximum Average Subarray I              | Easy       | Fixed Sliding Window                    | O(n) | O(1)  |
| 22 | Minimum Window Substring                | Hard       | Variable Sliding Window + Frequency Map | O(n) | O(m)  |
| 23 | Sliding Window Maximum                  | Hard       | Monotonic Deque                         | O(n) | O(k)  |
| 24 | Longest Repeating Character Replacement | Medium     | Variable Sliding Window + Frequency Map | O(n) | O(1)  |

---

# 21. Maximum Average Subarray I

**Link:** https://leetcode.com/problems/maximum-average-subarray-i/

**Difficulty:** Easy ✅

## Problem

Find the maximum average value among all contiguous subarrays of size **k**.

## Approach (Fixed Sliding Window)

* Calculate the sum of the first window.
* Slide the window one position at a time.
* Add the incoming element and remove the outgoing element.
* Keep track of the maximum window sum.

## Plain English

Instead of calculating every window separately, keep updating the current window sum while moving across the array.

## Key Insight

A fixed-size sliding window reduces the complexity from **O(n × k)** to **O(n)**.

---

# 22. Minimum Window Substring

**Link:** https://leetcode.com/problems/minimum-window-substring/

**Difficulty:** Hard ✅

## Problem

Find the smallest substring of **s** that contains every character from **t**, including duplicates.

## Approach (Variable Sliding Window + Frequency Map)

* Store the required frequency of each character.
* Expand the window until it contains all required characters.
* Shrink the window while it remains valid.
* Record the smallest valid window.

## Plain English

Grow the window until it contains everything you need, then make it as small as possible without losing any required character.

## Key Insight

A frequency map allows efficient checking of whether the current window satisfies the required characters.

---

# 23. Sliding Window Maximum

**Link:** https://leetcode.com/problems/sliding-window-maximum/

**Difficulty:** Hard ✅

## Problem

Return the maximum element from every window of size **k**.

## Approach (Monotonic Deque)

* Store indices in a deque.
* Remove indices that move outside the window.
* Remove smaller elements from the back.
* The front of the deque always stores the maximum element.

## Plain English

Maintain the window in decreasing order so the largest value is always available at the front.

## Key Insight

A monotonic deque allows each element to be added and removed only once, giving an **O(n)** solution.

---

# 24. Longest Repeating Character Replacement

**Link:** https://leetcode.com/problems/longest-repeating-character-replacement/

**Difficulty:** Medium ✅

## Problem

Find the length of the longest substring that can be converted into identical characters after replacing at most **k** characters.

## Approach (Sliding Window + Frequency Map)

* Expand the window.
* Maintain the frequency of each character.
* Track the highest frequency inside the window.
* Shrink the window whenever the required replacements exceed **k**.
* Record the maximum valid window length.

## Plain English

Keep extending the substring while the number of replacements stays within the allowed limit.

## Key Insight

The number of replacements needed is:

**Window Size − Maximum Character Frequency**

---

# Key Patterns Summary

## Fixed Sliding Window

Used in:

* Maximum Average Subarray I

## Variable Sliding Window

Used in:

* Minimum Window Substring
* Longest Repeating Character Replacement

## Frequency Map

Used in:

* Minimum Window Substring
* Longest Repeating Character Replacement

## Monotonic Deque

Used in:

* Sliding Window Maximum

---

# Reflections

This task helped me understand both **fixed-size** and **variable-size** sliding window techniques. I learned how to efficiently maintain window state using running sums, frequency maps, and monotonic deques instead of recalculating values repeatedly. The most challenging problems were **Minimum Window Substring** and **Sliding Window Maximum**, as they required careful handling of window validity and specialized data structures. Completing these problems improved my understanding of one of the most frequently tested coding interview patterns and increased my confidence in solving substring and subarray problems efficiently.

