import React from 'react';
import styled, { css } from 'styled-components/macro';
import { List } from '@material-ui/core';

import { FeedbackListItem, Padder, Text } from '../components';
import { useRequestsQuery, useGetDownloadPresignedUrlMutation } from '../gql';

const EmptyState = styled.div`
  width: 100%;
  border: 2px dashed white;
  border-radius: 10px;

  ${({ theme }) => css`
    background-color: rgba(255, 255, 255, 0.1);
  `}
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

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

  const hasRequests = data.requests.length;

  return (
    <List>
      {hasRequests ? (
        data.requests.map(request => (
          <FeedbackListItem
            request={request}
            onSeeFeedbackClicked={() => {
              onSeeFeedbackClicked(request.id);
            }}
            key={request.id}
          />
        ))
      ) : (
        <EmptyState>
          <Padder paddingVertical={8}>
            <InnerWrapper>
              <Text color="white" bold>
                No grades yet
              </Text>
            </InnerWrapper>
          </Padder>
        </EmptyState>
      )}
    </List>
  );
};
