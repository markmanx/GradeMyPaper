import React from 'react';
import styled, { css } from 'styled-components/macro';

const Wrapper = styled.div`
  ${({ theme, variant, textColor }) => css`
    ${console.log(theme.palette.text[textColor])}
    ${theme.typography[variant]}
    color: ${theme.palette.text[textColor]};
  `}
`;

export const Text = ({
  inline,
  variant = 'body1',
  textColor = 'primary',
  children
}) => {
  return (
    <Wrapper
      as={inline ? 'span' : 'div'}
      variant={variant}
      textColor={textColor}
    >
      {children}
    </Wrapper>
  );
};
