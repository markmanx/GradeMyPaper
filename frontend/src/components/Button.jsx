import React from 'react';
import styled, { css } from 'styled-components/macro';
import { Button as MuiButton } from '@material-ui/core';

const Wrapper = styled.div`
  & .dark-MuiButton-root,
  .light-MuiButton-root {
    text-transform: none;

    ${({ theme }) => css`
      font-weight: 600;
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
