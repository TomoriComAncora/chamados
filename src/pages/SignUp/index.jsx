import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function SignUp() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastrar = (e) => {
    e.preventDefault();
    if (nome != "" && email != "" && senha != "") {
      alert("Faça o cadastro");
    }
  };

  return (
    <div className="container">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="logo" />
        </div>
        <form onSubmit={handleCadastrar}>
          <h1>Nova conta</h1>
          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

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

          <button type="submit">Cadastrar</button>
        </form>
        <Link to={"/"}>Já possui uma conta? Faça login</Link>
      </div>
    </div>
  );
}

export default SignUp;
