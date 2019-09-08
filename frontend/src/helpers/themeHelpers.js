import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = {
  palette: {
    primary: blue
  },
  typography: {
    fontFamily: 'Montserrat',
    body1: {
      fontSize: 14,
      lineHeight: 1.5
    },
    h1: {
      fontSize: 32,
      fontWeight: 600,
      lineHeight: 1.2
    },
    h3: {
      fontSize: 24,
      lineHeight: 1.2
    },
    h4: {
      fontSize: 18,
      lineHeight: 1.3
    }
  },
  gradients: {
    primary:
      'linear-gradient(90deg, rgba(51,89,245,1) 0%, rgba(69,149,236,1) 100%)'
  },
  baseUnit: 20
};

export const lightTheme = createMuiTheme(theme);

export const darkTheme = createMuiTheme({
  ...theme,
  palette: {
    ...theme.palette,
    primary: {
      main: '#FFFFFF',
      contrastText: blue['800']
    },
    text: {
      primary: '#FFFFFF'
    }
  }
});
