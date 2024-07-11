import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { ReactNode, createContext, useMemo, useState, useContext, useCallback, useEffect } from 'react';

import { setAxiosConfig } from '@/utils/apis/axios-with-config';
import { ProfileType } from '@/utils/types/users';
import { getProfile } from '@/utils/apis/users';

interface Context {
  token: string;
  user?: ProfileType;
  changeToken: (token?: string) => void;
}

interface Props {
  children: ReactNode;
}

const contextValue = {
  token: '',
  changeToken: () => {},
};

const TokenContext = createContext<Context>(contextValue);

export const TokenProvider = ({ children }: Props) => {
  const [token, setToken] = useState(Cookies.get('token') ?? '');
  const [user, setUser] = useState<ProfileType>();

  useEffect(() => {
    setAxiosConfig(token);
    token !== '' && fetchProfile();
  }, [token]);

  const fetchProfile = useCallback(async () => {
    try {
      const response = await getProfile();

      setUser(response.payload);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, [token]);

  const changeToken = useCallback(
    (token?: string) => {
      const newToken = token ?? '';

      if (token) {
        Cookies.set('token', token);
      } else {
        Cookies.remove('token');
        setUser(undefined);
      }

      setToken(newToken);
    },
    [token]
  );

  const tokenContextValue = useMemo(
    () => ({
      token,
      user,
      changeToken,
    }),
    [token, user, changeToken]
  );

  return <TokenContext.Provider value={tokenContextValue}>{children}</TokenContext.Provider>;
};

export function useToken() {
  const context = useContext(TokenContext);

  if (context === undefined) {
    throw new Error('ERROR, useToken must be used within TokenContext');
  }

  return context;
}
