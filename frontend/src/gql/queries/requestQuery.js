import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const requestQuery = gql`
  query($requestId: String!) {
    request(requestId: $requestId) {
      id
      paper {
        id
        title
      }
    }
  }
`;

export const useRequestQuery = requestId => {
  return useQuery(requestQuery, { variables: { requestId } });
};
