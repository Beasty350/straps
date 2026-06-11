// lib/pending-store.ts
export interface PendingRegistration {
   id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  birthDate: Date | null;   // <-- replace age with birthDate
  gender: string | null;
  totpSecret: string;
  expiresAt: number;
}

export const pendingRegistrations = new Map<string, PendingRegistration>();