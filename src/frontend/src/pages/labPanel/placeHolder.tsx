import {Stack, Skeleton, Card, CardHeader} from '@mui/material';
import React from 'react';
const myList = [0, 1, 2, 3];
export default function loading(){
    return (
        <Stack spacing={1}>
        {myList.map((item) => (
        <Card sx={{ minWidth: 275 }} key={item} >
        <CardHeader
            action={
            null
            }
            title={
                <Skeleton
                        animation="wave"
                        height={10}
                        width="40%"
                        style={{ marginBottom: 6 }}
                    />
            }
            // TODO: add department subtittle
            subheader={
                <Skeleton
                    animation="wave"
                    height={10}
                    width="20%"
                    style={{ marginBottom: 6 }}
                />
            }
        />
        </Card>))}
        </Stack>
    );
};