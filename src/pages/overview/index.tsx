import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { LabInfoType } from '@/types/interface';
import Cards from '@/components/card';
import { UserData } from '@/types/interface';

export default function overview(props: {
    userData: UserData | undefined | null;
}) { 
    const [data, setData] = useState<LabInfoType[]>([]);
    useEffect(() => {
        fetch('http://localhost:8000/api/getLabInfo')
            .then(response => response.json())
            .then(data => setData(data));
      }, []);
    
    return (
        <Grid container spacing={2}>
            {data.map((item) => (
                <Grid item xs={4} key={item.id}>
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
                        userData={props.userData}/>
                </Grid>
            ))}
        </Grid>);
};