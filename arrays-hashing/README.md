1. Arrays & Hashing — Solutions & Approach Notes

Fellow: Nenavath Sunitha
Program: Dev Weekends Fellowship 2026
Task: 1. Arrays & Hashing (Worth 10 points)
LeetCode Profile: https://leetcode.com/u/Nenavath_Sunitha_02/
Problems Solved: 10 / 10 ✅


Problem Tracker

#ProblemDifficultyApproachTimeSpace1Two SumEasyHash map (one pass)O(n)O(n)2Contains DuplicateEasyHash setO(n)O(n)3Best Time to Buy & Sell StockEasyOne pass, track min priceO(n)O(1)4Product of Array Except SelfMediumPrefix + suffix productsO(n)O(1)5Maximum SubarrayMediumKadane's algorithmO(n)O(1)6Merge IntervalsMediumSort + greedy mergeO(n log n)O(n)7Find the Difference of Two ArraysEasyHash set differenceO(n+m)O(n+m)8Subarray Sum Equals KMediumPrefix sum + hash mapO(n)O(n)9Longest Consecutive SequenceMediumHash set + sequence startO(n)O(n)104SumMediumSort + two pointersO(n³)O(1)


1. Two Sum

Link: https://leetcode.com/problems/two-sum/
Difficulty: Easy ✅ Required

Problem: Given array nums and target, return indices of two numbers that add up to target.

Why hash map beats brute force:


Brute force checks every pair → O(n²)
Hash map stores "what we've seen" → find complement in O(1) → overall O(n)


Approach (One-pass hash map):


For each number, calculate its complement: complement = target - num
Check if complement already exists in the hash map
If yes → return both indices
If no → store current number and its index in the map


Plain English: As you walk through the array, ask "have I already seen the number I need to pair with this?" The hash map remembers everything you've seen so far.

pythondef twoSum(nums, target):
    seen = {}  # value -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i

Key insight: Store value → index in the map, not index → value. You search by value.


2. Contains Duplicate

Link: https://leetcode.com/problems/contains-duplicate/
Difficulty: Easy ✅

Problem: Return true if any value appears at least twice in the array.

Approach (Hash set):


Add each number to a set as you go
If a number already exists in the set → duplicate found → return True
If you finish without finding one → return False


