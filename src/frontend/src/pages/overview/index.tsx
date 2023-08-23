import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { ResponseAllLabs, ResponseAllLabsTemp,  overviewProps,
            SearchCriteriaProps, SearchRefProps} from '@/types/interface';
import Cards from '@/components/card';
import { UserData } from '@/types/interface';
import { Typography, Pagination, Box, TextField } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { ScreenContext } from '@/screenContext';
import PlaceHolder from './placeHolder';


/*SideBar */

/*Sidebar end */
export default function overview({userData, searchCriteria, setDict}: overviewProps) { 
    const [data, setData] = useState<ResponseAllLabs>(ResponseAllLabsTemp);
    const [isWaiting, setIsWaiting] = useState<boolean>(true);
    const { isSmallScreen, isMiddleScreen } = React.useContext(ScreenContext);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    // get current url
    const searchParams = new URLSearchParams(location.search);
    // get param from current url
    const initialPage = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1;
    const [page, setPage] = useState(initialPage);

    // to compare search Criteria
    const searchCriRef = React.useRef<SearchCriteriaProps>(SearchRefProps); 
    // track whether it is first time render
    const isFirstRender = React.useRef(true);
    const isFromCriChanged = React.useRef(false);
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleClearSearch = () => {
        setSearchValue('');
    };
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number
      ) => {
        event.preventDefault();
        setPage(value);
      };
    

    const getUpdatedUrl = (isForPage:boolean):URL =>{
        const newUrl = new URL(window.location.toString());
        if(!isForPage){
            if (searchCriteria["school"].length > 0){
                newUrl.searchParams.set('school', searchCriteria["school"]);
            } else {
                newUrl.searchParams.delete('school');
            };
            if (searchCriteria["search"].length > 0){
                newUrl.searchParams.set('search', searchCriteria["search"]);
            } else {
                newUrl.searchParams.delete('search');
            };
            newUrl.searchParams.set('page', "1");
            setPage(1);
            isFromCriChanged.current=true;
        }else{
            newUrl.searchParams.set('page', page.toString());
        }
        return newUrl;
    };

      useEffect(() => {
        // if this is triggered by criChanged
        if(isFromCriChanged.current){
            isFromCriChanged.current = false;
            return;
        };
        setIsWaiting(true);
        // check whether this useEffect comse from page variable changed
        const isForPage = (searchCriRef.current == searchCriteria);
        const newUrl = getUpdatedUrl(isForPage);
        fetch('/api/lab/getLabInfo2/' + newUrl.search)
            .then(response => response.json())
            .then(data => {
                setData(data);
                console.log(data);
                console.log("api call....");
                setIsWaiting(false);
                const history = window.history;
                //navigate(newUrl.pathname + newUrl.search);
                history.pushState({}, '', newUrl.pathname + newUrl.search);
                // update searchCriRef
                searchCriRef.current = searchCriteria;
                isFirstRender.current = false;
            });
      }, [searchCriteria, page]);
    
    const getMdSize = (length: number) => {
        if(length == 1){
            return 12;
        }else if(length == 2){
            return 6;
        }
        return 4;
    }

    const getScreenSize = () => {
        if(isMiddleScreen){
            return 600;
        }else if(isSmallScreen){
            return 400;
        }
        return 800;
    }
    return (
        <Box style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}> 
    {isWaiting ?
        <PlaceHolder/> :
        <Box sx={{ display: 'flex' , flexDirection: 'column'}}>
        <Grid container spacing={2} sx={{ justifyContent: 'left' }}>
            {(data.labs.length > 0) && data.labs.map((item) => (
                <Grid item xs={12} sm={6} md={getMdSize(data.labs.length)} key={item.id} 
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Cards
                        name={item.name}
                        people={item.people}
                        link={item.link}
                        intro={item.intro}
                        id={item.id}
                        dep={item.dep}
                        userData={userData}
                        emails={item.emails}
                        isSaved={item.isSaved}
                    />
                </Grid>
            ))}
            {(data.labs.length === 0 && !isWaiting) && <div style={{marginTop: '50px'}}>Oops! No result found.</div>}
        </Grid>
    </Box>
}


        {!isWaiting && 
        <Pagination
         count={data.total_page} 
         shape="rounded" 
         style={{marginTop: 20}}
         page={page}
         onChange={handleChangePage}/>
        }
</Box>);
};