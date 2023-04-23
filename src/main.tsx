import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Page1 from 'pages/page1';
import Navbar from 'components/navbar';
import Overview from 'pages/overview';

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
				}}
			>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page1 />} />
          <Route path="/page3" element={<Page1 />} />
          </Routes>
      </Container>
      </React.Fragment>
    </Router>
  );
}

export default Main;