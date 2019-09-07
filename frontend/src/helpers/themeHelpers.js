import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

export const theme = createMuiTheme({
  palette: {
    primary: blue
  },
  typography: {
    fontFamily: 'Montserrat',
    body1: {
      fontSize: 14
    }
  }
});
