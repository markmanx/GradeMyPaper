import React from 'react';

import { useMutation } from '@apollo/react-hooks';
import { Button } from '../components';
import { createCheckoutSessionMutation } from '../gql';

export const CheckoutButton = () => {
  const [mutation] = useMutation(createCheckoutSessionMutation);

  const onCheckout = async () => {
    const { data } = await mutation();

    if (!data || !data.createCheckoutSession) return;

    const stripe = window.Stripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
    stripe
      .redirectToCheckout({
        // Make the id field from the Checkout Session creation API response
        // available to this file, so you can provide it as parameter here
        // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
        sessionId: data.createCheckoutSession.sessionId
      })
      .then(result => {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
      });
  };

  return (
    <Button onClick={onCheckout} variant="container" color="primary">
      Checkout
    </Button>
  );
};
