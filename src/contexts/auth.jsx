import { useState, useEffect, createContext } from "react";
import {auth, db} from '../'

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  const logar = (email, senha) => {
    console.log(email, senha);
    alert("Usuario logado");
  };

  //cadastrar novo usuario
  const cadastrar = (email, senha, nome) =>{
    console.log(nome);
  }


  return (
    <AuthContext.Provider
      value={{
        logado: !!usuario, //falso porque começa com null
        usuario,
        logar,
        cadastrar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
