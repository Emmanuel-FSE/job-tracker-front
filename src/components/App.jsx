import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Home from './Home';
import Register from './Register';
import Application from './Application';
function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login/>}>
      </Route>
      <Route path='/' element={<Home/>}>
      </Route>
      <Route path='/register' element={<Register/>}>
      </Route>
      <Route path='/applications' element={<Application/>}>
      </Route>
    </Routes>
  );
}

export default App;
