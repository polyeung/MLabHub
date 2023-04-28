import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function loginPage() { 

    const navigate = useNavigate();
    return (
    <Box sx={{ mt: '10px' }}>
        Login Page
    </Box>);
};