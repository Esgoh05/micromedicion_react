import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DropdownMenu = () => {
  return (
    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
      <Link className="dropdown-item" to="/user-profile">
        <FaUser /> Perfil
      </Link>
      <Link className="dropdown-item" to="/logout">
        <FaSignOutAlt /> Salir
      </Link>
    </div>
  );
};

export default DropdownMenu;
