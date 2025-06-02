import { ProfileResult } from '@repo/dto';
import { createStore } from 'zustand';

export type SessionFetchingState = 'unauthenticated' | 'authenticated' | 'loading';

export interface SessionProps {
  user: ProfileResult | null;
  state: SessionFetchingState;
}

export interface SessionState extends SessionProps {
  updateSession: (newProfile: ProfileResult | null) => void;
  setLoading: () => void;
}

export const createSessionStore = (initialProps?: SessionProps) => {
  return createStore<SessionState>()((set, get) => ({
    user: null,
    state: 'unauthenticated',
    ...initialProps,
    updateSession: (newProfile) => {
      const nextState: SessionFetchingState = newProfile ? 'authenticated' : 'unauthenticated';

      set({ state: nextState, user: newProfile });
    },
    setLoading: () => {
      set({ state: 'loading' });
    },
  }));
};

export type SessionStore = ReturnType<typeof createSessionStore>;
