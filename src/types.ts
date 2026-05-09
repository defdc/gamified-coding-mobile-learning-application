export type ResearchGroup = 'gamification_on' | 'gamification_off';

export type AppStep =
  | 'welcome'
  | 'demographics'
  | 'background'
  | 'pretest'
  | 'home'
  | 'lesson'
  | 'posttest'
  | 'questionnaire'
  | 'complete';

export type QuestionType = 'single_choice';

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  topic: string;
  prompt: string;
  code?: string;
  options: QuestionOption[];
  correctOptionId: string;
}

export interface LessonModule {
  id: string;
  title: string;
  estimatedMinutes: number;
  learningGoal: string;
  explanation: string;
  exampleCode?: string;
  quiz: Question;
}

export interface RespondentProfile {
  respondentId: string;
  group: ResearchGroup;
  age: string;
  gender: string;
  occupation: string;
  education: string;
  workingOrStudyingHours: string;
  reasonLearningCoding: string;
  dailyLearningTime: string;
  priorCodingExperience: string;
  createdAtIso: string;
}

export interface BackgroundProfile {
  priorExperience: number;
  basicConceptUnderstanding: number;
  confidenceLearningCoding: number;
  codingFeelsDifficult: number;
  careerInterest: number;
  tooBusyToLearn: number;
}

export interface TestResult {
  respondentId: string;
  group: ResearchGroup;
  testType: 'pretest' | 'posttest';
  answers: Record<string, string>;
  score: number;
  totalQuestions: number;
  submittedAtIso: string;
}

export interface ModuleProgress {
  moduleId: string;
  quizAnswer: string;
  quizCorrect: boolean;
  completedAtIso: string;
  timeSpentSeconds: number;
}

export interface GamificationState {
  xp: number;
  level: number;
  badges: string[];
  streak: number;
  completedModuleIds: string[];
}

export interface QuestionnaireResult {
  respondentId: string;
  group: ResearchGroup;
  engagement: Record<string, number>;
  motivation: Record<string, number>;
  usability: Record<string, number>;
  satisfaction: Record<string, number>;
  perceivedDifficulty: Record<string, number>;
  gamificationElements?: Record<string, number>;
  openEnded?: Record<string, string>;
  submittedAtIso: string;
}
