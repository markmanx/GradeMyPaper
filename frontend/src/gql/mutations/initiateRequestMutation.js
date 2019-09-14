import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { paperFragment } from '../fragments/paperFragment';

const initiateRequestMutation = gql`
  mutation InitiateRequest($id: String!) {
    initiateRequest(id: $id) {
      id
      paper {
        title
      }
    }
  }
`;

export const useInitiateRequestMutation = () => {
  const response = useMutation(initiateRequestMutation);
  return response;
};
