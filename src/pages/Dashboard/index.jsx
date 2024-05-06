import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

function Dashboard() {
  const {sair} = useContext(AuthContext);

  const handleSair = async()=>{
    await sair();
  }

  return (
    <div>
        <h1>Dashboard</h1>
        <button onClick={handleSair}>Sair</button>
    </div>
  )
}

export default Dashboard;