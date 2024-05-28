import { useState, useEffect, useContext } from "react";
import Header from "../../components/Header";
import Titulo from "../../components/Titulo";
import { FiPlusCircle } from "react-icons/fi";
import { format } from "date-fns";

import { AuthContext } from "../../contexts/auth";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../services/firebaseConnection";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";

import "./Novo.css";
import { toast } from "react-toastify";

const listaRef = collection(db, "clientes");

function Novo() {
  const { usuario } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [clientes, setCleintes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(0);
  const [carregandoClientes, setCarregandoClientes] = useState(true);
  const [assunto, setAssunto] = useState("Suporte");
  const [status, setStatus] = useState("Em aberto");
  const [complemento, setComplemento] = useState("");
  const [idCliente, setIdCliente] = useState(false);

  useEffect(() => {
    console.log(id);
    const carregarClientes = async () => {
      const querrySnapshot = await getDocs(listaRef)
        .then((snapShot) => {
          let lista = [];
          snapShot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nomeFantasia: doc.data().nomeFantasia,
            });
          });

          if (snapShot.docs.size === 0) {
            console.log("nenhuma empresa encontrada");
            setCleintes([{ id: 1, nomeFantasia: teste }]);
            setCarregandoClientes(false);
            return;
          }
          setCleintes(lista);
          setCarregandoClientes(false);

          if (id) {
            carregarId(lista);
          }
        })
        .catch((err) => {
          console.log("Erro ao buscar no banco de dados", err);
          setCarregandoClientes(false);
          setCleintes([{ id: 1, nomeFantasia: teste }]);
        });
    };

    carregarClientes();
  }, [id]);

  const carregarId = async (lista) => {
    const docRef = doc(db, "chamados", id);
    await getDoc(docRef)
      .then((snapshot) => {
        setAssunto(snapshot.data().assunto);
        setStatus(snapshot.data().status);
        setComplemento(snapshot.data().complemento);

        let index = lista.findIndex(
          (item) => item.id === snapshot.data().clienteId
        );

        setClienteSelecionado(index);
        setIdCliente(true);
      })
      .catch((err) => {
        console.log(err);
        setIdCliente(false);
      });
  };

  const handleOpcoes = (e) => {
    setStatus(e.target.value);
    console.log(e.target.value);
  };

  const handleSelect = (e) => {
    setAssunto(e.target.value);
    console.log(e.target.value);
  };

  const handleClientes = (e) => {
    setClienteSelecionado(e.target.value);
    console.log(clientes[e.target.value].nomeFantasia);
  };

  const handleRegistrar = async (e) => {
    e.preventDefault();

    if (idCliente) {
      const docRef = doc(db, "chamados", id);
      await updateDoc(docRef, {
        cliente: clientes[clienteSelecionado].nomeFantasia,
        clienteId: clientes[clienteSelecionado].id,
        assunto: assunto,
        complemento: complemento,
        status: status,
        userId: usuario.uid,
        editadoPor: usuario.nome,
        editadoEm: new Date(),
      })
        .then(() => {
          toast.info("Chamado atualizado com sucesso!");
          setClienteSelecionado(0);
          setComplemento("");
          navigate("/dashboard");
        })
        .catch((err) => {
          toast.error("Erro ao atualizar o chamado!");
          console.log(err);
        });
      return;
    }

    await addDoc(collection(db, "chamados"), {
      criadoEm: new Date(),
      editadoEm: null,
      editadoPor: "",
      criadoPor: usuario.nome,
      cliente: clientes[clienteSelecionado].nomeFantasia,
      clienteId: clientes[clienteSelecionado].id,
      assunto: assunto,
      complemento: complemento,
      status: status,
      userId: usuario.uid,
    })
      .then(() => {
        toast.success("Chamado criado com sucesso!");
        setClienteSelecionado(0);
        setAssunto("");
        setComplemento("");
        setStatus("");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao criar chamado!");
      });
  };

  return (
    <div>
      <Header />
      <div className="content">
        <Titulo name={id ? "Editando chamado" : "Novo chamado"}>
          <FiPlusCircle size={25} />
        </Titulo>
        <div className="container">
          <form className="form-profile" onSubmit={handleRegistrar}>
            <label>Clientes</label>
            {carregandoClientes ? (
              <input type="text" disabled={true} value={"Carregando..."} />
            ) : (
              <select value={clienteSelecionado} onChange={handleClientes}>
                {clientes.map((item, index) => (
                  <option key={index} value={index}>
                    {item.nomeFantasia}
                  </option>
                ))}
              </select>
            )}

            <label>Assunto</label>
            <select value={assunto} onChange={handleSelect}>
              <option value="Suporte">Suporte</option>
              <option value="Visita Tecnica">Visita Técnica</option>
              <option value="Financeiro">Financeiro</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input
                type="radio"
                name="radio"
                value={"Aberto"}
                onChange={handleOpcoes}
                checked={status === "Aberto"}
              />
              <span>Em aberto</span>
              <input
                type="radio"
                name="radio"
                value={"Progresso"}
                onChange={handleOpcoes}
                checked={status === "Progresso"}
              />
              <span>Em progresso</span>
              <input
                type="radio"
                name="radio"
                value={"Fechado"}
                onChange={handleOpcoes}
                checked={status === "Fechado"}
              />
              <span>Fechado</span>
            </div>

            <label>Complemento</label>
            <textarea
              type="text"
              placeholder="Descreva seu problema (opicional)"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            ></textarea>
            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Novo;
