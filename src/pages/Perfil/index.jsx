import Header from "../../components/Header";
import Titulo from "../../components/Titulo";

import { FiSettings } from "react-icons/fi";

function Perfil() {
  return (
    <div>
      <Header />
      <div className="content">
        <Titulo name={"Minha conta"}>
            <FiSettings size={25}/>
        </Titulo>
      </div>
      <h1>Perfil do usuario</h1>
    </div>
  );
}

export default Perfil;
