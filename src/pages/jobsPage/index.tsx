import { Button } from '@mui/material';
import { Amplify, Auth } from 'aws-amplify';

export default function jobsPage() { 
    async function signOutFunc() {
        try {
          await Auth.signOut();
        } catch (error) {
          console.log('error signing out: ', error);
        }
        // setIsLogin(false);
        console.log("sign out click!");

    };
    return (<div> jobs page content! Welcomt <Button variant='outlined' onClick={signOutFunc }>Sign out</Button></div>);
};