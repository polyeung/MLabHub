import * as React from 'react';
import Box from '@mui/material/Box';
import { Paper, Typography } from '@mui/material';

interface labinfoInt { 
    name: string,
    link: string,
    people: string[],
    intro: string,
};
export default function labinfo({ name, link, people, intro }: labinfoInt ) { 
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    width: 400,
                    height: 250,
                },
            }}
        >
            <Paper elevation={3} sx={{ padding: '10px'}}>
                <Typography>{name}</Typography>
                <Typography>{link}</Typography>
                <Typography>{people}</Typography>
                <Typography>{name}</Typography>
                <Typography>{ intro }</Typography>
                
            </Paper>
        </Box>);
};