import React from 'react';
import { List } from '@material-ui/core';

import { FeedbackListItem } from '../components';
import { useRequestsQuery } from '../gql';

export const FeedbackList = () => {
  const { data, loading, error } = useRequestsQuery();

  if (loading || error || !data) {
    return null;
  }

  return (
    <List>
      {data.requests.map(request => (
        <FeedbackListItem request={request} key={request.id} />
      ))}
    </List>
  );
};
