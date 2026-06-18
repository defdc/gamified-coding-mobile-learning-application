# Gamified Coding Mobile MVP

This is a starter mobile application for a research project comparing two versions of the same microlearning coding app:

- **Gamification OFF**: microlearning modules, quizzes, progress, and feedback.
- **Gamification ON**: the same content plus XP, levels, badges, streaks, and gamified progress.

The application is designed for busy beginner learners with little to no coding experience.

## Tech Stack

- React Native
- Expo
- TypeScript
- Firebase Auth
- Firebase Firestore

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

## Firebase Setup

1. Create a Firebase project.
2. Enable Anonymous Authentication.
3. Create a Firestore database.
4. Copy `.env.example` to `.env`.
5. Fill in the Firebase Web App configuration values.

```bash
cp .env.example .env
```

Example `.env` structure:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

If Firebase is not configured, the app still runs and prints data to the Expo terminal as `LOCAL ONLY` logs.

## Firestore Collections

The app writes to these collections:

```text
respondents
background_profiles
test_results
module_progress
questionnaires
```

Suggested testing-only Firestore rules:

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Do not use the rules above for production public apps. They are only for controlled research testing.

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
- Firebase write functions.

## What to Improve Next

1. Add consent page text approved by your lecturer.
2. Add more learning modules if needed.
3. Add an admin dashboard or CSV export script.
4. Add better visual design and app branding.
5. Lock the pretest/posttest and questionnaire before user testing.
6. Pilot test with 2-3 people before testing all 30 respondents.

## Important Research Note

Both groups use the same microlearning content. The only difference is whether gamification elements are displayed. This helps isolate gamification as the independent variable.