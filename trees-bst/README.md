7. Trees and Binary Search Trees — Solutions & Notes

Fellow: Nenavath Sunitha Program: Dev Weekends Fellowship 2026 Task: Trees and Binary Search Trees (Worth 10 points) LeetCode Profile: https://leetcode.com/u/Nenavath_Sunitha_02/ Problems Solved: 5 / 5 ✅

Problem Tracker
#	Problem	Difficulty	Approach	Time	Space
41	Invert Binary Tree	Easy	DFS recursive	O(n)	O(h)
42	Binary Tree Level Order Traversal	Medium	BFS with queue	O(n)	O(n)
43	Validate Binary Search Tree	Medium	DFS with valid range	O(n)	O(h)
44	Lowest Common Ancestor of BST	Medium	BST property comparison	O(h)	O(1)
45	Serialize and Deserialize Binary Tree	Hard	BFS with null markers	O(n)	O(n)
Core Templates (memorize these)
TreeNode definition
python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val   = val
        self.left  = left
        self.right = right
DFS Templates
python
# Pre-order: root → left → right
def preorder(node):
    if not node: return
    print(node.val)      # process ROOT first
    preorder(node.left)
    preorder(node.right)

# In-order: left → root → right (gives SORTED output for BST!)
def inorder(node):
    if not node: return
    inorder(node.left)
    print(node.val)      # process ROOT in middle
    inorder(node.right)

# Post-order: left → right → root
def postorder(node):
    if not node: return
    postorder(node.left)
    postorder(node.right)
    print(node.val)      # process ROOT last
BFS Template (Level Order)
python
from collections import deque

def bfs(root):
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)         # snapshot size BEFORE processing
        level = []
        for _ in range(level_size):     # process exactly this level
            node = queue.popleft()
            level.append(node.val)
            if node.left:  queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result
BST Property
For every node N in a valid BST:
  - ALL nodes in left subtree  < N.val
  - ALL nodes in right subtree > N.val

This means in-order traversal of a BST always gives a SORTED sequence.
41. Invert Binary Tree

Link: https://leetcode.com/problems/invert-binary-tree Difficulty: Easy ✅

Problem: Invert (mirror) a binary tree.

Approach (DFS — post-order):

Recursively invert the left subtree
Recursively invert the right subtree
Swap left and right children of current node
Base case: null node → return null

Plain English: Go all the way to the leaves first, then on the way back up swap left and right at every node. Like flipping a mirror image bottom-up.

python
def invertTree(root):
    if not root:
        return None

    # Recursively invert both subtrees first
    root.left  = invertTree(root.right)
    root.right = invertTree(root.left)

    return root

Visualization:

Before:          After:
    4                4
   / \              / \
  2   7    →      7   2
 / \ / \         / \ / \
1  3 6  9       9  6 3  1

Time: O(n) — visit every node once Space: O(h) — call stack depth = tree height (O(log n) balanced, O(n) worst)

42. Binary Tree Level Order Traversal

Link: https://leetcode.com/problems/binary-tree-level-order-traversal Difficulty: Medium ✅

Problem: Return nodes grouped by level: [[3], [9,20], [15,7]]

Approach (BFS with queue):

Use a deque as a queue (FIFO)
Snapshot the queue size at the start of each level
Process exactly that many nodes → they all belong to the current level
Add their children to the queue for the next level

Plain English: Use a queue like a waiting line. At the start of each level, count how many nodes are waiting — process exactly that many, and add their children to the back of the line for the next round.

python
from collections import deque

def levelOrder(root):
    if not root:
        return []

    result = []
    queue  = deque([root])

    while queue:
        level_size = len(queue)    # how many nodes at THIS level
        level = []

        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left:  queue.append(node.left)
            if node.right: queue.append(node.right)

        result.append(level)

    return result

Key insight: Snapshotting len(queue) before the inner loop is what separates levels. Without this, you can't tell where one level ends and the next begins.

Time: O(n) | Space: O(n) — queue holds up to n/2 nodes at the last level

43. Validate Binary Search Tree

Link: https://leetcode.com/problems/validate-binary-search-tree Difficulty: Medium ✅

Problem: Determine if a binary tree is a valid BST.

Common mistake: Only checking if left child < root and right child > root is WRONG. You need to check against the entire valid range inherited from ancestors.

Approach (DFS with valid range):

Pass down a (min_val, max_val) range to each node
Every node's value must be strictly within this range
Going left: upper bound becomes current node's value
Going right: lower bound becomes current node's value

Plain English: Each node has an allowed range based on its ancestors. Pass the range down — when you go left, the current value becomes the new ceiling; when you go right, the current value becomes the new floor.

