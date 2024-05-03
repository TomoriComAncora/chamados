import { useState, useEffect, createContext } from "react";
import { auth, db } from "../services/firebaseConnection";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [carregar, setCarregar] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const storageDoUsuario = localStorage.getItem("@usuarios");

    if (storageDoUsuario) {
      setUsuario(JSON.parse(storageDoUsuario));
      setCarregar(false);
    }

    setCarregar(false);
  }, []);

  const logar = async (email, senha) => {
    setCarregando(true);
    // console.log(carregando)
    await signInWithEmailAndPassword(auth, email, senha)
      .then(async (value) => {
        let uid = value.user.uid;

        const docRef = doc(db, "usuarios", uid);
        const docResp = await getDoc(docRef);

        let dados = {
          uid: uid,
          nome: docResp.data().nome,
          emai: value.user.email,
          avatarUrl: docResp.data().avatarUrl,
        };

        setUsuario(dados);
        storageDeUsuario(dados);
        setCarregando(false);
        toast.success("Seja bem-vindo(a) de volta");
        navigate("/dashboard");
        // console.log(carregando);
      })
      .catch((error) => {
        console.log(error);
        setCarregando(false);
        toast.error("Erro ao logar!");
      });
  };

  //cadastrar novo usuario
  const cadastrar = async (email, senha, nome) => {
    setCarregando(true);
    await createUserWithEmailAndPassword(auth, email, senha)
      .then(async (value) => {
        let uid = value.user.uid;

        await setDoc(doc(db, "usuarios", uid), {
          nome: nome,
          avatarUrl: null,
        }).then(() => {
          let dados = {
            uid: uid,
            nome: nome,
            email: value.user.email,
            avatarUrl: null,
          };

          setUsuario(dados);
          storageDeUsuario(dados);
          setCarregando(false);
          toast.success("Seja bem-vindo ao sistema!");
          navigate("/dashboard");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const storageDeUsuario = (data) => {
    localStorage.setItem("@usuarios", JSON.stringify(data));
  };

  return (
    <AuthContext.Provider
      value={{
        logado: !!usuario, //falso porque começa com null, converte para boolean
        usuario,
        logar,
        cadastrar,
        carregando,
        carregar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
