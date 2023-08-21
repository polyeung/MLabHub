import React from 'react';
import { Grid, Skeleton, Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const data = [0, 0, 0, 0, 0, 0, 0, 0, 0];

export default function Loading() {

    return (
        <Grid container spacing={2} sx={{ justifyContent: 'left' }}>
            {data.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card sx={{ width: 350,
                                height: 450,
                                position: 'relative',
                                boxShadow: 4, }}>
                        <CardHeader
                            avatar={
                                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
                            }
                            action={
                               null
                            }
                            title={
                                
                                    <Skeleton
                                        animation="wave"
                                        height={10}
                                        width="80%"
                                        style={{ marginBottom: 6 }}
                                    />
                                
                            }
                            subheader={
                                
                                    <Skeleton animation="wave" height={10} width="40%" />
                                
                            }
                        />
                        {
                            <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                        }
                        <CardContent>
                            {
                                <React.Fragment>
                                    <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                    <Skeleton animation="wave" height={10} width="80%" />
                                </React.Fragment>
                             }
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};
