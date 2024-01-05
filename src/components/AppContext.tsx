'use client';
import { SessionProvider } from 'next-auth/react';

const AppProvider = ({ children }: any) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AppProvider;
