import * as React from 'react';
import FilterModal from './filter'; // Notice the capitalization
import Box from '@mui/material/Box';

const filters = ["Department", "Research Focus", "Professor", "Rating"]

export default function FilterBar() {
    return (
        <Box sx={{display: 'flex', m:1, flexDirection: { xs: 'column', md: 'row' }, '& > *': { p: 1 }}}>
        { 
            filters.map((item, index) => 
                <FilterModal key={index} name={item}/>
            )
        }
        </Box>
    );
}
