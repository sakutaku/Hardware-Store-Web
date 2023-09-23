import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home';
import './App.css';
import Login from './containers/Login';
import Register from './containers/Register';
import OneProduct from './containers/OneProduct';
import NewProduct from "./containers/NewProduct";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/products/:id" element={<OneProduct/>}/>
        <Route path="/add-product" element={<NewProduct/>}/>
      </Routes>
    </>
  );
}

export default App;
