import React from 'react';
import styled, { css } from 'styled-components/macro';
import { Button as MuiButton } from '@material-ui/core';
import { easing } from '@material-ui/core/styles';
import { duration } from '@material-ui/core/styles';

const Wrapper = styled.div`
  & .dark-MuiButton-root,
  .light-MuiButton-root {
    text-transform: none;
    font-weight: 600;

    ${({ theme }) => css`
      ${theme.palette.type === 'dark' &&
        css`
          &:hover {
            background-color: ${theme.palette.secondary.light};
            color: ${theme.palette.common.white};
          }
        `}
        transition: ${theme.transitions.create(['color', 'background-color'], {
          duration: theme.transitions.duration.complex
        })};
    `}
  }
`;

export const Button = ({ children, color = 'primary', ...buttonProps }) => {
  return (
    <Wrapper>
      <MuiButton color={color} {...buttonProps}>
        {children}
      </MuiButton>
    </Wrapper>
  );
};
