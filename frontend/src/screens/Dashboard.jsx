import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { protectedQuery, createCheckoutSessionMutation } from '../gql';

export const Dashboard = () => {
  const { loading, error, data } = useQuery(protectedQuery);
  const [mutation] = useMutation(createCheckoutSessionMutation);

  if (loading || error || !data) {
    return <div>Cannot load data</div>;
  }

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
    <div>
      This is a protected screen. {data.protectedQuery}
      <button onClick={onCheckout}>Checkout</button>
    </div>
  );
};
