import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  const logar = (email, senha) => {
    console.log(email, senha);
    alert("Usuario logado");
  };

  return (
    <AuthContext.Provider
      value={{
        logado: !!usuario, //falso porque começa com null
        usuario,
        logar
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
