import React from 'react';
import { ThemeProvider } from 'styled-components/macro';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';

import { lightTheme, darkTheme } from '../helpers/themeHelpers';

export const ThemeProviders = ({ children, type = 'light' }) => {
  const generateClassName = createGenerateClassName({
    seed: type
  });

  const theme = type === 'light' ? lightTheme : darkTheme;

  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
        <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
      </ThemeProvider>
    </StylesProvider>
  );
};
