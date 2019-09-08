import React from 'react';
import styled from 'styled-components/macro';

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
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

export const Section = ({ children, bgChildren }) => {
  return (
    <Wrapper>
      <Background>{bgChildren}</Background>
      <InnerWrapper>{children}</InnerWrapper>
    </Wrapper>
  );
};
