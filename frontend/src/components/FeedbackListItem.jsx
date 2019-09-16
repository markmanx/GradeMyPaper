import React from 'react';
import styled, { css } from 'styled-components';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core';
import { AccessTime } from '@material-ui/icons';

import { Button, Text } from '../components';

const Wrapper = styled.div`
  ${({ theme }) => css`
    & .light-MuiListItem-root {
      background-color: ${theme.palette.common.white};

      &.light-MuiListItem-button:hover {
        background-color: ${theme.palette.grey['200']};
      }
    }

    & .light-MuiAvatar-root {
      background-color: ${theme.palette.primary.dark};
    }
  `}
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => css`
    color: ${theme.palette.common.white};
  `}
`;

const ActionsWrapper = styled.div`
  display: flex;
`;

export const FeedbackListItem = ({ request }) => {
  const { feedback, paper } = request;

  return (
    <Wrapper>
      <ListItem
        button
        onClick={() => {
          window.open(paper.questionPaperUrl, '_blank');
        }}
        divider
      >
        <ListItemAvatar>
          <Avatar>
            {feedback ? (
              <Text variant="h4" bold textColor="white">
                {feedback.grade}
              </Text>
            ) : (
              <IconWrapper>
                <AccessTime />
              </IconWrapper>
            )}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={paper.title}
          secondary={
            feedback
              ? `${feedback.marks} / ${paper.totalMarks}`
              : 'Processing grade...'
          }
        />
        {feedback && (
          <ListItemSecondaryAction>
            <ActionsWrapper>
              <Button onClick={() => {}}>Download feedback</Button>
            </ActionsWrapper>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    </Wrapper>
  );
};
