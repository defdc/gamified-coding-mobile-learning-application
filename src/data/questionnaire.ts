export const likertScale = [
  { value: 1, label: 'Strongly disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly agree' }
];

export const questionnaireItems = {
  engagement: [
    'I was focused while using the learning application.',
    'The learning activities kept my attention.',
    'I wanted to continue completing the next lesson.',
    'The application made coding practice feel more engaging.',
    'I felt involved in the learning process.',
    'I did not feel bored while using the application.'
  ],
  motivation: [
    'I felt motivated to continue learning coding.',
    'I enjoyed completing the coding lessons.',
    'I felt that I could improve my coding ability.',
    'The learning activities made coding feel more achievable.',
    'I would like to continue learning coding after this study.',
    'The application helped reduce my fear that coding is too difficult.'
  ],
  usability: [
    'The application was easy to use.',
    'The menu and navigation were clear.',
    'I understood how to complete the learning activities.',
    'The interface was comfortable to use.',
    'I could use the application without much assistance.',
    'The application was suitable for beginner learners.'
  ],
  satisfaction: [
    'I am satisfied with my learning experience.',
    'The application helped me understand basic coding concepts.',
    'The learning duration was suitable for my schedule.',
    'The lesson format was appropriate for busy learners.',
    'I would recommend this application to other beginners.'
  ],
  perceivedDifficulty: [
    'Coding felt less intimidating after using the application.',
    'The short lesson format made coding feel easier to start.',
    'The application helped me learn coding despite having limited time.'
  ],
  gamificationElements: [
    'Points or XP motivated me to complete learning activities.',
    'Levels helped me understand my learning progress.',
    'Badges made me feel rewarded after completing tasks.',
    'Daily streaks encouraged me to learn consistently.',
    'Progress tracking helped me monitor my improvement.',
    'The gamification elements made coding feel less intimidating.',
    'The gamification elements supported my learning instead of distracting me.'
  ]
} as const;
