import { LessonModule } from '../types';

export const lessonModules: LessonModule[] = [
  {
    id: 'module_variables',
    title: 'Variables and Values',
    estimatedMinutes: 5,
    learningGoal: 'Understand how variables store values.',
    explanation:
      'A variable is a name used to store a value. Beginners can imagine a variable as a labeled box. The label is the variable name, and the content inside the box is the value.',
    exampleCode: 'name = "Ana"\nage = 25\nprint(name)\nprint(age)',
    quiz: {
      id: 'quiz_variables',
      topic: 'Variables',
      prompt: 'What value is stored in the variable age?',
      code: 'age = 25',
      options: [
        { id: 'A', text: 'age' },
        { id: 'B', text: '25' },
        { id: 'C', text: 'Variable' },
        { id: 'D', text: 'No value' }
      ],
      correctOptionId: 'B'
    }
  },
  {
    id: 'module_operators',
    title: 'Operators and Simple Math',
    estimatedMinutes: 5,
    learningGoal: 'Use arithmetic operators in simple programming expressions.',
    explanation:
      'Programming can calculate values using operators. Common operators include + for addition, - for subtraction, * for multiplication, / for division, and % for remainder.',
    exampleCode: 'x = 10\ny = 3\nprint(x + y)\nprint(x % y)',
    quiz: {
      id: 'quiz_operators',
      topic: 'Operators',
      prompt: 'What is the output of this code?',
      code: 'x = 6\ny = 2\nprint(x * y)',
      options: [
        { id: 'A', text: '8' },
        { id: 'B', text: '12' },
        { id: 'C', text: '62' },
        { id: 'D', text: '3' }
      ],
      correctOptionId: 'B'
    }
  },
  {
    id: 'module_conditionals',
    title: 'Conditional Statements',
    estimatedMinutes: 6,
    learningGoal: 'Understand how if/else statements make decisions.',
    explanation:
      'A conditional statement helps a program make a decision. If a condition is true, the program runs one block of code. Otherwise, it can run a different block of code.',
    exampleCode: 'score = 80\n\nif score >= 60:\n    print("Pass")\nelse:\n    print("Try again")',
    quiz: {
      id: 'quiz_conditionals',
      topic: 'Conditionals',
      prompt: 'What is the output of this code?',
      code: 'temperature = 30\n\nif temperature > 25:\n    print("Hot")\nelse:\n    print("Cold")',
      options: [
        { id: 'A', text: 'Hot' },
        { id: 'B', text: 'Cold' },
        { id: 'C', text: '30' },
        { id: 'D', text: 'Error' }
      ],
      correctOptionId: 'A'
    }
  },
  {
    id: 'module_loops',
    title: 'Loops',
    estimatedMinutes: 7,
    learningGoal: 'Understand how loops repeat actions.',
    explanation:
      'A loop repeats a task. This is useful when a program needs to do the same action many times, such as printing numbers, checking items, or calculating totals.',
    exampleCode: 'for i in range(1, 4):\n    print(i)',
    quiz: {
      id: 'quiz_loops',
      topic: 'Loops',
      prompt: 'What is the output of this code?',
      code: 'for i in range(1, 3):\n    print(i)',
      options: [
        { id: 'A', text: '1, 2' },
        { id: 'B', text: '1, 2, 3' },
        { id: 'C', text: '0, 1, 2' },
        { id: 'D', text: '3 only' }
      ],
      correctOptionId: 'A'
    }
  },
  {
    id: 'module_functions',
    title: 'Functions',
    estimatedMinutes: 7,
    learningGoal: 'Understand how functions group reusable instructions.',
    explanation:
      'A function is a reusable block of code. It helps programmers avoid repeating the same instructions and makes programs easier to read.',
    exampleCode: 'def greet(name):\n    return "Hello " + name\n\nprint(greet("Budi"))',
    quiz: {
      id: 'quiz_functions',
      topic: 'Functions',
      prompt: 'What is the output of this code?',
      code: 'def add(a, b):\n    return a + b\n\nprint(add(4, 3))',
      options: [
        { id: 'A', text: '7' },
        { id: 'B', text: '43' },
        { id: 'C', text: 'add' },
        { id: 'D', text: 'Error' }
      ],
      correctOptionId: 'A'
    }
  }
];
