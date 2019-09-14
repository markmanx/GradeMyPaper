import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const papersQuery = gql`
  query {
    papers {
      id
      paperId
      board
      title
      qualification
      questionsUrl
      markSchemeUrl
    }
  }
`;

export const usePapersQuery = () => {
  const response = useQuery(papersQuery);
  return response;
};
