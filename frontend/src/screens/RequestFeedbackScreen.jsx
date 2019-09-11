import React from 'react';
import { Card } from '@material-ui/core';

import { useRouter } from '../hooks/useRouter';
import {
  Section,
  SlantedBackground,
  Padder,
  FileUploader
} from '../components';

export const RequestFeedbackScreen = () => {
  const {
    match: { params }
  } = useRouter();

  const { paperId } = params;

  return (
    <Section bgChildren={<SlantedBackground slantBottom />}>
      <Padder paddingTop={10}>
        <Card elevation={5}>
          <Padder paddingVertical={2} paddingHorizontal={2}>
            <FileUploader />
          </Padder>
        </Card>
      </Padder>
    </Section>
  );
};
