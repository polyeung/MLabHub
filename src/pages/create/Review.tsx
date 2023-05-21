import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { ReviewFormProps } from '@/types/interface';

const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: 'Mr John Smith' },
    { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Expiry date', detail: '04/2024' },
  ];
  const products = [
    {
      name: 'Product 1',
      desc: 'A nice thing',
      price: '$9.99',
    },
    {
      name: 'Product 2',
      desc: 'Another thing',
      price: '$3.45',
    },
    {
      name: 'Product 3',
      desc: 'Something else',
      price: '$6.51',
    },
    {
      name: 'Product 4',
      desc: 'Best thing of all',
      price: '$14.11',
    },
    { name: 'Shipping', desc: '', price: 'Free' },
  ];
export default function Review({ peopleDict, addr, info }: ReviewFormProps) {
    function checkEmpty(input: string):string{ 
        if (input.trim().length == 0) { 
            return "Not Filled In";
        }
        return input;
    }
    const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Review Information
      </Typography>
      <Grid container spacing={2}>
        
              <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Basic Info
          </Typography>
          <Grid container>
            {Object.entries(info).map(([key, value])  => (
              <React.Fragment key={key}>
                <Grid item xs={3}>
                  <Typography gutterBottom>{key + ":"}</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography gutterBottom>{checkEmpty(value)}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
          </Grid>
          <List disablePadding>
        {Object.entries(peopleDict).map(([key, value]) => (
          <ListItem key={key} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={"member" + key} secondary={value.email} />
            <Typography variant="body2">{value.name}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Number of Members" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            { Object.keys(peopleDict).length }
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}