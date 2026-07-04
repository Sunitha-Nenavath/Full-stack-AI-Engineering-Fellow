"""
HASH MAPS (dict) AND SETS IN PYTHON
-------------------------------------
dict  -> key-value pairs, O(1) average lookup/insert/delete
set   -> unique values only, O(1) average lookup/insert/delete
Both use hashing internally.
"""

# ═══════════════════════════════════════════════════════════
# PART 1: DICTIONARIES (Hash Maps)
# ═══════════════════════════════════════════════════════════

# ── CREATION ──────────────────────────────────────────────
empty_dict = {}
student = {"name": "Sunitha", "age": 21, "cgpa": 8.74}
from_keys = dict.fromkeys(["a", "b", "c"], 0)   # {'a':0, 'b':0, 'c':0}
squares = {x: x**2 for x in range(5)}           # dict comprehension

# ── ACCESS ────────────────────────────────────────────────
print(student["name"])              # "Sunitha"    -> O(1) — KeyError if missing
print(student.get("name"))          # "Sunitha"    -> O(1) — safe, returns None if missing
print(student.get("gpa", "N/A"))    # "N/A"        -> O(1) — default value if missing

# ── INSERT / UPDATE ───────────────────────────────────────
student["role"] = "Fellow"          # O(1) insert new key
student["age"] = 22                 # O(1) update existing key
student.update({"city": "Hyderabad", "age": 21})  # bulk update

# ── DELETE ────────────────────────────────────────────────
del student["city"]                 # O(1) — KeyError if missing
removed = student.pop("role")       # O(1) — returns value, KeyError if missing
student.pop("missing", None)        # O(1) — safe pop with default

# ── CHECKING EXISTENCE ────────────────────────────────────
print("name" in student)            # True  O(1) — checks keys only
print("name" not in student)        # False

# ── ITERATION ─────────────────────────────────────────────
for key in student:                 # iterate keys
    print(key)

for key, value in student.items():  # iterate key-value pairs
    print(f"{key}: {value}")

for key in student.keys():          # all keys as a view
    print(key)

for value in student.values():      # all values as a view
    print(value)

# ── COMMON PATTERNS ───────────────────────────────────────

# Frequency counter (very common in interviews!)
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
freq = {}
for word in words:
    freq[word] = freq.get(word, 0) + 1
print(freq)  # {'apple': 3, 'banana': 2, 'cherry': 1}

# Shorter using defaultdict
from collections import defaultdict
freq2 = defaultdict(int)
for word in words:
    freq2[word] += 1

# Counter — even shorter!
from collections import Counter
freq3 = Counter(words)
print(freq3.most_common(2))  # [('apple', 3), ('banana', 2)]

# Grouping items by a key
students = [("Sunitha", "AI"), ("Arjun", "Web"), ("Priya", "AI")]
by_track = defaultdict(list)
for name, track in students:
    by_track[track].append(name)
print(dict(by_track))  # {'AI': ['Sunitha', 'Priya'], 'Web': ['Arjun']}

# ═══════════════════════════════════════════════════════════
# PART 2: SETS
# ═══════════════════════════════════════════════════════════

# ── CREATION ──────────────────────────────────────────────
empty_set = set()                   # NOT {} — that makes a dict!
primes = {2, 3, 5, 7, 11}
from_list = set([1, 2, 2, 3, 3])    # {1, 2, 3} — duplicates removed

# ── COMMON OPERATIONS ─────────────────────────────────────
primes.add(13)                      # O(1) add element
primes.discard(2)                   # O(1) remove — no error if missing
primes.remove(3)                    # O(1) remove — KeyError if missing
print(7 in primes)                  # O(1) membership check (this is the superpower of sets!)

# ── SET OPERATIONS ────────────────────────────────────────
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

print(a | b)   # union        {1, 2, 3, 4, 5, 6}
print(a & b)   # intersection {3, 4}
print(a - b)   # difference   {1, 2}  (in a but not b)
print(a ^ b)   # symmetric difference {1, 2, 5, 6} (in one but not both)

# ── COMMON PATTERN: remove duplicates while preserving order ──
seen = []
seen_set = set()
for item in [3, 1, 4, 1, 5, 9, 2, 6, 5]:
    if item not in seen_set:
        seen.append(item)
        seen_set.add(item)
print(seen)   # [3, 1, 4, 5, 9, 2, 6]

"""
TIME COMPLEXITY SUMMARY
-----------------------
dict / set — average case (hash collision = rare)

dict lookup (key in d)   : O(1)
dict insert/update       : O(1)
dict delete              : O(1)
dict iteration           : O(n)

set lookup (x in s)      : O(1)
set add                  : O(1)
set remove/discard       : O(1)
set union / intersection : O(n)

WHY SETS ARE FASTER THAN LISTS FOR LOOKUP:
  "x in list" -> O(n) linear scan
  "x in set"  -> O(1) hash lookup
  Use a set whenever you only need to check membership, not order or count.
"""
