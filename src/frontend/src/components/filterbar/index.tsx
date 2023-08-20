import * as React from 'react';
import FilterModal from './filter';
import Box from '@mui/material/Box';
import SchoolFilter from './schoolFilter';
import { FilterProps } from '@/types/interface';

const filters = ["Research Focus", "Professor", "Rating"]

const FilterBarComponent: React.FC<FilterProps> = ({ searchCriteria, setDict }) => {
    const [state, setState] = React.useState(() => ({
        "lsa": searchCriteria["school"].includes("lsa"),
        "eng": searchCriteria["school"].includes("eng"),
        "si": searchCriteria["school"].includes("si"),
    }));

    return (
        <Box sx={{ 
            display: 'flex', 
            m: 1,
            flexDirection: { xs: 'column', md: 'row' },
            '& > *': { p: 1 }
        }}>
            <SchoolFilter 
                searchCriteria={searchCriteria}
                setDict={setDict}
                state={state}
                setState={setState}
            />
            { 
                filters.map((item, index) => 
                    <FilterModal key={index} name={item}/>
                )
            }
        </Box>
    );
}

// Always return true in the comparison function to prevent rerenders
const arePropsEqual = (prevProps: FilterProps, nextProps: FilterProps) => {
    return true;
};

const FilterBar = React.memo(FilterBarComponent, arePropsEqual);

export default FilterBar;
