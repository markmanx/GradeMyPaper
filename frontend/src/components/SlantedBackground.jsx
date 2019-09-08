import React from 'react';
import styled, { css } from 'styled-components/macro';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  clip-path: polygon(0% 0%, 100% 0%, 100% calc(100% - 150px), 0% 100%);

  ${({ theme }) => css`
    background: ${theme.gradients.primary};
  `}
`;

export const SlantedBackground = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
