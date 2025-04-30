import React, {useCallback, useMemo, useReducer, useContext} from 'react';

interface UserProps {
  name: string;
  login: string;
}

interface StateProps {
  isAuthenticad?: boolean;
  user?: UserProps;
}

export const AuthStore = React.createContext<StateProps>({} as StateProps);

function reducerAuth(state: StateProps, action: {type: string}) {
  switch (action.type) {
    case 'AUTHENTICAD':
      return {
        ...state,
        isAuthenticad: true,
      };
    case 'UNAUTHENTICAD':
      return {
        ...state,
        isAuthenticad: false,
      };
    default:
      return state;
  }
}

export const AuthProvider: React.FC<React.PropsWithChildren<any>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducerAuth, {
    isAuthenticad: false,
  });

  const makeAuthenticad = useCallback(() => {
    dispatch({type: 'AUTHENTICAD'});
  }, []);

  const makeUnauthenticad = useCallback(() => {
    dispatch({type: 'UNAUTHENTICAD'});
  }, []);

  const valueProvider = useMemo(
    () => ({
      ...state,
      makeAuthenticad,
      makeUnauthenticad,
    }),
    [makeAuthenticad, makeUnauthenticad, state],
  );

  return (
    <AuthStore.Provider value={valueProvider}>{children}</AuthStore.Provider>
  );
};

export const useAuthStore = () => useContext(AuthStore);
