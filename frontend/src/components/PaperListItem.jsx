import React from 'react';
import styled, { css } from 'styled-components';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core';

import { Button } from '../components';

const Wrapper = styled.div`
  ${({ theme }) => css`
    & .light-MuiListItem-root {
      background-color: ${theme.palette.common.white};
    }
  `}
`;

const ActionsWrapper = styled.div`
  display: flex;
`;

export const PaperListItem = ({ paper }) => {
  return (
    <Wrapper>
      <ListItem
        button
        onClick={() => {
          window.open(paper.questionPaperUrl, '_blank');
        }}
      >
        <ListItemAvatar>
          <Avatar></Avatar>
        </ListItemAvatar>
        <ListItemText primary={paper.title} secondary={paper.qualification} />
        <ListItemSecondaryAction>
          <ActionsWrapper>
            <Button
              onClick={() => {
                window.open(paper.markSchemeUrl, '_blank');
              }}
            >
              Download mark scheme
            </Button>
            <Button>Get grade</Button>
          </ActionsWrapper>
        </ListItemSecondaryAction>
      </ListItem>
    </Wrapper>
  );
};
