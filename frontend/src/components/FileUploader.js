import React from 'react';
import styled from 'styled-components/macro';
import Uppy from '@uppy/core';
import Webcam from '@uppy/webcam';
import { Dashboard } from '@uppy/react';
import AwsS3 from '@uppy/aws-s3';
import fetch from 'unfetch';

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

const uppy = Uppy({
  meta: { type: 'avatar' },
  restrictions: { maxNumberOfFiles: 10 },
  autoProceed: true
});

uppy.use(Webcam, {
  modes: ['picture'],
  facingMode: 'environment'
});

uppy.use(AwsS3, {
  getUploadParameters: file => {
    return fetch(`http://localhost:4000/generate-presigned-upload-url`, {
      method: 'get'
    })
      .then(response => {
        console.log(response.json());
        return response.json();
      })
      .then(data => {
        return {
          method: data.method,
          url: data.url,
          fields: data.fields
        };
      });
  }
});

const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  & .uppy-Webcam-container,
  .uppy-Webcam-video {
    width: 100%;
  }
`;

export const FileUploader = ({ width }) => {
  return (
    <Wrapper>
      <Dashboard
        uppy={uppy}
        plugins={['Webcam']}
        inline
        width={width}
        key={width}
      />
    </Wrapper>
  );
};
