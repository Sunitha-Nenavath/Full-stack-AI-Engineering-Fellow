# Two Pointers — Solutions & Approach Notes

**Fellow:** Nenavath Sunitha
**Program:** Dev Weekends Fellowship 2026
**Task:** 4. Two Pointers (Worth 10 Points)
**LeetCode Profile:** https://leetcode.com/u/Nenavath_Sunitha_02/

**Problems Solved:** 5 / 5 ✅

---

# Problem Tracker

| #  | Problem                             | Difficulty | Approach                    | Time  | Space |
| -- | ----------------------------------- | ---------- | --------------------------- | ----- | ----- |
| 26 | Reverse String                      | Easy       | Opposite Two Pointers       | O(n)  | O(1)  |
| 27 | Move Zeroes                         | Easy       | Same Direction Two Pointers | O(n)  | O(1)  |
| 28 | Remove Duplicates from Sorted Array | Easy       | Same Direction Two Pointers | O(n)  | O(1)  |
| 29 | Trapping Rain Water                 | Hard       | Opposite Two Pointers       | O(n)  | O(1)  |
| 30 | 3Sum                                | Medium     | Sorting + Two Pointers      | O(n²) | O(1)  |

---

# 26. Reverse String

**Link:** https://leetcode.com/problems/reverse-string/

**Difficulty:** Easy ✅

## Problem

Reverse the given character array in-place.

## Approach (Opposite Two Pointers)

* Place one pointer at the beginning.
* Place another at the end.
* Swap the characters.
* Move both pointers toward the center.
* Continue until both pointers meet.

## Plain English

Start from both ends of the string and keep swapping characters until you reach the middle.

## Key Insight

Two pointers allow reversing the string efficiently without using extra memory.

---

# 27. Move Zeroes

**Link:** https://leetcode.com/problems/move-zeroes/

**Difficulty:** Easy ✅

## Problem

Move all zeroes to the end while maintaining the relative order of non-zero elements.

## Approach (Same Direction Two Pointers)

* Maintain one pointer for the next position of a non-zero element.
* Traverse the array.
* Whenever a non-zero element is found, swap it into the correct position.

## Plain English

Move every non-zero value forward while pushing all zeroes to the end.

## Key Insight

The array is modified in-place with only one traversal.

---

# 28. Remove Duplicates from Sorted Array

**Link:** https://leetcode.com/problems/remove-duplicates-from-sorted-array/

**Difficulty:** Easy ✅

## Problem

Remove duplicate elements from a sorted array in-place and return the number of unique elements.

## Approach (Same Direction Two Pointers)

* Keep one pointer for the last unique element.
* Traverse the array using another pointer.
* Copy each new unique element forward.

## Plain English

Since duplicates appear together in a sorted array, simply skip repeated values and keep only unique ones.

## Key Insight

Only unique elements are retained without using additional memory.

---

# 29. Trapping Rain Water

**Link:** https://leetcode.com/problems/trapping-rain-water/

**Difficulty:** Hard ✅

## Problem

Given an elevation map, calculate how much rainwater can be trapped after raining.

## Approach (Opposite Two Pointers)

* Place one pointer at the left end and another at the right end.
* Maintain the maximum height seen from both sides.
* Move the pointer with the smaller height.
* Add trapped water whenever the current height is smaller than the corresponding maximum.

## Plain English

Compare both ends of the elevation map and calculate how much water can be stored above each bar.

## Key Insight

Using two pointers avoids building extra arrays and solves the problem in linear time.

---

# 30. 3Sum

**Link:** https://leetcode.com/problems/3sum/

**Difficulty:** Medium ✅

## Problem

Find all unique triplets whose sum equals zero.

## Approach (Sorting + Two Pointers)

* Sort the array.
* Fix one element.
* Use two pointers to search for the remaining two numbers.
* Skip duplicate values to avoid repeated triplets.

## Plain English

Choose one number and search for two other numbers that together make the total sum zero.

## Key Insight

Sorting combined with the two-pointer technique reduces the complexity from **O(n³)** to **O(n²)**.

---

# Key Patterns Summary

## Opposite Direction Two Pointers

Used in:

* Reverse String
* Trapping Rain Water

## Same Direction Two Pointers

Used in:

* Move Zeroes
* Remove Duplicates from Sorted Array

## Sorting + Two Pointers

Used in:

* 3Sum

---

# Reflections

Working through these two-pointer problems helped me understand how to efficiently solve array and string problems using both same-direction and opposite-direction pointer techniques. I learned how to perform in-place array operations such as moving zeroes and removing duplicates without extra space, apply opposite pointers for reversing strings and trapping rainwater, and combine sorting with the two-pointer technique to solve the 3Sum problem efficiently. The most challenging problems were **Trapping Rain Water** and **3Sum**, as they required careful pointer movement and handling multiple conditions. Completing these problems strengthened my understanding of one of the most frequently used coding interview patterns and improved my confidence in writing optimized solutions.

