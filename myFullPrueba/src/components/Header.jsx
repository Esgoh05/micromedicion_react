import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
        <header className='header'>
            <div className="logo">
                <Link to='/' >MicromediciónIoT</Link>
            </div>
            <ul>
                <li>
                    <Link to='/login' >
                        <FaSignInAlt /> Iniciar sesión
                    </Link>
                </li>
                <li>
                    <Link to='/aboutus' >
                        <FaUser /> Nosotros
                    </Link>
                </li>
                <li>
                    <Link to='/contact' >
                        <FaUser /> Contacto
                    </Link>
                </li>
                <li>
                    <Link to='/register' >
                        <FaUser /> Registrar
                    </Link>
                </li>
            </ul>
        </header>
    </>
  )
}

export default Header