python
def isValidBST(root):
    def validate(node, min_val, max_val):
        if not node:
            return True                          # empty tree is valid

        if node.val <= min_val or node.val >= max_val:
            return False                         # out of valid range

        return (validate(node.left,  min_val,    node.val) and
                validate(node.right, node.val,   max_val))

    return validate(root, float("-inf"), float("inf"))

Why the range approach is correct:

       5
      / \
     1   4      ← 4 < 5 so looks valid locally
        / \
       3   6    ← BUT 3 < 5 (the root) — INVALID!

With range: node 3 has range (5, inf) since it's in right subtree of 5
3 < 5 → out of range → correctly returns False

Time: O(n) | Space: O(h)

44. Lowest Common Ancestor of a BST

Link: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree Difficulty: Medium ✅

Problem: Find the lowest common ancestor (LCA) of two nodes p and q in a BST. LCA is the deepest node that has both p and q as descendants (a node can be a descendant of itself).

Approach (Exploit BST property):

If both p and q are less than root → LCA is in the left subtree
If both p and q are greater than root → LCA is in the right subtree
Otherwise → root is the LCA (p and q split here, or one of them IS the root)

Plain English: In a BST, you can tell which direction to go using just value comparisons. If both nodes are smaller, go left. If both are larger, go right. The moment they split (one left, one right), or one of them equals the current node, you've found the LCA.

python
def lowestCommonAncestor(root, p, q):
    while root:
        if p.val < root.val and q.val < root.val:
            root = root.left         # both in left subtree
        elif p.val > root.val and q.val > root.val:
            root = root.right        # both in right subtree
        else:
            return root              # split point = LCA

Why this is O(h) not O(n): BST structure lets us eliminate half the tree at each step — no need to visit every node.

Time: O(h) — O(log n) balanced, O(n) worst Space: O(1) — iterative, no call stack

45. Serialize and Deserialize Binary Tree

Link: https://leetcode.com/problems/serialize-and-deserialize-binary-tree Difficulty: Hard ✅

Problem: Design an algorithm to serialize a tree to a string and deserialize it back to the original tree.

Approach (BFS with null markers):

Serialize: BFS level-order, write each node's value. Write "null" for missing children.
Deserialize: Split string back into values. Use a queue to assign left/right children level by level.

Plain English: Write down every node level by level, writing "null" wherever a child is missing. To rebuild, read the values back in the same order — use a queue to know which node is the parent of the next values you read.

python
from collections import deque

class Codec:
    def serialize(self, root):
        if not root:
            return "null"

        result = []
        queue  = deque([root])

        while queue:
            node = queue.popleft()
            if node:
                result.append(str(node.val))
                queue.append(node.left)
                queue.append(node.right)
            else:
                result.append("null")

        return ",".join(result)

    def deserialize(self, data):
        if data == "null":
            return None

        values = data.split(",")
        root   = TreeNode(int(values[0]))
        queue  = deque([root])
        i      = 1                           # index into values list

        while queue:
            node = queue.popleft()

            if values[i] != "null":          # assign left child
                node.left = TreeNode(int(values[i]))
                queue.append(node.left)
            i += 1

            if values[i] != "null":          # assign right child
                node.right = TreeNode(int(values[i]))
                queue.append(node.right)
            i += 1

        return root

Example:

Tree:     1
         / \
        2   3
           / \
          4   5

Serialized: "1,2,3,null,null,4,5,null,null,null,null"

Time: O(n) both | Space: O(n) both

BFS vs DFS — When to use which
Use BFS when...	Use DFS when...
Level-by-level processing needed	Exploring a path to leaves
Finding shortest path	Inverting / transforming tree
Level order output required	Checking BST validity
Serialization with level structure	Post-order (delete nodes, compute heights)
BST Invariants Cheat Sheet
BST Rule: left < node < right (for ALL ancestor relationships, not just direct parent)

Key operations:
  Search:  O(h) — go left if target < node, right if target > node
  Insert:  O(h) — same as search, insert at the null spot
  Delete:  O(h) — find node, replace with in-order successor (leftmost of right subtree)

In-order traversal of a BST → always gives sorted (ascending) sequence
This is the key to: kth smallest, range queries, BST validation
Reflections

The hardest shift in tree problems is trusting recursion. For Invert Binary Tree, it feels wrong to swap before recursing — but thinking "what does the recursive call promise to return?" makes it click: it promises a fully inverted subtree, so you just swap what it gives back.

The validate BST problem showed why local checking is never enough in trees. You always need to think about the global constraint, not just the direct parent-child relationship.

Serialize/Deserialize was the most satisfying — the null markers are what make it unambiguous to reconstruct.
