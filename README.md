# Gamified Coding Mobile MVP

This is a starter mobile application for a research project comparing two versions of the same microlearning coding app:

- **Gamification OFF**: microlearning modules, quizzes, progress, and feedback.
- **Gamification ON**: the same content plus XP, levels, badges, streaks, and gamified progress.

The application is designed for busy beginner learners with little to no coding experience.

## Tech Stack

- React Native
- Expo
- TypeScript

## Research Flow

1. Respondent enters ID and group code.
2. Respondent fills demographic data.
3. Respondent fills basic coding background questionnaire.
4. Respondent completes pretest.
5. Respondent completes microlearning modules.
6. Respondent completes posttest.
7. Respondent fills post-use questionnaire.
8. Data is saved to Firestore if Firebase is configured.

## Group Codes

Use these codes during testing:

- `OFF` or `A`: Gamification OFF group.
- `ON` or `B`: Gamification ON group.

This lets the researcher keep the distribution balanced, for example 15 respondents in each group.

## Setup

Install Node.js LTS, then run:

```bash
npm install
npm run start
```

Open the project with Expo Go on Android or iOS, or run it on an emulator.

## MVP Features Included

- Respondent ID and group assignment.
- Demographic form.
- Basic coding background form.
- 10-item pretest.
- 5 microlearning coding modules.
- Module quiz and progress logging.
- 10-item posttest.
- Engagement, motivation, usability, satisfaction, and perceived-difficulty questionnaire.
- Gamification element questionnaire for Gamification ON users.
- Gamification ON/OFF feature flag through respondent group.

## Important Research Note

Both groups use the same microlearning content. The only difference is whether gamification elements are displayed. This helps isolate gamification as the independent variable.
