import React, { useState } from 'react';
import {
    Authenticator
} from '@aws-amplify/ui-react';
import { Box } from '@mui/material';
import { componentsSetting } from 'utility';
import { Hub, } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

export default function loginPage() { 

    const navigate = useNavigate();
    const listener = (data: any) => {
    switch (data.payload.event) {
          case 'signIn':
            console.log("Signin! from authenticator");

            navigate('/')
            break;
        }
    };
    Hub.listen('auth', listener);

    return (
    <Box sx={{ mt: '10px' }}>
        <Authenticator components={componentsSetting} />
    </Box>);
};