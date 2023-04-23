import * as React from 'react';
import Labinfo from 'components/labinfo';
import Grid from '@mui/material/Grid';
import LabData from 'data/labData';

export default function overview() { 
    return (
        <Grid container spacing={2}>
            {LabData.map((item) => (
                <Grid item xs={4}>
                    <Labinfo
                        name={item.name}
                        people={item.people}
                        link={item.link}
                        intro={ item.intro}
                     />
                </Grid>
            ))}
        </Grid>);
};