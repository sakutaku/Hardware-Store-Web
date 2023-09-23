import React from 'react';
import AppToolbar from '../components/AppToolbar/AppToolbar';
import Category from '../components/Category';

const Home = () => {
  return (
    <>
      <AppToolbar/>
      <Category/>
      <div className="container"></div>
    </>
  );
};

export default Home;