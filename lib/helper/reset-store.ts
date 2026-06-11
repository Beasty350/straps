// lib/reset-store.ts
interface ResetSession {
  token: string;
  expiresAt: number;
}

export const resetSessions = new Map<string, ResetSession>();