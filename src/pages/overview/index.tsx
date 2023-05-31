import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { LabInfoType } from '@/types/interface';
import Cards from '@/components/card';
import { UserData } from '@/types/interface';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';


export default function overview(props: {
    userData: UserData | undefined | null;
}) { 
    const [data, setData] = useState<LabInfoType[]>([]);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    useEffect(() => {
        setIsWaiting(true);
        fetch('/api/lab/getLabInfo')
            .then(response => response.json())
            .then(data => {
                setData(data);
                setIsWaiting(false);
            });
      }, []);
    
    return (
        <>
            {isWaiting ?
                    <Typography variant='h5'>Loading Lab contents...<CircularProgress /></Typography>:
                <Grid container spacing={2}>
                    {data.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {/*
                    <Labinfo
                        name={item.name}
                        people={item.people}
                        link={item.link}
                        intro={item.intro}
                        id={ item.id }
            />*/}
                            <Cards
                                name={item.name}
                                people={item.people}
                                link={item.link}
                                intro={item.intro}
                                id={item.id}
                                userData={props.userData} />
                        </Grid>
                    ))}
                </Grid>}
    </>);
};