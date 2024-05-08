import { useContext, useState } from "react";
import Header from "../../components/Header";
import Titulo from "../../components/Titulo";

import { FiSettings, FiUpload } from "react-icons/fi";
import avatar from "../../assets/avatar.png";
import { AuthContext } from "../../contexts/auth";
import "./Perfil.css"

function Perfil() {
  const { usuario, storageDeUsuario, setUsuario } = useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState(usuario && usuario.avatarUrl);
  const [nome, setNome] = useState(usuario && usuario.nome);
  const [email, setEmail] = useState(usuario && usuario.email);

  return (
    <div>
      <Header />
      <div className="content">
        <Titulo name={"Minha conta"}>
          <FiSettings size={25} />
        </Titulo>
        <div className="container">
          <form className="form-profile">
            <label className="form-avatar">
              <span>
                <FiUpload color="#fff" size={25} />
              </span>
              <input type="file" accept="image/*" /> <br />
              {avatarUrl === null ? (
                <img
                  src={avatar}
                  alt="Foto de perfil"
                  width={250}
                  height={250}
                />
              ) : (
                <img
                  src={avatarUrl}
                  alt="Foto de perfi"
                  width={250}
                  height={250}
                />
              )}
            </label>

            <label>Nome</label>
            <input type="text" placeholder="Seu nome"/>

            <label>Email</label>
            <input type="email" placeholder="teste@teste.com" disabled={true}/>

            <button type="submit">Salvar</button>
          </form>
        </div>

        <div className="container">
            <button className="logout-btn">Sair</button>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
