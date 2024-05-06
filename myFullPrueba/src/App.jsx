//import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register' 
import Users from './pages/Users'
import Installations from './pages/Installations'
import Devices from './pages/Devices'
import Modal from './pages/Modal'




function App() {

  return (
    <>
    <Router>
      <div className='container'>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/usuarios' element={<Users/>} />
          <Route path='/dispositivos' element={<Devices/>} />
          <Route path='/instalaciones' element={<Installations/>} />
          <Route path='/registrar' element={<Modal/>} />
        </Routes>
      </div>
    </Router>
    <ToastContainer/>
    </>
  )
}

export default App
