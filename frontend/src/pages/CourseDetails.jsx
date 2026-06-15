import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Book, 
  Code as CodeIcon, 
  Map, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  Award,
  BookMarked
} from 'lucide-react';

const courseData = {
  python: {
    title: 'Python Programming',
    description: 'Master Python syntax, Object-Oriented Programming, generators, decorators, and basic scripting libraries.',
    estimatedTime: '30 Hours',
    difficulty: 'Beginner',
    whatYoullLearn: [
      'Understand core Python syntax, dynamic typing, and variables',
      'Leverage control flow structures, conditional statements, and loops',
      'Create reusable code using functions, scopes, and lambdas',
      'Master key collections: lists, tuples, dictionaries, and sets',
      'Implement Object-Oriented programming with classes, inheritance, and methods',
      'Manage exception handling and read/write file operations',
      'Employ advanced patterns like list comprehensions, decorators, and generators'
    ],
    prerequisites: [
      'Basic computer literacy',
      'No prior programming experience required'
    ],
    theory: 'Python is a high-level, interpreted programming language known for its exceptional readability and clean syntax design. Created by Guido van Rossum and released in 1991, Python follows the Zen of Python philosophy which states that "beautiful is better than ugly" and "simple is better than complex." Python is dynamically typed and garbage-collected, supporting object-oriented, structured, and functional programming paradigms.\n\nIts extensive standard library, often referred to as "batteries included," provides built-in modules for network operations, system scripting, file processing, and text matching. Today, Python is the dominant language for Artificial Intelligence, Machine Learning, and Data Science due to its robust community ecosystem, simplicity, and high-quality libraries.',
    definitions: [
      { term: 'PEP 8', def: 'The official Python Enhancement Proposal that defines the standard style guide for writing readable Python code.' },
      { term: 'Decorator', def: 'A design pattern in Python that wraps a function or method to modify or extend its execution behavior without permanently changing its structure.' },
      { term: 'Generator', def: 'A function that uses the yield keyword to return an iterator, generating values lazily one-by-one to save memory when processing large datasets.' },
      { term: 'List Comprehension', def: 'A concise, syntactic construct to create new lists based on existing lists or iterables in a single line.' },
      { term: 'GIL (Global Interpreter Lock)', def: 'A mutex lock that restricts Python bytecode execution to a single thread at a time in the standard CPython implementation, ensuring thread safety but limiting CPU-bound concurrency.' }
    ],
    syntax: `def greet(name: str) -> str:
    """Returns a formatted greeting string."""
    return f"Hello, {name}!"

# Call the function
message = greet("World")
print(message)`,
    codeExamples: [
      {
        title: 'Lazy Fibonacci Generator',
        code: `def fibonacci_generator(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

# Generate and print the first 10 Fibonacci numbers
fib_nums = list(fibonacci_generator(10))
print("Fibonacci Numbers:", fib_nums)`
      },
      {
        title: 'Timing Decorator for Performance Analysis',
        code: `import time

def timing_decorator(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"Function {func.__name__} took {end_time - start_time:.6f} seconds to execute.")
        return result
    return wrapper

@timing_decorator
def heavy_calculation():
    return sum(i * i for i in range(1_000_000))

heavy_calculation()`
      }
    ],
    roadmap: [
      { step: 'Step 1', title: 'Basics & Setup', description: 'Install Python, learn variables, primitive data types, operators, and basic input/output.' },
      { step: 'Step 2', title: 'Control Flow', description: 'Master if-else conditions, match statements, for loops, and while loops.' },
      { step: 'Step 3', title: 'Data Structures', description: 'Explore built-in sequence containers: Lists, Tuples, Dictionaries, and Sets.' },
      { step: 'Step 4', title: 'Functions & Modules', description: 'Create custom functions, understand scopes, arguments (*args, **kwargs), and import libraries.' },
      { step: 'Step 5', title: 'Object-Oriented Programming', description: 'Design blueprints using classes, encapsulate attributes, inherit behavior, and write custom methods.' },
      { step: 'Step 6', title: 'Advanced Concepts', description: 'Utilize decorators, generators, context managers, and advanced lambda operations.' }
    ],
    qa: [
      { q: 'What is the difference between a list and a tuple in Python?', a: 'Lists are mutable, meaning their contents can be modified after creation, and are defined using square brackets []. Tuples are immutable (cannot be changed) and are defined using parentheses (). Tuples are slightly faster and can be used as keys in dictionaries.' },
      { q: 'How does memory management work in Python?', a: 'Memory management in Python is handled by the CPython memory manager. It uses reference counting to track active objects and automatically deletes objects when their reference count drops to zero. A cyclic garbage collector is also used to detect and resolve reference cycles.' },
      { q: 'Explain the difference between append() and extend() methods of a list.', a: 'append() adds its argument as a single element to the end of the list. extend() iterates over its argument (which must be a collection) and appends each element to the list individually, increasing the list size by the length of the iterable.' },
      { q: 'What is the purpose of the Global Interpreter Lock (GIL)?', a: 'The GIL is a mutex used in CPython to prevent multiple native threads from executing Python bytecodes at once. It ensures memory safety by preventing race conditions on Python objects, but makes pure Python threads ineffective for CPU-bound multi-threading (forcing the use of multiprocessing instead).' },
      { q: 'What are generators and why should they be used?', a: 'Generators are functions that return an iterator using the yield keyword. Unlike standard functions that return a complete list at once, generators yield values on-the-fly (lazy evaluation). This saves significant memory when working with huge sequences.' },
      { q: 'What is the difference between is and == operators?', a: 'The "==" operator checks for equality, comparing the actual values stored in the variables. The "is" operator checks for identity, verifying if both variables refer to the exact same object in memory (checking their memory addresses via id()).' },
      { q: 'How do decorators work in Python?', a: 'Decorators are design patterns that allow developers to wrap a function inside another function to modify or augment its behavior. This is done using the @decorator_name syntactic sugar, which passes the original function as an argument to the decorator.' },
      { q: 'What is a lambda function in Python?', a: 'A lambda function is a small, anonymous (unnamed) function defined using the "lambda" keyword. It can take any number of arguments but can only contain a single expression, returning its result implicitly. Example: lambda x, y: x + y.' }
    ]
  },
  java: {
    title: 'Java Development',
    description: 'Master Java programming, Object-Oriented principles, multi-threading, JVM memory management, and the Collections framework.',
    estimatedTime: '45 Hours',
    difficulty: 'Intermediate',
    whatYoullLearn: [
      'Understand JVM architecture, compilation, and execution flows',
      'Apply solid Object-Oriented Design Principles (abstraction, encapsulation, inheritance, polymorphism)',
      'Master the Java Collections Framework (List, Set, Map, Queue)',
      'Write robust error-handling code with Checked and Unchecked exceptions',
      'Create multi-threaded applications using Threads, Runnables, and Executors',
      'Utilize modern Java 8+ features including Streams and Lambda expressions',
      'Optimize Java memory allocation utilizing Garbage Collection tuning concepts'
    ],
    prerequisites: [
      'Familiarity with basic programming logic',
      'Understanding of files and command line tools'
    ],
    theory: 'Java is a robust, class-based, object-oriented programming language designed to have as few implementation dependencies as possible. Developed by James Gosling at Sun Microsystems and released in 1995, Java is built on the philosophy of "Write Once, Run Anywhere" (WORA). This is achieved by compiling source code (.java) into intermediate bytecode (.class) which is executed by the Java Virtual Machine (JVM) on any supported hardware platform.\n\nJava enforces static typing, compile-time safety, and automatic memory management. The JVM uses garbage collection to automatically reclaim heap memory occupied by unreachable objects, reducing memory leaks and buffer overflow hazards. Java remains a dominant language in enterprise backends, Android application development, and financial transaction processors.',
    definitions: [
      { term: 'JVM', def: 'Java Virtual Machine: An abstract computing machine that enables a computer to run a Java program by compiling bytecode into machine-level instructions.' },
      { term: 'Garbage Collection', def: 'The automatic process of reclaiming heap memory by destroying objects that are no longer referenced anywhere in the application.' },
      { term: 'Interface', def: 'A completely abstract blueprint of a class containing abstract method signatures, static constants, and default methods, used to achieve multiple inheritance in Java.' },
      { term: 'JDK vs JRE', def: 'JDK (Java Development Kit) is a full toolset for writing and compiling Java code, while JRE (Java Runtime Environment) is the runtime bundle containing the JVM and core libraries needed to run compiled Java.' },
      { term: 'Thread', def: 'A concurrent unit of execution. Java supports multithreading natively via the Thread class and the Runnable interface.' }
    ],
    syntax: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    codeExamples: [
      {
        title: 'Multi-threading via Runnable',
        code: `class TaskRunner implements Runnable {
    @Override
    public void run() {
        System.out.println("Executing task inside: " + Thread.currentThread().getName());
    }
}

public class MultithreadDemo {
    public static void main(String[] args) {
        Thread thread = new Thread(new TaskRunner());
        thread.start();
        System.out.println("Main thread running...");
    }
}`
      },
      {
        title: 'Java 8 Stream API and Lambdas',
        code: `import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class StreamDemo {
    public static void main(String[] args) {
        List<String> fruits = Arrays.asList("Apple", "Banana", "Cherry", "Apricot");
        
        List<String> filtered = fruits.stream()
            .filter(name -> name.startsWith("A"))
            .map(String::toUpperCase)
            .collect(Collectors.toList());
            
        System.out.println("Filtered Fruits: " + filtered); // [APPLE, APRICOT]
    }
}`
      }
    ],
    roadmap: [
      { step: 'Step 1', title: 'Java Basics', description: 'Learn data types, operators, arrays, conditional statements, and console I/O.' },
      { step: 'Step 2', title: 'OOP Foundations', description: 'Build classes, instantiate objects, explore access modifiers, and implement constructors.' },
      { step: 'Step 3', title: 'Advanced OOP', description: 'Master inheritance, method overriding/overloading, interfaces, and abstract classes.' },
      { step: 'Step 4', title: 'Collections Framework', description: 'Work with dynamic data containers like ArrayLists, HashSets, HashMaps, and sorting comparators.' },
      { step: 'Step 5', title: 'Error Handling', description: 'Learn try-catch blocks, throw statements, Checked vs Unchecked exceptions, and custom exceptions.' },
      { step: 'Step 6', title: 'Concurrency & Streams', description: 'Explore Thread creation, Synchronization, Executor services, and functional programming via Streams.' }
    ],
    qa: [
      { q: 'Why is Java not a purely object-oriented programming language?', a: 'Java is not purely object-oriented because it supports primitive data types (such as int, char, float, boolean) directly without wrapping them in objects, prioritizing execution performance.' },
      { q: 'What is the difference between equals() and == in Java?', a: 'The "==" operator compares memory reference locations (addresses) for object variables to check if they are the exact same instance. The equals() method (inherited from the Object class) is overridden by classes to compare the actual values or state of the objects.' },
      { q: 'What is the difference between checked and unchecked exceptions?', a: 'Checked exceptions are verified by the compiler at compile-time, forcing the developer to handle them using try-catch or throws declarations (e.g. IOException). Unchecked exceptions (subclasses of RuntimeException) are checked at runtime, typically representing programming mistakes like NullPointerException.' },
      { q: 'What is the difference between final, finally, and finalize in Java?', a: 'final makes a variable constant, a method non-overridable, or a class non-inheritable. finally is a block associated with try-catch that executes code regardless of whether an exception occurred. finalize() is a method called by the garbage collector before destroying an object (deprecated in modern Java).' },
      { q: 'Explain HashMap collision resolution in Java.', a: 'HashMap resolves key hash collisions using a linked list structure in the bucket. If multiple keys hash to the same bucket index, they are appended as nodes in a linked list. In Java 8+, if the number of elements in a bucket exceeds 8, the list is converted to a balanced Red-Black Tree to optimize search time from O(n) to O(log n).' },
      { q: 'What is the purpose of volatile keyword in Java?', a: 'volatile guarantees thread visibility. When a variable is declared volatile, its value is always read from and written to the computer main memory instead of the CPU cache, ensuring all threads see the most up-to-date value.' },
      { q: 'Why are String objects immutable in Java?', a: 'Strings are immutable for security (e.g. database connection URLs and file paths cannot be altered maliciously), thread safety (multiple threads can share a String safely), and memory efficiency (Java uses a String Pool to reuse identical string literals).' },
      { q: 'What is a Functional Interface?', a: 'A functional interface is an interface that contains exactly one abstract method (annotated with @FunctionalInterface). It is used to support Lambda expressions and functional programming syntax in Java 8+.' }
    ]
  },
  dsa: {
    title: 'Data Structures & Algorithms',
    description: 'Master time and space complexity, fundamental linear structures, trees, graphs, sorting, searching, and dynamic programming.',
    estimatedTime: '60 Hours',
    difficulty: 'Advanced',
    whatYoullLearn: [
      'Analyze algorithms using Big O notation for time and space complexity',
      'Implement linear structures: Arrays, Linked Lists, Stacks, and Queues',
      'Develop tree structures: Binary Search Trees, Heaps, and AVL trees',
      'Traverse graphs using Depth-First Search (DFS) and Breadth-First Search (BFS)',
      'Master sorting (Quicksort, Mergesort) and searching (Binary Search) algorithms',
      'Apply dynamic programming and greedy strategies to optimize problem solutions',
      'Understand hash tables, key hashing, and collision resolution techniques'
    ],
    prerequisites: [
      'Proficiency in at least one programming language (C++, Java, or Python)',
      'Basic knowledge of mathematics and logical proofs'
    ],
    theory: 'Data Structures and Algorithms (DSA) are the core building blocks of computer science. A data structure is a structured method of organizing, storing, and managing data in a computer so that it can be accessed and modified efficiently. An algorithm is a step-by-step mathematical procedure used to solve a computational problem in a finite amount of time.\n\nEvaluating the quality of an algorithm relies on measuring its complexity. Time complexity measures how execution duration scales with input size, while space complexity measures the auxiliary memory footprint. Developers use asymptotic notations (like Big O, Big Theta, and Big Omega) to analyze performance in best-case, average-case, and worst-case scenarios. Masterful knowledge of DSA enables engineers to write highly scalable systems.',
    definitions: [
      { term: 'Big O Notation', def: 'A mathematical notation describing the limiting behavior of an algorithm as the size of the input approaches infinity, representing worst-case performance.' },
      { term: 'Binary Search Tree (BST)', def: 'A node-based binary tree data structure where the left subtree of a node contains keys smaller than the node, and the right subtree contains keys larger than the node.' },
      { term: 'Dynamic Programming', def: 'An algorithmic technique that solves complex problems by breaking them down into simpler, overlapping subproblems and caching their results (memoization/tabulation) to avoid re-computation.' },
      { term: 'Min-Heap / Max-Heap', def: 'A complete binary tree that satisfies the heap property: in a min-heap, parent nodes contain keys smaller than or equal to their children, making the root the minimum element.' },
      { term: 'Graph', def: 'A non-linear data structure consisting of a finite set of vertices (or nodes) and a set of edges connecting them.' }
    ],
    syntax: `// Standard binary search logic signature
int binarySearch(int arr[], int size, int target) {
    int left = 0, right = size - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1; // Target not found
}`,
    codeExamples: [
      {
        title: 'Recursive Quicksort Algorithm',
        code: `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

# Test quicksort
unsorted = [34, 7, 23, 32, 5, 62]
print("Sorted Array:", quicksort(unsorted))`
      },
      {
        title: 'Graph BFS Traversal (Queue-based)',
        code: `from collections import deque

def bfs_traversal(graph, start_node):
    visited = set()
    queue = deque([start_node])
    visited.add(start_node)
    
    result = []
    while queue:
        current = queue.popleft()
        result.append(current)
        for neighbor in graph[current]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return result

# Example graph representation
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}
print("BFS Order:", bfs_traversal(graph, 'A'))`
      }
    ],
    roadmap: [
      { step: 'Step 1', title: 'Analysis & Basics', description: 'Learn space-time complexity, arrays, dynamic arrays, and simple string manipulation.' },
      { step: 'Step 2', title: 'Linear Structures', description: 'Master single/double Linked Lists, Stack structures, Queue structures, and Hash Tables.' },
      { step: 'Step 3', title: 'Searching & Sorting', description: 'Implement linear/binary search, Bubble sort, Insertion sort, Mergesort, and Quicksort.' },
      { step: 'Step 4', title: 'Non-Linear Structures', description: 'Implement Binary Trees, BSTs, Heaps, and explore Huffman encoding.' },
      { step: 'Step 5', title: 'Graph Operations', description: 'Learn adjacency lists/matrices, BFS, DFS, Dijkstra\'s shortest path, and Prim\'s/Kruskal\'s MST.' },
      { step: 'Step 6', title: 'Advanced Algorithms', description: 'Master recursion, backtracking (n-queens), Greedy algorithms, and Dynamic Programming.' }
    ],
    qa: [
      { q: 'What is the difference between an Array and a Linked List?', a: 'Arrays are stored in contiguous memory locations and have fixed sizes, allowing O(1) random access but making insertions/deletions slow (O(n)). Linked Lists store elements in non-contiguous nodes linked via references, allowing O(1) insertions/deletions at endpoints but requiring O(n) traversal for access.' },
      { q: 'Explain the concept of time complexity of Hash Map operations.', a: 'On average, Hash Map insertion, deletion, and search operate in O(1) constant time. In the worst-case scenario (where all keys hash to the same bucket, causing collisions), the time complexity degrades to O(n) for linked lists or O(log n) for tree structures.' },
      { q: 'What is the difference between BFS and DFS graph traversals?', a: 'BFS (Breadth-First Search) explores nodes level-by-level, visiting all neighbor nodes before moving deeper, and is implemented using a Queue (ideal for finding shortest paths in unweighted graphs). DFS (Depth-First Search) explores as deep as possible down each branch before backtracking, implemented using a Stack or recursion.' },
      { q: 'How does the Quicksort algorithm work?', a: 'Quicksort is a divide-and-conquer algorithm. It selects a "pivot" element, partitions the array so that elements smaller than the pivot go to the left and larger to the right, and then recursively sorts the sub-arrays.' },
      { q: 'What is the difference between Mergesort and Quicksort?', a: 'Mergesort is a stable sorting algorithm with a guaranteed worst-case time complexity of O(n log n), but it requires O(n) auxiliary space. Quicksort is an in-place sort requiring O(log n) auxiliary space, but its worst-case complexity can degrade to O(n^2) if the pivot choices are poor.' },
      { q: 'What are overlapping subproblems and optimal substructure in Dynamic Programming?', a: 'Overlapping subproblems means the algorithm solves the exact same small subproblems repeatedly. Optimal substructure means the global optimal solution can be constructed from the optimal solutions of its subproblems.' },
      { q: 'What is a balanced binary tree, and why is it important?', a: 'A balanced binary tree (like AVL or Red-Black trees) is a tree where the height difference between left and right subtrees is constrained. This ensures search, insertion, and deletion operations maintain an efficient O(log n) worst-case time complexity, preventing degradation to O(n).' },
      { q: 'Explain the difference between a stack and a queue.', a: 'A stack is a Last-In, First-Out (LIFO) data structure where elements are added and removed from the same end. A queue is a First-In, First-Out (FIFO) data structure where elements are added at the rear and removed from the front.' }
    ]
  },
  ai: {
    title: 'Artificial Intelligence',
    description: 'Learn the foundations of AI, state-space search, heuristics, game playing, logic, and expert systems.',
    estimatedTime: '40 Hours',
    difficulty: 'Intermediate',
    whatYoullLearn: [
      'Understand agent classifications and environmental representations',
      'Solve pathfinding and traversal using Uninformed search (BFS, DFS, Uniform Cost)',
      'Apply Informed search (A*, Greedy Best-First) utilizing heuristics',
      'Optimize game-playing AI using Minimax and Alpha-Beta Pruning',
      'Model knowledge domains using Propositional and First-Order Logic',
      'Understand expert system architectures and inference engines',
      'Represent uncertainty utilizing Bayesian Belief Networks'
    ],
    prerequisites: [
      'Basic math, discrete math, and probability concepts',
      'Intermediate programming logic in Python'
    ],
    theory: 'Artificial Intelligence (AI) is the branch of computer science focused on creating systems capable of executing tasks that typically require human intelligence, such as logical reasoning, decision-making, and natural language understanding. Classic AI heavily relies on search algorithms, logical deduction systems, and heuristic evaluation frameworks to solve complex problems.\n\nState-space search forms the foundation of automated problem solving. In this model, an AI agent navigates a set of configurations (states) via operators to find a path from a start state to a goal state. Game playing applications utilize adversarial search techniques, modeling opponents to calculate optimal moves. Expert systems codify human knowledge into database rules to solve specialized tasks.',
    definitions: [
      { term: 'A* Search', def: 'An informed search algorithm that computes the optimal path to a goal by combining the actual cost from start (g(n)) with a heuristic estimate to goal (h(n)).' },
      { term: 'Heuristic Function', def: 'A domain-specific function that estimates the remaining cost from a given node to the goal, guiding search algorithms to prune branches.' },
      { term: 'Minimax Algorithm', def: 'A recursive backtracking algorithm used in decision-making and game theory to determine the optimal move for a player, assuming the opponent plays optimally.' },
      { term: 'Alpha-Beta Pruning', def: 'An optimization technique for Minimax that reduces the search space by cutting off branches that cannot affect the final decision.' },
      { term: 'Bayesian Network', def: 'A probabilistic graphical model representing a set of variables and their conditional dependencies via a directed acyclic graph (DAG).' }
    ],
    syntax: `def heuristic(current_node, goal_node):
    # Manhattan distance calculation in grid space
    return abs(current_node.x - goal_node.x) + abs(current_node.y - goal_node.y)`,
    codeExamples: [
      {
        title: 'Minimax Implementation',
        code: `def minimax(depth, node_index, is_max, scores, target_depth):
    # Base case: leaf node reached
    if depth == target_depth:
        return scores[node_index]
        
    if is_max:
        return max(
            minimax(depth + 1, node_index * 2, False, scores, target_depth),
            minimax(depth + 1, node_index * 2 + 1, False, scores, target_depth)
        )
    else:
        return min(
            minimax(depth + 1, node_index * 2, True, scores, target_depth),
            minimax(depth + 1, node_index * 2 + 1, True, scores, target_depth)
        )

# Leaf nodes of evaluation tree
scores = [3, 5, 2, 9, 12, 5, 23, 20]
print("Optimal Minimax Value:", minimax(0, 0, True, scores, 3))`
      },
      {
        title: 'Informed Greedy Best-First Search Step',
        code: `import queue

def greedy_best_first_search(graph, start, goal, heuristics):
    pq = queue.PriorityQueue()
    pq.put((heuristics[start], start))
    visited = {start}
    path = []

    while not pq.empty():
        h, current = pq.get()
        path.append(current)
        if current == goal:
            break
        for neighbor in graph[current]:
            if neighbor not in visited:
                visited.add(neighbor)
                pq.put((heuristics[neighbor], neighbor))
    return path

# Graph and Heuristic definitions
graph = {'A': ['B', 'C'], 'B': ['D'], 'C': ['D'], 'D': []}
heuristics = {'A': 4, 'B': 2, 'C': 3, 'D': 0}
print("Greedy Search Path:", greedy_best_first_search(graph, 'A', 'D', heuristics))`
      }
    ],
    roadmap: [
      { step: 'Step 1', title: 'AI Foundations', description: 'Learn about intelligent agents, environment types, rational agents, and simple reflex systems.' },
      { step: 'Step 2', title: 'Uninformed Search', description: 'Master BFS, DFS, Depth-Limited, and Uniform Cost Search pathfinding techniques.' },
      { step: 'Step 3', title: 'Informed Search', description: 'Understand heuristics, Greedy Best-First, and implement the A* algorithm.' },
      { step: 'Step 4', title: 'Adversarial Games', description: 'Study Minimax decision rules, Alpha-Beta pruning optimizations, and evaluation functions.' },
      { step: 'Step 5', title: 'Logic Systems', description: 'Learn Propositional Logic, resolution rules, unification, and First-Order Predicate Logic.' },
      { step: 'Step 6', title: 'Probabilistic AI', description: 'Master conditional probability, Bayes theorem, and build Bayesian Belief Networks.' }
    ],
    qa: [
      { q: 'What is the Turing Test?', a: 'Proposed by Alan Turing in 1950, it tests a machine\'s ability to exhibit intelligent behavior equivalent to, or indistinguishable from, that of a human. A computer passes if a human evaluator cannot tell it apart from a human during natural conversation.' },
      { q: 'What is the difference between Strong AI and Weak AI?', a: 'Weak AI (Narrow AI) is designed and trained to perform a specific task, such as translation or chess. Strong AI (Artificial General Intelligence) possesses general cognitive abilities, allowing it to understand, learn, and apply knowledge across any domain, similar to human intelligence.' },
      { q: 'What properties make a heuristic admissible in A* Search?', a: 'A heuristic is admissible if it never overestimates the actual cost to reach the goal from any node. In other words, it is optimistic, ensuring that A* always finds the optimal path.' },
      { q: 'How does Alpha-Beta pruning optimize the Minimax algorithm?', a: 'It maintains two values during search: Alpha (the minimum score the maximizing player is assured of) and Beta (the maximum score the minimizing player is assured of). If a branch is found where a child\'s score is worse than the current player\'s assured score, that branch is pruned (not searched), reducing execution time.' },
      { q: 'What is the difference between Uninformed and Informed search?', a: 'Uninformed search (e.g. BFS, DFS) has no knowledge of node positions relative to the goal other than state transitions. Informed search (e.g. A*, Greedy) uses heuristic estimations to prioritize visiting nodes that are geographically closer to the goal.' },
      { q: 'Explain the difference between Propositional Logic and First-Order Logic.', a: 'Propositional logic deals with simple boolean propositions that are either true or false. First-Order Logic (Predicate Logic) introduces objects, relations, functions, and quantifiers (For All, Exist), offering far richer knowledge representation.' },
      { q: 'What is an Expert System?', a: 'An Expert System is a classic AI application that emulates the decision-making ability of a human expert. It consists of a "Knowledge Base" (facts and IF-THEN rules) and an "Inference Engine" (which applies logic rules to solve problems).' },
      { q: 'What is a Markov Decision Process (MDP)?', a: 'An MDP is a mathematical framework used to model decision-making in environments where outcomes are partly random and partly under the control of a decision-making agent, forming the foundation of reinforcement learning.' }
    ]
  },
  ml: {
    title: 'Machine Learning',
    description: 'Master supervised and unsupervised algorithms, regression, classification, clustering, hyperparameter tuning, and model metrics.',
    estimatedTime: '50 Hours',
    difficulty: 'Intermediate',
    whatYoullLearn: [
      'Differentiate between Supervised, Unsupervised, and Reinforcement learning',
      'Implement Linear Regression and Logistic Regression from mathematical formulas',
      'Build Decision Trees and ensemble models like Random Forests and XGBoost',
      'Utilize Support Vector Machines (SVM) for linear and non-linear classification',
      'Perform data clustering utilizing K-Means and Hierarchical Clustering',
      'Evaluate model performance using Cross-validation, ROC/AUC, and Precision/Recall',
      'Apply regularization techniques (L1/L2) to prevent overfitting'
    ],
    prerequisites: [
      'Basic statistics, probability theory, and linear algebra (matrices)',
      'Proficiency in Python programming (NumPy and Pandas)'
    ],
    theory: 'Machine Learning (ML) is the subset of Artificial Intelligence concerned with building algorithms that learn and make predictions from data without explicit procedural programming. Instead of hardcoded rules, ML models generalize patterns from training datasets using mathematical optimization.\n\nThe training lifecycle involves data preprocessing, feature engineering, model fitting, and validation. Models are evaluated on unseen test sets to ensure generalization. Overfitting happens when a model learns training noise and performs poorly on new data. Regularization, cross-validation, and hyperparameter tuning are standard techniques used to balance the bias-variance tradeoff.',
    definitions: [
      { term: 'Overfitting vs Underfitting', def: 'Overfitting occurs when a model is overly complex, capturing training noise. Underfitting occurs when a model is too simple to capture the underlying data trend.' },
      { term: 'Gradient Descent', def: 'An iterative optimization algorithm used to minimize a model cost function by adjusting parameters in the direction of the negative gradient.' },
      { term: 'Bias-Variance Tradeoff', def: 'Bias represents error from simple model assumptions. Variance represents error from high model sensitivity to training data fluctuations. Minimizing total error requires balancing both.' },
      { term: 'Support Vector Machine (SVM)', def: 'A classifier that finds the optimal hyperplane maximizing the margin between data points of different classes, often utilizing the kernel trick for non-linear boundaries.' },
      { term: 'Confusion Matrix', def: 'A performance measurement table for classification models containing counts of True Positives, False Positives, True Negatives, and False Negatives.' }
    ],
    syntax: `# Standard Scikit-Learn training workflow
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
clf = RandomForestClassifier(n_estimators=100)
clf.fit(X_train, y_train)
accuracy = clf.score(X_test, y_test)`,
    codeExamples: [
      {
        title: 'Linear Regression from Scratch (NumPy)',
        code: `import numpy as np

class SimpleLinearRegression:
    def fit(self, X, y):
        x_mean, y_mean = np.mean(X), np.mean(y)
        self.m = np.sum((X - x_mean) * (y - y_mean)) / np.sum((X - x_mean) ** 2)
        self.c = y_mean - self.m * x_mean
        
    def predict(self, X):
        return self.m * X + self.c

X = np.array([1, 2, 3, 4, 5])
y = np.array([2, 4, 5, 4, 5])
model = SimpleLinearRegression()
model.fit(X, y)
print(f"Slope (m): {model.m:.2f}, Intercept (c): {model.c:.2f}")
print("Prediction for 6:", model.predict(np.array([6])))`
      },
      {
        title: 'K-Means Clustering implementation',
        code: `from sklearn.cluster import KMeans
import numpy as np

# Sample data points
X = np.array([[1, 2], [1, 4], [1, 0], [10, 2], [10, 4], [10, 0]])

# Initialize and fit model
kmeans = KMeans(n_clusters=2, random_state=42, n_init='auto')
kmeans.fit(X)

print("Cluster Centers:\\n", kmeans.cluster_centers_)
print("Assigned Labels:", kmeans.labels_)`
      }
    ],
    roadmap: [
      { step: 'Step 1', title: 'Data Prep & Math', description: 'Master matrix arithmetic, probability distributions, data wrangling with Pandas, and scaling.' },
      { step: 'Step 2', title: 'Regression Models', description: 'Implement Simple/Multiple Linear Regression, and master Gradient Descent algorithms.' },
      { step: 'Step 3', title: 'Classification', description: 'Learn Logistic Regression, K-Nearest Neighbors (KNN), and Naive Bayes classifiers.' },
      { step: 'Step 4', title: 'Tree-Based Models', description: 'Build Decision Trees, Random Forests, and explore gradient boosted models like XGBoost.' },
      { step: 'Step 5', title: 'Unsupervised Learning', description: 'Understand K-Means clustering, hierarchical clustering, and PCA for dimensionality reduction.' },
      { step: 'Step 6', title: 'Evaluation & Tuning', description: 'Perform cross-validation, grid search tuning, and interpret ROC/AUC and F1 metrics.' }
    ],
    qa: [
      { q: 'What is the difference between L1 and L2 regularization?', a: 'L1 regularization (Lasso) adds a penalty equal to the absolute value of the weights, leading to sparse models where some feature weights become exactly zero, acting as feature selection. L2 regularization (Ridge) adds a penalty equal to the square of the weights, shrinking weights close to zero but not exactly zero.' },
      { q: 'Explain the bias-variance tradeoff in Machine Learning.', a: 'Bias represents the error introduced by approximating a complex real-world problem with a simpler model (leads to underfitting). Variance is the error from the model\'s sensitivity to training data fluctuations (leads to overfitting). To build a robust model, you must find a balance that minimizes total error.' },
      { q: 'What is a Random Forest and how does it prevent overfitting?', a: 'Random Forest is an ensemble learning method that builds multiple decision trees during training. It reduces overfitting by averaging predictions from many independent trees, which are trained on random subsets of data (bagging) and features (feature bagging).' },
      { q: 'What is the difference between classification and regression?', a: 'Classification predicts a discrete categorical output label (e.g. Spam or Not Spam). Regression predicts a continuous numerical output value (e.g. housing prices).' },
      { q: 'How does K-Means clustering decide cluster centroids?', a: 'It randomly initializes K centroids, assigns each data point to its nearest centroid based on Euclidean distance, recalculates the centroids as the mean of the assigned points, and repeats this cycle until the centroids stop moving.' },
      { q: 'What are precision and recall? When would you prioritize one over the other?', a: 'Precision measures the ratio of true positive predictions to all positive predictions made (prioritized to avoid false positives, e.g. spam filters). Recall measures the ratio of true positives to all actual positive cases in the dataset (prioritized to avoid false negatives, e.g. cancer diagnosis).' },
      { q: 'What is the kernel trick in Support Vector Machines?', a: 'The kernel trick projects non-linearly separable data into a higher-dimensional space where it becomes linearly separable, allowing SVMs to solve complex boundaries without explicitly calculating coordinate transformations.' },
      { q: 'What is the purpose of Cross-Validation?', a: 'Cross-validation (like K-Fold) splits the dataset into K subsets. The model is trained on K-1 subsets and validated on the remaining subset, repeating the process K times. This provides a more robust estimate of how the model generalizes to unseen data.' }
    ]
  },
  dl: {
    title: 'Deep Learning',
    description: 'Explore neural networks, backpropagation calculus, activation functions, CNNs, and sequence modeling with LSTMs.',
    estimatedTime: '55 Hours',
    difficulty: 'Advanced',
    whatYoullLearn: [
      'Understand the architecture of Artificial Neural Networks (ANN)',
      'Calculate gradients using the chain rule in Backpropagation',
      'Implement activation functions: ReLU, Sigmoid, and Softmax',
      'Build Convolutional Neural Networks (CNNs) for image processing',
      'Develop Recurrent Neural Networks (RNNs) and LSTMs for sequences',
      'Optimize training using Adam, RMSProp, and SGD optimizers',
      'Regularize networks using Dropout, Batch Normalization, and Early Stopping'
    ],
    prerequisites: [
      'Solid Machine Learning foundation',
      'Calculus (partial derivatives) and matrix multiplications',
      'Proficiency in Python and PyTorch/TensorFlow'
    ],
    theory: 'Deep Learning (DL) is a specialized subset of Machine Learning that utilizes multi-layered artificial neural networks to model complex, high-dimensional patterns in data. Inspired by the biological structure of the human brain, deep networks pass inputs through hidden layers of artificial neurons, learning features hierarchically.\n\nLearning in deep networks is governed by two phases: the forward pass, which computes predictions, and the backward pass (backpropagation), which computes the loss gradient with respect to network weights using the chain rule of calculus. These gradients are used by optimization algorithms (such as Adam or SGD) to update weights, minimizing total error over epochs.',
    definitions: [
      { term: 'Backpropagation', def: 'The primary algorithm for training neural networks, calculating the gradient of the loss function with respect to weights layer-by-layer backwards.' },
      { term: 'Activation Function', def: 'A mathematical function applied to a neuron\'s output to introduce non-linearity, enabling the network to learn complex non-linear mapping boundaries.' },
      { term: 'CNN (Convolutional Neural Network)', def: 'A specialized neural network architecture for grid data like images, utilizing convolutional layers to share weights and maintain spatial invariance.' },
      { term: 'LSTM (Long Short-Term Memory)', def: 'A type of recurrent neural network containing memory cells and gates (input, forget, output) to learn long-term dependencies in sequence data.' },
      { term: 'Vanishing Gradient Problem', def: 'An issue where gradients shrink exponentially during backpropagation in deep networks, preventing early layers from updating their weights effectively.' }
    ],
    syntax: `import torch.nn as nn

class SimpleNeuralNet(nn.Module):
    def __init__(self, input_dim, output_dim):
        super().__init__()
        self.linear1 = nn.Linear(input_dim, 64)
        self.relu = nn.ReLU()
        self.linear2 = nn.Linear(64, output_dim)
        
    def forward(self, x):
        return self.linear2(self.relu(self.linear1(x)))`,
    codeExamples: [
      {
        title: 'Keras Feedforward Network with Dropout',
        code: `import tensorflow as tf
from tensorflow.keras import layers, models

# Define a simple sequential model
model = models.Sequential([
    layers.Dense(128, activation='relu', input_shape=(784,)),
    layers.Dropout(0.3),
    layers.Dense(64, activation='relu'),
    layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])
model.summary()`
      },
      {
        title: 'PyTorch Convolutional Neural Network Layer Test',
        code: `import torch
import torch.nn as nn

# Input: Batch size = 1, Channels = 3 (RGB), Size = 32x32
input_image = torch.randn(1, 3, 32, 32)

# Define Conv2d: 3 inputs, 16 outputs, 3x3 kernel, padding=1
conv = nn.Conv2d(in_channels=3, out_channels=16, kernel_size=3, padding=1)
pool = nn.MaxPool2d(kernel_size=2, stride=2)

out_conv = conv(input_image)
out_pool = pool(out_conv)

print("After Convolution shape:", out_conv.shape) # [1, 16, 32, 32]
print("After Max Pooling shape:", out_pool.shape) # [1, 16, 16, 16]`
      }
    ],
    roadmap: [
      { step: 'Step 1', title: 'Calculus & Libraries', description: 'Review partial derivatives, install PyTorch/TensorFlow, and learn Tensor operations.' },
      { step: 'Step 2', title: 'Single-Layer Perceptrons', description: 'Understand perceptrons, write logical gate solvers, and study gradient vectors.' },
      { step: 'Step 3', title: 'Multi-Layer & Backprop', description: 'Implement Multi-Layer Perceptrons, write backpropagation math, and study chain rule calculations.' },
      { step: 'Step 4', title: 'Regularization & Tuning', description: 'Master Dropout, Batch Normalization, weight initialization, and the Adam/SGD optimizers.' },
      { step: 'Step 5', title: 'Computer Vision (CNN)', description: 'Explore kernels, padding, pooling, channels, and build Convolutional Neural Networks.' },
      { step: 'Step 6', title: 'Sequential Models (RNN)', description: 'Master sequence mapping, Vanishing/Exploding gradients, RNNs, LSTMs, and GRUs.' }
    ],
    qa: [
      { q: 'Why do we need non-linear activation functions in neural networks?', a: 'Without non-linear activation functions (like ReLU or Sigmoid), a neural network would collapse into a single linear model, regardless of how many layers it has. Non-linearity allows the network to learn complex, non-linear boundaries in the data.' },
      { q: 'What is the Vanishing Gradient problem and how is it resolved?', a: 'In very deep networks, as gradients are backpropagated through layers, they are multiplied repeatedly. If the gradients are small, they shrink exponentially and approach zero, preventing early layers from updating their weights. Resolved by using ReLU activations, residual connections (ResNets), and Batch Normalization.' },
      { q: 'What is Dropout and how does it prevent overfitting?', a: 'Dropout is a regularization technique where a specified fraction of neurons are randomly deactivated during each training step. This forces the remaining neurons to learn independent features, preventing co-adaptation and reducing overfitting.' },
      { q: 'What is the difference between Sigmoid and Softmax activation functions?', a: 'Sigmoid scales outputs between 0 and 1, representing a single probability (ideal for binary classification). Softmax normalizes a vector of scores into a probability distribution summing to 1 (ideal for multiclass classification).' },
      { q: 'How does Batch Normalization improve training speed?', a: 'It normalizes the inputs of each layer to have a mean of zero and variance of one per batch. This reduces internal covariate shift, allowing higher learning rates, stabilizing training, and reducing sensitivity to weight initialization.' },
      { q: 'Explain the difference between a CNN\'s kernel, stride, and padding.', a: 'The kernel is the sliding filter matrix extracting local features. Stride is the number of pixels the kernel shifts during each step. Padding adds dummy pixels (usually zeros) to the border of the input to control the output size.' },
      { q: 'Why are LSTMs preferred over standard RNNs for sequence data?', a: 'Standard RNNs struggle to retain long-term memory because of vanishing gradients during backpropagation through time. LSTMs introduce a cell state managed by forget, input, and output gates that selectively retain or discard information, allowing them to capture long-term dependencies.' },
      { q: 'What is Transfer Learning and when should it be used?', a: 'Transfer Learning involves taking a pre-trained network (e.g. ResNet trained on ImageNet) and fine-tuning it on a new, smaller dataset. It is highly useful when you have limited data or computing power, as it leverages pre-learned features.' }
    ]
  },
  genai: {
    title: 'Generative AI',
    description: 'Learn Transformers, self-attention, LLM architectures, prompt engineering, RAG systems, and vector databases.',
    estimatedTime: '45 Hours',
    difficulty: 'Advanced',
    whatYoullLearn: [
      'Understand the Encoder-Decoder Transformer architecture',
      'Master the mathematics of Self-Attention and Multi-Head Attention',
      'Distinguish between Pre-training, Instruction Tuning, and RLHF',
      'Apply advanced Prompt Engineering (Few-Shot, Chain-of-Thought)',
      'Design Retrieval-Augmented Generation (RAG) pipelines',
      'Implement Vector Databases and search embeddings',
      'Fine-tune Large Language Models utilizing LoRA and QLoRA'
    ],
    prerequisites: [
      'Deep Learning concepts (neural nets, backpropagation)',
      'Natural Language Processing fundamentals',
      'Python programming'
    ],
    theory: 'Generative AI (GenAI) is a subset of deep learning that focuses on generating new, realistic content such as text, images, code, or sound. The modern renaissance in GenAI is driven by the Transformer architecture, introduced by Vaswani et al. in 2017. Transformers replaced sequential processing (RNNs) with the Self-Attention mechanism, enabling models to process words in parallel and capture long-range contextual relationships.\n\nLarge Language Models (LLMs) like GPT, LLaMA, and Claude are trained on massive text corpora. To customize these models for specific enterprise use cases without expensive retraining, developers use techniques like Prompt Engineering, Fine-Tuning (using PEFT/LoRA), and Retrieval-Augmented Generation (RAG) which grounds models with real-time external data.',
    definitions: [
      { term: 'Self-Attention', def: 'A mathematical mechanism that calculates how much focus each token in a sequence should place on every other token in that sequence.' },
      { term: 'Transformer', def: 'An architecture based on self-attention mechanisms that processes sequential data in parallel, forming the foundation of modern LLMs.' },
      { term: 'RAG (Retrieval-Augmented Generation)', def: 'A framework where a query retrieves relevant documents from an external source, adding them to the prompt context so the LLM outputs accurate, grounded answers.' },
      { term: 'LoRA (Low-Rank Adaptation)', def: 'A parameter-efficient fine-tuning method that freezes base LLM weights and inserts small, trainable low-rank matrices into attention layers.' },
      { term: 'Vector Database', def: 'A database optimized for storing high-dimensional vectors (embeddings) and performing fast similarity searches (e.g. cosine similarity).' }
    ],
    syntax: `from openai import OpenAI
client = OpenAI()

# Call LLM chat completion API
response = client.chat.completions.create(
    model="gpt-4-turbo",
    messages=[{"role": "user", "content": "Write a Python print function."}]
)
print(response.choices[0].message.content)`,
    codeExamples: [
      {
        title: 'Scaled Dot-Product Attention (NumPy)',
        code: `import numpy as np

def scaled_dot_product_attention(Q, K, V):
    # Calculate dimensional scaling factor
    d_k = Q.shape[-1]
    
    # Compute dot product scores scaled by sqrt(d_k)
    scores = np.dot(Q, K.T) / np.sqrt(d_k)
    
    # Apply softmax to obtain weights
    weights = np.exp(scores) / np.sum(np.exp(scores), axis=-1, keepdims=True)
    
    # Multiply by Values matrix
    return np.dot(weights, V), weights

# Simple Query, Key, Value representations
Q = np.array([[1, 0, 1]])
K = np.array([[1, 0, 1], [0, 1, 0]])
V = np.array([[10, 20], [30, 40]])

output, weights = scaled_dot_product_attention(Q, K, V)
print("Attention Output:", output)
print("Attention Weights:", weights)`
      },
      {
        title: 'Retrieval-Augmented Generation (RAG) pseudocode pipeline',
        code: `# Conceptual workflow of a RAG query pipeline
class RAGPipeline:
    def __init__(self, vector_db, llm_client):
        self.db = vector_db
        self.llm = llm_client
        
    def query(self, user_question):
        # 1. Query vector database for top matching context document
        relevant_docs = self.db.similarity_search(user_question, top_k=1)
        context = relevant_docs[0].text
        
        # 2. Inject context into the prompt template
        prompt = f"""Use the following context to answer the question.
Context: {context}
Question: {user_question}
Answer:"""

        # 3. Generate grounded response from LLM
        return self.llm.generate(prompt)

print("RAG Pipeline class declared successfully.")`
      }
    ],
    roadmap: [
      { step: 'Step 1', title: 'NLP & Tokenizers', description: 'Learn tokenization strategies (Byte-Pair Encoding), word embeddings, and vector similarity.' },
      { step: 'Step 2', title: 'Transformer Internals', description: 'Master Self-Attention, Multi-Head Attention, positional encodings, and feedforward blocks.' },
      { step: 'Step 3', title: 'LLM Foundations', description: 'Study pre-training tasks, causal language modeling, instruction tuning, and RLHF concepts.' },
      { step: 'Step 4', title: 'Prompt & Vector DBs', description: 'Learn Few-shot, Chain-of-Thought prompting, embedding generation, and vector search.' },
      { step: 'Step 5', title: 'RAG Architectures', description: 'Design chunking strategies, document ingestion pipelines, vector databases (Pinecone, Chroma), and prompt contexts.' },
      { step: 'Step 6', title: 'Model Adaptation', description: 'Master parameter-efficient fine-tuning (PEFT), LoRA, and deploy models.' }
    ],
    qa: [
      { q: 'What is the core difference between the Encoder and Decoder in Transformers?', a: 'The Encoder processes the complete input sequence at once, building bidirectional contextual representations (e.g. BERT). The Decoder generates text token-by-token, using masked self-attention to ensure it only looks at past tokens during generation (e.g. GPT).' },
      { q: 'What is Retrieval-Augmented Generation (RAG) and why is it useful?', a: 'RAG is a framework that retrieves relevant documents from an external source (like a vector database) based on the user\'s query and appends them to the prompt. This provides up-to-date and factual context to the LLM, reducing hallucinations without costly retraining.' },
      { q: 'What is the function of the Temperature parameter in LLM text generation?', a: 'Temperature controls the randomness of generation. During softmax, a higher temperature flattens the probability distribution, making the model select less probable tokens (increasing creativity). A lower temperature sharpens the distribution, leading to more deterministic and factual responses.' },
      { q: 'Explain parameter-efficient fine-tuning (PEFT) and LoRA.', a: 'PEFT methodologies adapt pre-trained LLMs to tasks while freezing base model weights, avoiding expensive full updates. LoRA (Low-Rank Adaptation) works by parameterizing weight updates into small, low-rank matrices, saving substantial memory and training time.' },
      { q: 'How do vector databases perform fast similarity search?', a: 'They index data as high-dimensional vector embeddings and use specialized index structures like Hierarchical Navigable Small World (HNSW) to perform Approximate Nearest Neighbor (ANN) search, bypassing expensive exact scans.' },
      { q: 'What is Chain-of-Thought (CoT) prompting?', a: 'CoT is a prompting technique where the model is asked to output its intermediate reasoning steps before providing the final answer ("Let\'s think step by step"). This significantly improves performance on logical, mathematical, and multi-step reasoning tasks.' },
      { q: 'What is the purpose of Reinforcement Learning from Human Feedback (RLHF)?', a: 'RLHF is used to align LLMs with human values and preferences. It trains a reward model based on human comparisons of LLM outputs, then optimizes the LLM policy using reinforcement learning (like PPO) to produce helpful, honest, and harmless responses.' },
      { q: 'Explain what LLM hallucinations are and how to mitigate them.', a: 'Hallucinations occur when an LLM generates grammatically correct but factually incorrect or unsupported statements. They can be mitigated using RAG, system prompts that enforce truthfulness, setting a lower temperature, or using chain-of-thought verification.' }
    ]
  },
  datascience: {
    title: 'Data Science',
    description: 'Learn data analysis, manipulation with Pandas/NumPy, statistics, exploratory visualization, and hypothesis testing.',
    estimatedTime: '40 Hours',
    difficulty: 'Intermediate',
    whatYoullLearn: [
      'Understand descriptive and inferential statistical concepts',
      'Perform data wrangling, cleaning, and missing value management',
      'Manipulate complex datasets using Pandas and NumPy arrays',
      'Create exploratory visualizations (Matplotlib and Seaborn)',
      'Conduct statistical hypothesis testing and p-value validation',
      'Implement feature scaling, encoding, and selection pipelines',
      'Uncover trends and outliers using Exploratory Data Analysis (EDA)'
    ],
    prerequisites: [
      'Basic python coding knowledge',
      'High-school algebra and statistics'
    ],
    theory: 'Data Science is an interdisciplinary field that combines statistical mathematics, programming, and domain expertise to extract insights and knowledge from structured and unstructured data. The standard data science lifecycle involves data ingestion, data cleaning, exploratory analysis, modeling, and communication.\n\nData cleaning is a critical phase, occupying a large portion of a scientist\'s workflow. Using Pandas and NumPy, data scientists normalize features, impute missing values, and remove outliers. Statistical testing is then used to verify that observed differences in data represent actual population effects rather than random variation.',
    definitions: [
      { term: 'Exploratory Data Analysis (EDA)', def: 'The initial process of analyzing datasets, often visually, to summarize their main statistical characteristics and identify patterns or outliers.' },
      { term: 'P-Value', def: 'The probability of obtaining test results at least as extreme as the observed results, assuming the null hypothesis is true. A lower p-value (typically < 0.05) leads to rejecting the null hypothesis.' },
      { term: 'Data Imputation', def: 'The process of replacing missing data points in a dataset with statistical estimates (such as the mean, median, or mode).' },
      { term: 'Correlation vs Covariance', def: 'Covariance measures the direction of the linear relationship between two variables. Correlation is a standardized metric measuring both the direction and strength, bounded between -1 and 1.' },
      { term: 'Z-Score', def: 'A measure of how many standard deviations a data point is from the mean of a distribution, commonly used to identify outliers.' }
    ],
    syntax: `import pandas as pd

# Load and query dataset
df = pd.read_csv("data.csv")
high_earners = df[df["income"] > 75000]
summary = high_earners.groupby("city")["age"].mean()`,
    codeExamples: [
      {
        title: 'Data Cleaning and Median Imputation',
        code: `import pandas as pd
import numpy as np

# Sample dirty dataset
raw_data = {
    'Name': ['Alice', 'Bob', 'Charlie', 'David'],
    'Age': [25, np.nan, 30, 22],
    'Salary': [50000, 60000, np.nan, 45000]
}
df = pd.DataFrame(raw_data)

# Impute missing Age with median, Salary with mean
df['Age'] = df['Age'].fillna(df['Age'].median())
df['Salary'] = df['Salary'].fillna(df['Salary'].mean())

print("Cleaned DataFrame:\\n", df)`
      },
      {
        title: 'Hypothesis Testing (Independent T-Test)',
        code: `import numpy as np
from scipy import stats

# Exam scores of two student groups
group_A = np.array([88, 92, 79, 85, 90, 84])
group_B = np.array([72, 78, 68, 75, 80, 71])

# Perform independent t-test
t_stat, p_value = stats.ttest_ind(group_A, group_B)

print(f"T-Statistic: {t_stat:.4f}")
print(f"P-Value: {p_value:.6f}")

if p_value < 0.05:
    print("Reject the null hypothesis: There is a significant difference in scores.")
else:
    print("Fail to reject the null hypothesis: No significant difference.")`
      }
    ],
    roadmap: [
      { step: 'Step 1', title: 'Python Foundations', description: 'Learn Jupyter notebooks, NumPy arrays, operations, and linear algebra fundamentals.' },
      { step: 'Step 2', title: 'Data Wrangling', description: 'Master Pandas DataFrames, merging, filtering, grouping, and reading CSV/SQL tables.' },
      { step: 'Step 3', title: 'Data Visualization', description: 'Build plots, histograms, heatmaps, and scatter charts using Matplotlib and Seaborn.' },
      { step: 'Step 4', title: 'Statistics & Probability', description: 'Study distributions, central limit theorem, hypothesis testing, and confidence intervals.' },
      { step: 'Step 5', title: 'Data Preprocessing', description: 'Learn feature encoding (One-Hot), standardization scaling, and missing value management.' },
      { step: 'Step 6', title: 'Exploratory Projects', description: 'Analyze real datasets, perform EDA, write clean reports, and present data stories.' }
    ],
    qa: [
      { q: 'What is the Central Limit Theorem (CLT) and why is it important?', a: 'The CLT states that the distribution of sample means approaches a normal distribution as the sample size becomes large (usually n >= 30), regardless of the population distribution shape. It allows statisticians to perform normal-probability calculations and parametric tests on non-normal populations.' },
      { q: 'How do you detect and handle outliers in a dataset?', a: 'Outliers can be detected visually using boxplots or statistically using Z-scores (>3 or <-3) and the Interquartile Range (IQR) method (beyond 1.5 * IQR from quartiles). They can be handled by deleting them (if errors), transforming data (log scales), or keeping them if they represent genuine anomalies.' },
      { q: 'What is the difference between covariance and correlation?', a: 'Covariance measures the directional relationship between two variables (positive or negative scale). Correlation is a normalized version of covariance that measures both the direction and strength of the relationship, ranging from -1 to 1.' },
      { q: 'Explain the difference between type I and type II errors.', a: 'A Type I error (False Positive) occurs when we reject a true null hypothesis. A Type II error (False Negative) occurs when we fail to reject a false null hypothesis.' },
      { q: 'What is standard scaling (standardization) vs Min-Max scaling (normalization)?', a: 'Standardization shifts data to have a mean of 0 and standard deviation of 1. Min-Max scaling bounds data to a specific range, usually between 0 and 1. Standardization is less sensitive to outliers, while Min-Max scaling is ideal for algorithms requiring bounded inputs (e.g. neural networks).' },
      { q: 'What is the difference between long and wide data formats?', a: 'In a wide format, each variable has its own column. In a long format, one column holds the variable names and another holds the values. Long format is generally preferred for data analysis and visualization libraries.' },
      { q: 'What is A/B testing?', a: 'A/B testing is a randomized split experiment comparing two versions (A and B) of a single variable (e.g. webpage layouts) to determine which version performs better based on statistical significance tests.' },
      { q: 'How do you handle missing data in Pandas?', a: 'You can identify missing data using `isnull()`. It can be handled by dropping missing values (`dropna()`), filling them with static values or statistics like the mean/median (`fillna()`), or using interpolation methods.' }
    ]
  },
  webdev: {
    title: 'Full Stack Web Development',
    description: 'Learn modern HTML5, CSS3 layouts, responsive design, JavaScript DOM manipulation, ES6+ features, and API integrations.',
    estimatedTime: '50 Hours',
    difficulty: 'Beginner',
    whatYoullLearn: [
      'Write structured, semantic HTML5 markup for search accessibility',
      'Create layouts utilizing CSS Flexbox and CSS Grid systems',
      'Implement responsive designs with Media Queries',
      'Master JavaScript DOM manipulation, events, and bubbling',
      'Leverage ES6+ modern features (Destructuring, Promises, modules)',
      'Perform asynchronous network requests using Fetch and Async/Await',
      'Prevent vulnerabilities including CORS, XSS, and CSRF'
    ],
    prerequisites: [
      'Basic computer literacy',
      'Interest in building web user interfaces'
    ],
    theory: 'Full Stack Web Development involves building both the client-side (frontend) and server-side (backend) of web applications. The frontend uses HTML to structure document content, CSS to style layouts, and JavaScript to add interactivity. The browser parses these elements to build the Document Object Model (DOM).\n\nModern web development prioritizes responsiveness and performance. Utilizing flexbox/grid layouts and media queries, developers ensure pages render correctly across devices. Fast loading times are achieved by optimizing asset delivery, using asynchronous loading, and implementing security practices to protect user sessions and browser data.',
    definitions: [
      { term: 'DOM (Document Object Model)', def: 'A programming interface for web documents. It represents the page structure as a logical tree, allowing languages like JavaScript to dynamically read and update elements.' },
      { term: 'Semantic HTML', def: 'Markup tags that clearly describe their meaning and purpose to the browser and search engines (such as <article>, <header>, and <nav>) rather than just styling.' },
      { term: 'Flexbox', def: 'A one-dimensional layout model for arranging items in rows or columns, optimizing space distribution between items.' },
      { term: 'Promise', def: 'An object representing the eventual completion (or failure) of an asynchronous operation and its resulting value in JavaScript.' },
      { term: 'CORS', def: 'Cross-Origin Resource Sharing: A security mechanism enforced by browsers that restricts web pages from requesting resources hosted on a different domain.' }
    ],
    syntax: `<!-- Modern responsive HTML structure -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Site</title>
</head>
<body>
    <header><h1>Header Content</h1></header>
</body>
</html>`,
    codeExamples: [
      {
        title: 'Asynchronous API Fetch & DOM Rendering',
        code: `async function loadUserData(userId) {
    const outputElement = document.getElementById('user-profile');
    try {
        const response = await fetch(\`https://jsonplaceholder.typicode.com/users/\${userId}\`);
        if (!response.ok) {
            throw new Error("HTTP connection error");
        }
        const data = await response.json();
        outputElement.innerHTML = \`<h3>\${data.name}</h3><p>Email: \${data.email}</p>\`;
    } catch (error) {
        outputElement.textContent = "Failed to load user profile: " + error.message;
    }
}

// Attach event listener
document.getElementById('fetch-btn')?.addEventListener('click', () => loadUserData(1));`
      },
      {
        title: 'CSS Flexbox Centering with CSS Grid Layout',
        code: `/* CSS Center container styling */
.main-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
}

.card-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    background-color: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 8px;
}`
      }
    ],
    roadmap: [
      { step: 'Step 1', title: 'HTML & CSS Basics', description: 'Learn HTML semantics, forms, CSS box model, colors, fonts, and borders.' },
      { step: 'Step 2', title: 'Responsive CSS Layouts', description: 'Master Flexbox layouts, Grid systems, media queries, and fluid typography.' },
      { step: 'Step 3', title: 'JavaScript Core', description: 'Learn variables, functions, conditions, DOM queries, and events.' },
      { step: 'Step 4', title: 'Asynchronous JS', description: 'Master callbacks, Promises, Async/Await syntax, and network Fetch queries.' },
      { step: 'Step 5', title: 'Web APIs & Security', description: 'Understand HTTP status codes, REST models, CORS permissions, and security headers.' },
      { step: 'Step 6', title: 'Tooling & Hosting', description: 'Learn Git commands, npm scripts, Vite bundling, and host sites on Vercel/Netlify.' }
    ],
    qa: [
      { q: 'What is the difference between let, const, and var in JavaScript?', a: 'var is function-scoped, hoisted, and can be redeclared. let and const are block-scoped, not redeclarable, and exist in the temporal dead zone until declared. const variables cannot be reassigned after initialization, whereas let variables can.' },
      { q: 'Explain the CSS Box Model.', a: 'Every HTML element is rendered as a rectangular box. The box model consists of four nested areas: Content (actual text/image), Padding (space around content), Border (surrounds padding), and Margin (outermost space separating the element from neighbors).' },
      { q: 'How does event delegation work and why is it useful?', a: 'Event delegation is a technique where a single event listener is attached to a parent element instead of adding multiple listeners to individual children. It works because of event bubbling (events travel up the DOM tree), saving memory and handling dynamically added child elements automatically.' },
      { q: 'What is the difference between == and === operators in JavaScript?', a: 'The "==" operator compares two values for equality after performing type coercion (converting types if different). The "===" operator compares both value and type, returning true only if they are identical in both value and type.' },
      { q: 'Explain the difference between LocalStorage, SessionStorage, and Cookies.', a: 'LocalStorage stores key-value data with no expiration date, remaining until cleared manually. SessionStorage stores data for the duration of the page session (deleted when tab is closed). Cookies store small pieces of data sent with every HTTP request, containing expiration dates and security flags.' },
      { q: 'What is Cross-Origin Resource Sharing (CORS)?', a: 'CORS is a security mechanism enforced by browsers. It prevents web applications from requesting resources hosted on a different domain (origin) unless that server explicitly authorizes the cross-origin request using headers (e.g. Access-Control-Allow-Origin).' },
      { q: 'What is semantic HTML and why is it important?', a: 'Semantic HTML uses tags that describe their meaning (like `<nav>`, `<article>`, `<header>`) rather than generic tags like `<div>`. It is crucial for SEO ranking, accessibility (screen readers), and code readability.' },
      { q: 'How do you handle errors in asynchronous JavaScript using async/await?', a: 'Asynchronous operations using async/await are wrapped in try-catch blocks. If a promise rejects, the catch block intercepts the error, allowing you to handle it gracefully without crashing the thread.' }
    ]
  },
  react: {
    title: 'React.js Development',
    description: 'Build interactive user interfaces with React, state, hooks, router, and context API.',
    estimatedTime: '35 Hours',
    difficulty: 'Intermediate',
    whatYoullLearn: [
      'Understand JSX syntax and compilation',
      'Manage components using state and props',
      'Master React hooks (useState, useEffect, useMemo, useCallback)',
      'Share global state using the Context API',
      'Build client-side routing with React Router',
      'Optimize performance using the Virtual DOM and memoization',
      'Create custom hooks to reuse stateful logic'
    ],
    prerequisites: [
      'Intermediate JavaScript (ES6+)',
      'HTML/CSS familiarity'
    ],
    theory: 'React is an open-source, component-based frontend JavaScript library developed by Meta. It utilizes a declarative style, meaning developers describe how the UI should look for different states, and React manages updates automatically.\n\nReact\'s speed comes from the Virtual DOM—a lightweight representation of the real DOM. When state changes, React computes the diff between the virtual DOM and real DOM, and updates only the changed elements in a process called reconciliation.',
    definitions: [
      { term: 'JSX', def: 'JavaScript XML: an extension allowing HTML-like syntax inside JavaScript code.' },
      { term: 'Virtual DOM', def: 'A lightweight, in-memory copy of the real DOM used by React for performance optimization.' },
      { term: 'State', def: 'An object managed within a component that holds data that can change over time.' },
      { term: 'Hook', def: 'A special function letting you "hook into" React features (like state) inside functional components.' },
      { term: 'Props', def: 'Immutable properties passed down from parent components to child components.' }
    ],
    syntax: `import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}`,
    codeExamples: [
      {
        title: 'Custom Hook for Fetching',
        code: `import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => { setData(data); setLoading(false); });
  }, [url]);

  return { data, loading };
}`
      },
      {
        title: 'Context API State Sharing',
        code: `import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);`
      }
    ],
    roadmap: [
      { step: 'Step 1', title: 'JSX & Rendering Elements', description: 'Learn JSX syntax, rendering elements, and compiling.' },
      { step: 'Step 2', title: 'Components & Props', description: 'Master functional and class components, and passing props.' },
      { step: 'Step 3', title: 'State & Hooks', description: 'Understand state management using useState and useEffect.' },
      { step: 'Step 4', title: 'Advanced Hooks', description: 'Learn useContext, useReducer, useMemo, and useCallback.' },
      { step: 'Step 5', title: 'Routing', description: 'Implement client-side routing with React Router.' },
      { step: 'Step 6', title: 'State Management', description: 'Explore global state libraries like Zustand or Redux.' }
    ],
    qa: [
      { q: 'What is the Virtual DOM?', a: 'A programming concept where a virtual representation of the UI is kept in memory and synced with the real DOM via ReactDOM (reconciliation).' },
      { q: 'Explain the dependency array in useEffect.', a: 'It tells React when to run the hook. If empty [], it runs once on mount. If containing variables, it runs when those variables change.' },
      { q: 'What are the rules of React Hooks?', a: 'Only call Hooks at the top level (not inside loops/conditions) and only call Hooks from React Function Components or Custom Hooks.' },
      { q: 'Why do we use keys in React lists?', a: 'Keys help React identify which items have changed, been added, or been removed, optimizing Virtual DOM diffing.' },
      { q: 'What is the difference between controlled and uncontrolled components?', a: 'Controlled components have their state managed by React (via value and onChange); uncontrolled components manage their own state using Refs.' },
      { q: 'What is React Context?', a: 'A built-in feature to share global state across component trees without manual prop-drilling.' },
      { q: 'How does useCallback differ from useMemo?', a: 'useCallback memoizes a function definition; useMemo memoizes the returned result of a function evaluation.' },
      { q: 'What is React.memo?', a: 'A higher-order component that wraps functional components to prevent unnecessary re-renders if props don\'t change.' }
    ]
  },
  nodejs: {
    title: 'Node.js Backend',
    description: 'Master server-side JavaScript, Express, asynchronous I/O, middleware, and backend patterns.',
    estimatedTime: '45 Hours',
    difficulty: 'Intermediate',
    whatYoullLearn: [
      'Understand the Node.js Event Loop and Non-blocking I/O',
      'Build Express.js servers and routing architectures',
      'Design REST APIs following standard conventions',
      'Implement custom middleware for logging, auth, and validation',
      'Manage files and streams for processing large files',
      'Implement secure authentication using JWT and bcrypt',
      'Connect to database layers using ORMs and ODMs'
    ],
    prerequisites: [
      'Solid JavaScript (Promises, Async/Await)',
      'HTTP protocol basics'
    ],
    theory: 'Node.js is an open-source, cross-platform JavaScript runtime built on Chrome\'s V8 engine. It allows developers to run JavaScript on the server-side, enabling full-stack development using a single programming language.\n\nNode.js uses an asynchronous event-driven, non-blocking I/O model, making it lightweight and efficient for handling concurrent operations. This model relies on the Event Loop to handle asynchronous callbacks, delegates system tasks to thread pools, and resumes execution when ready.',
    definitions: [
      { term: 'Event Loop', def: 'A single-threaded loop orchestrating execution of callbacks in Node.js.' },
      { term: 'Express.js', def: 'A minimalist web framework for Node.js used to build robust HTTP APIs.' },
      { term: 'Middleware', def: 'Functions executing during the request-response cycle, modifying requests or sending responses.' },
      { term: 'Buffer', def: 'A raw memory allocation used to handle binary data streams.' },
      { term: 'JWT', def: 'JSON Web Token: a secure mechanism representing claims between client and server.' }
    ],
    syntax: `const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello Node!'));
app.listen(3000, () => console.log('Running on port 3000'));`,
    codeExamples: [
      {
        title: 'Custom Middleware Logging',
        code: `const express = require('express');
const app = express();

// Middleware function
const logger = (req, res, next) => {
    console.log(\`\${req.method} \${req.url} - \${new Date().toISOString()}\`);
    next(); // Pass control to next handler
};

app.use(logger);
app.get('/api/data', (req, res) => res.json({ success: true }));`
      },
      {
        title: 'File Streams read/write',
        code: `const fs = require('fs');

const readableStream = fs.createReadStream('large_input.txt');
const writeableStream = fs.createWriteStream('output.txt');

// Pipe data from input to output
readableStream.pipe(writeableStream);
readableStream.on('end', () => console.log('Streaming complete.'));`
      }
    ],
    roadmap: [
      { step: 'Step 1', title: 'Node.js Architecture', description: 'Understand the V8 Engine and the Event Loop.' },
      { step: 'Step 2', title: 'Core Modules', description: 'Learn core modules like fs, path, and http.' },
      { step: 'Step 3', title: 'Express.js Fundamentals', description: 'Learn Express routing and setup.' },
      { step: 'Step 4', title: 'Middleware & Validation', description: 'Develop middleware and validate inputs.' },
      { step: 'Step 5', title: 'Database Integration', description: 'Integrate MongoDB/Mongoose or PostgreSQL.' },
      { step: 'Step 6', title: 'Auth & Deployment', description: 'Implement JWT authentication and deploy.' }
    ],
    qa: [
      { q: 'Is Node.js single-threaded or multi-threaded?', a: 'Node.js is single-threaded for execution of JS code (via the Event Loop) but uses multi-threaded C++ pools (libuv) under the hood for blocking I/O tasks.' },
      { q: 'What is the purpose of middleware in Express?', a: 'Middleware functions have access to request and response objects, performing tasks like validation, logging, auth, and header injection before ending the cycle.' },
      { q: 'How does the Event Loop handle tasks?', a: 'It cycles through phases: timers, pending callbacks, idle/prepare, poll (I/O callbacks), check, and close callbacks.' },
      { q: 'What is the difference between setImmediate() and process.nextTick()?', a: 'process.nextTick() executes immediately after the current operation finishes, before the Event Loop moves to the next phase. setImmediate() executes in the check phase of the next loop cycle.' },
      { q: 'How do you handle exceptions globally in Express?', a: 'By registering a middleware function with 4 parameters: (err, req, res, next). Express automatically forwards uncaught errors here.' },
      { q: 'What are Node Streams and why are they used?', a: 'Streams are objects letting you read or write data chunk-by-chunk, saving memory when processing massive files.' },
      { q: 'What is the difference between require() and import?', a: 'require is CommonJS syntax (evaluated dynamically at runtime); import is ES6 module syntax (evaluated statically at compile-time).' },
      { q: 'Why should we use bcrypt for hashing passwords?', a: 'bcrypt is a key-derivation function that incorporates a salt and is intentionally slow (computationally expensive), mitigating brute-force attacks.' }
    ]
  },
  fastapi: {
    title: 'FastAPI Python',
    description: 'Build modern, fast, type-safe APIs using Python, Pydantic data schemas, and async/await.',
    estimatedTime: '30 Hours',
    difficulty: 'Intermediate',
    whatYoullLearn: [
      'Master async/await asynchronous syntax in Python',
      'Define FastAPI routes and operation mappings',
      'Validate request payloads using Pydantic data models',
      'Build robust applications using the Dependency Injection system',
      'Generate interactive OpenAPI and Swagger documentation automatically',
      'Integrate databases with SQLAlchemy or SQLModel ORMs',
      'Implement JWT token security and path verification'
    ],
    prerequisites: [
      'Python type hints and functions',
      'Understanding of REST API models'
    ],
    theory: 'FastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.8+ based on standard Python type hints. Built on top of Starlette (for web parts) and Pydantic (for data parts), it provides automatic documentation, high speed, and validation.\n\nFastAPI natively supports asynchronous programming using async and await, allowing the server to handle multiple concurrent connections. It automatically generates interactive Swagger/OpenAPI documentation, making API testing seamless.',
    definitions: [
      { term: 'Pydantic', def: 'Data validation and settings management library using Python type annotations.' },
      { term: 'ASGI', def: 'Asynchronous Server Gateway Interface: standard interface between async web servers and applications.' },
      { term: 'Dependency Injection', def: 'Design pattern where an object receives its dependencies from external sources (declared via Depends in FastAPI).' },
      { term: 'Starlette', def: 'Lightweight ASGI toolkit/framework powering FastAPI\'s routing and server behaviors.' },
      { term: 'Uvicorn', def: 'A lightning-fast ASGI server implementation used to run FastAPI applications.' }
    ],
    syntax: `from fastapi import FastAPI
app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Hello from FastAPI"}`,
    codeExamples: [
      {
        title: 'Pydantic Validation & POST Requests',
        code: `from fastapi import FastAPI
from pydantic import BaseModel, EmailStr

app = FastAPI()

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    age: int

@app.post("/users/")
def create_user(user: UserCreate):
    return {"status": "User created", "user": user}`
      },
      {
        title: 'Dependency Injection (Depends)',
        code: `from fastapi import FastAPI, Depends, Header, HTTPException

app = FastAPI()

def verify_token(x_token: str = Header(...)):
    if x_token != "supersecret":
        raise HTTPException(status_code=400, detail="Invalid token")
    return x_token

@app.get("/items/")
def read_items(token: str = Depends(verify_token)):
    return {"secure_data": ["item1", "item2"], "auth_token": token}`
      }
    ],
    roadmap: [
      { step: 'Step 1', title: 'Python Async & Hints', description: 'Learn Python type hints and the async/await model.' },
      { step: 'Step 2', title: 'Setup & Routing', description: 'Install FastAPI, Uvicorn, and create endpoints.' },
      { step: 'Step 3', title: 'Pydantic Schemas', description: 'Validate query, path, and body parameters using models.' },
      { step: 'Step 4', title: 'Dependencies', description: 'Master FastAPI\'s dependency injection system.' },
      { step: 'Step 5', title: 'Database & ORM', description: 'Integrate SQLAlchemy, tables, and CRUD operations.' },
      { step: 'Step 6', title: 'Testing & Deploy', description: 'Write unit tests using TestClient and run migrations.' }
    ],
    qa: [
      { q: 'Why is FastAPI faster than Flask or Django?', a: 'It is built on ASGI (Starlette) rather than WSGI, supporting async/await natively, and parses JSON and validates data extremely fast using Pydantic.' },
      { q: 'What is Pydantic and how is it used in FastAPI?', a: 'Pydantic is a validation library. It defines the structure and types of request payloads and automatically validates incoming data.' },
      { q: 'How does FastAPI generate documentation?', a: 'It reads Python type hints and Pydantic schemas to auto-generate Swagger UI (/docs) and ReDoc (/redoc) API interactive pages.' },
      { q: 'Explain the Dependency Injection system in FastAPI.', a: 'It lets you define reusable utility functions (like database sessions, security tokens) and inject them into route handlers using the Depends parameter.' },
      { q: 'What is the difference between ASGI and WSGI?', a: 'WSGI is synchronous, handling one request per thread at a time. ASGI supports asynchronous execution, handling multiple requests concurrently on a single thread.' },
      { q: 'How do you handle validation errors in FastAPI?', a: 'FastAPI catches validation errors automatically and returns a structured 422 Unprocessable Entity JSON response.' },
      { q: 'How do you read request headers in a path function?', a: 'By declaring a parameter with the type Header from fastapi module, matching the header name in snake_case.' },
      { q: 'What is SQLModel?', a: 'A library developed by the creator of FastAPI that combines SQLAlchemy and Pydantic, avoiding code duplication when defining DB models and schemas.' }
    ]
  },
  sql: {
    title: 'SQL & Database Management',
    description: 'Master relational database systems, query writing, advanced joins, indexes, normalization, and ACID transactions.',
    estimatedTime: '35 Hours',
    difficulty: 'Beginner',
    whatYoullLearn: [
      'Understand relational database design and normalization concepts',
      'Execute DDL and DML operations using standard SQL syntax',
      'Implement advanced joins (Inner, Left, Right, Full, and Self)',
      'Write subqueries and Common Table Expressions (CTEs)',
      'Optimize query execution utilizing database Indexes',
      'Manage database transactions and understand ACID properties',
      'Analyze search execution paths using EXPLAIN commands'
    ],
    prerequisites: [
      'Basic analytical reasoning',
      'No database experience required'
    ],
    theory: 'SQL (Structured Query Language) is the standard language used to interact with Relational Database Management Systems (RDBMS). Databases store data in structured tables, and relationships between tables are maintained via Primary and Foreign Keys.\n\nEfficient database design uses normalization to eliminate redundancy and improve data integrity. Query performance is optimized using Indexes, which act as lookup maps, avoiding costly full-table scans. Transactions guarantee reliability by enforcing ACID principles.',
    definitions: [
      { term: 'ACID Properties', def: 'Atomicity, Consistency, Isolation, Durability: properties ensuring database transactions are processed reliably.' },
      { term: 'Normalization', def: 'Design technique dividing tables to reduce data redundancy and dependency.' },
      { term: 'Index', def: 'Data structure (typically B-Tree) that speeds up the retrieval of rows from a table.' },
      { term: 'CTE (Common Table Expression)', def: 'A temporary named result set query block defined using WITH.' },
      { term: 'Foreign Key', def: 'A column or group of columns in one table that uniquely identifies a row of another table.' }
    ],
    syntax: `SELECT columns
FROM table1
INNER JOIN table2 ON table1.id = table2.t1_id
WHERE condition
GROUP BY column
HAVING group_condition;`,
    codeExamples: [
      {
        title: 'Advanced Join and Aggregation',
        code: `SELECT 
    d.department_name,
    COUNT(e.employee_id) AS total_employees,
    AVG(e.salary) AS average_salary
FROM departments d
LEFT JOIN employees e ON d.department_id = e.department_id
GROUP BY d.department_name
HAVING AVG(e.salary) > 50000;`
      },
      {
        title: 'CTE & Window Function (Ranking)',
        code: `WITH HighEarners AS (
    SELECT employee_id, first_name, salary,
           RANK() OVER (ORDER BY salary DESC) as salary_rank
    FROM employees
)
SELECT employee_id, first_name, salary
FROM HighEarners
WHERE salary_rank <= 5;`
      }
    ],
    roadmap: [
      { step: 'Step 1', title: 'SQL Basics', description: 'Learn databases, tables, DDL (CREATE, ALTER) and basic queries.' },
      { step: 'Step 2', title: 'Data Filtering & Sort', description: 'Master WHERE filters, ORDER BY, LIMIT, and logical operators.' },
      { step: 'Step 3', title: 'Joins & Joins', description: 'Understand INNER, LEFT, RIGHT, and FULL joins.' },
      { step: 'Step 4', title: 'Aggregations', description: 'Master GROUP BY, HAVING, and aggregation functions (SUM, AVG).' },
      { step: 'Step 5', title: 'Advanced Queries', description: 'Write subqueries, CTEs, and Window Functions.' },
      { step: 'Step 6', title: 'Optimization & ACID', description: 'Learn Indexing, EXPLAIN query plans, and transaction control (COMMIT).' }
    ],
    qa: [
      { q: 'What is the difference between INNER JOIN and LEFT JOIN?', a: 'INNER JOIN returns matching records in both tables. LEFT JOIN returns all records from the left table and matching records from the right table (filling NULLs if no match).' },
      { q: 'What are ACID properties?', a: 'Atomicity (all or nothing), Consistency (preserves rules), Isolation (concurrent execution isolated), Durability (persists after crash).' },
      { q: 'What is the difference between WHERE and HAVING?', a: 'WHERE filters individual rows before grouping; HAVING filters aggregated groups after GROUP BY completes.' },
      { q: 'How does an Index improve query speed, and when should you avoid it?', a: 'It provides a B-Tree lookup index to locate rows quickly without full-table scans. Avoid on small tables or columns with high write frequencies, as indexes slow down INSERT/UPDATEs.' },
      { q: 'What is normalization and list 1NF, 2NF, 3NF?', a: 'Normalization structures DB schemas to reduce redundancy. 1NF: Atomic values; 2NF: No partial dependency; 3NF: No transitive dependency.' },
      { q: 'Explain the difference between primary key and unique key.', a: 'A Primary Key uniquely identifies a row and cannot be null (only one per table). A Unique Key ensures uniqueness but can contain NULL values (multiple allowed).' },
      { q: 'What is a Common Table Expression (CTE)?', a: 'A temporary named result set defined within the execution scope of a single query, improving query readability.' },
      { q: 'What are Window Functions?', a: 'Functions (like ROW_NUMBER(), RANK(), SUM() OVER()) that perform calculations across a set of table rows related to the current row without merging them.' }
    ]
  },
  cloud: {
    title: 'Cloud Computing (AWS)',
    description: 'Design and deploy scalable, fault-tolerant architectures on AWS. Learn EC2, S3, RDS, Lambda, and IAM.',
    estimatedTime: '40 Hours',
    difficulty: 'Intermediate',
    whatYoullLearn: [
      'Distinguish cloud models (IaaS, PaaS, SaaS) and hybrid deployments',
      'Create custom Virtual Private Clouds (VPC) with secure subnets',
      'Provision and manage virtual compute instances (EC2)',
      'Implement highly durable object storage architectures using S3',
      'Configure relational databases with RDS and DynamoDB',
      'Manage credentials and access using IAM policies',
      'Establish high availability via Auto Scaling and Load Balancing'
    ],
    prerequisites: [
      'Basic networking concepts (IP addresses, subnets)',
      'Basic Linux CLI knowledge'
    ],
    theory: 'Cloud Computing is the on-demand delivery of IT resources (compute, database, storage) over the Internet with pay-as-you-go pricing. Rather than owning and maintaining physical data centers, organizations rent access from cloud providers like Amazon Web Services (AWS), Microsoft Azure, or Google Cloud Platform (GCP).\n\nA secure cloud architecture begins with a Virtual Private Cloud (VPC), isolating network subnets. High availability is achieved using Elastic Load Balancers (ELBs) to distribute traffic and Auto Scaling groups to adjust compute capacity dynamically. IAM policies ensure the principle of least privilege.',
    definitions: [
      { term: 'VPC', def: 'Virtual Private Cloud: a private virtual network partition in the cloud.' },
      { term: 'IAM', def: 'Identity and Access Management: system managing access permissions securely.' },
      { term: 'EC2', def: 'Elastic Compute Cloud: resizable virtual servers (instances) in the cloud.' },
      { term: 'S3', def: 'Simple Storage Service: highly durable object storage service.' },
      { term: 'Lambda', def: 'Serverless compute service running code in response to events.' }
    ],
    syntax: `# AWS CLI command to upload a file to S3
aws s3 cp document.pdf s3://my-secure-bucket/docs/`,
    codeExamples: [
      {
        title: 'Terraform AWS EC2 Provisioning',
        code: `provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"

  tags = {
    Name = "WebServer"
  }
}`
      },
      {
        title: 'AWS Lambda Handler Function',
        code: `import json

def lambda_handler(event, context):
    # Process event payload
    name = event.get("name", "World")
    return {
        'statusCode': 200,
        'body': json.dumps(f"Hello, {name} from AWS Lambda!")
    }`
      }
    ],
    roadmap: [
      { step: 'Step 1', title: 'Cloud Concepts', description: 'Learn virtual models, cloud architectures, and provider global networks.' },
      { step: 'Step 2', title: 'Identity & Access (IAM)', description: 'Master IAM users, groups, roles, and resource policies.' },
      { step: 'Step 3', title: 'Networking (VPC)', description: 'Build VPCs, subnets, route tables, and gateways.' },
      { step: 'Step 4', title: 'Compute & Storage', description: 'Deploy EC2 instances and upload objects to S3 buckets.' },
      { step: 'Step 5', title: 'Cloud Databases', description: 'Deploy relational RDS and NoSQL DynamoDB tables.' },
      { step: 'Step 6', title: 'Scaling & Serverless', description: 'Implement ELB, Auto Scaling, and AWS Lambda functions.' }
    ],
    qa: [
      { q: 'What is the difference between horizontal and vertical scaling?', a: 'Vertical scaling (scale up) adds power (CPU/RAM) to an existing server. Horizontal scaling (scale out) adds more servers to the resource pool.' },
      { q: 'What is a VPC and what are public vs private subnets?', a: 'A VPC is an isolated network partition. Public subnets have routes to the Internet Gateway, enabling public IP access. Private subnets route outbound traffic via a NAT Gateway.' },
      { q: 'What is serverless computing?', a: 'A execution model where the cloud provider manages server provisioning, scaling, and maintenance. Developers only upload code, paying only for execution time (e.g. AWS Lambda).' },
      { q: 'Explain the AWS Shared Responsibility Model.', a: 'AWS is responsible for security OF the cloud (infrastructure, hardware, global networks). The customer is responsible for security IN the cloud (data, OS, configurations, IAM).' },
      { q: 'What is the difference between S3 and EBS?', a: 'S3 is object storage (accessed via API, global, highly scalable); EBS is block storage (virtual hard drive mounted directly to EC2 instances).' },
      { q: 'What is IAM and the principle of least privilege?', a: 'Identity and Access Management manages users/roles. Least privilege dictates users get only the minimum permissions required to perform their jobs.' },
      { q: 'How does an Elastic Load Balancer (ELB) work?', a: 'It automatically distributes incoming application traffic across multiple target instances (EC2, containers) to ensure high availability and fault tolerance.' },
      { q: 'What is CloudWatch?', a: 'AWS monitoring and observability service providing data on CPU usage, traffic logs, and setting alerts for system thresholds.' }
    ]
  },
  devops: {
    title: 'DevOps Engineering',
    description: 'Automate build, test, and deployment cycles using Docker, Kubernetes, Terraform, CI/CD pipelines, and Linux automation.',
    estimatedTime: '50 Hours',
    difficulty: 'Advanced',
    whatYoullLearn: [
      'Master Linux terminal navigation and Bash scripting',
      'Create optimized container images using Docker',
      'Orchestrate containerized clusters using Kubernetes',
      'Develop automated CI/CD pipelines (GitHub Actions/Jenkins)',
      'Provision cloud infrastructure with Terraform (IaC)',
      'Monitor systems utilizing Prometheus and Grafana dashboards',
      'Configure system networks, firewalls, and ports'
    ],
    prerequisites: [
      'Basic Linux command knowledge',
      'Understanding of standard git workflows'
    ],
    theory: 'DevOps is a set of practices combining Software Development (Dev) and IT Operations (Ops). It aims to shorten the systems development lifecycle and provide continuous delivery with high software quality. Key pillars include automation, continuous integration/continuous deployment (CI/CD), infrastructure as code, and active monitoring.\n\nDocker containerizes apps, packing them and their dependencies into standard units. Kubernetes orchestrates these containers at scale. Terraform automates infrastructure provisioning, treating infrastructure setup as repeatable, written code (IaC).',
    definitions: [
      { term: 'CI/CD', def: 'Continuous Integration and Continuous Deployment: pipeline automation for building, testing, and deploying.' },
      { term: 'Docker', def: 'Platform containerizing applications into isolated environments containing runtime dependencies.' },
      { term: 'Kubernetes', def: 'Open-source container orchestration engine for automating deployment, scaling, and management.' },
      { term: 'Terraform', def: 'Infrastructure as Code tool to provision and manage cloud infrastructure using declarative configuration files.' },
      { term: 'Prometheus', def: 'Open-source monitoring and alerting toolkit for collecting system metric data.' }
    ],
    syntax: `# Simple GitHub Actions CI Workflow
name: Test Pipeline
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Tests
        run: npm test`,
    codeExamples: [
      {
        title: 'Optimized Dockerfile',
        code: `# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`
      },
      {
        title: 'Kubernetes Pod Deployment YAML',
        code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: web
        image: nginx:alpine
        ports:
        - containerPort: 80`
      }
    ],
    roadmap: [
      { step: 'Step 1', title: 'Linux & Scripting', description: 'Master Linux CLI commands, permissions, SSH, and write Bash scripts.' },
      { step: 'Step 2', title: 'Git Workflows', description: 'Understand branching strategies, merging, rebasing, and hook scripts.' },
      { step: 'Step 3', title: 'Containers (Docker)', description: 'Write Dockerfiles, build images, and run multi-container docker-compose setups.' },
      { step: 'Step 4', title: 'CI/CD Pipelines', description: 'Build automated pipelines in GitHub Actions to run tests and build images.' },
      { step: 'Step 5', title: 'Infrastructure as Code', description: 'Declare resources in Terraform, manage state files, and apply changes.' },
      { step: 'Step 6', title: 'Orchestration (K8s)', description: 'Learn Pods, Deployments, Services, Ingress, and manage Kubernetes clusters.' }
    ],
    qa: [
      { q: 'What is the difference between continuous integration and continuous deployment?', a: 'CI automatically builds and tests code on every push. CD automatically deploys those tested builds to production without manual intervention.' },
      { q: 'What is the difference between a Docker image and a container?', a: 'A Docker image is a read-only template with instructions for creating a container. A container is a runnable instance of an image.' },
      { q: 'Explain Kubernetes Pods.', a: 'A Pod is the smallest deployable unit in Kubernetes, hosting one or more containers sharing storage and network namespaces.' },
      { q: 'What is Infrastructure as Code (IaC)?', a: 'Managing and provisioning infrastructure through machine-readable definition files, rather than manual physical configurations.' },
      { q: 'What is a Docker multi-stage build?', a: 'A method using multiple FROM statements in a Dockerfile, allowing you to build assets in large environments and copy only final files to slim production images.' },
      { q: 'What is git rebase vs merge?', a: 'Merge combines branches, preserving history with a merge commit. Rebase moves commits onto another base, rewriting history into a linear line.' },
      { q: 'How does Kubernetes handle self-healing?', a: 'By monitoring pods and automatically restarting failed containers, replacing pods when nodes die, and terminating pods that do not respond to health checks.' },
      { q: 'Explain the difference between mutable and immutable infrastructure.', a: 'Mutable allows modifications on active servers (updates, configs). Immutable replaces servers entirely with new instances when updates are needed.' }
    ]
  },
  security: {
    title: 'Cybersecurity & Ethical Hacking',
    description: 'Learn cybersecurity fundamentals, OWASP Top 10 vulnerabilities, secure scripting, cryptography, and network scanning.',
    estimatedTime: '35 Hours',
    difficulty: 'Intermediate',
    whatYoullLearn: [
      'Understand the CIA Triad security model',
      'Scan networks and discover ports (nmap fundamentals)',
      'Analyze the OWASP Top 10 web vulnerabilities',
      'Implement symmetric and asymmetric cryptography',
      'Prevent SQL Injection (SQLi) and Cross-Site Scripting (XSS)',
      'Conduct secure coding audits and code reviews',
      'Evaluate authentication systems (OAuth, JWT, Cookies)'
    ],
    prerequisites: [
      'Basic networking concepts (HTTP, TCP/IP)',
      'Python coding familiarity'
    ],
    theory: 'Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These cyberattacks are usually aimed at accessing, changing, or destroying sensitive information, extorting money from users, or interrupting normal business processes.\n\nSecurity engineers rely on the CIA Triad (Confidentiality, Integrity, Availability) to design secure architectures. Developers must proactively patch vulnerabilities in the OWASP Top 10 list. Symmetric encryption (same key) and asymmetric encryption (keypair) protect data in transit and at rest.',
    definitions: [
      { term: 'XSS (Cross-Site Scripting)', def: 'Vulnerability where an attacker injects malicious scripts into trusted websites.' },
      { term: 'SQL Injection (SQLi)', def: 'Exploit where malicious SQL statements are inserted into inputs to manipulate a database.' },
      { term: 'Asymmetric Cryptography', def: 'Cryptographic system using pairs of keys: Public keys and Private keys.' },
      { term: 'Pen Testing', def: 'Penetration testing: simulated cyberattacks to discover security vulnerabilities.' },
      { term: 'CIA Triad', def: 'Core security model: Confidentiality, Integrity, Availability.' }
    ],
    syntax: `# Safe SQL parameterization in Python (prevents SQLi)
cursor.execute("SELECT * FROM users WHERE username = %s", (user_input,))`,
    codeExamples: [
      {
        title: 'Cryptographic Hashing with Salt',
        code: `import hashlib
import os

def hash_password(password: str):
    # Generate 16-byte random salt
    salt = os.urandom(16)
    # Hash password with salt using PBKDF2
    key = hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 100000)
    return salt + key

# Test hashing
print(hash_password("mySecurePassword123").hex()[:32])`
      },
      {
        title: 'Sanitizing HTML inputs (prevents XSS)',
        code: `// Function to escape HTML special characters
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

const userComment = "<script>alert('XSS')</script>";
console.log(escapeHTML(userComment)); 
// &lt;script&gt;alert(&#39;XSS&#39;)&lt;/script&gt;`
      }
    ],
    roadmap: [
      { step: 'Step 1', title: 'Security Basics', description: 'Learn security models, the CIA triad, and authentication protocols.' },
      { step: 'Step 2', title: 'Network Security', description: 'Master ports, firewalls, and command tools (ping, nmap, wireshark).' },
      { step: 'Step 3', title: 'OWASP Web Flaws', description: 'Analyze injection attacks, broken access controls, and sensitive data exposures.' },
      { step: 'Step 4', title: 'Basic Cryptography', description: 'Implement symmetric AES, asymmetric RSA, and secure hashing (bcrypt).' },
      { step: 'Step 5', title: 'App Assessment', description: 'Run penetration scans, exploit payloads safely, and review logs.' },
      { step: 'Step 6', title: 'Secure Development', description: 'Learn threat modeling, input validation, and DevSecOps tooling.' }
    ],
    qa: [
      { q: 'What is the difference between symmetric and asymmetric encryption?', a: 'Symmetric uses a single shared key for encryption and decryption. Asymmetric uses a public key to encrypt and a private key to decrypt.' },
      { q: 'What is SQL Injection and how do you prevent it?', a: 'SQLi occurs when user inputs are concatenated directly into SQL queries. Prevent it using Parameterized Queries or ORMs.' },
      { q: 'Explain Cross-Site Scripting (XSS).', a: 'Attackers inject scripts into trusted pages. The browser runs these scripts, potentially leaking user session cookies. Prevent by escaping outputs and using Content Security Policy (CSP).' },
      { q: 'What is the CIA Triad?', a: 'Confidentiality (only authorized see data), Integrity (data is accurate/unmodified), Availability (systems accessible when needed).' },
      { q: 'What is the difference between hashing and encryption?', a: 'Hashing is a one-way function converting inputs to a fixed-size string (irreversible). Encryption is a two-way function (reversible with a key).' },
      { q: 'What is a Man-in-the-Middle (MITM) attack?', a: 'An attack where the attacker secretly intercepts and relays communications between two parties. Prevented via HTTPS and TLS.' },
      { q: 'Explain CSRF (Cross-Site Request Forgery).', a: 'An attack forcing an authenticated browser to send requests to a web application. Prevented using anti-CSRF tokens and SameSite cookie policies.' },
      { q: 'What is the purpose of a Content Security Policy (CSP)?', a: 'A HTTP header allowing site operators to restrict which resources (JS, CSS, Images) the browser can load, mitigating XSS.' }
    ]
  },
  systemdesign: {
    title: 'System Design & Architecture',
    description: 'Design highly available distributed systems. Learn microservices, caching, database sharding, and the CAP theorem.',
    estimatedTime: '50 Hours',
    difficulty: 'Advanced',
    whatYoullLearn: [
      'Scale systems horizontally vs vertically',
      'Choose optimal load balancing algorithms',
      'Implement server-side caching (Redis/Memcached)',
      'Analyze database replication and sharding strategies',
      'Structure applications using Microservices',
      'Evaluate trade-offs using the CAP Theorem',
      'Integrate asynchronous workers and message queues'
    ],
    prerequisites: [
      'Backend web development foundation',
      'Database principles (SQL/NoSQL)'
    ],
    theory: 'System Design is the process of defining the architecture, modules, interfaces, and data structures for a system to satisfy specified requirements. Designing systems at scale involves addressing constraints like high throughput, low latency, fault tolerance, and cost efficiency.\n\nDistributed architectures utilize Load Balancers to distribute incoming traffic. Caching layer implementations (like Redis) store frequent query results in memory to minimize DB reads. CAP Theorem guides design choices regarding trade-offs between consistency, availability, and partition tolerance.',
    definitions: [
      { term: 'CAP Theorem', def: 'A distributed system can guarantee at most two out of three: Consistency, Availability, Partition Tolerance.' },
      { term: 'Load Balancer', def: 'Device distributing traffic across servers to optimize resource utilization and reliability.' },
      { term: 'Database Sharding', def: 'Partitioning a database horizontally to spread the data load across multiple servers.' },
      { term: 'Redis', def: 'In-memory key-value data store used as database, cache, and message broker.' },
      { term: 'Microservices', def: 'Architectural style decomposing applications into collections of loosely coupled, deployable services.' }
    ],
    syntax: `// Cache-aside pattern pseudocode
async function getCachedData(key) {
    let data = await redis.get(key);
    if (!data) {
        data = await db.query(key);
        await redis.setex(key, 3600, data);
    }
    return data;
}`,
    codeExamples: [
      {
        title: 'Consistent Hashing Ring',
        code: `import hashlib

class ConsistentHashing:
    def __init__(self, nodes=None):
        self.ring = {}
        self.sorted_keys = []
        if nodes:
            for node in nodes:
                self.add_node(node)

    def add_node(self, node):
        h_key = int(hashlib.md5(node.encode()).hexdigest(), 16)
        self.ring[h_key] = node
        self.sorted_keys.append(h_key)
        self.sorted_keys.sort()

    def get_node(self, key):
        if not self.ring:
            return None
        h_key = int(hashlib.md5(key.encode()).hexdigest(), 16)
        for val in self.sorted_keys:
            if h_key <= val:
                return self.ring[val]
        return self.ring[self.sorted_keys[0]]

ch = ConsistentHashing(["Server1", "Server2", "Server3"])
print("Key mapped to:", ch.get_node("user_session_1052"))`
      },
      {
        title: 'Rate Limiter (Token Bucket Algorithm)',
        code: `import time

class TokenBucket:
    def __init__(self, capacity, fill_rate):
        self.capacity = capacity
        self.fill_rate = fill_rate
        self.tokens = capacity
        self.last_fill = time.time()

    def allow_request(self):
        now = time.time()
        elapsed = now - self.last_fill
        self.tokens = min(self.capacity, self.tokens + elapsed * self.fill_rate)
        self.last_fill = now
        if self.tokens >= 1:
            self.tokens -= 1
            return True
        return False`
      }
    ],
    roadmap: [
      { step: 'Step 1', title: 'Scalability Basics', description: 'Learn latency, throughput, vertical vs horizontal scaling, and SLA goals.' },
      { step: 'Step 2', title: 'Load Balancing', description: 'Implement Nginx/HAProxy load balancers and understand routing logic.' },
      { step: 'Step 3', title: 'Caching', description: 'Configure CDNs, read-through caches, and utilize Redis.' },
      { step: 'Step 4', title: 'Database Scalability', description: 'Learn primary-replica replication, vertical partitioning, and table sharding.' },
      { step: 'Step 5', title: 'Queues & Messaging', description: 'Implement publish-subscribe event flows using Kafka or RabbitMQ.' },
      { step: 'Step 6', title: 'Microservice Design', description: 'Understand API gateways, service discovery, and circuit breakers.' }
    ],
    qa: [
      { q: 'What is CAP Theorem?', a: 'It states a distributed system can only provide two of: Consistency (all nodes see same data), Availability (every request receives success/error), Partition Tolerance (system functions despite network losses).' },
      { q: 'What is database sharding?', a: 'Horizontally partitioning rows of a table across multiple database engines based on a shard key, preventing database storage bottlenecks.' },
      { q: 'How does a Content Delivery Network (CDN) work?', a: 'A CDN is a network of geographically distributed edge servers that cache static assets (HTML, images) closer to users, reducing latency.' },
      { q: 'Explain the Cache-Aside pattern.', a: 'The application queries the cache first. If a cache miss occurs, it queries the database, writes the result to the cache, and returns it.' },
      { q: 'What is the difference between SQL and NoSQL?', a: 'SQL is relational, structured, schema-bound, and ACID-compliant. NoSQL is non-relational, flexible-schema, horizontally scalable, and BASE-compliant.' },
      { q: 'What is DNS (Domain Name System)?', a: 'The system translating human-readable hostnames (example.com) to IP addresses (192.0.2.1) using hierarchical lookups.' },
      { q: 'Explain rate limiting and common algorithms.', a: 'Restricting client requests to prevent API abuse. Common algorithms: Token Bucket, Leaky Bucket, Sliding Window Log.' },
      { q: 'What is a Message Queue and when should it be used?', a: 'Asynchronous communication broker (e.g. RabbitMQ, Kafka) that decouples tasks, smoothing peak traffic loads.' }
    ]
  },
  testing: {
    title: 'Software Testing & QA',
    description: 'Learn unit, integration, and E2E testing strategies using Jest, Pytest, and Cypress.',
    estimatedTime: '30 Hours',
    difficulty: 'Intermediate',
    whatYoullLearn: [
      'Apply the Testing Pyramid methodology',
      'Write comprehensive unit tests with Jest and Pytest',
      'Mock external dependencies and modules in tests',
      'Design integration tests verifying component linkages',
      'Execute End-to-End browser tests (Cypress/Playwright)',
      'Build code under Test-Driven Development (TDD) principles',
      'Measure and analyze code coverage metrics'
    ],
    prerequisites: [
      'Basic programming syntax knowledge',
      'Familiarity with terminal commands'
    ],
    theory: 'Software Testing is the process of evaluating code to ensure it meets requirements and behaves as expected. Robust testing mitigates bugs, facilitates refactoring, and ensures deployment stability.\n\nThe Testing Pyramid recommends structuring tests into three layers: Unit Tests (testing isolated functions), Integration Tests (testing interactions between components), and End-to-End (E2E) Tests (simulating actual user interactions in a real browser environment).',
    definitions: [
      { term: 'Unit Test', def: 'Testing the smallest testable parts (functions/methods) of an application in isolation.' },
      { term: 'TDD', def: 'Test-Driven Development: writing tests before writing the actual production code.' },
      { term: 'Mocking', def: 'Replacing actual external dependencies (like databases or APIs) with controlled test doubles.' },
      { term: 'E2E Test', def: 'End-to-End testing: validating entire user journeys from frontend to database.' },
      { term: 'Code Coverage', def: 'Metric expressing the percentage of source code executed during test runs.' }
    ],
    syntax: `// Basic Jest test syntax
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});`,
    codeExamples: [
      {
        title: 'Jest Unit Test with API Mocking',
        code: `// userService.test.js
const axios = require('axios');
jest.mock('axios');

async function fetchUserName(id) {
    const res = await axios.get(\`/api/users/\${id}\`);
    return res.data.name;
}

test('returns user name correctly on success', async () => {
    axios.get.mockResolvedValue({ data: { id: 1, name: 'Alice' } });
    const name = await fetchUserName(1);
    expect(name).toBe('Alice');
});`
      },
      {
        title: 'Cypress E2E UI Test',
        code: `describe('Login Integration Flow', () => {
  it('navigates to dashboard after inputting correct credentials', () => {
    cy.visit('/login');
    cy.get('input[name=email]').type('user@example.com');
    cy.get('input[name=password]').type('secure123');
    cy.get('button[type=submit]').click();
    
    // Validate routing redirect
    cy.url().should('include', '/dashboard');
    cy.get('h1').should('contain', 'Welcome Back');
  });
});`
      }
    ],
    roadmap: [
      { step: 'Step 1', title: 'Testing Principles', description: 'Learn test benefits, standard asserts, and the Testing Pyramid.' },
      { step: 'Step 2', title: 'Unit Tests', description: 'Write unit tests in Jest (JS) or Pytest (Python).' },
      { step: 'Step 3', title: 'Mocking & Spies', description: 'Isolate code dependencies using mocks, stubs, and spy assertions.' },
      { step: 'Step 4', title: 'Integration Tests', description: 'Verify DB connections and API routes under local environments.' },
      { step: 'Step 5', title: 'E2E Testing', description: 'Install Cypress or Playwright and write script-based user interactions.' },
      { step: 'Step 6', title: 'TDD & CI', description: 'Write failing tests first (Red), pass them (Green), and run suites inside Github Actions.' }
    ],
    qa: [
      { q: 'What is the Testing Pyramid?', a: 'A guide suggesting writing many unit tests, some integration tests, and very few E2E tests, optimizing cost, speed, and reliability.' },
      { q: 'What is the difference between unit and integration testing?', a: 'Unit tests verify single functions in isolation. Integration tests verify that multiple modules or systems work together correctly.' },
      { q: 'Explain Test-Driven Development (TDD).', a: 'A methodology with three phases: Red (write a failing test), Green (write minimum code to pass), Refactor (clean up code while keeping test green).' },
      { q: 'What is the difference between a Mock and a Stub?', a: 'A Stub provides canned data to calls made during the test. A Mock verifies behavior, asserting that certain methods were called.' },
      { q: 'What is code coverage?', a: 'A metric showing how much code is executed by tests. Types include Statement, Branch, Function, and Line coverage.' },
      { q: 'What is regression testing?', a: 'Running existing tests after making changes to verify that the updates did not introduce new bugs.' },
      { q: 'Why should you avoid testing internal implementation details?', a: 'Tests that rely on internal details break during refactoring even if the external behavior remains identical, leading to brittle tests.' },
      { q: 'How does Cypress run tests differently than Selenium?', a: 'Cypress runs directly inside the browser run-loop, yielding faster executions and native access to DOM elements, whereas Selenium controls the browser remotely via drivers.' }
    ]
  },
  git: {
    title: 'Git & Version Control',
    description: 'Master version control operations, repository structures, branches, rebases, and merge conflict resolutions.',
    estimatedTime: '20 Hours',
    difficulty: 'Beginner',
    whatYoullLearn: [
      'Understand Git\'s three-stage local architecture',
      'Execute core commands (add, commit, status, log)',
      'Analyze Git branching models (Git Flow vs Trunk-based)',
      'Resolve complex merge conflicts manually',
      'Use stashing, resetting, and cherry-picking commands',
      'Collaborate using remote operations (clone, fetch, push, pull)',
      'Review project histories using filter logs'
    ],
    prerequisites: [
      'Terminal/Command Line navigation basics',
      'No code versioning experience required'
    ],
    theory: 'Git is a distributed version control system designed to track changes in source code during software development. It allows multiple developers to work on a codebase simultaneously without overwriting each other\'s changes.\n\nGit operates on a three-stage system: the Working Directory (modified files), the Staging Area (indexed files ready for commit), and the Local Repository (committed history). Remotes are hosted repositories on platforms like GitHub, GitLab, or Bitbucket.',
    definitions: [
      { term: 'Commit', def: 'A snapshot of the staged changes saved to the repository history.' },
      { term: 'Staging Area', def: 'An intermediate index file prepping which files go into the next commit.' },
      { term: 'Merge Conflict', def: 'Event occurring when Git cannot automatically resolve differences in code edits between branches.' },
      { term: 'Rebase', def: 'Moving or combining a sequence of commits to a new base commit.' },
      { term: 'Remote', def: 'Shared repository hosted on network servers (like GitHub) for team collaboration.' }
    ],
    syntax: `# General git workflow
git status
git add .
git commit -m "feat: implement user authentication"
git push origin main`,
    codeExamples: [
      {
        title: 'Resolving a Merge Conflict',
        code: `# 1. Start merge
git merge feature-branch

# 2. If conflict, open file and choose edits between:
<<<<<<< HEAD
code in main branch
=======
code in feature branch
>>>>>>> feature-branch

# 3. Save, stage and commit
git add conflict-resolved-file.js
git commit -m "merge: resolve conflict with feature-branch"`
      },
      {
        title: 'Git Stash & Retrieve',
        code: `# Save uncommitted changes to temporary storage
git stash

# Switch branches, do emergency hotfix
git checkout main
# ... fix bug ...

# Return and apply stashed work
git checkout dev
git stash pop`
      }
    ],
    roadmap: [
      { step: 'Step 1', title: 'Git Configuration', description: 'Install Git, config username, email, and initialize local repos.' },
      { step: 'Step 2', title: 'Basic Operations', description: 'Master git status, add, commit, diff, and log histories.' },
      { step: 'Step 3', title: 'Branching & Merging', description: 'Create branches, switch branches, and merge code.' },
      { step: 'Step 4', title: 'Remote Operations', description: 'Add remote urls, fetch, pull, and push updates.' },
      { step: 'Step 5', title: 'Rebasing & Conflicts', description: 'Learn git rebase and resolve merge conflicts.' },
      { step: 'Step 6', title: 'Advanced Committing', description: 'Master git stash, cherry-pick, reset, and log graphs.' }
    ],
    qa: [
      { q: 'What is the difference between Git and GitHub?', a: 'Git is the local CLI version-control tool. GitHub is a cloud hosting service for Git repositories.' },
      { q: 'What is the difference between git pull and git fetch?', a: 'git fetch downloads remote commits but doesn\'t change your working directory. git pull runs git fetch and then automatically merges changes into your active branch.' },
      { q: 'How does git reset differ from git revert?', a: 'git reset removes commits from history (rewrites history). git revert creates a new commit that applies opposite changes, preserving history.' },
      { q: 'What is a merge conflict and how is it resolved?', a: 'It happens when edits are made to the same lines of a file on different branches. Resolve by opening files, selecting code within conflict markers, staging, and committing.' },
      { q: 'Explain the staging area in Git.', a: 'A middle ground indexing file changes. It allows you to select exactly which changes to include in your next commit.' },
      { q: 'What is git stash?', a: 'A command that temporarily shelves uncommitted changes, leaving your working directory clean, so you can switch branches.' },
      { q: 'What does git cherry-pick do?', a: 'Applies the changes introduced by an existing commit from another branch onto your current active branch.' },
      { q: 'How do you undo the last commit before pushing?', a: 'Use git reset --soft HEAD~1. This removes the commit but leaves your changes staged in the working directory.' }
    ]
  },
  aptitude: {
    title: 'Quantitative & Logical Aptitude',
    description: 'Master core mathematics, ratios, probability calculations, clock and train puzzles, and deductive reasoning skills.',
    estimatedTime: '30 Hours',
    difficulty: 'Beginner',
    whatYoullLearn: [
      'Calculate percentages, profits, losses, and discounts',
      'Solve ratio, proportion, and average speed problems',
      'Solve time, speed, and relative distance word puzzles',
      'Calculate permutations, combinations, and basic probabilities',
      'Analyze data charts, tables, and logical Venn diagrams',
      'Master clock and calendar reasoning shortcuts',
      'Solve simultaneous work rate formulations'
    ],
    prerequisites: [
      'Basic arithmetic operations',
      'Elementary school-level mathematical principles'
    ],
    theory: 'Quantitative and Logical Aptitude measures an individual\'s analytical thinking, numerical ability, and problem-solving skills. Aptitude rounds are standard screening barriers in software engineering recruitment, evaluating how candidates structure logical steps.\n\nTopics span algebraic calculations, probability calculations, spatial patterns, and data analysis. Improving aptitude speed requires understanding core formulas (like speed-distance formulas or profit-loss ratios) and practicing mental shortcuts.',
    definitions: [
      { term: 'Relative Speed', def: 'The speed of an object with respect to another moving object (calculated by adding or subtracting speeds).' },
      { term: 'Probability', def: 'The mathematical calculation of the likelihood that a specific event will occur.' },
      { term: 'Simple Interest', def: 'Interest calculated solely on the principal amount of money lent or borrowed.' },
      { term: 'Compound Interest', def: 'Interest calculated on both the initial principal and the accumulated interest of prior periods.' },
      { term: 'Venn Diagram', def: 'A diagram showing logical relations between sets.' }
    ],
    syntax: `# Formulas represented as functions
def calculate_work_together(time_A, time_B):
    # If A takes time_A and B takes time_B, together they take:
    return (time_A * time_B) / (time_A + time_B)`,
    codeExamples: [
      {
        title: 'Union Set Probability Calculator',
        code: `# Probability of picking a red card or a face card from a deck of 52
total_cards = 52
red_cards = 26
face_cards = 12
red_face_cards = 6 # Intersection

# P(Red OR Face) = P(Red) + P(Face) - P(Red AND Face)
prob = (red_cards + face_cards - red_face_cards) / total_cards
print(f"Probability: {prob:.4f} ({prob * 100:.1f}%)") # 0.6154 (61.5%)`
      },
      {
        title: 'Combined Labor Rate Solver',
        code: `# If A does work in 10 days, B does in 15 days, together they do in:
a_days = 10
b_days = 15

combined_rate = (1 / a_days) + (1 / b_days)
days_together = 1 / combined_rate
print(f"Together they take: {days_together} days") # 6.0 days`
      }
    ],
    roadmap: [
      { step: 'Step 1', title: 'Number Operations', description: 'Learn factors, HCF/LCM, decimals, and basic percentage conversions.' },
      { step: 'Step 2', title: 'Ratios & Averages', description: 'Solve mixture allocations, simple averages, and age calculations.' },
      { step: 'Step 3', title: 'Commerce Math', description: 'Master profit-loss margins, discounts, simple and compound interests.' },
      { step: 'Step 4', title: 'Motion & Work', description: 'Solve work completion rates, pipes, trains, and relative speeds.' },
      { step: 'Step 5', title: 'Permutations & Chance', description: 'Master counting rules, coin/card probabilities, and distributions.' },
      { step: 'Step 6', title: 'Logical Deduction', description: 'Solve clock hand angles, calendars, and interpret data charts.' }
    ],
    qa: [
      { q: 'If a train runs at 72 km/hr, how do you convert it to meters per second?', a: 'Multiply by 5/18. So, 72 * (5/18) = 20 m/s.' },
      { q: 'What is the formula for compound interest?', a: 'A = P(1 + r/n)^(nt), where A is total amount, P is principal, r is annual interest rate, n is compounding frequency, and t is time.' },
      { q: 'What is Relative Speed when objects move in opposite directions?', a: 'Add the speeds: S_relative = S_A + S_B.' },
      { q: 'What is the probability of getting at least one head when tossing two fair coins?', a: 'Sample space: {HH, HT, TH, TT}. Favorable outcomes: {HH, HT, TH}. Probability = 3/4 (75%).' },
      { q: 'If A is 20% taller than B, how much percentage is B shorter than A?', a: 'Formula: [R / (100 + R)] * 100. So [20 / 120] * 100 = 16.67%.' },
      { q: 'What is the angle between the hands of a clock at 3:40?', a: 'Formula: Angle = |30 * H - 11/2 * M|. Here H=3, M=40. Angle = |30*3 - (11/2)*40| = |90 - 220| = 130 degrees.' },
      { q: 'If 5 men or 9 women can do a job in 19 days, how long will 3 men and 6 women take?', a: '5 men = 9 women => 1 man = 1.8 women. 3 men + 6 women = 3*1.8 + 6 = 11.4 women. 9 women take 19 days => 11.4 women take (9 * 19) / 11.4 = 15 days.' },
      { q: 'A bag contains 5 red and 7 blue balls. Two balls are drawn at random. What is the probability that they are of different colors?', a: 'Favorable: (5C1 * 7C1) / 12C2 = (5 * 7) / 66 = 35/66.' }
    ]
  }
};

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedQA, setExpandedQA] = useState({});
  const [activeExampleIndex, setActiveExampleIndex] = useState(0);
  const [copiedStates, setCopiedStates] = useState({});

  const data = courseData[courseId];

  if (!data) {
    return (
      <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Course Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          The requested course with ID "{courseId}" does not exist.
        </p>
        <button className="btn-primary" onClick={() => navigate('/courses')}>
          Return to Courses
        </button>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BookMarked size={18} /> },
    { id: 'theory', label: 'Theory & Concepts', icon: <Book size={18} /> },
    { id: 'code', label: 'Syntax & Code', icon: <CodeIcon size={18} /> },
    { id: 'roadmap', label: 'Roadmap', icon: <Map size={18} /> },
    { id: 'qa', label: 'Interview Q&A', icon: <MessageSquare size={18} /> }
  ];

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Beginner':
        return '#10B981'; // Green
      case 'Intermediate':
        return '#F59E0B'; // Orange
      case 'Advanced':
        return '#EF4444'; // Red
      default:
        return 'var(--accent-primary)';
    }
  };

  const handleToggleQA = (idx) => {
    setExpandedQA(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleCopyCode = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [key]: false }));
    }, 2000);
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      {/* Back button */}
      <button 
        className="btn-secondary"
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          marginBottom: '2rem', 
          border: 'none', 
          padding: '0.6rem 1.2rem',
          cursor: 'pointer'
        }}
        onClick={() => navigate('/courses')}
      >
        <ArrowLeft size={18} /> Back to Courses
      </button>

      {/* Header Info */}
      <div style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
          {/* Difficulty Badge */}
          <span style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.4rem', 
            fontSize: '0.85rem', 
            fontWeight: '600', 
            padding: '0.35rem 0.85rem', 
            borderRadius: '20px', 
            background: 'rgba(255, 255, 255, 0.04)',
            border: `1px solid ${getDifficultyColor(data.difficulty)}`,
            color: getDifficultyColor(data.difficulty)
          }}>
            <Award size={14} />
            {data.difficulty}
          </span>
          {/* Time Badge */}
          <span style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.4rem', 
            fontSize: '0.85rem', 
            fontWeight: '500', 
            padding: '0.35rem 0.85rem', 
            borderRadius: '20px', 
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-secondary)'
          }}>
            <Clock size={14} />
            {data.estimatedTime}
          </span>
        </div>
        <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '0.75rem', fontWeight: '800' }}>
          {data.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '800px', lineHeight: '1.6' }}>
          {data.description}
        </p>
      </div>

      {/* Navigation Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '0.75rem', 
        marginBottom: '2rem', 
        overflowX: 'auto', 
        paddingBottom: '0.5rem',
        scrollbarWidth: 'thin'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.8rem 1.6rem',
              borderRadius: '10px',
              background: activeTab === tab.id ? 'var(--accent-glow)' : 'var(--bg-card)',
              color: activeTab === tab.id ? '#fff' : 'var(--text-secondary)',
              border: `1px solid ${activeTab === tab.id ? 'var(--accent-primary)' : 'var(--border-color)'}`,
              transition: 'all 0.25s',
              whiteSpace: 'nowrap',
              fontWeight: activeTab === tab.id ? '600' : '400',
              cursor: 'pointer'
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main content display box */}
      <div className="glass-panel" style={{ minHeight: '450px', animation: 'fadeIn 0.35s ease-out' }}>
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            {/* Left learn block */}
            <div>
              <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 className="text-indigo-400" size={22} style={{ color: 'var(--accent-primary)' }} />
                What you'll learn
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {data.whatYoullLearn.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={16} style={{ color: '#10B981', flexShrink: 0, marginTop: '0.2rem' }} />
                    <span style={{ color: 'var(--text-primary)', fontSize: '0.975rem', lineHeight: '1.5' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right meta block */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.02)', 
                border: '1px solid var(--border-color)', 
                borderRadius: '12px', 
                padding: '1.5rem' 
              }}>
                <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  Prerequisites
                </h3>
                <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {data.prerequisites.map((prereq, idx) => (
                    <li key={idx} style={{ fontSize: '0.95rem' }}>{prereq}</li>
                  ))}
                </ul>
              </div>

              <div style={{ 
                background: 'rgba(99, 102, 241, 0.05)', 
                border: '1px dashed var(--accent-primary)', 
                borderRadius: '12px', 
                padding: '1.5rem',
                textAlign: 'center' 
              }}>
                <h4 style={{ color: '#fff', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Ready to test your skills?</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  Generate custom AI Mock Interviews specifically tailored for this domain.
                </p>
                <button 
                  className="btn-primary"
                  style={{ width: '100%', border: 'none', cursor: 'pointer' }}
                  onClick={() => navigate('/interviews')}
                >
                  Start Practice Interview
                </button>
              </div>
            </div>
          </div>
        )}

        {/* THEORY TAB */}
        {activeTab === 'theory' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <BookOpen size={24} style={{ color: 'var(--accent-primary)' }} />
              <h2 style={{ margin: 0, color: '#fff', fontSize: '1.6rem' }}>Theory & Concepts</h2>
            </div>
            
            <div style={{ marginBottom: '2.5rem' }}>
              {data.theory.split('\n\n').map((paragraph, index) => (
                <p 
                  key={index} 
                  style={{ 
                    color: 'var(--text-primary)', 
                    lineHeight: '1.8', 
                    marginBottom: '1.2rem', 
                    fontSize: '1.05rem' 
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            
            <h3 style={{ color: '#fff', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              Key Definitions
            </h3>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
              gap: '1.25rem' 
            }}>
              {data.definitions.map((def, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.02)', 
                    padding: '1.5rem', 
                    borderRadius: '12px', 
                    borderLeft: '4px solid var(--accent-primary)',
                    borderTop: '1px solid var(--border-color)',
                    borderRight: '1px solid var(--border-color)',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <h4 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: '600' }}>
                    {def.term}
                  </h4>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: '1.5' }}>
                    {def.def}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SYNTAX & CODE TAB */}
        {activeTab === 'code' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <CodeIcon size={24} style={{ color: 'var(--accent-primary)' }} />
              <h2 style={{ margin: 0, color: '#fff', fontSize: '1.6rem' }}>Syntax & Examples</h2>
            </div>

            {/* Basic Syntax Section */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', margin: 0 }}>Basic Syntax Structure</h3>
                <button 
                  onClick={() => handleCopyCode(data.syntax, 'syntax')}
                  style={{
                    background: 'transparent',
                    color: 'var(--text-secondary)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  {copiedStates['syntax'] ? <Check size={14} style={{ color: '#10B981' }} /> : <Copy size={14} />}
                  {copiedStates['syntax'] ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre style={{ 
                background: '#070a13', 
                padding: '1.5rem', 
                borderRadius: '10px', 
                overflowX: 'auto', 
                border: '1px solid var(--border-color)',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
              }}>
                <code style={{ color: '#38BDF8', fontFamily: '"Fira Code", monospace', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {data.syntax}
                </code>
              </pre>
            </div>

            {/* Multiple Examples Selector */}
            <div>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', marginBottom: '1rem' }}>Practical Implementations</h3>
              
              {/* Tabs for Examples */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.2rem' }}>
                {data.codeExamples.map((ex, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveExampleIndex(idx);
                      // Clear previous copied state just in case
                    }}
                    style={{
                      background: 'transparent',
                      color: activeExampleIndex === idx ? 'var(--text-primary)' : 'var(--text-secondary)',
                      border: 'none',
                      borderBottom: activeExampleIndex === idx ? '2px solid var(--accent-primary)' : '2px solid transparent',
                      padding: '0.5rem 1rem',
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                      fontWeight: activeExampleIndex === idx ? '600' : '400',
                      transition: 'all 0.2s'
                    }}
                  >
                    {ex.title}
                  </button>
                ))}
              </div>

              {/* Active Example Code */}
              <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '1rem', top: '1rem', zIndex: 10 }}>
                  <button 
                    onClick={() => handleCopyCode(data.codeExamples[activeExampleIndex].code, `ex-${activeExampleIndex}`)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.4rem 0.75rem',
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    {copiedStates[`ex-${activeExampleIndex}`] ? <Check size={12} style={{ color: '#10B981' }} /> : <Copy size={12} />}
                    {copiedStates[`ex-${activeExampleIndex}`] ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
                <pre style={{ 
                  background: '#070a13', 
                  padding: '2rem 1.5rem 1.5rem 1.5rem', 
                  borderRadius: '10px', 
                  overflowX: 'auto', 
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                }}>
                  <code style={{ color: '#e2e8f0', fontFamily: '"Fira Code", monospace', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    {data.codeExamples[activeExampleIndex].code}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* ROADMAP TAB */}
        {activeTab === 'roadmap' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <Map size={24} style={{ color: 'var(--accent-primary)' }} />
              <h2 style={{ margin: 0, color: '#fff', fontSize: '1.6rem' }}>Learning Roadmap</h2>
            </div>
            
            <div style={{ position: 'relative', paddingLeft: '2.5rem' }}>
              {/* Dotted Vertical Timeline line */}
              <div style={{ 
                position: 'absolute', 
                left: '9px', 
                top: '0.5rem', 
                bottom: '0.5rem', 
                width: '2px', 
                borderLeft: '2px dashed var(--border-color)' 
              }} />
              
              {data.roadmap.map((step, idx) => (
                <div key={idx} style={{ position: 'relative', marginBottom: '2.5rem' }}>
                  {/* Outer point circle */}
                  <div style={{
                    position: 'absolute',
                    left: '-2.45rem',
                    top: '0.1rem',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'var(--bg-primary)',
                    border: '3px solid var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2
                  }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <span style={{ 
                      color: 'var(--accent-secondary)', 
                      fontWeight: '600', 
                      fontSize: '0.8rem', 
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {step.step}
                    </span>
                    <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>
                      {step.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.975rem', lineHeight: '1.6', maxWidth: '750px' }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INTERVIEW Q&A TAB */}
        {activeTab === 'qa' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <MessageSquare size={24} style={{ color: 'var(--accent-primary)' }} />
              <h2 style={{ margin: 0, color: '#fff', fontSize: '1.6rem' }}>Interview Q&A</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>
              Click on a question to expand and review its comprehensive educational answer.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {data.qa.map((qaItem, idx) => {
                const isOpen = !!expandedQA[idx];
                return (
                  <div 
                    key={idx} 
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {/* Header trigger */}
                    <button
                      onClick={() => handleToggleQA(idx)}
                      style={{
                        width: '100%',
                        padding: '1.25rem 1.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: isOpen ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
                        color: isOpen ? 'var(--accent-primary)' : 'var(--text-primary)',
                        textAlign: 'left',
                        fontSize: '1.05rem',
                        fontWeight: '600',
                        border: 'none',
                        cursor: 'pointer',
                        gap: '1rem'
                      }}
                    >
                      <span>{idx + 1}. {qaItem.q}</span>
                      {isOpen ? <ChevronUp size={18} style={{ flexShrink: 0 }} /> : <ChevronDown size={18} style={{ flexShrink: 0 }} />}
                    </button>
                    
                    {/* Expandable answer panel */}
                    {isOpen && (
                      <div style={{ 
                        padding: '1.5rem', 
                        borderTop: '1px solid var(--border-color)', 
                        background: 'rgba(0, 0, 0, 0.15)',
                        animation: 'fadeIn 0.2s ease-out'
                      }}>
                        <p style={{ 
                          margin: 0, 
                          color: 'var(--text-secondary)', 
                          lineHeight: '1.7', 
                          fontSize: '0.975rem' 
                        }}>
                          {qaItem.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
      
      {/* Local keyframes styling */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
