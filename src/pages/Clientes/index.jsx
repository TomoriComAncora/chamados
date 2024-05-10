import Header from "../../components/Header"
import Titulo from "../../components/Titulo"
import { FiUser } from "react-icons/fi"

function Clientes() {
  return (
    <div>
        <Header/>
        <div className="content">
            <Titulo name="Clientes">
                <FiUser size={25}/>
            </Titulo>
        </div>
    </div>
  )
}

export default Clientes