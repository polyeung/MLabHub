import * as React from 'react';
import { ScreenContext } from '@/screenContext';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; 
import { MLabHubLogo192, footerLog } from '@/assets';

function BottomBanner() {
    // when the window is small and big
    const { isSmallScreen, isMiddleScreen } = React.useContext(ScreenContext);

    // have to change numbers
    // TODO: make the bottom banner responsive
    const getImgStyle = () => { 
        if (isSmallScreen) {
          return ['50px', '5%'];
        } else if (isMiddleScreen) {
          return ['65px', '5%'];
        } else { 
          return ['80px', '13%'];
        }
    }
      const [imgHeight, imgLeftMargin] = getImgStyle();

    return (
        <Grid container rowSpacing={2}
            style={{
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
            }}>
                <Grid xs={8}>
                    {/* umich log */}
                    <a href='https://umich.edu/'>
                        <img src={footerLog} alt='University of Michigan Logo'
                            style={{
                                position: "relative",
                                left: "10%"
                            }}/>
                    </a>
                </Grid>
                <Grid xs={4}>
                    {/* copy right */}
                    <Typography>© 2023 mlabhub.com. All Rights Reserved.</Typography>
                </Grid>
                <Grid xs={9}>
                    {/* mlabhub log */}
                    {/* this should redirect you to our default page */}
                    <a href=''>
                        <img src={MLabHubLogo192} alt="MLabHub Logo"
                            style={{
                                position: "relative",
                                left: "30%"
                            }}/>
                    </a>
                </Grid>
                <Grid xs={3}>
                    {/* email contact */}
                    <a href={'mailto:mlabhubadmin@gmail.com'}>Send Email to Us</a>
                </Grid>
            </Grid>
    );
}

export default BottomBanner;