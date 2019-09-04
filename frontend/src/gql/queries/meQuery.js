import gql from 'graphql-tag';

export const meQuery = gql`
  query {
    me {
      id
      email
      credits
    }
  }
`;
