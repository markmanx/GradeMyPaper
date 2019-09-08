import React from 'react';
import styled, { css } from 'styled-components';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core';

import { Button } from '../../components';
import aqaLogoImg from './assets/aqa-board.png';

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

const ActionsWrapper = styled.div`
  display: flex;
`;

const AqaLogo = styled.img`
  width: 80%;
`;

export const PaperListItem = ({ paper }) => {
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
            <AqaLogo src={aqaLogoImg} />
          </Avatar>
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
            <Button>Get feedback</Button>
          </ActionsWrapper>
        </ListItemSecondaryAction>
      </ListItem>
    </Wrapper>
  );
};
