import React, { useState, useEffect } from 'react';
import { Button, Typography, Box} from '@mui/material';
import JobsContent from './createContent';
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

