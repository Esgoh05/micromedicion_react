// components/Sidebar.js
import { FaClipboard, FaRegChartBar, FaUsers } from 'react-icons/fa';
import { HiMiniCpuChip } from 'react-icons/hi2'
import { BsHouseGear, BsClipboard2Data } from 'react-icons/bs'
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
                <BsClipboard2Data className='nav-icon'/>
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
                <HiMiniCpuChip className='nav-icon'/>
                DISPOSITIVOS
            </a>
        </li>
        <li className={`nav-item ${location.pathname === '/instalaciones' ? 'active' : ''}`}>
            <a href="/instalaciones">
                <BsHouseGear className='nav-icon'/>
                INSTALACION
            </a>
        </li>
        <li className={`nav-item ${location.pathname === '/panel-consumo' ? 'active' : ''}`}>
            <a href="/panel-consumo">
                <FaRegChartBar className='nav-icon'/>
                PANEL DE CONSUMO
            </a>
        </li>
      </ul>
      
    </div>
  );
};



export default Sidebar;