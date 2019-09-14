import gql from 'graphql-tag';

export const paperFragment = gql`
  fragment Paper on Paper {
    id
    paperId
    board
    title
    qualification
    questionsUrl
    markSchemeUrl
  }
`;
