import React from 'react';
import styled from 'styled-components/macro';

import { ThemeProviders } from '../../context/ThemeProviders';
import paper from './assets/paper.jpg';
import {
  Text,
  Section,
  SlantedBackground,
  Padder,
  Button
} from '../../components';

const TextWrapper = styled.div`
  width: 70%;

  & .MuiButtonBase-root-38 {
    background-color: red;
  }
`;

const PaperImg = styled.img`
  position: absolute;
  width: 270px;
  right: 0;
  top: 100px;
  box-shadow: 0px 10px 24px -8px rgba(0, 0, 0, 0.54);
`;

export const HomeScreen = () => {
  return (
    <>
      <ThemeProviders type="dark">
        <Section
          bgChildren={
            <SlantedBackground>
              <Section>
                <PaperImg src={paper} />
              </Section>
            </SlantedBackground>
          }
        >
          <Padder paddingTop={7} paddingBottom={10}>
            <TextWrapper>
              <Text variant="h1">
                Get feedback on your practice papers from a qualified biology
                teacher.
              </Text>
              <Padder paddingTop={0.5}>
                <Text variant="h4">
                  Practice as many papers as you can, use the supplied mark
                  scheme or get feedback from qualified biology teachers in
                  under 48 hours.
                </Text>
              </Padder>
              <Padder paddingTop={1.5}>
                <Button variant="contained">See practice papers</Button>
              </Padder>
            </TextWrapper>
          </Padder>
        </Section>
      </ThemeProviders>
    </>
  );
};
