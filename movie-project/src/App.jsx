import { useState } from 'react'
import './App.css'
import Home from './Home.jsx'
import { Route, Routes } from 'react-router-dom'
import { SingleMovie } from './SingleMovie.jsx'
import { Error } from './Error.jsx'

function App() {
  

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={<SingleMovie />} />
        <Route path="*" element={<Error />} />
      </Routes>
  );
}


export default App
