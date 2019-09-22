import React from 'react';
import styled from 'styled-components/macro';
import { SnackbarContent } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

import { Padder } from './';

const Wrapper = styled.div`
  width: 100%;

  & [class*='MuiSnackbarContent-root'] {
    box-shadow: none;
    background-color: ${red['100']};
    border: 1px solid ${red['600']};
    color: ${red['600']};
  }
`;

export const ErrorSnackbar = ({ children, paddingTop = 0 }) => {
  return (
    <Wrapper>
      <Padder paddingTop={paddingTop}>
        <SnackbarContent message={children} />
      </Padder>
    </Wrapper>
  );
};
