Binary Search — Solutions & Approach Notes

Fellow: Nenavath Sunitha
Program: Dev Weekends Fellowship 2026
Task: 5. Binary Search
Worth: 10 Points
LeetCode Profile: Nenavath_Sunitha_02

Problems Solved: 5 / 5 ✅

---

Problem Tracker

#| LeetCode Problem| Difficulty| Approach| Time| Space
704| Binary Search| Easy| Classic Binary Search| O(log n)| O(1)
33| Search in Rotated Sorted Array| Medium| Modified Binary Search| O(log n)| O(1)
153| Find Minimum in Rotated Sorted Array| Medium| Binary Search on Rotation| O(log n)| O(1)
4| Median of Two Sorted Arrays| Hard| Binary Search + Partition| O(log(min(m,n)))| O(1)
410| Split Array Largest Sum| Hard| Binary Search on Answer| O(n log(sum(nums)))| O(1)

---

Binary Search Template

The classic binary search template used for a sorted array:

left = 0
right = len(nums) - 1

while left <= right:
    mid = left + (right - left) // 2

    if nums[mid] == target:
        return mid

    elif nums[mid] < target:
        left = mid + 1

    else:
        right = mid - 1

return -1

Plain English

1. Start with the entire search range.
2. Find the middle element.
3. If the middle element is the target, return its index.
4. If the target is greater, search the right half.
5. If the target is smaller, search the left half.
6. Continue until the target is found or the search range becomes empty.

Key Insight

Binary Search repeatedly divides the search space into half, reducing the number of elements that need to be checked.

Time Complexity: O(log n)
Space Complexity: O(1)

---

704. Binary Search

Difficulty: Easy ✅

Problem

Given a sorted array and a target value, return the index of the target if it exists. Otherwise, return "-1".

Approach — Classic Binary Search

- Maintain "left" and "right" pointers.
- Calculate the middle index.
- Compare "nums[mid]" with the target.
- Eliminate half of the search space after every comparison.
- Continue until the target is found.

Plain English

Instead of checking every element one by one, look at the middle element and decide which half can contain the target.

Key Insight

A sorted array allows us to eliminate half of the elements after every comparison.

Time: O(log n)
Space: O(1)

---

33. Search in Rotated Sorted Array

Difficulty: Medium ✅

Problem

Search for a target in an ascending array that has been rotated at an unknown position.

Example:

[0,1,2,4,5,6,7]

After rotation:

[4,5,6,7,0,1,2]

Approach — Modified Binary Search

At every step, determine which half of the array is sorted.

if nums[left] <= nums[mid]:
    # Left half is sorted
else:
    # Right half is sorted

Then check whether the target belongs to the sorted half.

Plain English

Even though the entire array is rotated, one half of the current search range is always sorted.

Use that sorted half to decide where the target can exist.

Key Insight

At least one side of a rotated sorted array is always sorted.

Important Condition

if nums[left] <= nums[mid]:

This means the left half is sorted.

Otherwise, the right half is sorted.

Time: O(log n)
Space: O(1)

---

153. Find Minimum in Rotated Sorted Array

Difficulty: Medium ✅

Problem

Given a sorted array that has been rotated, find the minimum element.

Example:

[3,4,5,1,2]

Minimum = 1

Approach — Binary Search on Rotation

Use two pointers:

left = 0
right = len(nums) - 1

Calculate:

mid = left + (right - left) // 2

Compare "nums[mid]" with "nums[right]".

if nums[mid] > nums[right]:
    left = mid + 1
else:
    right = mid

Plain English

If "nums[mid]" is greater than the last element, the minimum must be somewhere to the right.

Otherwise, the minimum could be at "mid" or somewhere to its left.

Key Insight

The minimum element is the point where the sorted order is rotated.

Important Condition

if nums[mid] > nums[right]:
    left = mid + 1
else:
    right = mid

When:

left == right

the minimum element is:

nums[left]

Time: O(log n)
Space: O(1)

---

4. Median of Two Sorted Arrays

Difficulty: Hard ✅

Problem

Given two sorted arrays, find their median with an overall runtime of O(log(m+n)).

Example:

nums1 = [1,2]
nums2 = [3,4]

Combined order:

[1,2,3,4]

Median = (2 + 3) / 2 = 2.5

Approach — Binary Search + Partition

Instead of merging the two arrays, binary search on the smaller array.

Divide the arrays into:

LEFT PART | RIGHT PART

The correct partition satisfies:

left1 <= right2
left2 <= right1

Where:

left1  = element before partition in nums1
right1 = element after partition in nums1

left2  = element before partition in nums2
right2 = element after partition in nums2

Plain English

We divide both arrays so that the left side contains half of all elements and every element on the left is smaller than or equal to every element on the right.

