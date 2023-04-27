import React, { useState } from 'react';
import { Amplify, Hub } from 'aws-amplify';
import AwsConfig from 'aws-exports';
import { Button, Typography } from '@mui/material';
import {
  withAuthenticator,
    WithAuthenticatorProps,
    useAuthenticator,
  Authenticator
} from '@aws-amplify/ui-react';
import JobsPage from 'pages/jobsPage';






function jobs() { 
    const {user,  authStatus } = useAuthenticator((context) => [context.user]);
    const [isLogin, setIsLogin] = useState<boolean>(authStatus === 'authenticated');


    const listener = (data: any) => {
            switch (data.payload.event) {
              case 'signIn':
                console.log("Signin!");
                setIsLogin(true);
                break;
              case 'signOut':
                    console.log("SignOut!");
                    setIsLogin(false);
                break;
            }
    };
    Hub.listen('auth', listener);

    return (
        <>
            {!isLogin ? <Authenticator /> : <JobsPage />}
      </>
      );
}

export default jobs

