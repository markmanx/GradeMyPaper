import React from 'react';
import { List } from '@material-ui/core';

import { PaperListItem } from '../components';
import { usePapersQuery } from '../gql/queries/papersQuery';

export const PapersList = () => {
  const { data, loading, error } = usePapersQuery();

  if (loading || error || !data) {
    return null;
  }

  return (
    <List>
      {data.papers.map(paper => (
        <PaperListItem paper={paper} key={paper.id} />
      ))}
    </List>
  );
};
