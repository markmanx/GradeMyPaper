import React from 'react';
import styled from 'styled-components/macro';
import { Card, Divider, Grid } from '@material-ui/core';

import { useRequestQuery } from '../gql';

import {
  Section,
  SlantedBackground,
  Padder,
  FileUploader,
  Button,
  Text,
  CheckoutButton
} from '../components';

const STEP_CONTENT = [
  {
    title: 'Upload your answer sheet',
    body:
      'Upload files or take photos of your answersheet straight from your device.  Please make sure that your answers are readable.'
  },
  {
    title: 'Make payment',
    body: "We'll have your paper marked in 48 hours."
  }
];

const Navigation = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const RequestFeedbackScreen = ({ match }) => {
  const { requestId } = match.params;
  const { data, loading, error } = useRequestQuery(requestId);
  const [step, setStep] = React.useState(0);
  const [firstFileUploaded, setFirstFileUploaded] = React.useState(false);
  const [cardWidth, setCardWidth] = React.useState(500);
  const cardRef = React.useRef(null);

  const onWindowResize = () => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.clientWidth - 80);
    } else {
      setCardWidth(500);
    }
  };

  React.useEffect(() => {
    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  React.useEffect(() => {
    if (data && data.request && cardRef.current) {
      onWindowResize();
    }
  }, [cardRef, data]);

  if (!match.params.requestId || loading || error || !data) {
    return null;
  }

  const { paper } = data.request;

  const { title, body } = STEP_CONTENT[step];

  const onFirstFileUploaded = () => {
    setFirstFileUploaded(true);
  };

  const onNext = () => {
    setStep(step + 1);
  };

  return (
    <Section bgChildren={<SlantedBackground slantBottom />}>
      <Padder paddingTop={10}>
        <Card elevation={5} ref={cardRef}>
          {!paper && (
            <Padder paddingVertical={2} paddingHorizontal={2}>
              <Text>Sorry, this paper does not exist.</Text>
            </Padder>
          )}

          {paper && (
            <>
              <Padder paddingVertical={2} paddingHorizontal={2}>
                <Text variant="h3" bold>
                  {`${step + 1}. ${title}`}
                </Text>
                <Text variant="body2" textColor="hint">
                  {paper.title}
                </Text>
              </Padder>
              <Divider></Divider>
              <Padder paddingTop={2} paddingHorizontal={2}>
                <Grid container>
                  <Grid item md={7}>
                    <Text>{body}</Text>
                  </Grid>
                </Grid>
              </Padder>
              <Padder paddingVertical={2} paddingHorizontal={2}>
                {step === 0 && (
                  <FileUploader
                    width={cardWidth}
                    onFirstFileUploaded={onFirstFileUploaded}
                    requestId={requestId}
                  />
                )}

                {step === 1 && <CheckoutButton requestId={requestId} />}

                <Padder paddingTop={1}>
                  <Navigation>
                    {step > 0 && <Button variant="text">Previous</Button>}
                    <Button
                      variant="contained"
                      disabled={!firstFileUploaded}
                      onClick={onNext}
                    >
                      Next
                    </Button>
                  </Navigation>
                </Padder>
              </Padder>
            </>
          )}
        </Card>
      </Padder>
    </Section>
  );
};
