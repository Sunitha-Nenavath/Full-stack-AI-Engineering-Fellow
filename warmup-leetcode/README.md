LeetCode Warm-Up — Approach Notes

Fellow: Nenavath Sunitha
Program: Dev Weekends Fellowship 2026
Task: 0. Warm Up (Worth 5 points)
LeetCode Profile: https://leetcode.com/u/Nenavath_Sunitha_02/
Problems Solved: 9 / 9 ✅


Problem Tracker

#ProblemDifficultyStatusApproach1Running Sum of 1d ArrayEasy✅ SolvedPrefix sum2Find the Highest AltitudeEasy✅ SolvedPrefix sum + max3Squares of a Sorted ArrayEasy✅ SolvedTwo pointers4Move ZeroesEasy✅ SolvedTwo pointers5Jewels and StonesEasy✅ SolvedHash set lookup6Fizz BuzzEasy✅ SolvedModulo conditions7Valid AnagramEasy✅ SolvedCharacter frequency count8Reverse Vowels of a StringEasy✅ SolvedTwo pointers9Valid PalindromeEasy✅ SolvedTwo pointers


1. Running Sum of 1d Array

Link: https://leetcode.com/problems/running-sum-of-1d-array
Difficulty: Easy

Problem: Given an array nums, return a new array where each element is the sum of all elements up to and including that index.

Approach (Prefix Sum):


Loop through the array starting from index 1
At each position, add the previous element to the current one
This builds the running total in-place


Plain English: Each position stores "what's the total so far?" You just keep adding the previous running total to the next number.

pythondef runningSum(nums):
    for i in range(1, len(nums)):
        nums[i] += nums[i - 1]
    return nums

Time: O(n) | Space: O(1)


2. Find the Highest Altitude

Link: https://leetcode.com/problems/find-the-highest-altitude/
Difficulty: Easy

Problem: A biker starts at altitude 0. Given gain array of altitude changes, find the highest altitude reached.

Approach (Prefix Sum + Track Max):


Start at altitude 0
Build the running altitude by adding each gain step
Track the maximum altitude seen at each step


Plain English: You're climbing and descending hills. Keep a running total of your current altitude and remember the highest point you ever reached.

pythondef largestAltitude(gain):
    max_alt = 0
    current = 0
    for g in gain:
        current += g
        max_alt = max(max_alt, current)
    return max_alt

Time: O(n) | Space: O(1)


3. Squares of a Sorted Array

Link: https://leetcode.com/problems/squares-of-a-sorted-array/
Difficulty: Easy

Problem: Given a sorted array (may have negatives), return array of squares in sorted order.

Approach (Two Pointers):


Largest squares come from either the leftmost (most negative) or rightmost (most positive) element
Use two pointers — left at start, right at end
Compare absolute values, place the larger square at the end of result array
Move the pointer inward and repeat


Plain English: The biggest square is always at one of the two ends (because negatives squared become large positives). Compare both ends, take the bigger one, fill the result from right to left.

pythondef sortedSquares(nums):
    n = len(nums)
    result = [0] * n
    left, right = 0, n - 1
    pos = n - 1
    while left <= right:
        if abs(nums[left]) > abs(nums[right]):
            result[pos] = nums[left] ** 2
            left += 1
        else:
            result[pos] = nums[right] ** 2
            right -= 1
        pos -= 1
    return result

Time: O(n) | Space: O(n)


4. Move Zeroes

Link: https://leetcode.com/problems/move-zeroes/
Difficulty: Easy

Problem: Move all 0s to the end of the array while keeping the order of non-zero elements. Do it in-place.

Approach (Two Pointers):


Use a write pointer that tracks where to place the next non-zero element
Loop through the array — whenever you find a non-zero, write it at the write position
After the loop, fill remaining positions with 0s


Plain English: Imagine you're compressing all the non-zero numbers to the front, then filling the leftover slots with zeros. One pass to collect, one pass to fill.

pythondef moveZeroes(nums):
    write = 0
    for num in nums:
        if num != 0:
            nums[write] = num
            write += 1
    while write < len(nums):
        nums[write] = 0
        write += 1

Time: O(n) | Space: O(1)


5. Jewels and Stones

