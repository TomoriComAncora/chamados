import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

function Privado({children}) {

    const {logado, carregar} = useContext(AuthContext);

    if(carregar){
        return(
            <div></div>
        )
    }

    if(!logado){
        return <Navigate to={"/"}/>
    }
  console.log(logado);
  return children;
}

export default Privado;
