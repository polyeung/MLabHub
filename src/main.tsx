import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Page1 from './pages/page1';
import Navbar from './components/navbar';

function Main() {
  return (
    <Router>
      <React.Fragment>
        <Navbar />
        <Routes>
          <Route path="/" element={<Page1 />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page1 />} />
          <Route path="/page3" element={<Page1 />} />
        </Routes>
      </React.Fragment>
    </Router>
  );
}

export default Main;