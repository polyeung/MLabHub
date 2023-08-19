import * as React from 'react';
import FilterModal from './filter'; // Notice the capitalization
import Box from '@mui/material/Box';
import DepFilter from './depFilter';

const filters = [ "Research Focus", "Professor", "Rating"]

export default function FilterBar() {
    return (
        <Box sx={{display: 'flex', m:1, 
                flexDirection: { xs: 'column', md: 'row' },
                 '& > *': { p: 1 }}}>
                    <DepFilter/>
        { 
            filters.map((item, index) => 
                <FilterModal key={index} name={item}/>
            )
        }
        </Box>
    );
}
