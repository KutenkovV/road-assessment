import React from 'react';
import NagruzkaStore from './nagruzka_store';

// @ts-ignore
export const NagruzkaContext = React.createContext<NagruzkaStore>();

export const NagruzkaProvider = ({children}: any) => {
  const store = new NagruzkaStore();
  return (
    <NagruzkaContext.Provider value={store}>
      {children}
    </NagruzkaContext.Provider>
  );
};

export const useNagruzkaStore = (): NagruzkaStore => {
  return React.useContext(NagruzkaContext);
};
