import { GamificationState, Question } from '../types';

export function calculateTestScore(
  questions: Question[],
  answers: Record<string, string>
): number {
  const correct = questions.reduce((total, question) => {
    return total + (answers[question.id] === question.correctOptionId ? 1 : 0);
  }, 0);

  return Math.round((correct / questions.length) * 100);
}

export function isAllQuestionsAnswered(
  questions: Question[],
  answers: Record<string, string>
): boolean {
  return questions.every((question) => Boolean(answers[question.id]));
}

function todayDateIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function createInitialGamificationState(): GamificationState {
  return {
    xp: 0,
    level: 1,
    badges: [],
    streak: 0,
    lastActiveDate: null,
    completedModuleIds: []
  };
}

export function awardModuleCompletion(
  previousState: GamificationState,
  moduleId: string,
  quizCorrect: boolean
): GamificationState {
  if (previousState.completedModuleIds.includes(moduleId)) {
    return previousState;
  }

  const today = todayDateIso();
  const last = previousState.lastActiveDate;

  let nextStreak: number;
  if (last === null) {
    nextStreak = 1;
  } else if (last === today) {
    nextStreak = previousState.streak;
  } else {
    const diffDays = Math.round(
      (new Date(today).getTime() - new Date(last).getTime()) / 86_400_000
    );
    nextStreak = diffDays === 1 ? previousState.streak + 1 : 1;
  }

  const xpGain = quizCorrect ? 40 : 20;
  const nextXp = previousState.xp + xpGain;
  const nextLevel = Math.floor(nextXp / 100) + 1;
  const completedModuleIds = [...previousState.completedModuleIds, moduleId];
  const badges = new Set(previousState.badges);

  if (completedModuleIds.length === 1) badges.add('First Step');
  if (completedModuleIds.length === 3) badges.add('Consistent Learner');
  if (completedModuleIds.length >= 5) badges.add('Coding Starter');
  if (quizCorrect) badges.add('Problem Solver');

  return {
    xp: nextXp,
    level: nextLevel,
    streak: Math.min(nextStreak, 30),
    lastActiveDate: today,
    badges: Array.from(badges),
    completedModuleIds
  };
}

export function buildLikertRecord(items: readonly string[], value = 3): Record<string, number> {
  return items.reduce<Record<string, number>>((record, item, index) => {
    record[`item_${index + 1}`] = value;
    return record;
  }, {});
}

export function meanScore(record: Record<string, number>): number {
  const values = Object.values(record);
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}
