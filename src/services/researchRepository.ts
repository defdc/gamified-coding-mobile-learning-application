import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import {
  BackgroundProfile,
  ModuleProgress,
  QuestionnaireResult,
  RespondentProfile,
  TestResult
} from '../types';
import { auth, db, firebaseEnabled } from '../lib/firebase';

async function ensureAnonymousSession(): Promise<void> {
  if (!firebaseEnabled || !auth) return;
  if (auth.currentUser) return;
  await signInAnonymously(auth);
}

async function safeWrite(collectionName: string, documentId: string | null, payload: unknown): Promise<void> {
  if (!firebaseEnabled || !db) {
    console.log(`[LOCAL ONLY] ${collectionName}`, payload);
    return;
  }

  await ensureAnonymousSession();

  if (documentId) {
    await setDoc(doc(db, collectionName, documentId), payload, { merge: true });
    return;
  }

  await addDoc(collection(db, collectionName), payload);
}

export async function saveRespondentProfile(profile: RespondentProfile): Promise<void> {
  await safeWrite('respondents', profile.respondentId, profile);
}

export async function saveBackgroundProfile(
  respondentId: string,
  background: BackgroundProfile
): Promise<void> {
  await safeWrite('background_profiles', respondentId, { respondentId, ...background });
}

export async function saveTestResult(result: TestResult): Promise<void> {
  await safeWrite('test_results', `${result.respondentId}_${result.testType}`, result);
}

export async function saveModuleProgress(
  respondentId: string,
  group: string,
  progress: ModuleProgress
): Promise<void> {
  await safeWrite('module_progress', `${respondentId}_${progress.moduleId}`, {
    respondentId,
    group,
    ...progress
  });
}

export async function saveQuestionnaire(result: QuestionnaireResult): Promise<void> {
  await safeWrite('questionnaires', result.respondentId, result);
}
