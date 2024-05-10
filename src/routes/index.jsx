import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Perfil from "../pages/Perfil";
import Clientes from "../pages/Clientes";
import Privado from "./Privado";

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<SignIn/>}/>
      <Route path="/registrar" element={<SignUp/>}/>
      <Route path="/dashboard" element={<Privado> <Dashboard/> </Privado>}/>
      <Route path="/perfil" element={<Privado> <Perfil/> </Privado>}/>
      <Route path="/clientes" element={<Privado> <Clientes/> </Privado>}/>
    </Routes>
  );
}

export default RoutesApp;
