import gql from 'graphql-tag';

export const createCheckoutSessionMutation = gql`
  mutation {
    createCheckoutSession {
      sessionId
    }
  }
`;
