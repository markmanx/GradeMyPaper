import React from 'react';
import styled from 'styled-components/macro';
import Uppy from '@uppy/core';
import Webcam from '@uppy/webcam';
import { Dashboard } from '@uppy/react';

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

const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  & .uppy-Webcam-container,
  .uppy-Webcam-video {
    width: 100%;
  }
`;

export const FileUploader = () => {
  return (
    <Wrapper>
      <Dashboard uppy={uppy} plugins={['Webcam']} inline width={800} />
    </Wrapper>
  );
};
