import React, { useState, useEffect } from 'react';
import { Amplify, Hub } from 'aws-amplify';
import { Button, Typography, Box} from '@mui/material';
import JobsContent from './postContent';
import LoginPage from 'components/loginTab';
import { useNavigate } from 'react-router-dom';


function jobs() { 
    const navigate = useNavigate();

    

    return (
        <>
            <JobsContent />
        </>
      );
};

export default jobs;

