import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsLogedin } from "../redux/userReducer";
import axios from "axios";
import coinIcon from "../assets/coin.png";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogedin } = useSelector((state) => state.user);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const getUser = async function () {
    await axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:7000/user",
    })
      .then((res) => {
        console.log("get user : ", res.status);
        dispatch(setIsLogedin(res.status));
      })
      .catch((err) => console.log(err.message));
  };

  const login = async () => {
    await axios({
      method: "post",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:7000/login",
    })
      .then((res) => console.log("login : ", res.status))
      .catch((err) => console.log(err.message));
    getUser();
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (isLogedin) {
      navigate("/records");
    } else {
      navigate("/login");
    }
  }, [isLogedin]);
  return (
    <>
      <section className="grid h-screen place-items-center bg-gradient-to-tr from-red-200 to-blue-300 px-4">
        <div className="flex w-full max-w-md  flex-col items-center justify-center rounded-xl bg-white px-4 py-8 shadow-lg">
          <img src={coinIcon} alt="coin icon" className="h-10 w-10" />
          <h2 className="mt-2 select-none text-base text-slate-500">LOG IN</h2>

          <label
            htmlFor="login-username-input"
            className="mt-8 block self-start text-xs text-slate-400"
          >
            username
          </label>
          <input
            type="text"
            id="login-username-input"
            placeholder="your username"
            onChange={(e) => setLoginUsername(e.target.value)}
            className="border-slate-700ne block w-full rounded-md border-[1px] border-slate-300 px-2 py-1 text-slate-700 placeholder-slate-300 focus-visible:outline-none"
          />
          <label
            htmlFor="login-password-input"
            className="mt-4 block self-start text-xs text-slate-400"
          >
            password
          </label>
          <input
            type="password"
            id="login-password-input"
            placeholder="your password"
            onChange={(e) => setLoginPassword(e.target.value)}
            className="border-slate-700ne block w-full rounded-md border-[1px] border-slate-300 px-2 py-1 text-slate-700 placeholder-slate-300 focus-visible:outline-none"
          />
          <button
            onClick={login}
            className="mt-8 w-full cursor-pointer rounded-md bg-slate-700 py-2 text-center text-white transition active:scale-95 active:bg-slate-600"
          >
            LOG IN
          </button>
          <Link
            to="/register"
            className="mt-4 w-full rounded-md border-[1px] border-slate-700 py-2 text-center text-slate-700  transition active:scale-95"
          >
            SIGN UP
          </Link>
          <Link
            to="/forgetpassword"
            className="mt-4 w-full py-2 text-center text-slate-500 transition active:scale-95"
          >
            FORGET PASSWORD
          </Link>
        </div>
      </section>
    </>
  );
}
