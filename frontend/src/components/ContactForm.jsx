import React from 'react';
import styled, { css } from 'styled-components/macro';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button
} from '@material-ui/core';
import { CheckCircleRounded } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import fetch from 'unfetch';

import { useMeQuery } from '../gql';
import { Padder, ErrorSnackbar, Text, Loader } from './';

const FormikTextField = ({ field, form, ...props }) => {
  const hasError = form.touched[field.name] && form.errors[field.name];

  return (
    <TextField
      margin="dense"
      fullWidth
      {...field}
      {...props}
      error={hasError}
    />
  );
};

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email(),
  message: Yup.string().required()
});

const STATUS = {
  READY: 0,
  SUCCESS: 2,
  LOADING: 3
};

const SuccessIconWrapper = styled.div`
  color: ${green[400]};
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ theme }) => css`
    padding-bottom: ${theme.baseUnit * 2}px;
  `}

  & svg {
    width: 80px;
    height: 80px;
  }
`;

export const ContactForm = ({ isOpen, handleClose }) => {
  const [status, setStatus] = React.useState(STATUS.READY);
  const [error, setError] = React.useState(null);
  const { data, loading, error: meError } = useMeQuery();

  const initialValues = {
    email: data && data.me && data.me.email,
    message: ''
  };

  const onSubmit = async (values, actions) => {
    setStatus(STATUS.LOADING);

    const res = await fetch(
      `${process.env.REACT_APP_GRAPHQL_ENDPOINT}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }
    );

    if (res.status === 200 && res.statusText === 'OK') {
      setStatus(STATUS.SUCCESS);
      return;
    }

    if (res.status === 500) {
      const message = await res.text();
      setError(message);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} aria-labelledby="contact-form">
      <DialogTitle id="form-dialog-title">Contact us</DialogTitle>
      <DialogContent>
        {(status === STATUS.READY || status === STATUS.LOADING) && (
          <>
            <DialogContentText>
              We'll get back to you as soon as we can.
            </DialogContentText>
            <Formik
              initialValues={initialValues}
              validationSchema={ValidationSchema}
              onSubmit={onSubmit}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Field
                    name="email"
                    label="Email Address"
                    autoFocus
                    component={FormikTextField}
                  />
                  <Field
                    name="message"
                    label="Message"
                    type="text"
                    component={FormikTextField}
                  />
                  {error && (
                    <ErrorSnackbar paddingTop={0.5}>{error}</ErrorSnackbar>
                  )}
                  <Padder paddingTop={0.5} paddingBottom={1} paddingRight={1}>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button variant="contained" color="primary" type="submit">
                        Send
                        {status === STATUS.LOADING && (
                          <Padder
                            paddingLeft={0.5}
                            paddingTop={0.25}
                            tag="span"
                          >
                            <Loader color="hint" size={20} />
                          </Padder>
                        )}
                      </Button>
                    </DialogActions>
                  </Padder>
                </form>
              )}
            />
          </>
        )}
        {status === STATUS.SUCCESS && (
          <SuccessIconWrapper>
            <CheckCircleRounded />
            <Padder paddingTop={0.5}>
              <Text>Message successfully sent</Text>
            </Padder>
          </SuccessIconWrapper>
        )}
      </DialogContent>
    </Dialog>
  );
};
