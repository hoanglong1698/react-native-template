import { createContext, useContext } from 'react';

type FormScrollContextValue = {
  registerField: (name: string, y: number) => void;
  unregisterField: (name: string) => void;
};

const defaultValue: FormScrollContextValue = {
  registerField: () => {},
  unregisterField: () => {},
};

export const FormScrollContext = createContext<FormScrollContextValue>(defaultValue);

export const useFormScrollContext = () => useContext(FormScrollContext);
