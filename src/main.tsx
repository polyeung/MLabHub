import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Page1 from 'pages/page1';
import Navbar from 'components/navbar';
import Overview from 'pages/overview';
import Labpage from 'pages/labpage';

function Main() {
  
  return (
    <Router>
      <React.Fragment>
        <Navbar />
        <Container
				maxWidth="lg"
				sx={{
					flexGrow: 2,
					display: 'flex',
					alignItems: 'center',
          justifyContent: 'center',
          padding: '10px',
          marginTop: '10px'
				}}
			>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/labpage" element={<Labpage />} />
          <Route path="/page2" element={<Page1 />} />
          <Route path="/page3" element={<Page1 />} />
          </Routes>
      </Container>
      </React.Fragment>
    </Router>
  );
}

export default Main;