import { doc, setDoc } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import {
  BackgroundProfile,
  ModuleProgress,
  QuestionnaireResult,
  RespondentProfile,
  TestResult
} from '../types';
import { auth, db, firebaseEnabled } from '../lib/firebase';
import { dequeueSyncKey, enqueueSyncKey, localSave } from './localStore';

export interface SaveResult {
  savedLocally: boolean;
  syncedToCloud: boolean;
}

async function ensureAnonymousSession(): Promise<void> {
  if (!firebaseEnabled || !auth) return;
  if (auth.currentUser) return;
  await signInAnonymously(auth);
}

async function safeWrite(
  collectionName: string,
  documentId: string,
  payload: unknown
): Promise<SaveResult> {
  await localSave(collectionName, documentId, payload);

  if (!firebaseEnabled || !db) {
    await enqueueSyncKey(collectionName, documentId);
    return { savedLocally: true, syncedToCloud: false };
  }

  try {
    await ensureAnonymousSession();
    await setDoc(
      doc(db, collectionName, documentId),
      payload as Record<string, unknown>,
      { merge: true }
    );
    await dequeueSyncKey(collectionName, documentId);
    return { savedLocally: true, syncedToCloud: true };
  } catch (error) {
    console.warn(`[SYNC FAILED] ${collectionName}/${documentId}`, error);
    await enqueueSyncKey(collectionName, documentId);
    return { savedLocally: true, syncedToCloud: false };
  }
}

export async function saveRespondentProfile(profile: RespondentProfile): Promise<SaveResult> {
  return safeWrite('respondents', profile.respondentId, profile);
}

export async function saveBackgroundProfile(
  respondentId: string,
  background: BackgroundProfile
): Promise<SaveResult> {
  return safeWrite('background_profiles', respondentId, { respondentId, ...background });
}

export async function saveTestResult(result: TestResult): Promise<SaveResult> {
  return safeWrite('test_results', `${result.respondentId}_${result.testType}`, result);
}

export async function saveModuleProgress(
  respondentId: string,
  group: string,
  progress: ModuleProgress
): Promise<SaveResult> {
  return safeWrite('module_progress', `${respondentId}_${progress.moduleId}`, {
    respondentId,
    group,
    ...progress
  });
}

export async function saveQuestionnaire(result: QuestionnaireResult): Promise<SaveResult> {
  return safeWrite('questionnaires', result.respondentId, result);
}
