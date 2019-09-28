import React from 'react';

import { Button } from '../components';
import { useCreateCheckoutSessionMutation } from '../gql';

export const CheckoutButton = ({ requestId }) => {
  const [mutation, { loading, error }] = useCreateCheckoutSessionMutation();

  const onCheckout = async () => {
    const { data } = await mutation({ variables: { requestId } });

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
