import { useContext, useState } from "react";
import Header from "../../components/Header";
import Titulo from "../../components/Titulo";

import { FiSettings, FiUpload } from "react-icons/fi";
import avatar from "../../assets/avatar.png";
import { AuthContext } from "../../contexts/auth";

import { db, storage } from "../../services/firebaseConnection";
import { doc, updateDoc } from "firebase/firestore";
import "./Perfil.css";

import { toast } from "react-toastify";

function Perfil() {
  const { usuario, storageDeUsuario, setUsuario, sair } =
    useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState(usuario && usuario.avatarUrl);
  const [avatarImagem, setAvatarImagem] = useState(null);
  const [nome, setNome] = useState(usuario && usuario.nome);
  const [email, setEmail] = useState(usuario && usuario.email);

  const handleArquivo = (e) => {
    if (e.target.files[0]) {
      const imagem = e.target.files[0];

      if (imagem.type === "image/jpeg" || imagem.type === "image/png") {
        setAvatarImagem(imagem);
        setAvatarUrl(URL.createObjectURL(imagem));
      }
    }
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    // aualizar só o usuario
    const docRef = doc(db, "usuarios", usuario.uid);
    await updateDoc(docRef, {
      nome: nome,
    }).then(() => {
      let dados = {
        ...usuario,
        nome: nome,
      };

      storageDeUsuario(dados);
      setUsuario(dados);
      toast.success("Nome alterado com sucesso");
    });
  };

  return (
    <div>
      <Header />
      <div className="content">
        <Titulo name={"Minha conta"}>
          <FiSettings size={25} />
        </Titulo>
        <div className="container-profile">
          <form className="form-profile" onSubmit={handleSalvar}>
            <label className="form-avatar">
              <span>
                <FiUpload color="#fff" size={25} />
              </span>
              <input type="file" accept="image/*" onChange={handleArquivo} />{" "}
              <br />
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
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            {console.log(nome)}

            <label>Email</label>
            <input type="text" value={email} disabled={true} />

            <button type="submit">Salvar</button>
          </form>
        </div>

        <div className="container-profile">
          <button className="logout-btn" onClick={() => sair()}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
