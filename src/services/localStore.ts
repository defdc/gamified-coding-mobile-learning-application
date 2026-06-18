import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = 'codingapp_';
const SYNC_QUEUE_KEY = `${PREFIX}sync_queue`;
const SESSION_KEY = `${PREFIX}session_snapshot`;

export async function localSave(collection: string, id: string, payload: unknown): Promise<void> {
  const key = `${PREFIX}${collection}__${id}`;
  await AsyncStorage.setItem(key, JSON.stringify(payload));
}

export async function localLoad<T>(collection: string, id: string): Promise<T | null> {
  const key = `${PREFIX}${collection}__${id}`;
  const raw = await AsyncStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T) : null;
}

export async function enqueueSyncKey(collection: string, id: string): Promise<void> {
  const raw = await AsyncStorage.getItem(SYNC_QUEUE_KEY);
  const queue: string[] = raw ? JSON.parse(raw) : [];
  const entry = `${collection}__${id}`;
  if (!queue.includes(entry)) {
    queue.push(entry);
    await AsyncStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
  }
}

export async function dequeueSyncKey(collection: string, id: string): Promise<void> {
  const raw = await AsyncStorage.getItem(SYNC_QUEUE_KEY);
  if (!raw) return;
  const queue: string[] = JSON.parse(raw);
  const entry = `${collection}__${id}`;
  await AsyncStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue.filter((k) => k !== entry)));
}

export async function saveSessionSnapshot(snapshot: unknown): Promise<void> {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(snapshot));
}

export async function loadSessionSnapshot<T>(): Promise<T | null> {
  const raw = await AsyncStorage.getItem(SESSION_KEY);
  return raw ? (JSON.parse(raw) as T) : null;
}

export async function clearSessionSnapshot(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_KEY);
}
