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

export const ContactForm = ({ isOpen, handleClose }) => {
  return (
    <Dialog open={isOpen} onClose={handleClose} aria-labelledby="contact-form">
      <DialogTitle id="form-dialog-title">Contact</DialogTitle>
      <DialogContent>
        <DialogContentText>
          We'll get back to you as soon as we can.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
};
