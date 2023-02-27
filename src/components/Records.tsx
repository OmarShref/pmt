import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsLogedin } from "../redux/userReducer";
import axios from "axios";

export default function Records() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogedin } = useSelector((state) => state.user);

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

  useEffect(() => {
    if (isLogedin) {
      navigate("/records");
    } else {
      navigate("/login");
    }
  }, [isLogedin]);

  return (
    <>
      <section className="h-screen bg-gradient-to-b from-red-400 to-emerald-400 p-4">
        <div className="h-full rounded-xl bg-white p-4 shadow-xl">
          <button onClick={logout} className="rounded-md bg-red-400 p-2">
            LOG OUT
          </button>
        </div>
      </section>
    </>
  );
}
