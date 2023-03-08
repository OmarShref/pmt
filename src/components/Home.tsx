import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/userReducer";
import axios from "axios";
import Nav from "./Nav";
import coinIcon from "../assets/coin.png";
import { BASE_URL } from "../server/server.js";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);

  const getUser = async function () {
    await axios({
      method: "get",
      withCredentials: true,
      url: BASE_URL + "/user",
    })
      .then((res) => {
        console.log("get user from home : ", res.status);
        if (res.status === 200) {
          navigate("/home/records");
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
      url: BASE_URL + "/logout",
    })
      .then((res) => console.log("logout : ", res.status))
      .catch((err) => console.log(err.message));
    getUser();
  };

  const setInfoVesibility = () => {
    try {
      // document.getElementById("user-info")?.style.visibility === "hidden"
      //   ? (document.getElementById("user-info").style.visibility = "hidden")
      //   : (document.getElementById("user-info").style.visibility = "hidden");
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <section
        id="home"
        className="h-screen bg-gradient-to-tr from-red-200 to-emerald-200 p-4"
      >
        <div className="mx-auto flex h-full max-w-2xl flex-col justify-between rounded-xl bg-white/10 p-4 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between pb-2">
            <button
              onClick={logout}
              className="block h-10 w-10 rounded-full transition hover:bg-red-600 active:scale-95"
            >
              <i className="fa-solid fa-power-off text-slate-50"></i>
            </button>
            <img src={coinIcon} alt="coin icon" className="h-9 w-9" />
            <div
              onClick={() => {
                setInfoVesibility();
              }}
              className="relative z-10 grid h-10 w-10 cursor-pointer select-none place-items-center rounded-full bg-gradient-to-tr from-red-200 to-emerald-200 text-lg uppercase text-slate-700"
            >
              <div
                id="user-info"
                className="invisible absolute top-full  right-full select-text rounded-md bg-slate-50 p-2 text-sm normal-case"
              >
                <p>{user.username}</p>
                <p>{user.email}</p>
              </div>
              {user.username[0]}
            </div>
          </div>
          <Outlet></Outlet>
          <Nav />
        </div>
      </section>
    </>
  );
}
