import React from 'react';
import styled, { css } from 'styled-components/macro';
import { Grid } from '@material-ui/core';

import { ThemeProviders } from '../../context/ThemeProviders';
import paper from './assets/paper.jpg';
import {
  Text,
  Section,
  SlantedBackground,
  Padder,
  Button
} from '../../components';
import amandaImg from './assets/amanda.png';

const TextWrapper = styled.div`
  width: 70%;

  & .MuiButtonBase-root-38 {
    background-color: red;
  }
`;

const PaperImg = styled.img`
  width: 100%;
  margin-top: 100px;
  box-shadow: 0px 10px 24px -8px rgba(0, 0, 0, 0.54);
`;

const AboutMeSection = styled(Section)`
  margin-top: -115px;
`;

const AmandaImg = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 100%;
`;

export const HomeScreen = () => {
  return (
    <>
      <ThemeProviders type="dark">
        <Section
          bgChildren={
            <SlantedBackground>
              <Section>
                <Grid container justify="flex-end" spacing={4}>
                  <Grid item md={4}>
                    <PaperImg src={paper} />
                  </Grid>
                </Grid>
              </Section>
            </SlantedBackground>
          }
        >
          <Padder paddingTop={7} paddingBottom={12}>
            <Grid container spacing={4}>
              <Grid item md={8}>
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
              </Grid>
            </Grid>
          </Padder>
        </Section>
      </ThemeProviders>
      <AboutMeSection>
        <AmandaImg src={amandaImg} />
      </AboutMeSection>
    </>
  );
};
