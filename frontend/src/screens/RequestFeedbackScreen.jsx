import React from 'react';

import { useRouter } from '../hooks/useRouter';

export const RequestFeedbackScreen = () => {
  const { match } = useRouter();

  console.log(match);

  return <div></div>;
};
