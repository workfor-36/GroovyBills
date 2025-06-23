import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Header from "./components/Header"
import AdminHome from "./adminModule/AdminHome"
import About from './components/pages/About'
import Home from './components/pages/Home'
import CashierHome from './cashierModule/CashierHome'

function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
            <Route path="/admin" element={<AdminHome/>}/>
      <Route path="/header" element={<Header/>}/>
       <Route path="/cashier" element={<CashierHome/>}/>
      </Routes>
    </div>
  )
}

export default App
