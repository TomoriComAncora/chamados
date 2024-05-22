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

const listaRef = collection(db, "chamados");

function Dashboard() {
  const { sair } = useContext(AuthContext);

  const [chamado, setChamado] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [vazia, setVazia] = useState(false);

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
          status: doc.data().status,
          complemento: doc.data().complemento,
        });
      });

      setChamado((chamados) => [...chamados, ...lista]);
      console.log(chamado);
    } else {
      setVazia(true);
    }
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
                          style={{ background: "#cecece" }}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td data-label="cadastrado">{item.criadoEmFormat}</td>
                      <td data-label="#">
                        <button
                          className="acoes"
                          style={{ backgroundColor: "#3583f6" }}
                        >
                          <FiSearch color="#fff" size={17} />
                        </button>
                        <button
                          className="acoes"
                          style={{ backgroundColor: "#f6a935" }}
                        >
                          <FiEdit2 color="#fff" size={17} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </>
      </div>
    </div>
  );
}

export default Dashboard;
