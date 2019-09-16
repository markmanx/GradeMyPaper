const gql = require('graphql-tag');
const { useQuery } = require('@apollo/react-hooks');

const requestsQuery = gql`
  query {
    requests {
      id
      paper {
        id
        title
        totalMarks
      }
      feedback {
        marks
        grade
        fileUrl
      }
    }
  }
`;

export const useRequestsQuery = () => {
  return useQuery(requestsQuery);
};
