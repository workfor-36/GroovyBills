import { Route,Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './pages/Home'
import About from './pages/About'

function Header() {
  return (
    <div>
      <Navbar/> 
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      </Routes>
    </div>
  )
}

export default Header
