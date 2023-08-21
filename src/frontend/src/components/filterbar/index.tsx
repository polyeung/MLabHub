import * as React from 'react';
import FilterModal from './filter';
import Box from '@mui/material/Box';
import SchoolFilter from './schoolFilter';
import { FilterProps } from '@/types/interface';

const filters = [ "Department", "key word", "Label"]

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
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'left',
            gap: {xs: 0.5, md: 3}
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
