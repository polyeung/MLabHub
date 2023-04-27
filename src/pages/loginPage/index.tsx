import {
    Authenticator
} from '@aws-amplify/ui-react';
import { Box } from '@mui/material';
import { componentsSetting } from 'utility';
import { Hub } from 'aws-amplify';

interface loginPageProps { 
    setIsSignIn: (value: boolean) => void;
};
export default function loginPage({ setIsSignIn }: loginPageProps) { 
    const listener = (data: any) => {
    switch (data.payload.event) {
          case 'signIn':
            console.log("Signin! from authenticator");
            setIsSignIn(true);
            break;
        }
    };
    Hub.listen('auth', listener);

    return (
    <Box sx={{ mt: '10px' }}>
        <Authenticator components={componentsSetting} />
    </Box>);
};