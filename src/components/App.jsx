import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Home from './Home';
import Register from './Register';
function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login/>}>
      </Route>
      <Route path='/' element={<Home/>}>
      </Route>
      <Route path='/register' element={<Register/>}>
      </Route>
    </Routes>
  );
}

export default App;
