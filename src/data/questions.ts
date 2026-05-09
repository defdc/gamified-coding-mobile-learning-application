import { Question } from '../types';

export const pretestQuestions: Question[] = [
  {
    id: 'pre_q1',
    topic: 'Variable and arithmetic',
    prompt: 'What is the output of the following code?',
    code: 'x = 4\ny = 2\nprint(x + y * 3)',
    options: [
      { id: 'A', text: '10' },
      { id: 'B', text: '12' },
      { id: 'C', text: '18' },
      { id: 'D', text: '24' }
    ],
    correctOptionId: 'A'
  },
  {
    id: 'pre_q2',
    topic: 'Data type',
    prompt: 'Which data type is used to store True or False values?',
    options: [
      { id: 'A', text: 'String' },
      { id: 'B', text: 'Integer' },
      { id: 'C', text: 'Boolean' },
      { id: 'D', text: 'Float' }
    ],
    correctOptionId: 'C'
  },
  {
    id: 'pre_q3',
    topic: 'Conditional logic',
    prompt: 'What is the output of the following code?',
    code: 'age = 17\n\nif age >= 18:\n    print("Adult")\nelse:\n    print("Minor")',
    options: [
      { id: 'A', text: 'Adult' },
      { id: 'B', text: 'Minor' },
      { id: 'C', text: 'Error' },
      { id: 'D', text: 'No output' }
    ],
    correctOptionId: 'B'
  },
  {
    id: 'pre_q4',
    topic: 'Loop',
    prompt: 'What will be printed by this loop?',
    code: 'for i in range(1, 4):\n    print(i)',
    options: [
      { id: 'A', text: '1, 2, 3' },
      { id: 'B', text: '1, 2, 3, 4' },
      { id: 'C', text: '0, 1, 2, 3' },
      { id: 'D', text: '4 only' }
    ],
    correctOptionId: 'A'
  },
  {
    id: 'pre_q5',
    topic: 'Loop',
    prompt: 'What is the final value of total?',
    code: 'total = 0\n\nfor i in range(1, 4):\n    total = total + i\n\nprint(total)',
    options: [
      { id: 'A', text: '3' },
      { id: 'B', text: '4' },
      { id: 'C', text: '6' },
      { id: 'D', text: '10' }
    ],
    correctOptionId: 'C'
  },
  {
    id: 'pre_q6',
    topic: 'Function',
    prompt: 'What is the output of the following function?',
    code: 'def add(a, b):\n    return a + b\n\nprint(add(2, 5))',
    options: [
      { id: 'A', text: '2' },
      { id: 'B', text: '5' },
      { id: 'C', text: '7' },
      { id: 'D', text: '10' }
    ],
    correctOptionId: 'C'
  },
  {
    id: 'pre_q7',
    topic: 'Modulo operator',
    prompt: 'What is the result of 7 % 2?',
    options: [
      { id: 'A', text: '0' },
      { id: 'B', text: '1' },
      { id: 'C', text: '2' },
      { id: 'D', text: '3' }
    ],
    correctOptionId: 'B'
  },
  {
    id: 'pre_q8',
    topic: 'List',
    prompt: 'In Python, what is the value of numbers[0]?',
    code: 'numbers = [10, 20, 30]',
    options: [
      { id: 'A', text: '0' },
      { id: 'B', text: '10' },
      { id: 'C', text: '20' },
      { id: 'D', text: '30' }
    ],
    correctOptionId: 'B'
  },
  {
    id: 'pre_q9',
    topic: 'Algorithmic thinking',
    prompt: 'Which condition checks whether a number is even?',
    options: [
      { id: 'A', text: 'number % 2 == 0' },
      { id: 'B', text: 'number % 2 == 1' },
      { id: 'C', text: 'number + 2 == 0' },
      { id: 'D', text: 'number / 2 == 0' }
    ],
    correctOptionId: 'A'
  },
  {
    id: 'pre_q10',
    topic: 'Debugging',
    prompt: 'What is wrong with the following code?',
    code: 'print("Hello"',
    options: [
      { id: 'A', text: 'The variable is missing' },
      { id: 'B', text: 'The closing parenthesis is missing' },
      { id: 'C', text: 'The word print is incorrect' },
      { id: 'D', text: 'The quotation mark should be removed' }
    ],
    correctOptionId: 'B'
  }
];

