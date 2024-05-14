import { useState } from "react";
import Header from "../../components/Header";
import Titulo from "../../components/Titulo";
import { FiUser } from "react-icons/fi";

import { db } from "../../services/firebaseConnection";
import { addDoc, collection } from "firebase/firestore";

import { toast } from "react-toastify";

function Clientes() {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");

  const handleRegistrar = async (e) => {
    e.preventDefault();
    if (nome !== "" && cnpj !== "" && endereco !== "") {
      await addDoc(collection(db, "clientes"), {
        nomeFantasia: nome,
        cnpj: cnpj,
        endereco: endereco,
      })
        .then(() => {
          setNome("");
          setEndereco("");
          setCnpj("");
          toast.success("Empresa cadastrada com sucesso!");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Erro ao cadastrar empresa...");
        });
    } else {
      toast.error("Preencha todos os campos");
    }
  };

  return (
    <div>
      <Header />
      <div className="content">
        <Titulo name="Clientes">
          <FiUser size={25} />
        </Titulo>

        <div className="container">
          <form className="form-profile" onSubmit={handleRegistrar}>
            <label>Nome fantasia</label>
            <input
              type="text"
              placeholder="Nome da empresa"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
              }}
            />

            <label>CNPJ</label>
            <input
              type="text"
              placeholder="Digite o CNPJ"
              value={cnpj}
              onChange={(e) => {
                setCnpj(e.target.value);
              }}
            />

            <label>Endereço</label>
            <input
              type="text"
              placeholder="Endereço da empresa"
              value={endereco}
              onChange={(e) => {
                setEndereco(e.target.value);
              }}
            />

            <button type="submit">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Clientes;
