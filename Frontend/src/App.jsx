import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Header from "./components/Header"
import AdminHome from "./adminModule/AdminHome"
import About from './components/pages/About'
import Home from './components/pages/Home'
import CashierHome from './cashierModule/CashierHome'
import Navbar from './components/Navbar'
import StoreManagerHome from './storeManagerModule/StoreManagerHome'
import axios from "axios";


function App() {
  return (
    <div>
      
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
            <Route path="/admin" element={<AdminHome/>}/>
       <Route path="/cashier" element={<CashierHome/>}/>
       <Route path="/manager" element={<StoreManagerHome/>}/>
      </Routes>
    </div>
  )
}

export default App
