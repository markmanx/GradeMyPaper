import React from 'react';
import styled, { css } from 'styled-components/macro';

const Wrapper = styled.div`
  ${({ theme, variant }) => css`
    ${theme.typography[variant]}
  `}
`;

export const Text = ({ inline, variant = 'body1', children }) => {
  return (
    <Wrapper as={inline ? 'span' : 'div'} variant={variant}>
      {children}
    </Wrapper>
  );
};
