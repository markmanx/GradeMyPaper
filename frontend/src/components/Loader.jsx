import React from 'react';
import { CircularProgress } from '@material-ui/core';

export const Loader = ({ color = 'primary', size }) => {
  return <CircularProgress color={color} size={size} />;
};
