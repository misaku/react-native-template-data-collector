import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

interface BranchProps {
  name: string;
  id: string;
}

interface StateReducerProps {
  branch?: BranchProps;
  branches?: BranchProps[];
}
interface StateProps extends StateReducerProps {
  setBrachById: (number: number) => void;
}

const branches: BranchProps[] = [
  {
    id: '1',
    name: 'cd-01',
  },
  {
    id: '2',
    name: 'cd-02',
  },
  {
    id: '3',
    name: 'cd-03',
  },
];
export const BranchStore = React.createContext<StateProps>({} as StateProps);

function reducerAuth(
  state: StateReducerProps,
  action: {type: string; payload: BranchProps | BranchProps[] | number},
) {
  switch (action.type) {
    case 'UPDADE_BRANCH':
      return {
        ...state,
        branch: action.payload as BranchProps,
      };
    case 'UPDADE_BRANCH_BY_ID': {
      const index = action.payload as number;
      if (index === state?.branches?.length) {
        return state;
      }
      return {
        ...state,
        branch: state?.branches?.[index] || ({} as BranchProps),
      };
    }
    case 'UPDATE_LIST_BRANCHES':
      return {
        ...state,
        branches: action.payload as BranchProps[],
      };
    default:
      return state;
  }
}

export const BranchProvider: React.FC<React.PropsWithChildren<any>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducerAuth, {
    branches: [],
  });

  useEffect(() => {
    dispatch({type: 'UPDATE_LIST_BRANCHES', payload: branches});
    dispatch({type: 'UPDADE_BRANCH', payload: branches[0]});
  }, []);

  const setBrachById = useCallback((index) => {
    dispatch({type: 'UPDADE_BRANCH_BY_ID', payload: index});
  }, []);
  const valueProvider = useMemo(
    () => ({
      ...state,
      setBrachById,
    }),
    [setBrachById, state],
  );
  return (
    <BranchStore.Provider value={valueProvider}>
      {children}
    </BranchStore.Provider>
  );
};

export const useBranchtore = () => useContext(BranchStore);
