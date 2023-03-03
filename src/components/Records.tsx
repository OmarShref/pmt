import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setrecords } from "../redux/recordsReducer";

export default function Records() {
  const dispatch = useDispatch();
  const { records } = useSelector((state) => state.records);

  const getRecords = () => {
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:7000/records/getall",
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(setrecords(res.data.records));
        } else {
          alert("sorry error happened please refesh the page");
        }
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <section className="flex-auto overflow-y-scroll">
      {records
        .map((record) => (
          <div
            className={` ${
              record.type === "income"
                ? "border-l-emerald-300"
                : record.type === "expenses"
                ? "border-l-red-300"
                : record.type === "diaries"
                ? "border-l-sky-300"
                : "border-l-black"
            } my-2 flex flex-col justify-between rounded-lg border border-l-8 border-slate-300 p-4 text-slate-700 shadow-lg`}
          >
            <div className="flex flex-row justify-between">
              <p>{record.money}</p>
              <p>{record.date}</p>
            </div>
            <p>{record.description}</p>
          </div>
        ))
        .reverse()}
      <div className="sticky bottom-0 flex flex-col gap-2 bg-white p-4">
        <div className="flex flex-row justify-between gap-2">
          <button className="rounded-lg bg-slate-500 p-1 text-xs">
            expenses
          </button>
          <input
            type="number"
            placeholder="money amount"
            className="min-w-0 rounded-lg border border-slate-300 p-1 text-xs focus-visible:outline-blue-500"
          />
          <input
            type="date"
            placeholder="date"
            className="rounded-lg border border-slate-300 p-1 text-xs focus-visible:outline-blue-500"
          />
        </div>
        <textarea
          className="w-full rounded-lg border border-slate-300 p-2 focus-visible:outline-blue-500"
          placeholder="your description"
        ></textarea>
        <button className="w-full rounded-lg bg-gradient-to-r from-red-200 to-sky-200 py-2">
          Add
        </button>
      </div>
    </section>
  );
}
