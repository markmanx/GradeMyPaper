import React from 'react';
import styled from 'styled-components/macro';
import Uppy from '@uppy/core';
import Webcam from '@uppy/webcam';
import { Dashboard } from '@uppy/react';
import AwsS3 from '@uppy/aws-s3';
import { useGeneratePresignedUrlMutation } from '../gql';

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  & .uppy-Webcam-container,
  .uppy-Webcam-video {
    width: 100%;
  }
`;

export const FileUploader = ({ width, onFirstFileUploaded, requestId, className }) => {
  const [uppy, setUppy] = React.useState(null);
  const [mutation, { loading, error }] = useGeneratePresignedUrlMutation();

  React.useEffect(() => {
    const uppy = Uppy({
      meta: { type: 'avatar' },
      restrictions: { maxNumberOfFiles: 10 },
      autoProceed: true
    });

    uppy
      .use(Webcam, {
        modes: ['picture'],
        facingMode: 'environment'
      })
      .use(AwsS3, {
        getUploadParameters: async file => {
          const response = await mutation({ variables: { requestId } });

          if (response.data) {
            return {
              method: 'PUT',
              url: response.data.generatePresignedUrl,
              fields: {},
              headers: {}
            };
          }
        }
      })
      .on('complete', result => {
        if (result.successful) {
          onFirstFileUploaded();
        }
      });

    setUppy(uppy);

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [requestId]);

  if (!uppy) {
    return null;
  }

  return (
    <Wrapper className={className}>
      <Dashboard
        uppy={uppy}
        plugins={['Webcam']}
        inline
        width={width}
        key={width}
        showLinkToFileUploadResult={false}
      />
    </Wrapper>
  );
};