export const posttestQuestions: Question[] = [
  {
    id: 'post_q1',
    topic: 'Variable and arithmetic',
    prompt: 'What is the output of the following code?',
    code: 'a = 5\nb = 3\nprint(a * 2 + b)',
    options: [
      { id: 'A', text: '10' },
      { id: 'B', text: '11' },
      { id: 'C', text: '13' },
      { id: 'D', text: '16' }
    ],
    correctOptionId: 'C'
  },
  {
    id: 'post_q2',
    topic: 'Data type',
    prompt: 'What is the data type of the value below?',
    code: '"25"',
    options: [
      { id: 'A', text: 'Integer' },
      { id: 'B', text: 'String' },
      { id: 'C', text: 'Boolean' },
      { id: 'D', text: 'Float' }
    ],
    correctOptionId: 'B'
  },
  {
    id: 'post_q3',
    topic: 'Conditional logic',
    prompt: 'What is the output of the following code?',
    code: 'score = 75\n\nif score >= 80:\n    print("Excellent")\nelse:\n    print("Keep Learning")',
    options: [
      { id: 'A', text: 'Excellent' },
      { id: 'B', text: 'Keep Learning' },
      { id: 'C', text: '75' },
      { id: 'D', text: 'Error' }
    ],
    correctOptionId: 'B'
  },
  {
    id: 'post_q4',
    topic: 'Loop',
    prompt: 'What will be printed by this loop?',
    code: 'for i in range(2, 5):\n    print(i)',
    options: [
      { id: 'A', text: '2, 3, 4' },
      { id: 'B', text: '2, 3, 4, 5' },
      { id: 'C', text: '1, 2, 3, 4' },
      { id: 'D', text: '5 only' }
    ],
    correctOptionId: 'A'
  },
  {
    id: 'post_q5',
    topic: 'Loop',
    prompt: 'What is the final value of total?',
    code: 'total = 0\n\nfor i in [2, 4, 6]:\n    total = total + i\n\nprint(total)',
    options: [
      { id: 'A', text: '6' },
      { id: 'B', text: '10' },
      { id: 'C', text: '12' },
      { id: 'D', text: '24' }
    ],
    correctOptionId: 'C'
  },
  {
    id: 'post_q6',
    topic: 'Function',
    prompt: 'What is the output of the following function?',
    code: 'def multiply(a, b):\n    return a * b\n\nprint(multiply(3, 4))',
    options: [
      { id: 'A', text: '7' },
      { id: 'B', text: '12' },
      { id: 'C', text: '34' },
      { id: 'D', text: 'Error' }
    ],
    correctOptionId: 'B'
  },
  {
    id: 'post_q7',
    topic: 'Modulo operator',
    prompt: 'What is the result of 10 % 3?',
    options: [
      { id: 'A', text: '0' },
      { id: 'B', text: '1' },
      { id: 'C', text: '2' },
      { id: 'D', text: '3' }
    ],
    correctOptionId: 'B'
  },
  {
    id: 'post_q8',
    topic: 'List',
    prompt: 'In Python, what is the value of colors[1]?',
    code: 'colors = ["red", "blue", "green"]',
    options: [
      { id: 'A', text: 'red' },
      { id: 'B', text: 'blue' },
      { id: 'C', text: 'green' },
      { id: 'D', text: '1' }
    ],
    correctOptionId: 'B'
  },
  {
    id: 'post_q9',
    topic: 'Algorithmic thinking',
    prompt: 'Which condition checks whether a score is passing if the passing score is 60?',
    options: [
      { id: 'A', text: 'score <= 60' },
      { id: 'B', text: 'score == 0' },
      { id: 'C', text: 'score >= 60' },
      { id: 'D', text: 'score != 60' }
    ],
    correctOptionId: 'C'
  },
  {
    id: 'post_q10',
    topic: 'Debugging',
    prompt: 'What is wrong with the following code?',
    code: 'if x > 5\n    print("High")',
    options: [
      { id: 'A', text: 'The colon after the if condition is missing' },
      { id: 'B', text: 'The variable name is too short' },
      { id: 'C', text: 'The print function cannot be used' },
      { id: 'D', text: 'The number must be written as text' }
    ],
    correctOptionId: 'A'
  }
];
