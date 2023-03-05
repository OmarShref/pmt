import "./Home.css";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/userReducer";
import axios from "axios";
import Nav from "./Nav";
import coinIcon from "../assets/coin.png";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);

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
          dispatch(setUser(res.data));
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
      <section id="home" className="p-4">
        <div className="mx-auto flex h-full max-w-2xl flex-col justify-between rounded-xl bg-white/20 p-4 shadow-xl backdrop-blur">
          <div className="flex items-center justify-between pb-2">
            <button
              onClick={logout}
              className="block h-10 w-10 rounded-full transition hover:bg-red-600 active:scale-95"
            >
              <i className="fa-solid fa-power-off text-slate-50"></i>
            </button>
            <img src={coinIcon} alt="coin icon" className="h-9 w-9" />
            <p className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-tr from-red-200 to-emerald-200 text-lg uppercase text-slate-700">
              {user.username[0]}
            </p>
          </div>
          <Outlet></Outlet>
          <Nav />
        </div>
      </section>
    </>
  );
}
