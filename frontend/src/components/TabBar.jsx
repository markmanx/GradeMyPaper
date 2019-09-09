import React from 'react';
import { Tabs, Tab } from '@material-ui/core';

export const TabBar = () => {
  return (
    <Tabs textColor="secondary">
      <Tab>Practice papers</Tab>
      <Tab>My grades</Tab>
    </Tabs>
  );
};
