import React, { useMemo } from "react";
import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { LocationState } from 'types/interface';

const labpage= () =>{ 
    const location = useLocation();
    // get ID from previous url
    const ID = useMemo(() => {
        const { state } = location as LocationState || { state: {pathname: "1" } };
        return state.pathname;
    }, [location]);

    return (<Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="400px"
        gap="20px"
        width="100vw"
        
    >
        <Box padding={2}
            sx={{
                gridColumn: 'span 8',
                gridRow: 'span 2',
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.5)',
                borderTop: '1px solid blue',
                position: 'relative'
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '-5px', // add this line to set the distance of the stroke from the top
                    left: '20',
                    width: '50%', // change this value to adjust the length of the stroke
                    height: '10px',
                    backgroundColor: '#00274c',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                    borderBottom: '1px solid #00274c',
                }}
            />

        </Box>
        <Box
            padding={2}
            sx={{
                gridColumn: 'span 4',
                gridRow: 'span 2',
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                overflow: 'auto',
                borderRadius: '10px',
                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.5)',
                position: 'relative'
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '-5px', // add this line to set the distance of the stroke from the top
                    left: '20',
                    width: '50%', // change this value to adjust the length of the stroke
                    height: '10px',
                    backgroundColor: '#FFCB02',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                    borderBottom: '1px solid #FFCB02',
                }}
            />
            <Typography variant="h6">Reviews</Typography>
            <Typography>{ ID }</Typography>
        </Box>

       
    </Box>
);
};

export default labpage;