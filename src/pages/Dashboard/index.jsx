import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

//components
import Header from "../../components/Header";

function Dashboard() {
  const {sair} = useContext(AuthContext);

  const handleSair = async()=>{
    await sair();
  }

  return (
    <div>
      <Header/>
        <h1>Dashboard</h1>
        <button onClick={handleSair}>Sair</button>
    </div>
  )
}

export default Dashboard;