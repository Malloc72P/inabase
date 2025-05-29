import { ProfileResult } from '@repo/dto';
import { createStore } from 'zustand';

export type SessionFetchingState = 'unauthenticated' | 'authenticated' | 'loading';

export interface SessionProps {
  user: ProfileResult | null;
  state: SessionFetchingState;
}

export interface SessionState extends SessionProps {}

export const createSessionStore = (initialProps?: SessionProps) => {
  return createStore<SessionState>()((set, get) => ({
    user: null,
    state: 'unauthenticated',
    ...initialProps,
  }));
};

export type SessionStore = ReturnType<typeof createSessionStore>;
