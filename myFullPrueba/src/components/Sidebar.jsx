// components/Sidebar.js
import { FaClipboard, FaHome, FaMicrochip, FaRegChartBar, FaUsers } from 'react-icons/fa';
import  logoMiniatura  from '../assets/imgs/gotita_emergiendo_min.png'
import { useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul>
        <div className='logo-contenedor hstack'>
            <img src={logoMiniatura} alt="Logo" id='logo-mini'/>
            <a href="" className='logo-normal'>Micromedición IoT</a>
        </div>
        <li className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
            <a href="/dashboard">
                <FaClipboard className='nav-icon'/>
                PANEL DE RESUMEN
            </a>
        </li>
        <li className={`nav-item ${location.pathname === '/usuarios' ? 'active' : ''}`}>
            <a href="/usuarios" >
                <FaUsers className='nav-icon'/>
                USUARIOS
            </a>
        </li>
        <li className={`nav-item ${location.pathname === '/dispositivos' ? 'active' : ''}`}>
            <a href="/dispositivos">
                <FaMicrochip className='nav-icon'/>
                DISPOSITIVOS
            </a>
        </li>
        <li className={`nav-item ${location.pathname === '/instalaciones' ? 'active' : ''}`}>
            <a href="/instalaciones">
                <FaHome className='nav-icon'/>
                INSTALACION
            </a>
        </li>
        <li className={`nav-item ${location.pathname === '/dispositivos' ? 'active' : ''}`}>
            <a href="">
                <FaRegChartBar className='nav-icon'/>
                PANEL DE CONSUMO
            </a>
        </li>
      </ul>
      
    </div>
  );
};



export default Sidebar;