Plain English: A set can only hold unique values. The moment adding a number fails (it's already there), you found your duplicate.

pythondef containsDuplicate(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False

# One-liner version:
# return len(nums) != len(set(nums))

When to use hash map vs brute force:


Brute force (nested loop): O(n²) — too slow for large inputs
Hash set: O(n) — always prefer this for membership checks



3. Best Time to Buy and Sell Stock

Link: https://leetcode.com/problems/best-time-to-buy-and-sell-stock
Difficulty: Easy ✅

Problem: Given prices array where prices[i] is price on day i, find max profit from one buy and one sell (must buy before sell).

Approach (One pass, track minimum):


Track the minimum price seen so far (best day to buy)
At each price, calculate profit if you sold today: price - min_price
Track the maximum profit seen


Plain English: As you scan prices left to right, remember the cheapest price you've seen. At every point ask "if I sell today, what's my profit?" Keep the best answer.

pythondef maxProfit(prices):
    min_price = float('inf')
    max_profit = 0
    for price in prices:
        min_price = min(min_price, price)
        max_profit = max(max_profit, price - min_price)
    return max_profit

Why not use two pointers? You'd still need O(n) and this one-pass approach is cleaner.


4. Product of Array Except Self

Link: https://leetcode.com/problems/product-of-array-except-self/
Difficulty: Medium ✅ Required

Problem: Return array where output[i] = product of all elements except nums[i]. No division allowed. O(n) time, O(1) extra space.

Approach (Prefix × Suffix products):


Pass 1 (left to right): For each index, store the product of everything to its LEFT
Pass 2 (right to left): Multiply in the product of everything to its RIGHT
Result at each index = left product × right product


Plain English: For each position, you need "everything on my left multiplied by everything on my right." Do two separate sweeps — one collecting left products, one collecting right products — then multiply them together.

pythondef productExceptSelf(nums):
    n = len(nums)
    result = [1] * n

    # Pass 1: result[i] = product of all elements to the LEFT of i
    prefix = 1
    for i in range(n):
        result[i] = prefix
        prefix *= nums[i]

    # Pass 2: multiply in product of all elements to the RIGHT of i
    suffix = 1
    for i in range(n - 1, -1, -1):
        result[i] *= suffix
        suffix *= nums[i]

    return result

Example: nums = [1,2,3,4]


After prefix pass: result = [1, 1, 2, 6]
After suffix pass: result = [24, 12, 8, 6] ✅


Key insight: This is a classic two-pass array technique. No division needed.


5. Maximum Subarray

Link: https://leetcode.com/problems/maximum-subarray
Difficulty: Medium ✅

Problem: Find the contiguous subarray with the largest sum.

Approach (Kadane's Algorithm):


Keep a running sum of the current subarray
If the running sum goes negative, reset it to 0 (drop the bad prefix)
Track the maximum sum seen at any point


Plain English: Walk through the array adding numbers. If your running total ever goes negative, it's dragging you down — throw it away and start fresh. Remember the highest total you ever reached.

pythondef maxSubArray(nums):
    max_sum = nums[0]
    current_sum = nums[0]

    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)

    return max_sum

Why this works: If current_sum + num < num, it means the previous subarray was hurting us (negative sum), so it's better to start fresh from num.


6. Merge Intervals

Link: https://leetcode.com/problems/merge-intervals
Difficulty: Medium ✅

Problem: Given list of intervals, merge all overlapping ones.

Approach (Sort + Greedy merge):


Sort intervals by start time
Walk through sorted intervals
If current interval overlaps with last merged (current.start ≤ last.end) → extend last merged's end
Otherwise → add current interval as a new separate interval


Plain English: Line up all intervals by when they start. Then walk through — if the next one starts before the current one ends, they overlap: stretch the end to cover both. If there's a gap, they don't overlap: just add the next one separately.

pythondef merge(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for start, end in intervals[1:]:
        if start <= merged[-1][1]:           # overlaps
            merged[-1][1] = max(merged[-1][1], end)  # extend
        else:
            merged.append([start, end])      # no overlap, add new

    return merged

Time: O(n log n) due to sorting — the merge itself is O(n).


7. Find the Difference of Two Arrays

Link: https://leetcode.com/problems/find-the-difference-of-two-arrays/
Difficulty: Easy ✅

Problem: Return list of [elements in nums1 not in nums2, elements in nums2 not in nums1].

Approach (Hash set difference):


Convert both arrays to sets (removes duplicates, enables O(1) lookup)
Elements in set1 but not set2 → first answer
Elements in set2 but not set1 → second answer


Plain English: Turn both arrays into sets. Ask "what's in the first set but missing from the second?" and vice versa. Python sets support this directly with the - operator.

pythondef findDifference(nums1, nums2):
    set1, set2 = set(nums1), set(nums2)
    return [list(set1 - set2), list(set2 - set1)]

Time: O(n + m) | Space: O(n + m)


8. Subarray Sum Equals K

Link: https://leetcode.com/problems/subarray-sum-equals-k
Difficulty: Medium ✅

Problem: Count the number of subarrays whose sum equals k.

Approach (Prefix sum + hash map):


Track running prefix sum as you go
Use a hash map to count how many times each prefix sum has appeared
For each index: if prefix_sum - k exists in the map, those are valid subarrays ending here
Initialize map with {0: 1} to handle subarrays starting from index 0


Plain English: A subarray sum from index i to j equals: prefix[j] - prefix[i-1]. So if the current prefix sum minus k was seen before, there's a valid subarray ending here. Count how many times that difference appeared.

pythondef subarraySum(nums, k):
    count = 0
    prefix_sum = 0
    prefix_counts = {0: 1}  # empty prefix has sum 0

    for num in nums:
        prefix_sum += num
        needed = prefix_sum - k
        count += prefix_counts.get(needed, 0)
        prefix_counts[prefix_sum] = prefix_counts.get(prefix_sum, 0) + 1

    return count

Key insight: This is the hardest problem in this set. The trick is realizing subarray_sum = prefix[j] - prefix[i], so you need prefix[i] = prefix[j] - k.


9. Longest Consecutive Sequence

Link: https://leetcode.com/problems/longest-consecutive-sequence
Difficulty: Medium ✅

Problem: Find the length of the longest consecutive sequence in an unsorted array. Must run in O(n).

Approach (Hash set + sequence start detection):


Put all numbers in a set
For each number, check if it's the START of a sequence (num - 1 not in set)
If it's a start, count how long the sequence goes (num+1, num+2, ...)
Track the maximum length


Plain English: Put everything in a set for fast lookup. Only start counting a sequence from its true beginning (the number that has no left neighbor). Then count how far the chain goes.

pythondef longestConsecutive(nums):
    num_set = set(nums)
    max_length = 0

    for num in num_set:
        if num - 1 not in num_set:      # this is a sequence start
            length = 1
            while num + length in num_set:
                length += 1
            max_length = max(max_length, length)

    return max_length

Why O(n)? Each number is visited at most twice — once in the outer loop, once in the while loop.


10. 4Sum

Link: https://leetcode.com/problems/4sum/
Difficulty: Medium ✅

Problem: Find all unique quadruplets [a, b, c, d] such that a + b + c + d = target.

Approach (Sort + Two Pointers):


Sort the array
Use two outer loops to fix the first two numbers (i, j)
Use two pointers (left, right) for the remaining two numbers
Skip duplicates at every level to avoid repeated quadruplets


Plain English: Fix two numbers using nested loops, then use the two-pointer technique (same as Two Sum on a sorted array) to find the other two. Skip over duplicates to keep results unique.

pythondef fourSum(nums, target):
    nums.sort()
    result = []
    n = len(nums)

    for i in range(n - 3):
        if i > 0 and nums[i] == nums[i-1]:      # skip duplicate i
            continue
        for j in range(i + 1, n - 2):
            if j > i + 1 and nums[j] == nums[j-1]:  # skip duplicate j
                continue
            left, right = j + 1, n - 1
            while left < right:
                total = nums[i] + nums[j] + nums[left] + nums[right]
                if total == target:
                    result.append([nums[i], nums[j], nums[left], nums[right]])
                    while left < right and nums[left] == nums[left+1]: left += 1
                    while left < right and nums[right] == nums[right-1]: right -= 1
                    left += 1
                    right -= 1
                elif total < target:
                    left += 1
                else:
                    right -= 1

    return result

Time: O(n³) | This is optimal for 4Sum — you can't do better than O(n³).


Key Patterns Summary

When to use Hash Map vs Brute Force

SituationBrute ForceHash MapFind two numbers summing to targetO(n²) nested loopO(n) one passCount element frequencyO(n²)O(n)Check if element existsO(n) linear scanO(1) set lookupCount subarrays with sum kO(n²)O(n) prefix + map

Rule: Any time you're doing "have I seen X before?" → use a hash map or set.

Prefix Sum Pattern

Used in: Running Sum, Highest Altitude, Product Except Self, Subarray Sum = K

python# Build prefix sum array
prefix = [0] * (n + 1)
for i in range(n):
    prefix[i+1] = prefix[i] + nums[i]

# Sum from index i to j = prefix[j+1] - prefix[i]

Two-Pass Array Technique

Used in: Product of Array Except Self


Pass 1 left → right: collect prefix information
Pass 2 right → left: collect suffix information
Combine at each index


Two Pointers on Sorted Array

Used in: Squares of Sorted Array (warm-up), 4Sum, Merge Intervals


Sort first
Move pointers based on whether current sum is too high or too low



Reflections

The biggest shift in thinking from this set: stop reaching for nested loops. Almost every O(n²) brute force solution has an O(n) hash map version. The key question to ask is always: "What do I need to remember from earlier in the array?" — if the answer is anything, a hash map or prefix sum is probably the right tool.

Subarray Sum Equals K was the hardest — the insight that subarray_sum = prefix[j] - prefix[i] takes time to click but once it does, a whole class of problems opens up.
