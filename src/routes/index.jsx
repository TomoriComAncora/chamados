import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<SignIn/>}/>
      <Route path="/registrar" element={<SignUp/>}/>
    </Routes>
  );
}

export default RoutesApp;
