import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

export const meQuery = gql`
  query {
    me {
      id
      email
      credits
    }
  }
`;

export const useMeQuery = () => {
  return useQuery(meQuery);
};
