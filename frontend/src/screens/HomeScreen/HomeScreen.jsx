import React from 'react';
import styled, { css } from 'styled-components/macro';
import { Grid, Hidden, Card, CardContent } from '@material-ui/core';

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
  width: 100%;
  border-radius: 100%;
`;

const PricingContent = styled.div`
  margin-top: -100px;
`;

export const HomeScreen = () => {
  return (
    <>
      <ThemeProviders type="dark">
        <Section
          bgChildren={
            <SlantedBackground slantBottom>
              <Hidden smDown>
                <Section>
                  <Grid container justify="flex-end" spacing={4}>
                    <Grid item md={4}>
                      <PaperImg src={paper} />
                    </Grid>
                  </Grid>
                </Section>
              </Hidden>
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
        <Grid container spacing={4}>
          <Grid item md={4}>
            <AmandaImg src={amandaImg} />
          </Grid>
          <Grid item md={8}>
            <Padder paddingTop={8}>
              <Text variant="h3">About me</Text>
              <Padder paddingTop="0.5">
                <Text variant="h4" bold>
                  I'm Amanda. I help A-level biology students prepare for exams
                  and improve their exam technique.
                </Text>
              </Padder>
              <Padder paddingTop="2">
                <Text variant="h4">My Story</Text>
              </Padder>
              <Padder paddingTop="0.5">
                <Text>
                  I've been a qualified biology teacher for about 10 years now.
                  The biggest challenge my students have is application of their
                  knowledge to the exam paper. It is essential that you do as
                  many past exam papers as you can in order to practice for the
                  exam. Although mark schemes are freely available, they are
                  unable to show you how to correctly structure an answer to
                  meet the allocated marks, and they cannot provide the feedback
                  you need in order to begin writing better answers. Having your
                  paper marked by a qualified Biology teacher, with grades,
                  comments and suggestions will give you the right tools to
                  improve your exam technique.
                </Text>
              </Padder>
            </Padder>
          </Grid>
        </Grid>
      </AboutMeSection>
      <Padder paddingTop={4}>
        <Section bgChildren={<SlantedBackground slantTop></SlantedBackground>}>
          <PricingContent>
            <Padder paddingBottom={10}>
              <Grid container spacing={4} alignItems="flex-end">
                <Grid item md={4}>
                  <Padder paddingTop={2} paddingBottom={1}>
                    <Text variant="h1">Pricing</Text>
                  </Padder>
                  <Card elevation={5}>
                    <CardContent>
                      <Text variant="h3" bold>
                        Paper grading
                      </Text>
                      <Padder paddingTop={1}>
                        <Text variant="h4">
                          Get graded and extensive feedback on your practice
                          paper, within 48 hours.
                        </Text>
                      </Padder>
                      <Padder paddingTop={4}>
                        <Text variant="h1" inline>
                          £30
                        </Text>
                        <Text variant="h3" inline>
                          {' '}
                          per paper
                        </Text>
                      </Padder>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item md={8}>
                  <ThemeProviders type="dark">
                    <Text variant="h3" bold>
                      How it works
                    </Text>
                    <Padder paddingTop={0.5}>
                      <Text>
                        Pick one of the practice papers below, submit your
                        answers through our site (you don’t need a scanner, just
                        a device with a camera), and I’ll get back to you with a
                        grade and comments in 48 hours.
                      </Text>
                    </Padder>
                    <Padder paddingTop={1}>
                      <Button variant="contained">See practice papers</Button>
                    </Padder>
                  </ThemeProviders>
                </Grid>
              </Grid>
            </Padder>
          </PricingContent>
        </Section>
      </Padder>
    </>
  );
};
