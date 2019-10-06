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

export const FeedbackListItem = ({ request, onSeeFeedbackClicked }) => {
  const { feedback, paper } = request;
  console.log(paper)

  return (
    <Wrapper>
      <ListItem divider>
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
              : "We're currently grading your paper.  Your feedback will be ready soon."
          }
        />
        {feedback && (
          <ListItemSecondaryAction>
            <ActionsWrapper>
              <Button onClick={onSeeFeedbackClicked}>See feedback</Button>
            </ActionsWrapper>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    </Wrapper>
  );
};
