import React, { createContext, useState } from 'react';
import { useMediaQuery, Hidden } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const ScreenContext = createContext({ isSmallScreen: false, isMiddleScreen: true });

export function ScreenProvider(props: React.PropsWithChildren<{}>){
    const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMiddleScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
      <ScreenContext.Provider value={{ isSmallScreen, isMiddleScreen }}>
      {props.children}
    </ScreenContext.Provider>
  );
};