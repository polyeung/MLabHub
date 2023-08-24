import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {labsPng, jobsPng, dashboardPng} from '@/assets';
import Grid from '@mui/material/Grid';

export default function homePage(){
    return (
    <Box style={{marginTop: '40px}'}}>
        
        <Box
            padding={2}
            sx={{
                gridColumn: 'span 12',
                gridRow: 'span 4',
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center', // Added this to make content distribute evenly
            }}
            >
            
              <Typography variant="h4">MLabHub</Typography>
                <Typography sx={{color:"#00274C"}}>Navigate your research world.</Typography>
                <Box sx={{width:"66%"}}>
                <Typography>
                MLabHub is designed to enlighten U-M students, researchers, faculty, and the academic community, guiding them in their academic and research pursuits.
                </Typography>
                </Box>
                
            </Box>
            <Box
            padding={2}
            sx={{
                gridColumn: 'span 12',
                gridRow: 'span 4',
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'left',
                justifyContent: 'center',
                mt:5 // Added this to make content distribute evenly
            }}
            > 
            <Grid container spacing={2} sx={{ justifyContent: 'left' }}>
            <Grid item xs={12} sm={6}  key="browseCourses"
            sx={{ display: 'flex', flexDirection: 'column',justifyContent: 'left', alignItems: 'left' }}>
            <Typography variant="h5">Browse Labs</Typography>
            <Typography sx={{ marginTop: '30px' }}>
                Explore an extensive directory of research labs at the University of Michigan, Ann Arbor. Dive into detailed profiles, discover cutting-edge research areas, connect with leading experts, and chart a personalized roadmap for your academic and research journey at UMich.
            </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
            <img src={labsPng} style={{ width: "400px" }} />
            </Grid>
            </Grid> 
            </Box>

            <Box
            padding={2}
            sx={{
                gridColumn: 'span 12',
                gridRow: 'span 4',
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'left',
                justifyContent: 'center',
                mt:5 // Added this to make content distribute evenly
            }}
            > 
            <Grid container spacing={2} sx={{ justifyContent: 'left' }}>
            <Grid item xs={12} sm={6}  key="browseCourses"
            sx={{ display: 'flex', flexDirection: 'column',justifyContent: 'left', alignItems: 'left' }}>
            <Typography variant="h5">Browse Research Opportunities</Typography>
            <Typography sx={{ marginTop: '30px' }}>
                Explore an extensive directory of research labs at the University of Michigan, Ann Arbor. Dive into detailed profiles, discover cutting-edge research areas, connect with leading experts, and chart a personalized roadmap for your academic and research journey at UMich.
            </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
            <img src={jobsPng} style={{ width: "400px" }} />
            </Grid>
            </Grid> 
            </Box>

            <Box
            padding={2}
            sx={{
                gridColumn: 'span 12',
                gridRow: 'span 4',
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'left',
                justifyContent: 'center',
                mt:5 // Added this to make content distribute evenly
            }}
            > 
            <Grid container spacing={2} sx={{ justifyContent: 'left' }}>
            <Grid item xs={12} sm={6}  key="browseCourses"
            sx={{ display: 'flex', flexDirection: 'column',justifyContent: 'left', alignItems: 'left' }}>
            <Typography variant="h5">Review Your Dashboard</Typography>
            <Typography sx={{ marginTop: '30px' }}>
                Explore an extensive directory of research labs at the University of Michigan, Ann Arbor. Dive into detailed profiles, discover cutting-edge research areas, connect with leading experts, and chart a personalized roadmap for your academic and research journey at UMich.
            </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
            <img src={dashboardPng} style={{ width: "400px" }} />
            </Grid>
            </Grid> 
            </Box>
    </Box>);
};