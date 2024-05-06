import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import imgAvatar from "../../assets/avatar.png"
import { FiHome, FiUser, FiSettings } from 'react-icons/fi'
import "./Header.css"

function Header() {

    const {usuario} = useContext(AuthContext);

  return (
    <div className="sidebar">
      <div>
        <img src={usuario.avatarUrl === null ? imgAvatar : usuario.avatarUrl} alt="Foto do usuário"/>
      </div>

      <Link to={"/dashboard"}>
        <FiHome color='#fff' size={24}/>
        Chamados
      </Link>

      <Link to={"/clientes"}>
        <FiUser color='#fff' size={24}/>
        Clientes
      </Link>

      <Link to={"/configuracoes"}>
        <FiSettings color='#fff' size={24}/>
        Configurações
      </Link>
    </div>
  );
}

export default Header;
