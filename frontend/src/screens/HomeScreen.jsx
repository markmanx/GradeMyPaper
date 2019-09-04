import React from 'react';
import { Link } from 'react-router-dom';

export const HomeScreen = () => {
  return (
    <div>
      This is the home screen <Link to="/protected">Go to protected route</Link>
    </div>
  );
};
