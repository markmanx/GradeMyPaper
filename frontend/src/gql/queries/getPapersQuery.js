import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const getPapersQuery = gql`
  query {
    id
    paperId
    board
    title
    qualification
    questionsUrl
    markSchemeUrl
  }
`;

export const useGetPapersQuery = async () => {
  const response = await useQuery(getPapersQuery);
  return response;
};
