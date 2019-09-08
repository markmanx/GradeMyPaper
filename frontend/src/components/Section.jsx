import React from 'react';
import styled from 'styled-components/macro';

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const InnerWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
`;

export const Section = ({ children }) => {
  return (
    <Wrapper>
      <InnerWrapper>{children}</InnerWrapper>
    </Wrapper>
  );
};
