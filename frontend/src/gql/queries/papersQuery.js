import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { paperFragment } from '../../gql';

const papersQuery = gql`
  query {
    papers {
      ...Paper
    }
  }
  ${paperFragment}
`;

export const usePapersQuery = () => {
  const response = useQuery(papersQuery);
  return response;
};
