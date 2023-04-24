import * as React from 'react';
import Box from '@mui/material/Box';
import { Paper, Typography, Grid, IconButton } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate, NavigateOptions } from 'react-router-dom';

interface labinfoInt { 
    name: string,
    link: string,
    people: string,
    intro: string,
    id: number
};


interface MyNavigateOptions extends NavigateOptions {
    id: string;
};
interface LocationState extends NavigateOptions {
    state: {
      pathname: string;
    };
  }
export default function labinfo({ name, link, people, intro, id }: labinfoInt) { 
    const navigate = useNavigate();

    function handleClick() { 
        const options: LocationState = {
            state: {
                pathname: String(id)
            }
            };
        navigate('/labpage', options);
        // console.log(options);
    }
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
            <Paper elevation={3} sx={{ padding: '10px' }}>
                
                <Grid container spacing={1}>
                    <Grid item xs={10}>
                        <Typography variant='h6'>{name}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                    <a href={ link }>
                    <LinkIcon />
                    </a>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton
                            sx={{ padding: 0 }}
                            onClick={handleClick}>
                            <MoreHorizIcon sx={{ fontSize: 'inherit' }} />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>{people}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>{intro}</Typography>
                    </Grid>
                </Grid>
                
            </Paper>
        </Box>);
};