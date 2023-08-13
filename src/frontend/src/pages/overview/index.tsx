import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { ResponseAllLabs, ResponseAllLabsTemp} from '@/types/interface';
import Cards from '@/components/card';
import { UserData } from '@/types/interface';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography, Pagination, Box, TextField } from '@mui/material';
import { ScreenContext } from '@/screenContext';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import PlaceHolder from './placeHolder';
export default function overview(props: {
    userData: UserData | undefined | null;
}) { 
    const [data, setData] = useState<ResponseAllLabs>(ResponseAllLabsTemp);
    const [isWaiting, setIsWaiting] = useState<boolean>(true);
    const [page, setPage] = useState(1);

    const { isSmallScreen, isMiddleScreen } = React.useContext(ScreenContext);
    const [searchValue, setSearchValue] = useState('');

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
        fetch('/api/lab/getLabInfo2/?page=' + String(page) + '&search=' + searchValue)
            .then(response => response.json())
            .then(data => {
                setData(data);
                console.log(data);
                setIsWaiting(false);
            });
      }, [page, searchValue]);
    
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
        <Grid container spacing={2} sx={{ justifyContent: 'left'}}>
            {(data.labs.length > 0) && data.labs.map((item) => (
                <Grid item xs={12} sm={6} md={getMdSize(data.labs.length)} key={item.id} 
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Cards
                        name={item.name}
                        people={item.people}
                        link={item.link}
                        intro={item.intro}
                        id={item.id}
                        dep={ item.dep }
                        userData={props.userData}
                        emails={item.emails}
                        isSaved={item.isSaved}/>
                </Grid>
            ))}
             {(data.labs.length === 0 && !isWaiting) && <div>Oops! Not result found.</div>}
        </Grid>}
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