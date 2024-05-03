import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Privado from "./Privado";

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<SignIn/>}/>
      <Route path="/registrar" element={<SignUp/>}/>
      <Route path="/dashboard" element={<Privado> <Dashboard/> </Privado>}/>
    </Routes>
  );
}

export default RoutesApp;
