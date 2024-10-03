import React, { createContext, useContext, useReducer } from 'react';
import { ChildrenProps, State } from '../types';
import { initialState, reducer } from './reducer';

const Context = createContext<State>(initialState);
const DispatchContext = createContext<React.Dispatch<any>>(() => null);

export function Provider({ children }: ChildrenProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </Context.Provider>
  );
}

export function useAppState() {
  return useContext(Context);
}

export function useAppDispatch() {
  return useContext(DispatchContext);
}
