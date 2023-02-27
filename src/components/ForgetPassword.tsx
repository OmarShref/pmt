import { Link } from "react-router-dom";
import coinIcon from "../assets/coin.png";

export default function ForgetPassword() {
  return (
    <>
      <section className="grid h-screen place-items-center bg-gradient-to-tr from-indigo-200 to-pink-200 px-4">
        <div className="flex w-full max-w-md  flex-col items-center justify-center rounded-xl bg-white px-4 py-8 shadow-lg">
          <img src={coinIcon} alt="coin icon" className="h-10 w-10" />
          <h2 className="mt-2 select-none text-base text-slate-500">
            FORGET PASSWORD
          </h2>
          <form
            action=""
            method="post"
            className="flex w-full flex-col justify-center"
          >
            <label
              htmlFor="login-email-input"
              className="mt-8 block text-xs text-slate-400"
            >
              email
            </label>
            <input
              type="email"
              id="login-email-input"
              placeholder="your email"
              className="border-slate-700ne block w-full rounded-md border-[1px] border-slate-300 px-2 py-1 text-slate-700 placeholder-slate-300 focus-visible:outline-none"
            />
            <input
              type="submit"
              className="mt-8 w-full cursor-pointer rounded-md bg-slate-700 py-2 text-center text-white"
              value={"SEND NEW PASSWORD"}
            />
          </form>
          <Link
            to="/login"
            className="mt-4 w-full rounded-md border-[1px] border-slate-700 py-2  text-center text-slate-700  transition active:scale-95"
          >
            BACK TO LOGIN
          </Link>
        </div>
      </section>
    </>
  );
}
