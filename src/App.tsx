import React from "react";
import { Home } from "./screen/Home/home";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { NotFound } from "./components/NotFound/notFound";
import './App.css';

const App = ()=>{
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App