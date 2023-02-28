import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgetPassword from "./components/ForgetPassword";
import Home from "./components/Home";
import Records from "./components/Records";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Login />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="forgetpassword" element={<ForgetPassword />}></Route>
        <Route path="home" element={<Home />}>
          <Route index element={<Records />}></Route>
          <Route path="records" element={<Records />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
