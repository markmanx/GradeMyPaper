import React from 'react';
import { Tabs, Tab } from '@material-ui/core';

import {
  Section,
  SlantedBackground,
  PapersList,
  Padder,
  FeedbackList
} from '../components';
import { ThemeProviders } from '../context/ThemeProviders';

export const Dashboard = () => {
  const [tabIndex, setTabIndex] = React.useState(0);

  const onTabChange = (_, tabIndex) => {
    setTabIndex(tabIndex);
  };

  return (
    <Section bgChildren={<SlantedBackground />}>
      <Padder paddingTop={8} paddingBottom={6}>
        <Padder paddingBottom={1}>
          <ThemeProviders type="dark">
            <Tabs
              textColor="primary"
              indicatorColor="primary"
              value={tabIndex}
              onChange={onTabChange}
            >
              <Tab label="Practice papers" />
              <Tab label="My grades" />
            </Tabs>
          </ThemeProviders>
        </Padder>

        {tabIndex === 0 && <PapersList />}
        {tabIndex === 1 && <FeedbackList />}
      </Padder>
    </Section>
  );
};
