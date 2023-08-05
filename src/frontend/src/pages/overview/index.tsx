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
export default function overview(props: {
    userData: UserData | undefined | null;
}) { 
    const [data, setData] = useState<ResponseAllLabs>(ResponseAllLabsTemp);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const { isSmallScreen, isMiddleScreen } = React.useContext(ScreenContext);
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number
      ) => {
        event.preventDefault();
        setPage(value);
      };

    useEffect(() => {
        setIsWaiting(true);
        fetch('/api/lab/getLabInfo2/?page=' + String(page))
            .then(response => response.json())
            .then(data => {
                setData(data);
                console.log(data);
                setIsWaiting(false);
            });
      }, [page]);
    
    const getMdSize = (length: number) => {
        if(length == 1){
            return 12;
        }else if(length == 2){
            return 6;
        }
        return 4;
    }
    return (
        <Box style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}> 
    {!isWaiting &&
    <Box sx={{display: 'flex', justifyContent:isSmallScreen? 'center':'flex-start', width: '100%'}}>
    <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: isSmallScreen?'100%': '61.8%', mb:5}}
        >
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
        </IconButton>
        <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search for lab, department, professor and more..."
            inputProps={{ 'aria-label': 'search google maps' }}
        />
         <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <ClearIcon />
      </IconButton>
    </Paper>
    </Box>}
    {isWaiting ?
        <Typography variant='h5'>Loading Lab contents...<CircularProgress /></Typography> :

        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
            {data.labs.map((item) => (
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
                        isSaved={item.isSaved}/>
                </Grid>
            ))}
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