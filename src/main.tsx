import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Page1 from 'pages/page1';
import Navbar from 'components/navbar';
import Overview from 'pages/overview';
import Labpage from 'pages/labpage';
import {Amplify} from 'aws-amplify';
import AwsConfig from './aws-exports';
import {
  withAuthenticator,
  WithAuthenticatorProps,
} from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';

Amplify.configure(AwsConfig);

interface Props extends WithAuthenticatorProps {
  isPassedToWithAuthenticator: boolean;
}

function Main({ isPassedToWithAuthenticator, signOut, user }: Props) {
  if (!isPassedToWithAuthenticator) {
    throw new Error(`isPassedToWithAuthenticator was not provided`);
  }

  return (
    <Router>
      <React.Fragment>
       <button onClick={signOut}>Sign out</button>
        <Navbar />
        <Container
				maxWidth="lg"
				sx={{
					flexGrow: 2,
					display: 'flex',
					alignItems: 'center',
          justifyContent: 'center',
          padding: '10px',
          marginTop: '10px'
				}}
			>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/labpage" element={<Labpage />} />
          <Route path="/page2" element={<Page1 />} />
          <Route path="/page3" element={<Page1 />} />
          </Routes>
      </Container>
      </React.Fragment>
    </Router>
  );
}

export default withAuthenticator(Main);

export async function getStaticProps() {
  return {
    props: {
      isPassedToWithAuthenticator: true,
    },
  };
}