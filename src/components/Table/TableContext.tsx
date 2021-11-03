import React from 'react';

export const TableContext = React.createContext<
  [string, React.Dispatch<React.SetStateAction<string>>]
>({} as any);

export const ChosenContext = React.createContext<
  [string, React.Dispatch<React.SetStateAction<string>>]
>({} as any);