Link: https://leetcode.com/problems/jewels-and-stones/
Difficulty: Easy

Problem: jewels is a string of jewel types. stones is what you have. Count how many stones are also jewels.

Approach (Hash Set Lookup):


Convert jewels string to a set for O(1) lookup
Loop through each stone — if it's in the jewels set, count it


Plain English: Put all jewel types in a set (so checking is instant). Then go through your stones one by one and count how many appear in that set.

pythondef numJewelsInStones(jewels, stones):
    jewel_set = set(jewels)
    return sum(1 for s in stones if s in jewel_set)

Time: O(j + s) | Space: O(j)
(j = jewels length, s = stones length)


6. Fizz Buzz

Link: https://leetcode.com/problems/fizz-buzz/
Difficulty: Easy

Problem: For numbers 1 to n, output "FizzBuzz" if divisible by both 3 and 5, "Fizz" if by 3, "Buzz" if by 5, else the number as a string.

Approach (Modulo Conditions):


Loop from 1 to n
Check divisibility using % operator
Check the combined case (15) first to avoid missing it


Plain English: Go through each number and check: does 3 divide it? Does 5? Does both? Answer accordingly. The key is checking "both" first.

pythondef fizzBuzz(n):
    result = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            result.append("FizzBuzz")
        elif i % 3 == 0:
            result.append("Fizz")
        elif i % 5 == 0:
            result.append("Buzz")
        else:
            result.append(str(i))
    return result

Time: O(n) | Space: O(n)


7. Valid Anagram

Link: https://leetcode.com/problems/valid-anagram/
Difficulty: Easy

Problem: Given two strings s and t, return true if t is an anagram of s (same characters, same frequencies).

Approach (Character Frequency Count):


If lengths differ, immediately return False
Count character frequencies in both strings using Counter
If both frequency maps are equal, they're anagrams


Plain English: Two words are anagrams if they use the exact same letters the exact same number of times. Count how many times each letter appears in both words and compare.

pythonfrom collections import Counter

def isAnagram(s, t):
    return Counter(s) == Counter(t)

Time: O(n) | Space: O(1) — at most 26 letters in counter


8. Reverse Vowels of a String

Link: https://leetcode.com/problems/reverse-vowels-of-a-string/
Difficulty: Easy

Problem: Given a string, reverse only the vowels and return the modified string.

Approach (Two Pointers):


Convert string to a list (strings are immutable in Python)
Use left and right pointers starting at both ends
Move each pointer inward until it finds a vowel
Swap the two vowels and move both pointers inward
Repeat until pointers meet


Plain English: Use two fingers — one starting from the left, one from the right. Both skip over consonants until they each land on a vowel, then swap those vowels. Keep going until the fingers meet in the middle.

pythondef reverseVowels(s):
    vowels = set("aeiouAEIOU")
    s = list(s)
    left, right = 0, len(s) - 1
    while left < right:
        while left < right and s[left] not in vowels:
            left += 1
        while left < right and s[right] not in vowels:
            right -= 1
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1
    return "".join(s)

Time: O(n) | Space: O(n) — for the list conversion


9. Valid Palindrome

Link: https://leetcode.com/problems/valid-palindrome/
Difficulty: Easy

Problem: A string is a palindrome if it reads the same forward and backward, considering only alphanumeric characters and ignoring case.

Approach (Two Pointers):


Use left and right pointers at both ends
Skip any non-alphanumeric characters from both sides
Compare characters (case-insensitive) at both pointers
If they ever differ, return False
If pointers meet without mismatch, return True


Plain English: Clean up the string mentally (ignore spaces/punctuation, lowercase everything), then use two fingers from both ends. If they always match until they meet, it's a palindrome.

pythondef isPalindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1
    return True

Time: O(n) | Space: O(1)


Patterns Learned

PatternProblems Used InPrefix SumRunning Sum, Highest AltitudeTwo PointersSquares of Sorted Array, Move Zeroes, Reverse Vowels, Valid PalindromeHash Set LookupJewels and Stones, Valid AnagramModuloFizz Buzz

Biggest insight: Two pointers and hash sets solve a huge number of easy problems. Learning to recognise which pattern fits a problem is more valuable than memorising solutions.
