import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from 'components/navbar';
import Overview from 'pages/overview';
import Labpage from 'pages/labpage';
import Jobs from 'pages/jobs';
import Post from 'pages/post';
import Create from 'pages/create';
import LoginPage from 'pages/loginPage';






function Main() {

  
  return (
    <Router>
      <React.Fragment>
        <Navbar/>
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
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/post" element={<Post />} />
          <Route path="/create" element={<Create />} />
          <Route path="/login" element={<LoginPage /> } />
        </Routes>
      </Container>
      </React.Fragment>
    </Router>
  );
}

export default Main;

