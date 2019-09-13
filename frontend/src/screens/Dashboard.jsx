import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Tabs, Tab } from '@material-ui/core';

import { protectedQuery } from '../gql';
import { Section, SlantedBackground, PapersList, Padder } from '../components';
import { ThemeProviders } from '../context/ThemeProviders';

export const Dashboard = () => {
  const { loading, error, data } = useQuery(protectedQuery);
  const [tabIndex, setTabIndex] = React.useState(0);

  if (loading || error || !data) {
    return <div>Cannot load data</div>;
  }

  const onTabChange = (_, tabIndex) => {
    setTabIndex(tabIndex);
  };

  return (
    <Section bgChildren={<SlantedBackground slantBottom />}>
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
      </Padder>
    </Section>
  );
};
