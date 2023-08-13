import React from 'react';
import {Skeleton, Stack, Box, Typography} from '@mui/material';

const lst = [0,1,2,3];

export default function loading(){
    return (
        <Box
                    sx={{
                        // maxHeight: '70vh',
                        // overflowY: 'auto',
                        flexGrow: 1, // Make this Box grow to fill available space
                        flexShrink: 0, // Prevent this Box from shrinking
                        overflowY: 'auto',
                    }}
                >
            {lst.map((item, index) => (
                <Box
                    key={index}  // Providing a key for mapped items
                    padding={2}
                    sx={{
                        backgroundColor: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                        overflow: 'auto',
                        boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.5)',
                        position: 'relative',
                    }}
                > 
                    <Skeleton variant="text" sx={{ fontSize: '1rem', width: '40%'}} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20%'}} />
                </Box>
            ))}
        </Box>
    );
};