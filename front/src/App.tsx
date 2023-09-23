import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home';
import './App.css';
import Login from './containers/Login';
import Register from './containers/Register';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </>
  );
}

export default App;
