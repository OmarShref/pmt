import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <section>
        <ul className="flex justify-evenly gap-2">
          <li className="flex-auto">
            <NavLink
              to="/home/records"
              className={({ isActive }) =>
                isActive
                  ? "inline-block w-full border-b-2 border-b-emerald-600 py-2 text-center text-xl text-emerald-600"
                  : "inline-block w-full py-2 text-center text-xl text-slate-600"
              }
            >
              Records
            </NavLink>
          </li>
          <li className="flex-auto">
            <NavLink
              to="/home/checklists"
              className={({ isActive }) =>
                isActive
                  ? "inline-block w-full border-b-2 border-b-red-600 py-2 text-center text-xl text-red-600"
                  : "inline-block w-full py-2 text-center text-xl text-slate-600"
              }
            >
              Check Lists
            </NavLink>
          </li>
        </ul>
      </section>
    </>
  );
}
