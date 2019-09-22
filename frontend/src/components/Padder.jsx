import React from 'react';
import styled, { css } from 'styled-components/macro';

const Wrapper = styled.div`
  ${({
    theme,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    paddingVertical,
    paddingHorizontal
  }) => css`
    padding-left: ${theme.baseUnit * (paddingLeft || paddingHorizontal || 0)}px;
    padding-right: ${theme.baseUnit *
      (paddingRight || paddingHorizontal || 0)}px;
    padding-top: ${theme.baseUnit * (paddingTop || paddingVertical || 0)}px;
    padding-bottom: ${theme.baseUnit *
      (paddingBottom || paddingVertical || 0)}px;
  `}
`;

export const Padder = ({
  children,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  paddingVertical,
  paddingHorizontal,
  tag = 'div'
}) => {
  return (
    <Wrapper
      paddingRight={paddingRight}
      paddingLeft={paddingLeft}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      paddingVertical={paddingVertical}
      paddingHorizontal={paddingHorizontal}
      as={tag}
    >
      {children}
    </Wrapper>
  );
};
