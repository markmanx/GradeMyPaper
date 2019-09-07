import React from 'react';
import styled, { ThemeContext } from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

import { Text } from '../components';

export const HomeScreen = () => {
  const theme = React.useContext(ThemeContext);
  console.log(theme);

  return (
    <div>
      <Button color="primary" variant="contained">
        Hello
      </Button>
      <Text>This is the home screen</Text>
      <Link to="/protected">Go to protected route</Link>
    </div>
  );
};
