import { FiX } from "react-icons/fi";
import "./Modal.css";
import { format } from "date-fns";

function Modal({ fechar, conteudo }) {
  const dataFormatada =
    conteudo.editadoEm !== null
      ? format(conteudo.editadoEm.toDate(), "dd/MM/yyyy")
      : "Sem edição";
  return (
    <div className="modal">
      <div className="container">
        <button className="fechar" onClick={fechar}>
          <FiX size={25} color="#fff" />
          Voltar
        </button>

        <main>
          <h2>Detalhes do chamado</h2>

          <div className="detalhes">
            <span>
              Cliente: <i>{conteudo.cliente}</i>
            </span>
          </div>

          <div className="detalhes">
            <span>
              Assunto: <i>{conteudo.assunto}</i>
            </span>
            <span>
              Cadastrado em: <i>{conteudo.criadoEmFormat}</i>
            </span>
          </div>

          <div className="detalhes">
            <span>
              Status:{" "}
              <i
                className="status"
                style={{
                  color: "#fff", background: conteudo.status === "Aberto" ? "#5cb85c" : "#999",
                }}
              >
                {conteudo.status}
              </i>
            </span>
          </div>

          {conteudo.complemento !== "" && (
            <>
              <h3>Complemento</h3>
              <p>{conteudo.complemento}</p>
            </>
          )}

          <div className="infos">
            <div className="detalhes">
              <span>
                Criado por: <i>{conteudo.criadoPor}</i>
              </span>
            </div>

            <div className="detalhes edicao">
              <span>
                Editado em:
                <i>{dataFormatada}</i>
              </span>
              <span>
                Editado por:{" "}
                <i>
                  {conteudo.editadoPor === ""
                    ? "Sem edição"
                    : conteudo.editadoPor}
                </i>
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Modal;
