import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { ResponseAllLabs, ResponseAllLabsTemp,  overviewProps} from '@/types/interface';
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

    // search criteria starts

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

    useEffect(() => {
        setIsWaiting(true);
        fetch('/api/lab/getLabInfo2/?page=' + String(page) + '&school=' + searchCriteria["school"])
            .then(response => response.json())
            .then(data => {
                setData(data);
                console.log(data);
                setIsWaiting(false);
            });
        const newUrl = new URL(window.location.toString());
        newUrl.searchParams.set('page', page.toString());
        navigate(newUrl.pathname + newUrl.search);
        console.log("search criteria: ", searchCriteria);
      }, [page]);

      useEffect(() => {
        setIsWaiting(true);
        const newUrl = new URL(window.location.toString());
        fetch('/api/lab/getLabInfo2/?' + 'school=' + searchCriteria["school"])
            .then(response => response.json())
            .then(data => {
                setData(data);
                console.log(data);
                const newUrl = new URL(window.location.toString()); // Create a fresh instance here
                newUrl.searchParams.set('page',parseInt(data.total_page) < page ? "1":page.toString());
                if (searchCriteria["school"].length > 0){
                    newUrl.searchParams.set('school', searchCriteria["school"]);
                } else {
                    newUrl.searchParams.delete('school');
                }
                // You may move the navigation logic here, after all conditions have been checked.
                setIsWaiting(false);
                navigate(newUrl.pathname + newUrl.search);
            });
      }, [searchCriteria]);
    
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