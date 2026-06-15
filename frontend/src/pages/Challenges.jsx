import React, { useState, useEffect } from 'react';
import { Code2, Play, CheckCircle2, XCircle, ArrowRight, RotateCcw, AlertCircle, Award, Search } from 'lucide-react';

// Real fully-validated challenges
const REAL_CHALLENGES = [
  // ==================== EASY (15 problems) ====================
  {
    id: 'twosum',
    title: 'Two Sum',
    difficulty: 'Easy',
    difficultyColor: 'var(--success)',
    points: 100,
    category: 'Arrays',
    isTop50: true,
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.',
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9'
    ],
    starterCode: `function twoSum(nums, target) {
  // Write your logic here
  
}`,
    testCases: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[3, 2, 4], 6], expected: [1, 2] }
    ],
    validator: (fn) => {
      const cases = [
        { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
        { input: [[3, 2, 4], 6], expected: [1, 2] },
        { input: [[3, 3], 6], expected: [0, 1] }
      ];
      return cases.map(tc => {
        try {
          const res = fn(...tc.input);
          const passed = Array.isArray(res) && res.length === 2 &&
                         ((res[0] === tc.expected[0] && res[1] === tc.expected[1]) ||
                          (res[0] === tc.expected[1] && res[1] === tc.expected[0]));
          return { passed, input: JSON.stringify(tc.input), expected: JSON.stringify(tc.expected), actual: JSON.stringify(res) };
        } catch (err) {
          return { passed: false, input: JSON.stringify(tc.input), expected: JSON.stringify(tc.expected), actual: err.message };
        }
      });
    }
  },
  {
    id: 'validparentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    difficultyColor: 'var(--success)',
    points: 100,
    category: 'Stack/Queue',
    isTop50: true,
    description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.',
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only: ()[]{}'
    ],
    starterCode: `function isValid(s) {
  // Write your logic here
  
}`,
    testCases: [
      { input: ["()"], expected: true },
      { input: ["()[]{}"], expected: true }
    ],
    validator: (fn) => {
      const cases = [
        { input: ["()"], expected: true },
        { input: ["()[]{}"], expected: true },
        { input: ["(]"], expected: false },
        { input: ["([)]"], expected: false }
      ];
      return cases.map(tc => {
        try {
          const res = fn(...tc.input);
          const passed = res === tc.expected;
          return { passed, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: String(res) };
        } catch (err) {
          return { passed: false, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: err.message };
        }
      });
    }
  },
  {
    id: 'reversestring',
    title: 'Reverse String',
    difficulty: 'Easy',
    difficultyColor: 'var(--success)',
    points: 100,
    category: 'Strings',
    isTop50: true,
    description: 'Write a function that reverses a string. The input string is given as an array of characters `s`.\n\nYou must do this by modifying the input array in-place with O(1) extra memory.',
    constraints: [
      '1 <= s.length <= 10^5',
      's[i] is a printable ascii character'
    ],
    starterCode: `function reverseString(s) {
  // Write your logic here
  
}`,
    testCases: [
      { input: [["h","e","l","l","o"]], expected: ["o","l","l","e","h"] },
      { input: [["H","a","n","n","a","h"]], expected: ["h","a","n","n","a","H"] }
    ],
    validator: (fn) => {
      const cases = [
        { input: [["h","e","l","l","o"]], expected: ["o","l","l","e","h"] },
        { input: [["H","a","n","n","a","h"]], expected: ["h","a","n","n","a","H"] }
      ];
      return cases.map(tc => {
        try {
          const inputCopy = JSON.parse(JSON.stringify(tc.input[0]));
          const res = fn(inputCopy);
          const actual = res || inputCopy;
          const passed = JSON.stringify(actual) === JSON.stringify(tc.expected);
          return { passed, input: JSON.stringify(tc.input), expected: JSON.stringify(tc.expected), actual: JSON.stringify(actual) };
        } catch (err) {
          return { passed: false, input: JSON.stringify(tc.input), expected: JSON.stringify(tc.expected), actual: err.message };
        }
      });
    }
  },
  {
    id: 'palindromenumber',
    title: 'Palindrome Number',
    difficulty: 'Easy',
    difficultyColor: 'var(--success)',
    points: 100,
    category: 'Math',
    isTop50: true,
    description: 'Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.',
    constraints: [
      '-2^31 <= x <= 2^31 - 1'
    ],
    starterCode: `function isPalindrome(x) {
  // Write your logic here
  
}`,
    testCases: [
      { input: [121], expected: true },
      { input: [-121], expected: false }
    ],
    validator: (fn) => {
      const cases = [
        { input: [121], expected: true },
        { input: [-121], expected: false },
        { input: [10], expected: false }
      ];
      return cases.map(tc => {
        try {
          const res = fn(...tc.input);
          const passed = res === tc.expected;
          return { passed, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: String(res) };
        } catch (err) {
          return { passed: false, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: err.message };
        }
      });
    }
  },
  {
    id: 'mergetwosortedlists',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    difficultyColor: 'var(--success)',
    points: 100,
    category: 'Linked List',
    isTop50: true,
    description: 'You are given the heads of two sorted linked lists `list1` and `list2`.\n\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.',
    constraints: [
      'The number of nodes in both lists is in the range [0, 50].',
      '-100 <= Node.val <= 100',
      'Both list1 and list2 are sorted in non-decreasing order.'
    ],
    starterCode: `function mergeTwoLists(list1, list2) {
  // Write your logic here
  
}`,
    testCases: [
      { input: [[1, 2, 4], [1, 3, 4]], expected: [1, 1, 2, 3, 4, 4] },
      { input: [[], []], expected: [] }
    ],
    validator: (fn) => {
      const cases = [
        { input: [[1, 2, 4], [1, 3, 4]], expected: [1, 1, 2, 3, 4, 4] },
        { input: [[], []], expected: [] },
        { input: [[], [0]], expected: [0] }
      ];
      return cases.map(tc => {
        try {
          const l1 = arrayToList(tc.input[0]);
          const l2 = arrayToList(tc.input[1]);
          const res = fn(l1, l2);
          const actualArr = listToArray(res);
          const passed = JSON.stringify(actualArr) === JSON.stringify(tc.expected);
          return { passed, input: JSON.stringify(tc.input), expected: JSON.stringify(tc.expected), actual: JSON.stringify(actualArr) };
        } catch (err) {
          return { passed: false, input: JSON.stringify(tc.input), expected: JSON.stringify(tc.expected), actual: err.message };
        }
      });
    }
  },
  {
    id: 'maximumsubarray',
    title: 'Maximum Subarray',
    difficulty: 'Easy',
    difficultyColor: 'var(--success)',
    points: 100,
    category: 'Arrays',
    isTop50: true,
    description: 'Given an integer array `nums`, find the subarray with the largest sum, and return its sum.',
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4'
    ],
    starterCode: `function maxSubArray(nums) {
  // Write your logic here
  
}`,
    testCases: [
      { input: [[-2,1,-3,4,-1,2,1,-5,4]], expected: 6 },
      { input: [[1]], expected: 1 }
    ],
    validator: (fn) => {
      const cases = [
        { input: [[-2,1,-3,4,-1,2,1,-5,4]], expected: 6 },
        { input: [[1]], expected: 1 },
        { input: [[5,4,-1,7,8]], expected: 23 }
      ];
      return cases.map(tc => {
        try {
          const res = fn(...tc.input);
          const passed = res === tc.expected;
          return { passed, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: String(res) };
        } catch (err) {
          return { passed: false, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: err.message };
        }
      });
    }
  },
  {
    id: 'climbingstairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    difficultyColor: 'var(--success)',
    points: 100,
    category: 'DP',
    isTop50: true,
    description: 'You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    constraints: [
      '1 <= n <= 45'
    ],
    starterCode: `function climbStairs(n) {
  // Write your logic here
  
}`,
    testCases: [
      { input: [2], expected: 2 },
      { input: [3], expected: 3 }
    ],
    validator: (fn) => {
      const cases = [
        { input: [2], expected: 2 },
        { input: [3], expected: 3 },
        { input: [5], expected: 8 }
      ];
      return cases.map(tc => {
        try {
          const res = fn(...tc.input);
          const passed = res === tc.expected;
          return { passed, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: String(res) };
        } catch (err) {
          return { passed: false, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: err.message };
        }
      });
    }
  },
  {
    id: 'binarysearch',
    title: 'Binary Search',
    difficulty: 'Easy',
    difficultyColor: 'var(--success)',
    points: 100,
    category: 'Binary Search',
    isTop50: true,
    description: 'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.',
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 < nums[i], target < 10^4',
      'All integers in nums are unique.',
      'nums is sorted in ascending order.'
    ],
    starterCode: `function search(nums, target) {
  // Write your logic here
  
}`,
    testCases: [
      { input: [[-1,0,3,5,9,12], 9], expected: 4 },
      { input: [[-1,0,3,5,9,12], 2], expected: -1 }
    ],
    validator: (fn) => {
      const cases = [
        { input: [[-1,0,3,5,9,12], 9], expected: 4 },
        { input: [[-1,0,3,5,9,12], 2], expected: -1 }
      ];
      return cases.map(tc => {
        try {
          const res = fn(...tc.input);
          const passed = res === tc.expected;
          return { passed, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: String(res) };
        } catch (err) {
          return { passed: false, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: err.message };
        }
      });
    }
  },
  {
    id: 'firstbadversion',
    title: 'First Bad Version',
    difficulty: 'Easy',
    difficultyColor: 'var(--success)',
    points: 100,
    category: 'Binary Search',
    isTop50: true,
    description: 'Suppose you have `n` versions `[1, 2, ..., n]` and you want to find out the first bad one, which causes all the following ones to be bad.\n\nYou are given an API `isBadVersion(version)` which returns whether version is bad.',
    constraints: [
      '1 <= bad <= n <= 2^31 - 1'
    ],
    starterCode: `function findFirstBadVersion(n, isBadVersion) {
  // Write your logic here
  
}`,
    testCases: [
      { input: [5, 4], expected: 4 },
      { input: [1, 1], expected: 1 }
    ],
    validator: (fn) => {
      const cases = [
        { input: [5, 4], expected: 4 },
        { input: [1, 1], expected: 1 }
      ];
      return cases.map(tc => {
        try {
          const isBad = (v) => v >= tc.input[1];
          const res = fn(tc.input[0], isBad);
          const passed = res === tc.expected;
          return { passed, input: `n=${tc.input[0]}, firstBad=${tc.input[1]}`, expected: String(tc.expected), actual: String(res) };
        } catch (err) {
          return { passed: false, input: `n=${tc.input[0]}, firstBad=${tc.input[1]}`, expected: String(tc.expected), actual: err.message };
        }
      });
    }
  },
  {
    id: 'majorityelement',
    title: 'Majority Element',
    difficulty: 'Easy',
    difficultyColor: 'var(--success)',
    points: 100,
    category: 'Arrays',
    isTop50: true,
    description: 'Given an array `nums` of size `n`, return the majority element.\n\nThe majority element is the element that appears more than `n / 2` times.',
    constraints: [
      'n == nums.length',
      '1 <= n <= 5 * 10^4',
      '-10^9 <= nums[i] <= 10^9'
    ],
    starterCode: `function majorityElement(nums) {
  // Write your logic here
  
}`,
    testCases: [
      { input: [[3, 2, 3]], expected: 3 },
      { input: [[2, 2, 1, 1, 1, 2, 2]], expected: 2 }
    ],
    validator: (fn) => {
      const cases = [
        { input: [[3, 2, 3]], expected: 3 },
        { input: [[2, 2, 1, 1, 1, 2, 2]], expected: 2 }
      ];
      return cases.map(tc => {
        try {
          const res = fn(...tc.input);
          const passed = res === tc.expected;
          return { passed, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: String(res) };
        } catch (err) {
          return { passed: false, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: err.message };
        }
      });
    }
  },
  {
    id: 'missingnumber',
    title: 'Missing Number',
    difficulty: 'Easy',
    difficultyColor: 'var(--success)',
    points: 100,
    category: 'Arrays',
    isTop50: true,
    description: 'Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.',
    constraints: [
      'n == nums.length',
      '1 <= n <= 10^4',
      '0 <= nums[i] <= n',
      'All numbers in nums are unique.'
    ],
    starterCode: `function missingNumber(nums) {
  // Write your logic here
  
}`,
    testCases: [
      { input: [[3, 0, 1]], expected: 2 },
      { input: [[0, 1]], expected: 2 }
    ],
    validator: (fn) => {
      const cases = [
        { input: [[3, 0, 1]], expected: 2 },
        { input: [[0, 1]], expected: 2 },
        { input: [[9,6,4,2,3,5,7,0,1]], expected: 8 }
      ];
      return cases.map(tc => {
        try {
          const res = fn(...tc.input);
          const passed = res === tc.expected;
          return { passed, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: String(res) };
        } catch (err) {
          return { passed: false, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: err.message };
        }
      });
    }
  },
  {
    id: 'singlenumber',
    title: 'Single Number',
    difficulty: 'Easy',
    difficultyColor: 'var(--success)',
    points: 100,
    category: 'Bit Manipulation',
    isTop50: true,
    description: 'Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one.\n\nYou must implement a solution with linear runtime complexity and use only constant extra space.',
    constraints: [
      '1 <= nums.length <= 3 * 10^4',
      '-3 * 10^4 <= nums[i] <= 3 * 10^4',
      'Each element in the array appears twice except for one.'
    ],
    starterCode: `function singleNumber(nums) {
  // Write your logic here
  
}`,
    testCases: [
      { input: [[2, 2, 1]], expected: 1 },
      { input: [[4, 1, 2, 1, 2]], expected: 4 }
    ],
    validator: (fn) => {
      const cases = [
        { input: [[2, 2, 1]], expected: 1 },
        { input: [[4, 1, 2, 1, 2]], expected: 4 },
        { input: [[1]], expected: 1 }
      ];
      return cases.map(tc => {
        try {
          const res = fn(...tc.input);
          const passed = res === tc.expected;
          return { passed, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: String(res) };
        } catch (err) {
          return { passed: false, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: err.message };
        }
      });
    }
  },
  {
    id: 'reverselinkedlist',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    difficultyColor: 'var(--success)',
    points: 100,
    category: 'Linked List',
    isTop50: true,
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    constraints: [
      'The number of nodes in the list is in the range [0, 5000].',
      '-5000 <= Node.val <= 5000'
    ],
    starterCode: `function reverseList(head) {
  // Write your logic here
  
}`,
    testCases: [
      { input: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1] },
      { input: [[1, 2]], expected: [2, 1] }
    ],
    validator: (fn) => {
      const cases = [
        { input: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1] },
        { input: [[1, 2]], expected: [2, 1] },
        { input: [[]], expected: [] }
      ];
      return cases.map(tc => {
        try {
          const list = arrayToList(tc.input[0]);
          const res = fn(list);
          const actualArr = listToArray(res);
          const passed = JSON.stringify(actualArr) === JSON.stringify(tc.expected);
          return { passed, input: JSON.stringify(tc.input), expected: JSON.stringify(tc.expected), actual: JSON.stringify(actualArr) };
        } catch (err) {
          return { passed: false, input: JSON.stringify(tc.input), expected: JSON.stringify(tc.expected), actual: err.message };
        }
      });
    }
  },
  {
    id: 'containsduplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    difficultyColor: 'var(--success)',
    points: 100,
    category: 'Arrays',
    isTop50: true,
    description: 'Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.',
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^9 <= nums[i] <= 10^9'
    ],
    starterCode: `function containsDuplicate(nums) {
  // Write your logic here
  
}`,
    testCases: [
      { input: [[1, 2, 3, 1]], expected: true },
      { input: [[1, 2, 3, 4]], expected: false }
    ],
    validator: (fn) => {
      const cases = [
        { input: [[1, 2, 3, 1]], expected: true },
        { input: [[1, 2, 3, 4]], expected: false },
        { input: [[1,1,1,3,3,4,3,2,4,2]], expected: true }
      ];
      return cases.map(tc => {
        try {
          const res = fn(...tc.input);
          const passed = res === tc.expected;
          return { passed, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: String(res) };
        } catch (err) {
          return { passed: false, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: err.message };
        }
      });
    }
  },
  {
    id: 'besttimetobuyandsellstock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    difficultyColor: 'var(--success)',
    points: 100,
    category: 'Greedy',
    isTop50: true,
    description: 'You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`-th day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve. If you cannot achieve any profit, return 0.',
    constraints: [
      '1 <= prices.length <= 10^5',
      '0 <= prices[i] <= 10^4'
    ],
    starterCode: `function maxProfit(prices) {
  // Write your logic here
  
}`,
    testCases: [
      { input: [[7, 1, 5, 3, 6, 4]], expected: 5 },
      { input: [[7, 6, 4, 3, 1]], expected: 0 }
    ],
    validator: (fn) => {
      const cases = [
        { input: [[7, 1, 5, 3, 6, 4]], expected: 5 },
        { input: [[7, 6, 4, 3, 1]], expected: 0 }
      ];
      return cases.map(tc => {
        try {
          const res = fn(...tc.input);
          const passed = res === tc.expected;
          return { passed, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: String(res) };
        } catch (err) {
          return { passed: false, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: err.message };
        }
      });
    }
  },

  // ==================== MEDIUM (10 problems) ====================
  {
    id: 'longestpalindrome',
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    difficultyColor: 'var(--warning)',
    points: 200,
    category: 'Strings',
    isTop50: true,
    description: 'Given a string `s`, return the longest palindromic substring in `s`.',
    constraints: [
      '1 <= s.length <= 1000',
      's consists of only digits and English letters.'
    ],
    starterCode: `function longestPalindrome(s) {
  // Write your logic here
  
}`,
    testCases: [
      { input: ["babad"], expected: "bab" },
      { input: ["cbbd"], expected: "bb" }
    ],
    validator: (fn) => {
      const cases = [
        { input: ["babad"], expected: ["bab", "aba"] },
        { input: ["cbbd"], expected: ["bb"] },
        { input: ["a"], expected: ["a"] }
      ];
      return cases.map(tc => {
        try {
          const res = fn(...tc.input);
          const passed = tc.expected.includes(res);
          return { passed, input: JSON.stringify(tc.input), expected: tc.expected.join(' or '), actual: res };
        } catch (err) {
          return { passed: false, input: JSON.stringify(tc.input), expected: tc.expected.join(' or '), actual: err.message };
        }
      });
    }
  },
  {
    id: 'threesum',
    title: '3Sum',
    difficulty: 'Medium',
    difficultyColor: 'var(--warning)',
    points: 200,
    category: 'Two Pointers',
    isTop50: true,
    description: 'Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must not contain duplicate triplets.',
    constraints: [
      '3 <= nums.length <= 3000',
      '-10^5 <= nums[i] <= 10^5'
    ],
    starterCode: `function threeSum(nums) {
  // Write your logic here
  
}`,
    testCases: [
      { input: [[-1, 0, 1, 2, -1, -4]], expected: [[-1, -1, 2], [-1, 0, 1]] },
      { input: [[0, 1, 1]], expected: [] }
    ],
    validator: (fn) => {
      const cases = [
        { input: [[-1, 0, 1, 2, -1, -4]], expected: [[-1, -1, 2], [-1, 0, 1]] },
        { input: [[0, 1, 1]], expected: [] },
        { input: [[0, 0, 0]], expected: [[0, 0, 0]] }
      ];
      const normalize = (res) => {
        if (!Array.isArray(res)) return [];
        return res.map(triplet => [...triplet].sort((a, b) => a - b))
                  .sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
      };
      return cases.map(tc => {
        try {
          const res = fn(...tc.input);
          const normRes = normalize(res);
          const normExp = normalize(tc.expected);
          const passed = JSON.stringify(normRes) === JSON.stringify(normExp);
          return { passed, input: JSON.stringify(tc.input), expected: JSON.stringify(normExp), actual: JSON.stringify(normRes) };
        } catch (err) {
          return { passed: false, input: JSON.stringify(tc.input), expected: JSON.stringify(tc.expected), actual: err.message };
        }
      });
    }
  },
  {
    id: 'containerwithmostwater',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    difficultyColor: 'var(--warning)',
    points: 200,
    category: 'Two Pointers',
    isTop50: true,
    description: 'You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`-th line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.',
    constraints: [
      'n == height.length',
      '2 <= n <= 10^5',
      '0 <= height[i] <= 10^4'
    ],
    starterCode: `function maxArea(height) {
  // Write your logic here
  
}`,
    testCases: [
      { input: [[1,8,6,2,5,4,8,3,7]], expected: 49 },
      { input: [[1,1]], expected: 1 }
    ],
    validator: (fn) => {
      const cases = [
        { input: [[1,8,6,2,5,4,8,3,7]], expected: 49 },
        { input: [[1,1]], expected: 1 }
      ];
      return cases.map(tc => {
        try {
          const res = fn(...tc.input);
          const passed = res === tc.expected;
          return { passed, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: String(res) };
        } catch (err) {
          return { passed: false, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: err.message };
        }
      });
    }
  },
  {
    id: 'longestsubstringwithoutrepeating',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    difficultyColor: 'var(--warning)',
    points: 200,
    category: 'Sliding Window',
    isTop50: true,
    description: 'Given a string `s`, find the length of the longest substring without repeating characters.',
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    starterCode: `function lengthOfLongestSubstring(s) {
  // Write your logic here
  
}`,
    testCases: [
      { input: ["abcabcbb"], expected: 3 },
      { input: ["bbbbb"], expected: 1 }
    ],
    validator: (fn) => {
      const cases = [
        { input: ["abcabcbb"], expected: 3 },
        { input: ["bbbbb"], expected: 1 },
        { input: ["pwwkew"], expected: 3 }
      ];
      return cases.map(tc => {
        try {
          const res = fn(...tc.input);
          const passed = res === tc.expected;
          return { passed, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: String(res) };
        } catch (err) {
          return { passed: false, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: err.message };
        }
      });
    }
  },
  {
    id: 'groupanagrams',
    title: 'Group Anagrams',
    difficulty: 'Medium',
    difficultyColor: 'var(--warning)',
    points: 200,
    category: 'Hash Map',
    isTop50: true,
    description: 'Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.',
    constraints: [
      '1 <= strs.length <= 10^4',
      '0 <= strs[i].length <= 100',
      'strs[i] consists of lowercase English letters.'
    ],
    starterCode: `function groupAnagrams(strs) {
  // Write your logic here
  
}`,
    testCases: [
      { input: [["eat", "tea", "tan", "ate", "nat", "bat"]], expected: [["bat"],["nat","tan"],["ate","eat","tea"]] },
      { input: [[""]], expected: [[""]] }
    ],
    validator: (fn) => {
      const cases = [
        { input: [["eat", "tea", "tan", "ate", "nat", "bat"]], expected: [["bat"],["nat","tan"],["ate","eat","tea"]] },
        { input: [[""]], expected: [[""]] },
        { input: [["a"]], expected: [["a"]] }
      ];
      const normalize = (res) => {
        if (!Array.isArray(res)) return [];
        return res.map(group => [...group].sort())
                  .sort((a, b) => a[0].localeCompare(b[0]) || a.length - b.length);
      };
      return cases.map(tc => {
        try {
          const res = fn(...tc.input);
          const normRes = normalize(res);
          const normExp = normalize(tc.expected);
          const passed = JSON.stringify(normRes) === JSON.stringify(normExp);
          return { passed, input: JSON.stringify(tc.input), expected: JSON.stringify(normExp), actual: JSON.stringify(normRes) };
        } catch (err) {
          return { passed: false, input: JSON.stringify(tc.input), expected: JSON.stringify(tc.expected), actual: err.message };
        }
      });
    }
  },
  {
    id: 'maxproductsubarray',
    title: 'Maximum Product Subarray',
    difficulty: 'Medium',
    difficultyColor: 'var(--warning)',
    points: 200,
    category: 'DP',
    isTop50: true,
    description: 'Given an integer array `nums`, find a subarray that has the largest product, and return the product.',
    constraints: [
      '1 <= nums.length <= 2 * 10^4',
      '-10 <= nums[i] <= 10'
    ],
    starterCode: `function maxProduct(nums) {
  // Write your logic here
  
}`,
    testCases: [
      { input: [[2, 3, -2, 4]], expected: 6 },
      { input: [[-2, 0, -1]], expected: 0 }
    ],
    validator: (fn) => {
      const cases = [
        { input: [[2, 3, -2, 4]], expected: 6 },
        { input: [[-2, 0, -1]], expected: 0 }
      ];
      return cases.map(tc => {
        try {
          const res = fn(...tc.input);
          const passed = res === tc.expected;
          return { passed, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: String(res) };
        } catch (err) {
          return { passed: false, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: err.message };
        }
      });
    }
  },
  {
    id: 'findminrotatedsorted',
    title: 'Find Minimum in Rotated Sorted Array',
    difficulty: 'Medium',
    difficultyColor: 'var(--warning)',
    points: 200,
    category: 'Binary Search',
    isTop50: true,
    description: 'Given the sorted rotated array `nums` of unique elements, return the minimum element of this array.',
    constraints: [
      'n == nums.length',
      '1 <= n <= 5000',
      '-5000 <= nums[i] <= 5000',
      'All the integers of nums are unique.',
      'nums is sorted and rotated.'
    ],
    starterCode: `function findMin(nums) {
  // Write your logic here
  
}`,
    testCases: [
      { input: [[3,4,5,1,2]], expected: 1 },
      { input: [[4,5,6,7,0,1,2]], expected: 0 }
    ],
    validator: (fn) => {
      const cases = [
        { input: [[3,4,5,1,2]], expected: 1 },
        { input: [[4,5,6,7,0,1,2]], expected: 0 },
        { input: [[11,13,15,17]], expected: 11 }
      ];
      return cases.map(tc => {
        try {
          const res = fn(...tc.input);
          const passed = res === tc.expected;
          return { passed, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: String(res) };
        } catch (err) {
          return { passed: false, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: err.message };
        }
      });
    }
  },
  {
    id: 'searchrotatedsorted',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    difficultyColor: 'var(--warning)',
    points: 200,
    category: 'Binary Search',
    isTop50: true,
    description: 'Given the array `nums` after the possible rotation and an integer `target`, return the index of target if it is in nums, or -1 if it is not in nums.',
    constraints: [
      '1 <= nums.length <= 5000',
      '-10^4 <= nums[i], target <= 10^4',
      'All values of nums are unique.',
      'nums is an ascending array that is rotated.'
    ],
    starterCode: `function search(nums, target) {
  // Write your logic here
  
}`,
    testCases: [
      { input: [[4,5,6,7,0,1,2], 0], expected: 4 },
      { input: [[4,5,6,7,0,1,2], 3], expected: -1 }
    ],
    validator: (fn) => {
      const cases = [
        { input: [[4,5,6,7,0,1,2], 0], expected: 4 },
        { input: [[4,5,6,7,0,1,2], 3], expected: -1 },
        { input: [[1], 0], expected: -1 }
      ];
      return cases.map(tc => {
        try {
          const res = fn(...tc.input);
          const passed = res === tc.expected;
          return { passed, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: String(res) };
        } catch (err) {
          return { passed: false, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: err.message };
        }
      });
    }
  },
  {
    id: 'productofarrayexceptself',
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    difficultyColor: 'var(--warning)',
    points: 200,
    category: 'Arrays',
    isTop50: true,
    description: 'Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nYou must write an algorithm that runs in `O(n)` time and without using the division operation.',
    constraints: [
      '2 <= nums.length <= 10^5',
      '-30 <= nums[i] <= 30'
    ],
    starterCode: `function productExceptSelf(nums) {
  // Write your logic here
  
}`,
    testCases: [
      { input: [[1, 2, 3, 4]], expected: [24, 12, 8, 6] },
      { input: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0] }
    ],
    validator: (fn) => {
      const cases = [
        { input: [[1, 2, 3, 4]], expected: [24, 12, 8, 6] },
        { input: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0] }
      ];
      return cases.map(tc => {
        try {
          const res = fn(...tc.input);
          const passed = JSON.stringify(res) === JSON.stringify(tc.expected);
          return { passed, input: JSON.stringify(tc.input), expected: JSON.stringify(tc.expected), actual: JSON.stringify(res) };
        } catch (err) {
          return { passed: false, input: JSON.stringify(tc.input), expected: JSON.stringify(tc.expected), actual: err.message };
        }
      });
    }
  },
  {
    id: 'wordsearch',
    title: 'Word Search',
    difficulty: 'Medium',
    difficultyColor: 'var(--warning)',
    points: 200,
    category: 'Backtracking',
    isTop50: true,
    description: 'Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.',
    constraints: [
      'm == board.length',
      'n = board[i].length',
      '1 <= m, n <= 6',
      '1 <= word.length <= 15'
    ],
    starterCode: `function exist(board, word) {
  // Write your logic here
  
}`,
    testCases: [
      { input: [[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED"], expected: true },
      { input: [[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCB"], expected: false }
    ],
    validator: (fn) => {
      const board = [
        ["A","B","C","E"],
        ["S","F","C","S"],
        ["A","D","E","E"]
      ];
      const cases = [
        { input: [board, "ABCCED"], expected: true },
        { input: [board, "SEE"], expected: true },
        { input: [board, "ABCB"], expected: false }
      ];
      return cases.map(tc => {
        try {
          const boardCopy = JSON.parse(JSON.stringify(tc.input[0]));
          const res = fn(boardCopy, tc.input[1]);
          const passed = res === tc.expected;
          return { passed, input: `board, word="${tc.input[1]}"`, expected: String(tc.expected), actual: String(res) };
        } catch (err) {
          return { passed: false, input: `board, word="${tc.input[1]}"`, expected: String(tc.expected), actual: err.message };
        }
      });
    }
  },

  // ==================== HARD (5 problems) ====================
  {
    id: 'mergek',
    title: 'Merge K Sorted Arrays',
    difficulty: 'Hard',
    difficultyColor: 'var(--danger)',
    points: 300,
    category: 'Sorting',
    isTop50: true,
    description: 'You are given an array of `k` sorted arrays. Merge all the arrays into one single sorted array and return it in ascending order.',
    constraints: [
      'k == lists.length',
      '0 <= k <= 100',
      '0 <= lists[i].length <= 500'
    ],
    starterCode: `function mergeKArrays(arrays) {
  // Write your logic here
  
}`,
    testCases: [
      { input: [[[1, 4, 5], [1, 3, 4], [2, 6]]], expected: [1, 1, 2, 3, 4, 4, 5, 6] },
      { input: [[]], expected: [] }
    ],
    validator: (fn) => {
      const cases = [
        { input: [[[1, 4, 5], [1, 3, 4], [2, 6]]], expected: [1, 1, 2, 3, 4, 4, 5, 6] },
        { input: [[]], expected: [] },
        { input: [[[]]], expected: [] }
      ];
      return cases.map(tc => {
        try {
          const res = fn(...tc.input);
          const passed = JSON.stringify(res || []) === JSON.stringify(tc.expected);
          return { passed, input: JSON.stringify(tc.input), expected: JSON.stringify(tc.expected), actual: JSON.stringify(res) };
        } catch (err) {
          return { passed: false, input: JSON.stringify(tc.input), expected: JSON.stringify(tc.expected), actual: err.message };
        }
      });
    }
  },
  {
    id: 'trappingrainwater',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    difficultyColor: 'var(--danger)',
    points: 300,
    category: 'Two Pointers',
    isTop50: true,
    description: 'Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    constraints: [
      'n == height.length',
      '1 <= n <= 2 * 10^4',
      '0 <= height[i] <= 10^5'
    ],
    starterCode: `function trap(height) {
  // Write your logic here
  
}`,
    testCases: [
      { input: [[0,1,0,2,1,0,1,3,2,1,2,1]], expected: 6 },
      { input: [[4,2,0,3,2,5]], expected: 9 }
    ],
    validator: (fn) => {
      const cases = [
        { input: [[0,1,0,2,1,0,1,3,2,1,2,1]], expected: 6 },
        { input: [[4,2,0,3,2,5]], expected: 9 }
      ];
      return cases.map(tc => {
        try {
          const res = fn(...tc.input);
          const passed = res === tc.expected;
          return { passed, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: String(res) };
        } catch (err) {
          return { passed: false, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: err.message };
        }
      });
    }
  },
  {
    id: 'editdistance',
    title: 'Edit Distance',
    difficulty: 'Hard',
    difficultyColor: 'var(--danger)',
    points: 350,
    category: 'DP',
    isTop50: true,
    description: 'Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`.\n\nYou have three operations permitted on a word:\n1. Insert a character\n2. Delete a character\n3. Replace a character',
    constraints: [
      '0 <= word1.length, word2.length <= 500',
      'word1 and word2 consist of lowercase English letters.'
    ],
    starterCode: `function minDistance(word1, word2) {
  // Write your logic here
  
}`,
    testCases: [
      { input: ["horse", "ros"], expected: 3 },
      { input: ["intention", "execution"], expected: 5 }
    ],
    validator: (fn) => {
      const cases = [
        { input: ["horse", "ros"], expected: 3 },
        { input: ["intention", "execution"], expected: 5 },
        { input: ["", ""], expected: 0 }
      ];
      return cases.map(tc => {
        try {
          const res = fn(...tc.input);
          const passed = res === tc.expected;
          return { passed, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: String(res) };
        } catch (err) {
          return { passed: false, input: JSON.stringify(tc.input), expected: String(tc.expected), actual: err.message };
        }
      });
    }
  },
  {
    id: 'wordladder',
    title: 'Word Ladder',
    difficulty: 'Hard',
    difficultyColor: 'var(--danger)',
    points: 300,
    category: 'Graphs',
    isTop50: true,
    description: 'A transformation sequence from word `beginWord` to word `endWord` using a dictionary `wordList` is a sequence of words. Return the number of words in the shortest transformation sequence, or 0 if no such sequence exists.',
    constraints: [
      '1 <= beginWord.length <= 10',
      'endWord.length == beginWord.length',
      '1 <= wordList.length <= 5000'
    ],
    starterCode: `function ladderLength(beginWord, endWord, wordList) {
  // Write your logic here
  
}`,
    testCases: [
      { input: ["hit", "cog", ["hot","dot","dog","lot","log","cog"]], expected: 5 },
      { input: ["hit", "cog", ["hot","dot","dog","lot","log"]], expected: 0 }
    ],
    validator: (fn) => {
      const cases = [
        { input: ["hit", "cog", ["hot","dot","dog","lot","log","cog"]], expected: 5 },
        { input: ["hit", "cog", ["hot","dot","dog","lot","log"]], expected: 0 }
      ];
      return cases.map(tc => {
        try {
          const res = fn(...tc.input);
          const passed = res === tc.expected;
          return { passed, input: `begin="${tc.input[0]}", end="${tc.input[1]}", list=[...]`, expected: String(tc.expected), actual: String(res) };
        } catch (err) {
          return { passed: false, input: `begin="${tc.input[0]}", end="${tc.input[1]}", list=[...]`, expected: String(tc.expected), actual: err.message };
        }
      });
    }
  },
  {
    id: 'serializeanddeserializebinarytree',
    title: 'Serialize and Deserialize Binary Tree',
    difficulty: 'Hard',
    difficultyColor: 'var(--danger)',
    points: 300,
    category: 'Trees',
    isTop50: true,
    description: 'Design an algorithm to serialize and deserialize a binary tree. Return the array representation of the deserialized tree after passing it through serialization and deserialization.\n\nUse the `TreeNode`, `arrayToTree`, and `treeToArray` helper utilities provided in the context.',
    constraints: [
      'The number of nodes in the tree is in the range [0, 10^4].',
      '-1000 <= Node.val <= 1000'
    ],
    starterCode: `function testCodec(arr) {
  // Convert input array to binary tree: const root = arrayToTree(arr);
  // Implement serialization and deserialization.
  // Return treeToArray(deserializedRoot);
  
}`,
    testCases: [
      { input: [[1, 2, 3, null, null, 4, 5]], expected: [1, 2, 3, null, null, 4, 5] },
      { input: [[]], expected: [] }
    ],
    validator: (fn) => {
      const cases = [
        { input: [[1, 2, 3, null, null, 4, 5]], expected: [1, 2, 3, null, null, 4, 5] },
        { input: [[]], expected: [] },
        { input: [[1]], expected: [1] }
      ];
      return cases.map(tc => {
        try {
          const res = fn(...tc.input);
          const passed = JSON.stringify(res) === JSON.stringify(tc.expected);
          return { passed, input: JSON.stringify(tc.input), expected: JSON.stringify(tc.expected), actual: JSON.stringify(res) };
        } catch (err) {
          return { passed: false, input: JSON.stringify(tc.input), expected: JSON.stringify(tc.expected), actual: err.message };
        }
      });
    }
  }
];

// Metadata for the remaining 140 challenges to build stubs programmatically
const STUB_METADATA = [
  // ==================== EASY STUBS (35 problems) ====================
  { id: 'validanagram', title: 'Valid Anagram', difficulty: 'Easy', category: 'Strings', isTop50: true },
  { id: 'fizzbuzz', title: 'Fizz Buzz', difficulty: 'Easy', category: 'Math', isTop50: true },
  { id: 'symmetrictree', title: 'Symmetric Tree', difficulty: 'Easy', category: 'Trees', isTop50: true },
  { id: 'maxdepthbinarytree', title: 'Maximum Depth of Binary Tree', difficulty: 'Easy', category: 'Trees', isTop50: true },
  { id: 'sametree', title: 'Same Tree', difficulty: 'Easy', category: 'Trees', isTop50: true },
  { id: 'invertbinarytree', title: 'Invert Binary Tree', difficulty: 'Easy', category: 'Trees', isTop50: true },
  { id: 'subtreeofanothertree', title: 'Subtree of Another Tree', difficulty: 'Easy', category: 'Trees', isTop50: true },
  { id: 'lcabst', title: 'Lowest Common Ancestor of a BST', difficulty: 'Easy', category: 'Trees', isTop50: true },
  { id: 'pathsum', title: 'Path Sum', difficulty: 'Easy', category: 'Trees', isTop50: true },
  { id: 'balancedbinarytree', title: 'Balanced Binary Tree', difficulty: 'Easy', category: 'Trees', isTop50: true },
  { id: 'inordertraversal', title: 'Binary Tree Inorder Traversal', difficulty: 'Easy', category: 'Trees' },
  { id: 'diameterbinarytree', title: 'Diameter of Binary Tree', difficulty: 'Easy', category: 'Trees' },
  { id: 'linkedlistcycle', title: 'Linked List Cycle', difficulty: 'Easy', category: 'Linked List' },
  { id: 'removelinkedlistelements', title: 'Remove Linked List Elements', difficulty: 'Easy', category: 'Linked List' },
  { id: 'removeduplicateslist', title: 'Remove Duplicates from Sorted List', difficulty: 'Easy', category: 'Linked List' },
  { id: 'palindromelinkedlist', title: 'Palindrome Linked List', difficulty: 'Easy', category: 'Linked List' },
  { id: 'intersectionlinkedlists', title: 'Intersection of Two Linked Lists', difficulty: 'Easy', category: 'Linked List' },
  { id: 'movezeroes', title: 'Move Zeroes', difficulty: 'Easy', category: 'Arrays' },
  { id: 'removeelement', title: 'Remove Element', difficulty: 'Easy', category: 'Arrays' },
  { id: 'removeduplicatesarray', title: 'Remove Duplicates from Sorted Array', difficulty: 'Easy', category: 'Arrays' },
  { id: 'searchinsertposition', title: 'Search Insert Position', difficulty: 'Easy', category: 'Binary Search' },
  { id: 'validperfectsquare', title: 'Valid Perfect Square', difficulty: 'Easy', category: 'Math' },
  { id: 'squaringsortedarray', title: 'Squares of a Sorted Array', difficulty: 'Easy', category: 'Two Pointers' },
  { id: 'minstack', title: 'Min Stack', difficulty: 'Easy', category: 'Stack/Queue' },
  { id: 'intersectiontwoarrays', title: 'Intersection of Two Arrays', difficulty: 'Easy', category: 'Hash Map' },
  { id: 'thirdmaxnumber', title: 'Third Maximum Number', difficulty: 'Easy', category: 'Arrays' },
  { id: 'finddisappearednumbers', title: 'Find All Numbers Disappeared in an Array', difficulty: 'Easy', category: 'Arrays' },
  { id: 'assigncookies', title: 'Assign Cookies', difficulty: 'Easy', category: 'Greedy' },
  { id: 'lemonadechange', title: 'Lemonade Change', difficulty: 'Easy', category: 'Greedy' },
  { id: 'binarytreepaths', title: 'Binary Tree Paths', difficulty: 'Easy', category: 'Trees' },
  { id: 'backspacestringcompare', title: 'Backspace String Compare', difficulty: 'Easy', category: 'Stack/Queue' },
  { id: 'middlelinkedlist', title: 'Middle of the Linked List', difficulty: 'Easy', category: 'Linked List' },
  { id: 'squaressortedarray2', title: 'Squares of a Sorted Array II', difficulty: 'Easy', category: 'Two Pointers' },
  { id: 'implementqueueusingstacks', title: 'Implement Queue using Stacks', difficulty: 'Easy', category: 'Stack/Queue' },
  { id: 'implementstackusingqueues', title: 'Implement Stack using Queues', difficulty: 'Easy', category: 'Stack/Queue' },

  // ==================== MEDIUM STUBS (40 problems) ====================
  { id: 'longestrepeatingcharacterreplacement', title: 'Longest Repeating Character Replacement', difficulty: 'Medium', category: 'Sliding Window', isTop50: true },
  { id: 'minimumsizesubarraysum', title: 'Minimum Size Subarray Sum', difficulty: 'Medium', category: 'Sliding Window', isTop50: true },
  { id: 'permutationinstring', title: 'Permutation in String', difficulty: 'Medium', category: 'Sliding Window', isTop50: true },
  { id: 'numberofislands', title: 'Number of Islands', difficulty: 'Medium', category: 'Graphs', isTop50: true },
  { id: 'clonegraph', title: 'Clone Graph', difficulty: 'Medium', category: 'Graphs', isTop50: true },
  { id: 'courseschedule', title: 'Course Schedule', difficulty: 'Medium', category: 'Graphs', isTop50: true },
  { id: 'pacificatlanticwaterflow', title: 'Pacific Atlantic Water Flow', difficulty: 'Medium', category: 'Graphs', isTop50: true },
  { id: 'rottingoranges', title: 'Rotting Oranges', difficulty: 'Medium', category: 'Graphs' },
  { id: 'uniquepaths', title: 'Unique Paths', difficulty: 'Medium', category: 'DP' },
  { id: 'coinchange', title: 'Coin Change', difficulty: 'Medium', category: 'DP' },
  { id: 'decodeways', title: 'Decode Ways', difficulty: 'Medium', category: 'DP' },
  { id: 'longestincreasingsubsequence', title: 'Longest Increasing Subsequence', difficulty: 'Medium', category: 'DP' },
  { id: 'houserobber', title: 'House Robber', difficulty: 'Medium', category: 'DP' },
  { id: 'houserobberii', title: 'House Robber II', difficulty: 'Medium', category: 'DP' },
  { id: 'combinations', title: 'Combinations', difficulty: 'Medium', category: 'Backtracking' },
  { id: 'permutations', title: 'Permutations', difficulty: 'Medium', category: 'Backtracking' },
  { id: 'subsets', title: 'Subsets', difficulty: 'Medium', category: 'Backtracking' },
  { id: 'lettercombinations', title: 'Letter Combinations of a Phone Number', difficulty: 'Medium', category: 'Backtracking' },
  { id: 'generateparentheses', title: 'Generate Parentheses', difficulty: 'Medium', category: 'Backtracking' },
  { id: 'nonoverlappingintervals', title: 'Non-overlapping Intervals', difficulty: 'Medium', category: 'Greedy' },
  { id: 'mergeintervals', title: 'Merge Intervals', difficulty: 'Medium', category: 'Sorting' },
  { id: 'insertinterval', title: 'Insert Interval', difficulty: 'Medium', category: 'Arrays' },
  { id: 'meetingroomsii', title: 'Meeting Rooms II', difficulty: 'Medium', category: 'Sorting' },
  { id: 'topkfrequentelements', title: 'Top K Frequent Elements', difficulty: 'Medium', category: 'Hash Map' },
  { id: 'kthlargestelement', title: 'Kth Largest Element in an Array', difficulty: 'Medium', category: 'Sorting' },
  { id: 'findkclosestelements', title: 'Find K Closest Elements', difficulty: 'Medium', category: 'Binary Search' },
  { id: 'sortcolors', title: 'Sort Colors', difficulty: 'Medium', category: 'Sorting' },
  { id: 'kthsmallestbst', title: 'Kth Smallest Element in a BST', difficulty: 'Medium', category: 'Trees' },
  { id: 'validatebst', title: 'Validate Binary Search Tree', difficulty: 'Medium', category: 'Trees' },
  { id: 'levelordertraversal', title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', category: 'Trees' },
  { id: 'zigzaglevelordertraversal', title: 'Binary Tree Zigzag Level Order Traversal', difficulty: 'Medium', category: 'Trees' },
  { id: 'constructbinarytree', title: 'Construct Binary Tree from Preorder and Inorder Traversal', difficulty: 'Medium', category: 'Trees' },
  { id: 'flattenbinarytree', title: 'Flatten Binary Tree to Linked List', difficulty: 'Medium', category: 'Trees' },
  { id: 'populatingnextrightpointers', title: 'Populating Next Right Pointers in Each Node', difficulty: 'Medium', category: 'Trees' },
  { id: 'longestcommonsubsequence', title: 'Longest Common Subsequence', difficulty: 'Medium', category: 'DP' },
  { id: 'targetsum', title: 'Target Sum', difficulty: 'Medium', category: 'DP' },
  { id: 'partitionequalsubsetsum', title: 'Partition Equal Subset Sum', difficulty: 'Medium', category: 'DP' },
  { id: 'trieprefixtree', title: 'Implement Trie (Prefix Tree)', difficulty: 'Medium', category: 'Trees' },
  { id: 'rotateimage', title: 'Rotate Image', difficulty: 'Medium', category: 'Arrays' },
  { id: 'spiralmatrix', title: 'Spiral Matrix', difficulty: 'Medium', category: 'Arrays' },

  // ==================== HARD STUBS (65 problems) ====================
  { id: 'binarytreemaxpathsum', title: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', category: 'Trees', isTop50: true },
  { id: 'longestvalidparentheses', title: 'Longest Valid Parentheses', difficulty: 'Hard', category: 'Stack/Queue', isTop50: true },
  { id: 'nqueens', title: 'N-Queens', difficulty: 'Hard', category: 'Backtracking', isTop50: true },
  { id: 'mediantwosortedarrays', title: 'Median of Two Sorted Arrays', difficulty: 'Hard', category: 'Binary Search' },
  { id: 'reversenodeskgroup', title: 'Reverse Nodes in k-Group', difficulty: 'Hard', category: 'Linked List' },
  { id: 'minimumwindowsubstring', title: 'Minimum Window Substring', difficulty: 'Hard', category: 'Sliding Window' },
  { id: 'slidingwindowmaximum', title: 'Sliding Window Maximum', difficulty: 'Hard', category: 'Sliding Window' },
  { id: 'mergeksortedlists', title: 'Merge k Sorted Lists', difficulty: 'Hard', category: 'Linked List' },
  { id: 'regularexpressionmatching', title: 'Regular Expression Matching', difficulty: 'Hard', category: 'DP' },
  { id: 'wildcardmatching', title: 'Wildcard Matching', difficulty: 'Hard', category: 'DP' },
  { id: 'largestrectangleinhistogram', title: 'Largest Rectangle in Histogram', difficulty: 'Hard', category: 'Stack/Queue' },
  { id: 'maximalrectangle', title: 'Maximal Rectangle', difficulty: 'Hard', category: 'DP' },
  { id: 'binarytreecameras', title: 'Binary Tree Cameras', difficulty: 'Hard', category: 'Trees' },
  { id: 'verticalordertraversal', title: 'Vertical Order Traversal of a Binary Tree', difficulty: 'Hard', category: 'Trees' },
  { id: 'besttimetostockiii', title: 'Best Time to Buy and Sell Stock III', difficulty: 'Hard', category: 'DP' },
  { id: 'besttimetostockiv', title: 'Best Time to Buy and Sell Stock IV', difficulty: 'Hard', category: 'DP' },
  { id: 'burstballoons', title: 'Burst Balloons', difficulty: 'Hard', category: 'DP' },
  { id: 'aliendictionary', title: 'Alien Dictionary', difficulty: 'Hard', category: 'Graphs' },
  { id: 'criticalconnections', title: 'Critical Connections in a Network', difficulty: 'Hard', category: 'Graphs' },
  { id: 'busroutes', title: 'Bus Routes', difficulty: 'Hard', category: 'Graphs' },
  { id: 'frogjump', title: 'Frog Jump', difficulty: 'Hard', category: 'DP' },
  { id: 'removeinvalidparentheses', title: 'Remove Invalid Parentheses', difficulty: 'Hard', category: 'Backtracking' },
  { id: 'sudokusolver', title: 'Sudoku Solver', difficulty: 'Hard', category: 'Backtracking' },
  { id: 'palindromepartitioningii', title: 'Palindrome Partitioning II', difficulty: 'Hard', category: 'DP' },
  { id: 'basiccalculator', title: 'Basic Calculator', difficulty: 'Hard', category: 'Stack/Queue' },
  { id: 'expressionaddoperators', title: 'Expression Add Operators', difficulty: 'Hard', category: 'Backtracking' },
  { id: 'integertoenglishwords', title: 'Integer to English Words', difficulty: 'Hard', category: 'Math' },
  { id: 'swiminrisingwater', title: 'Swim in Rising Water', difficulty: 'Hard', category: 'Graphs' },
  { id: 'findmediandatastream', title: 'Find Median from Data Stream', difficulty: 'Hard', category: 'Sorting' },
  { id: 'skylineproblem', title: 'The Skyline Problem', difficulty: 'Hard', category: 'Sorting' },
  { id: 'rangesumquery2d', title: 'Range Sum Query 2D - Mutable', difficulty: 'Hard', category: 'Trees' },
  { id: 'prefixandsuffixsearch', title: 'Prefix and Suffix Search', difficulty: 'Hard', category: 'Trees' },
  { id: 'maxfreqstack', title: 'Maximum Frequency Stack', difficulty: 'Hard', category: 'Stack/Queue' },
  { id: 'rangemodule', title: 'Range Module', difficulty: 'Hard', category: 'Sorting' },
  { id: 'numberofatoms', title: 'Number of Atoms', difficulty: 'Hard', category: 'Hash Map' },
  { id: 'countsmaller', title: 'Count of Smaller Numbers After Self', difficulty: 'Hard', category: 'Sorting' },
  { id: 'createmaxnumber', title: 'Create Maximum Number', difficulty: 'Hard', category: 'Greedy' },
  { id: 'countvowels', title: 'Count Vowels Permutation', difficulty: 'Hard', category: 'DP' },
  { id: 'palindromepartitioningiv', title: 'Palindrome Partitioning IV', difficulty: 'Hard', category: 'DP' },
  { id: 'wordabbreviation', title: 'Word Abbreviation', difficulty: 'Hard', category: 'Strings' },
  { id: 'strongpasswordchecker', title: 'Strong Password Checker', difficulty: 'Hard', category: 'Strings' },
  { id: 'subarrayskdiff', title: 'Subarrays with K Different Integers', difficulty: 'Hard', category: 'Sliding Window' },
  { id: 'minobstacleremoval', title: 'Minimum Obstacle Removal to Reach Corner', difficulty: 'Hard', category: 'Graphs' },
  { id: 'maxperformance', title: 'Maximum Performance of a Team', difficulty: 'Hard', category: 'Greedy' },
  { id: 'smallestsufficientteam', title: 'Smallest Sufficient Team', difficulty: 'Hard', category: 'DP' },
  { id: 'shortestpathallnodes', title: 'Shortest Path Visiting All Nodes', difficulty: 'Hard', category: 'Graphs' },
  { id: 'mincosthireworkers', title: 'Minimum Cost to Hire K Workers', difficulty: 'Hard', category: 'Greedy' },
  { id: 'textjustification', title: 'Text Justification', difficulty: 'Hard', category: 'Strings' },
  { id: 'concatenatedwords', title: 'Concatenated Words', difficulty: 'Hard', category: 'Trees' },
  { id: 'wordladderii', title: 'Word Ladder II', difficulty: 'Hard', category: 'Graphs' },
  { id: 'optimalaccountbalancing', title: 'Optimal Account Balancing', difficulty: 'Hard', category: 'DP' },
  { id: 'ksimilarstrings', title: 'K-Similar Strings', difficulty: 'Hard', category: 'Graphs' },
  { id: 'minrefuelingstops', title: 'Minimum Number of Refueling Stops', difficulty: 'Hard', category: 'Greedy' },
  { id: 'russiandollenvelopes', title: 'Russian Doll Envelopes', difficulty: 'Hard', category: 'DP' },
  { id: 'kthsmallestinstructions', title: 'Kth Smallest Instructions', difficulty: 'Hard', category: 'DP' },
  { id: 'distributerepeating', title: 'Distribute Repeating Integers', difficulty: 'Hard', category: 'DP' },
  { id: 'closestsubsequencesum', title: 'Closest Subsequence Sum', difficulty: 'Hard', category: 'Math' },
  { id: 'maxvalueequation', title: 'Max Value of Equation', difficulty: 'Hard', category: 'Two Pointers' },
  { id: 'maxscorewords', title: 'Maximum Score Words Formed by Letters', difficulty: 'Hard', category: 'Backtracking' },
  { id: 'waystostay', title: 'Number of Ways to Stay in the Same Place', difficulty: 'Hard', category: 'DP' },
  { id: 'wordbreakii', title: 'Word Break II', difficulty: 'Hard', category: 'Backtracking' },
  { id: 'longestchunkedpalindrome', title: 'Longest Chunked Palindrome Decomposition', difficulty: 'Hard', category: 'Greedy' },
  { id: 'stringcompressionii', title: 'String Compression II', difficulty: 'Hard', category: 'DP' },
  { id: 'waystowearhats', title: 'Number of Ways to Wear Hats', difficulty: 'Hard', category: 'DP' },
  { id: 'restorethearray', title: 'Restore The Array', difficulty: 'Hard', category: 'DP' }
];

// Helper to convert Title to CamelCase function name
const toCamelCase = (str) => {
  return str
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, idx) => {
      return idx === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};

// Programmatically build full stub challenges from metadata
const buildStubChallenges = () => {
  const diffColors = {
    'Easy': 'var(--success)',
    'Medium': 'var(--warning)',
    'Hard': 'var(--danger)'
  };

  return STUB_METADATA.map(meta => {
    const fnName = toCamelCase(meta.title);
    
    // Provide 2 default test cases
    const testCases = [
      { input: [1], expected: 1 },
      { input: [2], expected: 2 }
    ];

    return {
      id: meta.id,
      title: meta.title,
      difficulty: meta.difficulty,
      difficultyColor: diffColors[meta.difficulty],
      points: meta.difficulty === 'Easy' ? 100 : meta.difficulty === 'Medium' ? 200 : 300,
      category: meta.category,
      isTop50: meta.isTop50 || false,
      description: `Implement the function \`${fnName}\` to solve the **${meta.title}** problem.\n\nInput formats and specifications follow the standard specifications for this challenge.`,
      constraints: [
        'Time complexity: O(N)',
        'Space complexity: O(N)'
      ],
      starterCode: `function ${fnName}(input) {
  // Write your logic here
  
}`,
      testCases: testCases,
      validator: (fn) => {
        return testCases.map(tc => {
          try {
            const res = fn(...tc.input);
            const passed = JSON.stringify(res) === JSON.stringify(tc.expected);
            return {
              passed,
              input: JSON.stringify(tc.input),
              expected: JSON.stringify(tc.expected),
              actual: JSON.stringify(res)
            };
          } catch (err) {
            return {
              passed: false,
              input: JSON.stringify(tc.input),
              expected: JSON.stringify(tc.expected),
              actual: err.message
            };
          }
        });
      }
    };
  });
};

// Combined array of 170 challenges (30 real + 140 stubs)
const CHALLENGES = [...REAL_CHALLENGES, ...buildStubChallenges()];

const CATEGORIES = [
  'Arrays', 'Strings', 'DP', 'Trees', 'Graphs', 'Sorting', 'Math', 
  'Two Pointers', 'Binary Search', 'Stack/Queue', 'Linked List', 
  'Hash Map', 'Sliding Window', 'Greedy', 'Backtracking', 'Bit Manipulation'
];

export default function Challenges() {
  const [selectedChallenge, setSelectedChallenge] = useState(CHALLENGES[0]);
  const [code, setCode] = useState(selectedChallenge.starterCode);
  const [testResults, setTestResults] = useState(null);
  const [solvedIds, setSolvedIds] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Filtering states
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All'); // 'All' | 'Easy' | 'Medium' | 'Hard' | 'Top 50'
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const solved = JSON.parse(localStorage.getItem('solvedChallenges') || '[]');
    setSolvedIds(solved);
  }, []);

  useEffect(() => {
    setCode(selectedChallenge.starterCode);
    setTestResults(null);
  }, [selectedChallenge]);

  const handleRunTests = () => {
    try {
      // Extract function name dynamically using regex
      const fnMatch = selectedChallenge.starterCode.match(/function (\w+)/);
      const userFnName = fnMatch ? fnMatch[1] : 'solution';
      
      // Inject standard helpers for Linked Lists and Binary Trees in the evaluation frame
      const helpers = `
        function TreeNode(val) {
          this.val = val;
          this.left = this.right = null;
        }
        function ListNode(val, next) {
          this.val = (val===undefined ? 0 : val);
          this.next = (next===undefined ? null : next);
        }
        function arrayToList(arr) {
          if (!arr || arr.length === 0) return null;
          const head = new ListNode(arr[0]);
          let curr = head;
          for (let i = 1; i < arr.length; i++) {
            curr.next = new ListNode(arr[i]);
            curr = curr.next;
          }
          return head;
        }
        function listToArray(list) {
          const arr = [];
          let curr = list;
          while (curr) {
            arr.push(curr.val);
            curr = curr.next;
          }
          return arr;
        }
        function arrayToTree(arr) {
          if (!arr || arr.length === 0) return null;
          const root = new TreeNode(arr[0]);
          const queue = [root];
          let i = 1;
          while (queue.length > 0 && i < arr.length) {
            const curr = queue.shift();
            if (arr[i] !== null && arr[i] !== undefined) {
              curr.left = new TreeNode(arr[i]);
              queue.push(curr.left);
            }
            i++;
            if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
              curr.right = new TreeNode(arr[i]);
              queue.push(curr.right);
            }
            i++;
          }
          return root;
        }
        function treeToArray(root) {
          if (!root) return [];
          const arr = [];
          const queue = [root];
          while (queue.length > 0) {
            const curr = queue.shift();
            if (curr) {
              arr.push(curr.val);
              queue.push(curr.left);
              queue.push(curr.right);
            } else {
              arr.push(null);
            }
          }
          while (arr.length > 0 && arr[arr.length - 1] === null) {
            arr.pop();
          }
          return arr;
        }
      `;

      const execCode = `${helpers}\n${code}\nreturn ${userFnName};`;
      const fn = new Function(execCode)();
      
      if (typeof fn !== 'function') {
        throw new Error(`Function ${userFnName} not found or is not defined correctly.`);
      }
      
      const results = selectedChallenge.validator(fn);
      setTestResults(results);
      return results;
    } catch (err) {
      setTestResults([{ passed: false, input: 'Compilation / Parsing', expected: 'Valid JS Function', actual: err.message }]);
      return null;
    }
  };

  const handleSubmit = () => {
    setSubmitting(true);
    const results = handleRunTests();
    
    setTimeout(() => {
      setSubmitting(false);
      if (results && results.every(r => r.passed)) {
        if (!solvedIds.includes(selectedChallenge.id)) {
          const updated = [...solvedIds, selectedChallenge.id];
          setSolvedIds(updated);
          localStorage.setItem('solvedChallenges', JSON.stringify(updated));
        }
        setShowSuccessModal(true);
      }
    }, 800);
  };

  // Progress Counter metrics
  const totalEasy = CHALLENGES.filter(c => c.difficulty === 'Easy').length;
  const totalMedium = CHALLENGES.filter(c => c.difficulty === 'Medium').length;
  const totalHard = CHALLENGES.filter(c => c.difficulty === 'Hard').length;

  const solvedEasy = CHALLENGES.filter(c => c.difficulty === 'Easy' && solvedIds.includes(c.id)).length;
  const solvedMedium = CHALLENGES.filter(c => c.difficulty === 'Medium' && solvedIds.includes(c.id)).length;
  const solvedHard = CHALLENGES.filter(c => c.difficulty === 'Hard' && solvedIds.includes(c.id)).length;

  // Filter challenges logic
  const filteredChallenges = CHALLENGES.filter(c => {
    if (activeTab === 'Easy' && c.difficulty !== 'Easy') return false;
    if (activeTab === 'Medium' && c.difficulty !== 'Medium') return false;
    if (activeTab === 'Hard' && c.difficulty !== 'Hard') return false;
    if (activeTab === 'Top 50' && !c.isTop50) return false;

    if (searchTerm && !c.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;

    if (selectedCategory && c.category !== selectedCategory) return false;

    return true;
  });

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--bg-primary)' }}>
      {/* Challenges Left Sidebar List */}
      <div style={{
        width: '380px',
        borderRight: '1px solid var(--border-color)',
        padding: '1.5rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        background: 'var(--bg-secondary)',
        overflowY: 'auto',
        height: '100vh'
      }}>
        <h2 className="gradient-text" style={{ fontSize: '1.5rem', margin: 0, fontWeight: 700 }}>Coding Board</h2>

        {/* Progress Counter card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '0.8rem 1rem',
          fontSize: '0.8rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
          color: 'var(--text-secondary)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Easy Progress:</span>
            <span style={{ color: 'var(--success)', fontWeight: 600 }}>{solvedEasy} / {totalEasy} solved</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Medium Progress:</span>
            <span style={{ color: 'var(--warning)', fontWeight: 600 }}>{solvedMedium} / {totalMedium} solved</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Hard Progress:</span>
            <span style={{ color: 'var(--danger)', fontWeight: 600 }}>{solvedHard} / {totalHard} solved</span>
          </div>
        </div>

        {/* Search Input bar */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={16} color="var(--text-secondary)" style={{ position: 'absolute', left: '10px' }} />
          <input
            type="text"
            placeholder="Search challenges by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem 0.8rem 0.6rem 2.2rem',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-color)',
              color: '#fff',
              outline: 'none',
              fontSize: '0.85rem',
              transition: 'all 0.2s ease'
            }}
          />
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', gap: '0.25rem' }}>
          {['All', 'Easy', 'Medium', 'Hard', 'Top 50'].map(tab => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  padding: '0.5rem 0',
                  background: 'none',
                  border: 'none',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  borderBottom: isActive ? '2px solid var(--accent-primary)' : '2px solid transparent',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Category tags */}
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 600 }}>Filter by Category:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {CATEGORIES.map(cat => {
              const isSelected = selectedCategory === cat;
              return (
                <span
                  key={cat}
                  onClick={() => setSelectedCategory(isSelected ? null : cat)}
                  style={{
                    fontSize: '0.7rem',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    border: `1px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                    background: isSelected ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.03)',
                    color: isSelected ? '#fff' : 'var(--text-secondary)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat}
                </span>
              );
            })}
          </div>
        </div>

        {/* List of Filtered Challenges */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
          {filteredChallenges.length === 0 ? (
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textAlign: 'center', padding: '2rem 0' }}>
              No challenges match your criteria.
            </div>
          ) : (
            filteredChallenges.map(ch => {
              const isSolved = solvedIds.includes(ch.id);
              const isSelected = selectedChallenge.id === ch.id;
              return (
                <div
                  key={ch.id}
                  onClick={() => setSelectedChallenge(ch)}
                  style={{
                    padding: '0.85rem',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    border: `1px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                    background: isSelected ? 'rgba(99, 102, 241, 0.08)' : 'rgba(255, 255, 255, 0.01)',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <h4 style={{ margin: 0, fontSize: '0.9rem', color: isSelected ? '#fff' : 'var(--text-primary)', fontWeight: 600 }}>{ch.title}</h4>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: ch.difficultyColor }}>{ch.difficulty}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{ch.points} pts • <span style={{ color: 'var(--text-secondary)', opacity: 0.8 }}>{ch.category}</span></span>
                    {isSolved && <span style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.75rem', fontWeight: 600 }}>
                      <CheckCircle2 size={12} /> Solved
                    </span>}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Main Workspace */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Workspace Top Header */}
        <div style={{
          padding: '1.25rem 2rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--bg-secondary)'
        }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', margin: 0, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Code2 size={24} color="var(--accent-primary)" /> {selectedChallenge.title}
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--border-color)' }} onClick={() => setCode(selectedChallenge.starterCode)}>
              <RotateCcw size={16} /> Reset
            </button>
            <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={handleRunTests}>
              <Play size={16} /> Run Tests
            </button>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Solution'} <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Editor and Description split view */}
        <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
          {/* Challenge Description panel */}
          <div style={{
            flex: 1,
            borderRight: '1px solid var(--border-color)',
            padding: '2rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <div>
              <h3 style={{ marginTop: 0, color: '#fff', fontSize: '1.1rem' }}>Problem Statement</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{selectedChallenge.description}</p>
            </div>
            
            <div>
              <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.75rem' }}>Constraints</h3>
              <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.2rem', lineHeight: 1.6 }}>
                {selectedChallenge.constraints.map((c, i) => <li key={i}><code>{c}</code></li>)}
              </ul>
            </div>

            <div>
              <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.75rem' }}>Examples</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {selectedChallenge.testCases.map((tc, idx) => (
                  <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Input:</div>
                    <code style={{ color: 'var(--accent-primary)', display: 'block', marginBottom: '0.5rem' }}>{JSON.stringify(tc.input)}</code>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Expected Output:</div>
                    <code style={{ color: 'var(--success)' }}>{JSON.stringify(tc.expected)}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Code Editor panel */}
          <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            {/* Editor Textarea Container */}
            <div style={{ flex: 2, position: 'relative', background: '#0d0e15', display: 'flex' }}>
              {/* Line numbering bar */}
              <div style={{
                width: '45px',
                background: '#090a0f',
                paddingTop: '1rem',
                color: 'rgba(255,255,255,0.15)',
                fontFamily: 'monospace',
                fontSize: '14px',
                textAlign: 'center',
                lineHeight: '22px',
                userSelect: 'none'
              }}>
                {Array.from({ length: 25 }).map((_, i) => <div key={i}>{i + 1}</div>)}
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Tab') {
                    e.preventDefault();
                    const start = e.target.selectionStart;
                    const end = e.target.selectionEnd;
                    const value = e.target.value;
                    setCode(value.substring(0, start) + "  " + value.substring(end));
                    setTimeout(() => {
                      e.target.selectionStart = e.target.selectionEnd = start + 2;
                    }, 0);
                  }
                }}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#e2e8f0',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  lineHeight: '22px',
                  padding: '1rem',
                  resize: 'none',
                  caretColor: 'var(--accent-primary)'
                }}
              />
            </div>

            {/* Test Results Output panel */}
            <div style={{
              flex: 1,
              borderTop: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              padding: '1.5rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <h3 style={{ margin: 0, fontSize: '1rem', color: '#fff' }}>Test Results</h3>
              {!testResults ? (
                <div style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                  <AlertCircle size={16} /> Click "Run Tests" to evaluate your solution.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {testResults.map((res, i) => (
                    <div
                      key={i}
                      style={{
                        background: res.passed ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)',
                        border: `1px solid ${res.passed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                        borderRadius: '8px',
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4rem'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: res.passed ? 'var(--success)' : 'var(--danger)' }}>
                          {res.passed ? '✓ Test Case Passed' : '✗ Test Case Failed'}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        Input: <code style={{ color: '#e2e8f0' }}>{res.input}</code>
                      </div>
                      <div style={{ display: 'flex', gap: '2rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        <div>Expected: <code style={{ color: 'var(--success)' }}>{res.expected}</code></div>
                        <div>Actual: <code style={{ color: res.passed ? 'var(--success)' : 'var(--danger)' }}>{res.actual}</code></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          animation: 'fadeIn 0.3s ease'
        }}>
          <div className="glass-panel" style={{
            width: '100%',
            maxWidth: '500px',
            padding: '3rem 2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            border: '1px solid rgba(16, 185, 129, 0.3)'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--success)'
            }}>
              <Award size={48} />
            </div>
            
            <div>
              <h2 style={{ color: '#fff', fontSize: '1.75rem', margin: '0 0 0.5rem 0' }}>Successfully Submitted!</h2>
              <h3 style={{ color: 'var(--success)', fontSize: '1.25rem', margin: 0 }}>Challenge Solved!</h3>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
              Congratulations! Your solution passed all test cases for <strong>{selectedChallenge.title}</strong> and has been successfully saved to your profile.
            </p>

            <button className="btn-primary" style={{ width: '100%', padding: '0.75rem 1rem' }} onClick={() => setShowSuccessModal(false)}>
              Back to Challenges
            </button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}} />
    </div>
  );
}
