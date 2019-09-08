import React from 'react';
import styled, { css } from 'styled-components/macro';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  ${({ theme, slantTop, slantBottom }) => css`
    clip-path: polygon(
      0% ${slantTop ? '150px' : '0%'},
      100% 0%,
      100% ${slantBottom ? 'calc(100% - 150px)' : '100%'},
      0% 100%
    );
    background: ${theme.gradients.primary};
  `}
`;

export const SlantedBackground = ({
  children,
  slantTop = false,
  slantBottom = false
}) => {
  return (
    <Wrapper slantTop={slantTop} slantBottom={slantBottom}>
      {children}
    </Wrapper>
  );
};
