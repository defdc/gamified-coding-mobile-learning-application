export const likertScale = [
  { value: 1, label: 'Strongly disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly agree' }
];

export const gamificationQuestionnaire = {
  section1: {
    title: 'Views on Gamification',
    stem: 'Having experienced the application of gamification in education, do you believe that it can…',
    items: [
      'increase the effectiveness of the educational process?',
      'improve academic performance and learning outcomes?',
      'promote motivation for learning?',
      'promote active participation and engagement?',
      'increase learning productivity?',
      'offer more enjoyable learning experiences?',
      'reinforce focus on the achievement of educational goals?',
      'create a competitive environment?',
      'cause negative feelings due to competition involved?'
    ] as const
  },
  section2: {
    title: 'Learning Motivation',
    question: 'Having experienced the application of gamification in education, which motivations do you believe it mostly promoted?',
    options: [
      'No motivation',
      'Intrinsic motivation only',
      'Extrinsic motivation only',
      'Both intrinsic and extrinsic motivation'
    ] as const
  },
  section3: {
    title: 'Basic Needs',
    stem: 'Having experienced the application of gamification in education, do you believe that its use in educational settings can promote…',
    items: [
      'autonomy',
      'competence and sufficiency',
      'relatedness — a sense of belonging'
    ] as const
  },
  section4: {
    title: 'Benefits in This Course',
    stem: 'Having experienced the application of gamification in education, do you believe that its use in the educational process can…',
    items: [
      'offer educational benefits?',
      'render the educational process more interesting?',
      'promote learning motivation for success and intense effort through its reward systems?',
      'create learning environments which have students in their core?'
    ] as const
  },
  section5: {
    title: 'Future Use',
    stem: 'Having experienced the application of gamification in education, do you believe that gamification…',
    items: [
      'should be used again in this course?',
      'should be applied in other courses as well?',
      'can enrich higher education?'
    ] as const
  }
} as const;
