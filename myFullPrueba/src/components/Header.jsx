import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { FaSignInAlt, FaUser } from 'react-icons/fa';
import Sidebar from './Sidebar';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  return (
    <>
      <header className='header'>
      { user ? (
        <>
            <div className={`welcome-message ${isOpen ? 'sidebar-open' : ''}`}>
                <h3>Hola, {user.name}.</h3>
            </div>
        </>) : (
        <>
            <div className="logo">
                <Link to='/'>MicromediciónIoT</Link>
            </div>
        </>)}
        <ul>
          {user ? (
            <>
              <li>
                <Link onClick={onLogout}>
                  <FaSignInAlt /> Cerrar sesión
                </Link>
              </li>
              <li>
                <button onClick={() => setIsOpen(!isOpen)}>
                  <FaUser /> Perfil
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/login'>
                  <FaSignInAlt /> Iniciar sesión
                </Link>
              </li>
              <li>
                <Link to='/aboutus'>
                  <FaUser /> Nosotros
                </Link>
              </li>
              <li>
                <Link to='/contact'>
                  Contacto
                </Link>
              </li>
              <li>
                <Link to='/register'>
                  <FaUser /> Registrar
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
      {user && (
        <div className="panel-header">
          {/* Contenido del panel-header */}
        </div>
      )}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Header;
