import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { Card } from '@material-ui/core';

import { useRouter } from '../hooks/useRouter';
import {
  Section,
  SlantedBackground,
  Padder,
  FileUploader,
  Button
} from '../components';

const Navigation = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const RequestFeedbackScreen = () => {
  const [step, setStep] = React.useState(0);
  const [cardWidth, setCardWidth] = React.useState(500);
  const cardRef = React.useRef(null);

  React.useEffect(() => {
    const onWindowResize = () => {
      if (cardRef.current) {
        setCardWidth(cardRef.current.clientWidth - 80);
      } else {
        setCardWidth(500);
      }
    };

    window.addEventListener('resize', onWindowResize);
    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  const {
    match: { params }
  } = useRouter();

  const { paperId } = params;

  return (
    <Section bgChildren={<SlantedBackground slantBottom />}>
      <Padder paddingTop={10}>
        <Card elevation={5} ref={cardRef}>
          <Padder paddingVertical={2} paddingHorizontal={2}>
            {step === 0 && <FileUploader width={cardWidth} />}
            <Padder paddingTop={1}>
              <Navigation>
                {step > 0 && <Button variant="text">Previous</Button>}
                <Button variant="contained">Next</Button>
              </Navigation>
            </Padder>
          </Padder>
        </Card>
      </Padder>
    </Section>
  );
};
