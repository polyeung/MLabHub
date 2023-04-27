import React, { useState, useEffect } from 'react';
import { Amplify, Hub } from 'aws-amplify';
import { Button, Typography, Box} from '@mui/material';
import { useAuthenticator } from '@aws-amplify/ui-react';
import JobsContent from './createContent';
import LoginPage from 'pages/loginPage';
import { useNavigate } from 'react-router-dom';


function jobs() { 
    const { user, authStatus } = useAuthenticator((context) => [context.user]);
    const navigate = useNavigate();
    const [isSignIn, setIsSignIn] = useState<boolean>(authStatus === 'authenticated');

    const listener = (data: any) => {
    switch (data.payload.event) {
        case 'signOut':
            console.log("Sign out! from jobs page");
            navigate('/');
          break;
      }
    };
    Hub.listen('auth', listener);

    return (
        <>
            {isSignIn ? <JobsContent />:<LoginPage setIsSignIn={setIsSignIn}/>}
        </>
      );
};

export default jobs;

