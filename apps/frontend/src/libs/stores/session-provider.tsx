'use client';

import { createContext, PropsWithChildren, useContext, useRef } from 'react';
import { createSessionStore, SessionProps, SessionState, SessionStore } from './session-store';
import { ProfileResult } from '@repo/dto';
import { useStore } from 'zustand';

export const SessionContext = createContext<SessionStore | null>(null);

export interface SessionProviderProps extends SessionProps, PropsWithChildren {}

export function SessionProvider({ children, ...initialProps }: SessionProviderProps) {
  const store = useRef<SessionStore>(createSessionStore(initialProps)).current;

  return <SessionContext.Provider value={store}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionState {
  const store = useContext(SessionContext);

  if (!store) {
    throw new Error('No NavbarProvider Error');
  }

  return {
    user: useStore(store, (s) => s.user),
    state: useStore(store, (s) => s.state),
    updateSession: useStore(store, (s) => s.updateSession),
    setLoading: useStore(store, (s) => s.setLoading),
  };
}
