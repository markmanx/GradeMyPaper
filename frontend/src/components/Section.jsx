import React from 'react';
import styled, { css } from 'styled-components/macro';

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;

  ${({ theme }) => css`
    padding: 0 ${theme.baseUnit * 1.5}px;

    ${theme.breakpoints.up('md')} {
      padding: 0;
    }
  `}
`;

const Background = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const InnerWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
`;

export const Section = ({ children, bgChildren, className }) => {
  return (
    <Wrapper className={className}>
      <Background>{bgChildren}</Background>
      <InnerWrapper>{children}</InnerWrapper>
    </Wrapper>
  );
};
