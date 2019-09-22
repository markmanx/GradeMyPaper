import { createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const BASE_UNIT = 20;
const PRIMARY_COLOR = blue;

const theme = {
  palette: {
    primary: PRIMARY_COLOR
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
    primary: `linear-gradient(90deg, ${PRIMARY_COLOR[400]} 0%, ${
      PRIMARY_COLOR[500]
    } 100%)`
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
    type: 'dark',
    primary: {
      main: '#FFFFFF',
      contrastText: PRIMARY_COLOR['800']
    },
    secondary: {
      ...theme.palette.primary
    },
    text: {
      primary: '#FFFFFF'
    }
  }
});
