import * as React from 'react';
import FilterModal from './filter';
import Box from '@mui/material/Box';
import SchoolFilter from './schoolFilter';
import { FilterProps } from '@/types/interface';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';

const filters = [ "Department", "Label"]


const FilterBarComponent: React.FC<FilterProps> = ({ searchCriteria, setDict, setSearchCriteria }) => {
    const [schoolState, setSchoolState] = React.useState(() => ({
        "lsa": searchCriteria["school"].includes("lsa"),
        "eng": searchCriteria["school"].includes("eng"),
        "si": searchCriteria["school"].includes("si"),
    }));
    const [searchVal, setSearchVal] = React.useState("");
    const navigate = useNavigate();
    const handleResetClick = () => {
        
        const initSchoolState = {
            "lsa": false,
            "eng": false,
            "si": false,
        };
        setSchoolState(initSchoolState);

        const initSearchCriteriaState = {
            "dep": "",
            "school": "",
            "label": "",
            "search": ""
        };
        setSearchCriteria(initSearchCriteriaState);
        navigate("/");
    };
    const count = Object.values(schoolState).filter(Boolean).length;

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchVal(event.target.value);
        setDict("search", event.target.value as string);
        console.log(searchCriteria);
    };
    return (
        <Box sx={{ 
            display: 'flex', 
            m: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'left',
        }}>
            <Box 
            sx={{display: 'flex', m:1,
            flexDirection: 'row',
            gap: {xs: 0.5, md: 2}}}
            >
            <SchoolFilter 
                searchCriteria={searchCriteria}
                setDict={setDict}
                state={schoolState}
                setState={setSchoolState}
            />
            { 
                filters.map((item, index) => 
                    <FilterModal key={index} name={item} />
                )
            }
            <Button onClick={handleResetClick} variant="text"
                sx={{
                    fontSize: '0.7rem',
                }}
                disabled={count == 0}>Reset filter</Button>
            </Box>
            <Box sx={{ 
            display: 'flex', 

            flexDirection: 'row',}}>
            <TextField id="outlined-basic" label="Filter any field..." 
                variant="outlined" size="small"
                value={searchVal}
                onChange={ handleSearchChange}
                sx={{ width: '66%', marginBottom: { xs: 1, sm: 0 } }}/>
            </Box>
        </Box>
    );
}

// Always return true in the comparison function to prevent rerenders
const arePropsEqual = (prevProps: FilterProps, nextProps: FilterProps) => {
    return true;
};

const FilterBar = React.memo(FilterBarComponent, arePropsEqual);

export default FilterBar;
