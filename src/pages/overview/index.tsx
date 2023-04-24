import * as React from 'react';
import Labinfo from 'components/modal';
import Grid from '@mui/material/Grid';
import LabData from 'data/labData';
import { LabInfoType } from 'types/interface';

export default function overview() { 
    const [data, setData] = React.useState<LabInfoType[]>([]);

    React.useEffect(() => {
        fetch('http://localhost:8000/getLabInfo')
            .then(response => response.json())
            .then(data => setData(data));
      }, []);
    
    return (
        <Grid container spacing={2}>
            {data.map((item) => (
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