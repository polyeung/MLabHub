import Main from 'main';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Amplify} from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import AwsConfig from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
Amplify.configure(AwsConfig);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Authenticator.Provider>
    <React.StrictMode>
      <Main />
      </React.StrictMode>
  </Authenticator.Provider>
);
