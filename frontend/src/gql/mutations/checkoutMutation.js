import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const createCheckoutSessionMutation = gql`
  mutation CreateCheckoutSession($requestId: String!) {
    createCheckoutSession(requestId: $requestId) {
      sessionId
    }
  }
`;

export const useCreateCheckoutSessionMutation = () => {
  return useMutation(createCheckoutSessionMutation);
};
