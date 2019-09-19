import React from 'react';
import styled, { css } from 'styled-components/macro';

const Wrapper = styled.div`
  ${({ theme, variant, textColor, bold }) => css`
    ${theme.typography[variant]}
    color: ${theme.palette.text[textColor]};
    ${bold &&
      css`
        font-weight: 600;
      `}
  `}
`;

export const Text = ({
  inline,
  variant = 'body1',
  textColor = 'primary',
  bold = false,
  children,
  className
}) => {
  return (
    <Wrapper
      as={inline ? 'span' : 'div'}
      variant={variant}
      textColor={textColor}
      bold={bold}
      className={className}
    >
      {children}
    </Wrapper>
  );
};
