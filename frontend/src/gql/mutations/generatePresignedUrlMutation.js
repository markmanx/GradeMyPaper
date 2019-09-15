import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const generatePresignedUrlMutation = gql`
  mutation GeneratePresignedUrl($requestId: String!) {
    generatePresignedUrl(requestId: $requestId)
  }
`;

export const useGeneratePresignedUrlMutation = requestId => {
  return useMutation(generatePresignedUrlMutation);
};
