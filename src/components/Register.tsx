import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import coinIcon from "../assets/coin.png";
import { BASE_URL } from "../server/server";

export default function Register() {
  const navigate = useNavigate();
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const register = async () => {
    await axios({
      method: "post",
      data: {
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
      },
      withCredentials: true,
      url: BASE_URL + "/register",
    })
      .then((res) => {
        console.log("register : ", res.status);
        if (res.status === 201) {
          alert("You successfully created new account.");
          navigate("/login");
        } else if (res.status === 204) {
          alert("sorry, this username is already taken");
        } else {
          alert(res.data);
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <section className="grid h-screen place-items-center bg-gradient-to-tr from-orange-200 to-sky-200 px-4">
        <div className="flex w-full max-w-md  flex-col items-center justify-center rounded-xl bg-white px-4 py-8 shadow-lg">
          <img src={coinIcon} alt="coin icon" className="h-10 w-10" />
          <h2 className="mt-2 select-none text-base text-slate-500">
            REGISTER
          </h2>

          <label
            htmlFor="signup-username-input"
            className="mt-8 block self-start text-xs text-slate-400"
          >
            username
          </label>
          <input
            type="text"
            id="signup-username-input"
            placeholder="your username"
            onChange={(e) => setRegisterUsername(e.target.value)}
            className="border-slate-700ne block w-full rounded-md border-[1px] border-slate-300 px-2 py-1 text-slate-700 placeholder-slate-300 focus-visible:outline-none"
          />

          <label
            htmlFor="signup-email-input"
            className="mt-4 block self-start text-xs text-slate-400"
          >
            email
          </label>
          <input
            type="email"
            id="signup-email-input"
            placeholder="your email"
            onChange={(e) => setRegisterEmail(e.target.value)}
            className="border-slate-700ne block w-full rounded-md border-[1px] border-slate-300 px-2 py-1 text-slate-700 placeholder-slate-300 focus-visible:outline-none"
          />

          <label
            htmlFor="signup-password-input"
            className="mt-4 block self-start text-xs text-slate-400"
          >
            password
          </label>
          <input
            type="password"
            id="signup-password-input"
            placeholder="your password"
            onChange={(e) => setRegisterPassword(e.target.value)}
            className="border-slate-700ne block w-full rounded-md border-[1px] border-slate-300 px-2 py-1 text-slate-700 placeholder-slate-300 focus-visible:outline-none"
          />
          <button
            onClick={register}
            className="mt-8 w-full cursor-pointer rounded-md bg-slate-700 py-2 text-center text-white transition active:scale-95 active:bg-slate-600"
          >
            SIGN UP
          </button>

          <Link
            to="/login"
            className="mt-4 w-full rounded-md border-[1px] border-slate-700 py-2  text-center text-slate-700  transition active:scale-95"
          >
            BACK TO LOG IN
          </Link>
        </div>
      </section>
    </>
  );
}
