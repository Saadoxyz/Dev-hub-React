// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BlogHomepage from './BlogHomepage.jsx';
import Freelance from './Freelance.jsx';
import JobTrackerApp from './JobTrackerApp.jsx';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<BlogHomepage />} />
      <Route path="/Freelance" element={<Freelance />} />
      <Route path="/JobTrackerApp" element={<JobTrackerApp/>} />
    </Routes>
  );
};

export default App;
