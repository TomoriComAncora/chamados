import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";

//components
import Header from "../../components/Header";
import Titulo from "../../components/Titulo";
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";

import "./dashboard.css"

function Dashboard() {
  const {sair} = useContext(AuthContext);


  return (
    <div>
      <Header/>
        <div className="content">
          <Titulo name={"Chamados"}>
            <FiMessageSquare size={25}/>
          </Titulo>

          <>
            <Link to={"/novo"} className="novo">
              <FiPlus color=" #fff" size={25}/>
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
                <tr>
                  <td data-label="cliente">Mercado</td>
                  <td data-label="assunto">Suporte</td>
                  <td data-label="status"><span className="status" style={{background: "#cecece"}}>Em aberto</span></td>
                  <td data-label="cadastrado">14/05/2024</td>
                  <td  data-label="#">
                    <button className="acoes" style={{backgroundColor:'#3583f6'}}>
                      <FiSearch color="#fff" size={17}/>
                    </button>
                    <button className="acoes" style={{backgroundColor:'#f6a935'}}>
                      <FiEdit2 color="#fff" size={17}/>
                    </button>
                  </td>
                </tr>


                <tr>
                  <td data-label="cliente">Mercado 2</td>
                  <td data-label="assunto">Suporte</td>
                  <td data-label="status"><span className="status" style={{background: "#cecece"}}>Em aberto</span></td>
                  <td data-label="cadastrado">14/05/2024</td>
                  <td  data-label="#">
                    <button className="acoes" style={{backgroundColor:'#3583f6'}}>
                      <FiSearch color="#fff" size={17}/>
                    </button>
                    <button className="acoes" style={{backgroundColor:'#f6a935'}}>
                      <FiEdit2 color="#fff" size={17}/>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        </div>
    </div>
  )
}

export default Dashboard;