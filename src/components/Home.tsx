import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";

export default function Home() {
  const navigate = useNavigate();

  const getUser = async function () {
    await axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:7000/user",
    })
      .then((res) => {
        console.log("get user from home : ", res.status);
        if (res.status === 200) {
          navigate("/home");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err.message));
  };

  const logout = async () => {
    await axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:7000/logout",
    })
      .then((res) => console.log("logout : ", res.status))
      .catch((err) => console.log(err.message));
    getUser();
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <section className="h-screen bg-gradient-to-b from-red-400 to-emerald-400 p-4">
        <div className="h-full rounded-xl bg-white p-4 shadow-xl">
          <button onClick={logout} className="block rounded-md bg-red-400 p-2">
            LOG OUT
          </button>
          <Nav />
          <Outlet></Outlet>
        </div>
      </section>
    </>
  );
}
