import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const getDownloadPresignedUrlMutation = gql`
  mutation getDownloadPresignedUrl($requestId: String!) {
    getDownloadPresignedUrl(requestId: $requestId)
  }
`;

export const useGetDownloadPresignedUrlMutation = () => {
  return useMutation(getDownloadPresignedUrlMutation);
};
