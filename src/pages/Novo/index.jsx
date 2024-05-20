import Header from "../../components/Header";
import Titulo from "../../components/Titulo";
import { FiPlusCircle } from "react-icons/fi";
import "./Novo.css";

function Novo() {
  return (
    <div>
      <Header />
      <div className="content">
        <Titulo name={"Novo Chamado"}>
          <FiPlusCircle size={25} />
        </Titulo>
        <div className="container">
          <form className="form-profile">
            <label>Clientes</label>
            <select>
              <option key={1} value={1}>
                Mercado teste
              </option>
              <option key={2} value={2}>
                Loja teste
              </option>
            </select>

            <label>Assunto</label>
            <select>
              <option value="Suporte">Suporte</option>
              <option value="Visita Tecnica">Visita Técnica</option>
              <option value="Financeiro">Financeiro</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input type="radio" name="radio" value={"Aberto"} />
              <span>Em aberto</span>
              <input type="radio" name="radio" value={"Progresso"} />
              <span>Em progresso</span>
              <input type="radio" name="radio" value={"Fechado"} />
              <span>Fechado</span>
            </div>

            <label>Complemento</label>
            <textarea
              type="text"
              placeholder="Descreva seu problema (opicional)"
            ></textarea>
          <button type="submit">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Novo;
