import React from 'react';
import App from './App';
import Register from './Register'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Login';

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/fileupload' element={<App/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/' element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;