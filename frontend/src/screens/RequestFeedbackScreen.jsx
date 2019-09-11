import React from 'react';

import { useRouter } from '../hooks/useRouter';

export const RequestFeedbackScreen = () => {
  const {
    match: { params }
  } = useRouter();

  const { paperId } = params;

  console.log(paperId);

  return <div></div>;
};
