import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  orderBy,
  limit,
  startAfter,
  query,
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

//components
import Header from "../../components/Header";
import Titulo from "../../components/Titulo";
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";

import "./dashboard.css";
import { format } from "date-fns";
import Modal from "../../components/Modal";

const listaRef = collection(db, "chamados");

function Dashboard() {
  const { sair } = useContext(AuthContext);

  const [chamado, setChamado] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [vazia, setVazia] = useState(false);
  const [ultimoItem, setUltimoItem] = useState();
  const [carregarMais, setCarregarMais] = useState(false);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [detalhes, setDetalhes] = useState();

  useEffect(() => {
    const carregarChamados = async () => {
      const q = query(listaRef, orderBy("criadoEm", "desc"), limit(5));

      const querySnapshot = await getDocs(q);
      setChamado([]);
      await atualizaState(querySnapshot);

      setCarregando(false);
    };

    carregarChamados();
    return () => {};
  }, []);

  const atualizaState = (querySnapshot) => {
    const colecaoVazia = querySnapshot.size === 0;
    if (!colecaoVazia) {
      let lista = [];
      querySnapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          assunto: doc.data().assunto,
          cliente: doc.data().cliente,
          clienteId: doc.data().clienteId,
          criadoEm: doc.data().criadoEm,
          criadoEmFormat: format(doc.data().criadoEm.toDate(), "dd/MM/yyyy"),
          criadoPor: doc.data().criadoPor,
          editadoEm: doc.data().editadoEm,
          editadoPor: doc.data().editadoPor,
          status: doc.data().status,
          complemento: doc.data().complemento,
        });
      });

      const ultimoItem = querySnapshot.docs[querySnapshot.docs.length - 1]; //Pegando o ultimo item
      console.log(ultimoItem);

      setChamado((chamados) => [...chamados, ...lista]);
      console.log(chamado);
      setUltimoItem(ultimoItem);
    } else {
      setVazia(true);
    }

    setCarregarMais(false);
  };

  const handleMaisItens = async () => {
    setCarregarMais(true);
    const q = query(
      listaRef,
      orderBy("criadoEm", "desc"),
      startAfter(ultimoItem),
      limit(5)
    );
    const querysnapshot = await getDocs(q);
    await atualizaState(querysnapshot);
  };

  const handleDetalhes = (item) => {
    setMostrarModal(!mostrarModal);
    setDetalhes(item);
  };

  if (carregando) {
    return (
      <div>
        <Header />
        <div className="content">
          <Titulo name={"Chamados"}>
            <FiMessageSquare size={25} />
          </Titulo>
        </div>
        <div className="container dashboard">
          <span>Buscando chamados...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Titulo name={"Chamados"}>
          <FiMessageSquare size={25} />
        </Titulo>

        <>
          {chamado.length === 0 ? (
            <div className="container dashboard">
              <span>Nenhum chamado encontrado</span>
              <Link to={"/novo"} className="novo">
                <FiPlus color=" #fff" size={25} />
                Novo chamado
              </Link>
            </div>
          ) : (
            <>
              <Link to={"/novo"} className="novo">
                <FiPlus color=" #fff" size={25} />
                Novo chamado
              </Link>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Cliente</th>
                    <th scope="col">Assunto</th>
                    <th scope="col">Status</th>
                    <th scope="col">Cadastrado em</th>
                    <th scope="col">#</th>
                  </tr>
                </thead>
                <tbody>
                  {chamado.map((item, index) => (
                    <tr key={index}>
                      <td data-label="cliente">{item.cliente}</td>
                      <td data-label="assunto">{item.assunto}</td>
                      <td data-label="status">
                        <span
                          className="status"
                          style={{
                            background:
                              item.status === "Aberto" ? "#5cb85c" : "#999",
                          }}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td data-label="cadastrado">{item.criadoEmFormat}</td>
                      <td data-label="#">
                        <button
                          className="acoes"
                          style={{ backgroundColor: "#3583f6" }}
                          onClick={() => handleDetalhes(item)}
                        >
                          <FiSearch color="#fff" size={17} />
                        </button>
                        <Link
                          to={`/novo/${item.id}`}
                          className="acoes"
                          style={{ backgroundColor: "#f6a935" }}
                        >
                          <FiEdit2 color="#fff" size={17} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {carregarMais && (
                <h3 id="buscandoMais">Buscando mais chamados...</h3>
              )}
              {!carregarMais && !vazia && (
                <button className="carregarMais" onClick={handleMaisItens}>
                  Buscar mais
                </button>
              )}
            </>
          )}
        </>
      </div>

      {mostrarModal && <Modal conteudo={detalhes} fechar={()=> setMostrarModal(!mostrarModal)}/>}
    </div>
  );
}

export default Dashboard;
