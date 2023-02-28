import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <section>
        <ul className="flex justify-evenly gap-2 border-b-2 border-b-emerald-200">
          <li className="flex-auto">
            <NavLink
              to="/home/records"
              className={({ isActive }) =>
                isActive
                  ? "inline-block w-full bg-emerald-200 py-2 text-center"
                  : "inline-block w-full py-2 text-center"
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
                  ? "inline-block w-full bg-emerald-200 py-2 text-center"
                  : "inline-block w-full py-2 text-center"
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
