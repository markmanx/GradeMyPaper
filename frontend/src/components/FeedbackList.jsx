import React from 'react';
import { List } from '@material-ui/core';

import { FeedbackListItem } from '../components';
import { useRequestsQuery, useGetDownloadPresignedUrlMutation } from '../gql';

export const FeedbackList = () => {
  const { data, loading, error } = useRequestsQuery();
  // TODO: Show loader on mutation loading
  const [
    mutation,
    { loading: mutationLoading, error: mutationError }
  ] = useGetDownloadPresignedUrlMutation();

  // TODO: Better error handline here
  if (loading || error || !data) {
    return null;
  }

  const onSeeFeedbackClicked = async requestId => {
    const response = await mutation({ variables: { requestId } });

    if (!response.data) {
      return null;
    }

    window.open(response.data.getDownloadPresignedUrl);
  };

  return (
    <List>
      {data.requests.map(request => (
        <FeedbackListItem
          request={request}
          onSeeFeedbackClicked={() => {
            onSeeFeedbackClicked(request.id);
          }}
          key={request.id}
        />
      ))}
    </List>
  );
};
