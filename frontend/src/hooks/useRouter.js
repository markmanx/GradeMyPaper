import React from 'react';
import { RouterContext } from '../context/RouterContext.jsx';

export const useRouter = () => {
  return React.useContext(RouterContext);
};
