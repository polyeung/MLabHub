import { Box, Skeleton, Stack } from "@mui/material";
import React from "react";
export default function loading(){
    return (
        <Stack spacing={1} sx={{marginBottom: '20px'}}>
            <Skeleton variant="text" sx={{ fontSize: '5rem', width: '30%'}} />
            <Box sx={{display:'flex', flexDirection: 'row'}}>
            <Skeleton variant="circular" width={40} height={40} sx={{mr: 1}}/>
            <Skeleton variant="circular" width={40} height={40} sx={{mr: 1}}/>
            <Skeleton variant="circular" width={40} height={40} sx={{mr: 1}}/>
            <Skeleton variant="circular" width={40} height={40} />
            </Box>
            <Skeleton variant="rounded" sx={{ width: '20%', height: 30 }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%'}} />
            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%'}} />
            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%'}} />
            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%'}} />
            </Stack>
    );
}