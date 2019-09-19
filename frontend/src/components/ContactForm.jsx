import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button
} from '@material-ui/core';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import { Padder } from './';

const initialValues = {
  email: '',
  message: ''
};

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

export const ContactForm = ({ isOpen, handleClose }) => {
  const onSubmit = (values, actions) => {
    console.log(values);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} aria-labelledby="contact-form">
      <DialogTitle id="form-dialog-title">Contact us</DialogTitle>
      <DialogContent>
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
                type="email"
                autoFocus
                component={FormikTextField}
              />
              <Field
                name="message"
                label="Message"
                type="text"
                component={FormikTextField}
              />
              <Padder paddingTop={0.5} paddingBottom={1} paddingRight={1}>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button variant="contained" color="primary" type="submit">
                    Send
                  </Button>
                </DialogActions>
              </Padder>
            </form>
          )}
        />
      </DialogContent>
    </Dialog>
  );
};
