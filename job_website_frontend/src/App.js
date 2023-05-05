
import './css/App.css';
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import { routes } from './common/routes';
// import { useState, useEffect } from 'react';

function App() {
  return (
    <div className="contain">
      <Navbar />
      <Routes>
        {routes.map((item, index) => (
          <Route path={item.pathname} element={item.component} key={index} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