Median Calculation

For an odd number of elements:

median = max(left1, left2)

For an even number of elements:

median = (max(left1, left2) + min(right1, right2)) / 2

Key Insight

The problem can be solved without actually merging the arrays by finding the correct partition between the two sorted arrays.

Time: O(log(min(m,n)))
Space: O(1)

---

410. Split Array Largest Sum

Difficulty: Hard ✅

Problem

Split an array into "k" non-empty contiguous subarrays such that the largest subarray sum is minimized.

Example:

nums = [7,2,5,10,8]
k = 2

Best split:

[7,2,5] = 14
[10,8]  = 18

Therefore:

Answer = 18

Approach — Binary Search on Answer

This problem does not perform binary search on an array index.

Instead, binary search is performed on the possible answer.

The minimum possible answer is:

max(nums)

The maximum possible answer is:

sum(nums)

Therefore:

left = max(nums)
right = sum(nums)

For every "mid", check whether the array can be split into at most "k" subarrays where each subarray has a sum no greater than "mid".

Feasibility Check

subarrays = 1
current_sum = 0

for num in nums:
    if current_sum + num > mid:
        subarrays += 1
        current_sum = num
    else:
        current_sum += num

Then:

if subarrays <= k:
    right = mid
else:
    left = mid + 1

Plain English

Ask:

«"If "mid" is the maximum sum allowed for each subarray, can I split the array into at most "k" parts?"»

If yes, try a smaller value.

If no, increase the allowed maximum sum.

Key Insight

This is a classic Binary Search on Answer problem.

Time: O(n log(sum(nums)))
Space: O(1)

---

Key Binary Search Patterns

1. Classic Binary Search

Used in:

704. Binary Search

Basic idea:

Sorted array
     ↓
Find middle
     ↓
Eliminate half
     ↓
Repeat

---

2. Modified Binary Search

Used in:

33. Search in Rotated Sorted Array
153. Find Minimum in Rotated Sorted Array

The array is rotated, so identify the sorted portion or determine which side contains the minimum.

---

3. Binary Search + Partition

Used in:

4. Median of Two Sorted Arrays

Instead of searching for a value directly, search for the correct partition between two sorted arrays.

---

4. Binary Search on Answer

Used in:

410. Split Array Largest Sum

Instead of searching an index:

Search space = possible answers

Check whether each candidate answer is feasible.

---

Important Templates Learned

Classic Binary Search

left = 0
right = len(nums) - 1

while left <= right:
    mid = left + (right - left) // 2

    if nums[mid] == target:
        return mid
    elif nums[mid] < target:
        left = mid + 1
    else:
        right = mid - 1

return -1

Binary Search on Answer

left = minimum_possible_answer
right = maximum_possible_answer

while left < right:
    mid = (left + right) // 2

    if is_possible(mid):
        right = mid
    else:
        left = mid + 1

return left

---

Complexity Summary

Problem| Time| Space
Binary Search| O(log n)| O(1)
Search in Rotated Sorted Array| O(log n)| O(1)
Find Minimum in Rotated Sorted Array| O(log n)| O(1)
Median of Two Sorted Arrays| O(log(min(m,n)))| O(1)
Split Array Largest Sum| O(n log(sum(nums)))| O(1)

---

Reflections

Working through these five Binary Search problems helped me understand that binary search is much more than searching for a target in a sorted array.

I first practiced classic binary search and learned how to correctly manage "left", "right", and "mid" pointers. I then applied the technique to rotated sorted arrays, where identifying the sorted portion is important.

The Find Minimum in Rotated Sorted Array problem helped me understand how the rotation point can be found using comparisons with the right boundary.

The most challenging problem was Median of Two Sorted Arrays, because it requires understanding partitions between two arrays rather than simply searching for a value. I learned how to find a valid partition while maintaining the required logarithmic complexity.

Finally, Split Array Largest Sum introduced me to an important interview pattern called Binary Search on Answer. Instead of searching through array indices, I learned how to search through a range of possible answers and use a feasibility check to determine whether a candidate answer is valid.

Overall, completing these problems strengthened my understanding of binary search, improved my ability to recognize different binary search patterns, and gave me more confidence in solving optimized coding interview problems.

---

Key Learnings

- Learned the standard Binary Search template.
- Learned how to avoid common "left", "right", and "mid" pointer mistakes.
- Learned how binary search works on rotated sorted arrays.
- Learned how to identify the sorted half of a rotated array.
- Learned how to find the minimum element using binary search.
- Learned partition-based binary search for two sorted arrays.
- Learned the Binary Search on Answer pattern.
- Improved understanding of time complexity and optimization.
- Practiced maintaining O(1) auxiliary space.
- Strengthened problem-solving skills for coding interviews.

---

