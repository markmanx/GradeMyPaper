import React from 'react';
import { __RouterContext } from 'react-router-dom';

export const useRouter = () => {
  return React.useContext(__RouterContext);
};
