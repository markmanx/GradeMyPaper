import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const BASE_UNIT = 20;

const theme = {
  palette: {
    primary: blue
  },
  typography: {
    fontFamily: 'Montserrat',
    body1: {
      fontSize: 16,
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
  overrides: {
    MuiCardContent: {
      root: {
        padding: BASE_UNIT * 1.5
      }
    }
  },
  baseUnit: BASE_UNIT
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
