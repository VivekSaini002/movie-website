import React, { useContext } from 'react';
import { AppContext } from './context';
import { Search } from './Search';
import Movies from './Movies';

function Home() {

  return (
    <div className='container'>
      <Search />
      <Movies />
      
    </div>
  );
}

export default Home;
