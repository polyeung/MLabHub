import { Button } from '@mui/material';
import { Amplify, Auth } from 'aws-amplify';
import { signOutFunc } from 'utility';

export default function createContent() { 
    
    return (<div> Create page content! Welcome <Button variant='outlined' onClick={signOutFunc }>Sign out</Button></div>);
};