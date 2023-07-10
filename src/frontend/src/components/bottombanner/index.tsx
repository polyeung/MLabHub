import * as React from 'react';
import { ScreenContext } from '@/screenContext';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; 
import { MLabHubLogo192, footerLogo } from '@/assets';

function BottomBanner() {
    // when the window is small and big
    const { isMiddleScreen } = React.useContext(ScreenContext);

    return (
        <Grid container rowSpacing={2} justifyContent="center" alignItems="center"
            sx={{
            backgroundColor: '#01305c',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '10px',
            borderTop: '4px solid #FFCB02',
            color: 'white',

            left: 0,
            bottom: 0,
                width: '100%',
            
                overflowX: 'hidden'
            }}>
                <Grid xs={12} md={7} order={{ xs: 2, md: 1}}>
                {/* umich log */}
                {/* div tags are used to put the elements at the center when isMiddleScree is true */}
                <div style={{
                    width: '100%',
                    ...(isMiddleScreen && {
                        display: 'flex', justifyContent: 'center', alignItems: 'center'
                    })}}
                >
                    <a href='https://umich.edu/'>
                    <img src={footerLogo} alt='University of Michigan Logo'
                        style={{
                            position: "relative",
                            left: "15%",
                            maxWidth: '100%',
                            ...(isMiddleScreen && {
                                position: "static"
                            })
                        }}
                    />
                    </a>
                </div>
                    
                </Grid>
                <Grid xs={12} md={5} order={{ xs: 3, md: 2}}>
                    {/* copy right */}
                    <div style={{
                        width: '100%',
                        ...(isMiddleScreen && {
                            display: 'flex', justifyContent: 'center', alignItems: 'center'
                        })}}>
                        <Typography style={{position: 'relative', left: "10%", maxWidth: '100%', ...(isMiddleScreen && {
                                position: "static"
                            })}}
                            >© 2023 mlabhub.com. All Rights Reserved.</Typography>
                    </div>
                </Grid>
                <Grid xs={12} md={8} order={{ xs: 1, md: 3}}>
                    <div style={{
                        width: '100%',
                        ...(isMiddleScreen && {
                            display: 'flex', justifyContent: 'center', alignItems: 'center'
                        })
                    }}>
                        {/* mlabhub log */}
                        {/* this should redirect you to our default page */}
                        <a href=''>
                            <img src={MLabHubLogo192} alt="MLabHub Logo"
                                style={{
                                    position: "relative",
                                    left: "25%",
                                    maxWidth: '100%',
                                    ...(isMiddleScreen && {
                                        position: 'static'
                                    })}}
                        />
                        </a>
                    </div>
                </Grid>
                <Grid xs={12} md={4} order={{ xs: 4, md: 4 }}>
                    <div style={{
                            width: '100%',
                            ...(isMiddleScreen && {
                                display: 'flex', justifyContent: 'center', alignItems: 'center'
                            })}}>
                        {/* email contact */}
                        <a href={'mailto:mlabhubadmin@gmail.com'}
                            style={{
                                position: "relative",
                                left: "15%",
                                maxWidth: '100%',
                                ...(isMiddleScreen && {
                                    position: 'static'
                                })
                        }}>Send Email to Us</a>
                    </div>
                </Grid>
            </Grid>
    );
}

export default BottomBanner;