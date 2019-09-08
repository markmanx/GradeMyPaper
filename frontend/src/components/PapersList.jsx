import React from 'react';
import styled from 'styled-components';
import { List } from '@material-ui/core';

import { papers } from '../data/papers';
import { PaperListItem } from '../components';

export const PapersList = () => {
  return (
    <>
      <List>
        {papers.map(paper => (
          <PaperListItem paper={paper} />
        ))}
      </List>
    </>
  );
};
