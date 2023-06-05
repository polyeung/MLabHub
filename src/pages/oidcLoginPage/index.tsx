import { Box, Button } from '@mui/material';
import { useNotifs } from '@/context';
import React from 'react';

export default function oidcLoginPage() {

    return (
        <Box>
            <Button component="a" href="/oidc/authenticate/" target="_blank" rel="noopener noreferrer">
            Login with Umich Credential
            </Button>
        </Box>
    );
};