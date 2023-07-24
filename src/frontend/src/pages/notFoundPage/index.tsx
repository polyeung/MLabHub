import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { ScreenContext } from '@/screenContext';

export default function Error() {
const { isSmallScreen, isMiddleScreen } = React.useContext(ScreenContext);
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

      }}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            {isSmallScreen? 
            <>
            <Typography variant="h3">
                OOPS!
            </Typography>
            
            <Typography variant="h4">
              404
            </Typography>     
            </>      :
            <>
            <Typography variant="h1">
                OOPS!
            </Typography>
            
            <Typography variant="h2">
              404
            </Typography>     
            </>      
            }
            <Typography variant="h6">
              The page you’re looking for doesn’t exist.
            </Typography>
            <Button variant="contained" href="/">Back Home</Button>
          </Grid>
          <Grid xs={12} md={6}>
            <img
              src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
              alt=""
              width={isSmallScreen? 250:500} height={isSmallScreen? 125:250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}