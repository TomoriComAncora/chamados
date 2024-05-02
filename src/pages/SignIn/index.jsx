import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import "./signin.css";
import logo from "../../assets/logo.png";

function SignIn() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { logar } = useContext(AuthContext);

  const handleLogar = (e) => {
    e.preventDefault();
    if(email !== "" && senha !== ""){
      logar(email, senha);
    }
  };

  return (
    <div className="container">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="logo" />
        </div>
        <form onSubmit={handleLogar}>
          <h1>Entrar</h1>
          <input
            type="text"
            placeholder="email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="********"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button type="submit">Entrar</button>
        </form>
        <Link to={"/registrar"}>Criar uma conta</Link>
      </div>
    </div>
  );
}

export default SignIn;
