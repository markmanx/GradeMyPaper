import React from 'react';
import styled, { css } from 'styled-components';
import { ThemeProviders } from '../context/ThemeProviders';

import { Section, Padder, Text } from './';

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  ${({ theme }) => css`
    background-color: ${theme.palette.grey['900']};
  `}
`;

export const Footer = () => {
  return (
    <Section bgChildren={<Background />}>
      <ThemeProviders type="dark">
        <Padder paddingVertical={2}>
          <Text variant="body2" textColor="hint" bold>
            © {new Date().getFullYear()} GradeMyPaper
            <br /> Amanda Mankarious trading as GradeMyPaper
          </Text>
        </Padder>
      </ThemeProviders>
    </Section>
  );
};
