import React from 'react';
import styled, { ThemeContext } from 'styled-components/macro';
import { Link } from 'react-router-dom';

export const HomeScreen = () => {
  const theme = React.useContext(ThemeContext);
  console.log(theme);

  return (
    <div>
      This is the home screen <Link to="/protected">Go to protected route</Link>
    </div>
  );
};
