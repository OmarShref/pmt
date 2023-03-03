import "./Records.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setrecords } from "../redux/recordsReducer";

export default function Records() {
  const dispatch = useDispatch();
  const today = new Date();
  const [date, setDate] = useState(
    `${today.getFullYear()}-${
      today.getMonth() < 10 ? 0 : ""
    }${today.getMonth()}-${today.getDay() < 10 ? 0 : ""}${today.getDay()}`
  );
  const [money, setMoney] = useState(0);
  const [type, setType] = useState("expenses");
  const [description, setDescription] = useState(" ");
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

  const addRecord = () => {
    axios({
      method: "put",
      data: {
        date: date,
        money: money,
        type: type,
        description: description,
      },
      withCredentials: true,
      url: "http://localhost:7000/records/putone",
    })
      .then((res) => {
        if (res.status === 201) {
          getRecords();
        } else if (res.status === 200) {
          alert(res.data);
        } else {
          alert("make sure you entered valid information.");
        }
      })
      .catch((err) => console.log(err.message));
  };

  const deleteRecord = async () => {
    console.log("222222222222222222");
    await axios({
      method: "put",
      data: {
        index: 0,
      },
      withCredentials: true,
      url: "http://localhost:7000/records/deleteone",
    })
      .then((res) => {
        if (res.status === 200) {
          getRecords();
        } else {
          alert("Error hapened please try again.");
        }
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <section className="records-list flex-auto overflow-y-scroll">
      {records
        .map((record, index) => (
          <div
            className={` ${
              record.type === "income"
                ? "border-l-emerald-300"
                : record.type === "expenses"
                ? "border-l-red-300"
                : record.type === "diaries"
                ? "border-l-sky-300"
                : "border-l-black"
            } relative my-2 flex flex-col justify-between rounded-lg border border-l-8 border-slate-300 p-4 pr-7 text-slate-700 shadow-lg`}
          >
            <i
              onClick={deleteRecord}
              className="fa-solid fa-trash absolute top-2 right-2 cursor-pointer text-xs hover:text-red-500"
            ></i>
            <div className="flex flex-row justify-between">
              <p>{record.money}</p>
              <p>{record.date}</p>
            </div>
            <p>{record.description}</p>
          </div>
        ))
        .reverse()}

      <div className="sticky bottom-0 flex flex-col gap-2 bg-white py-4">
        <div className="flex flex-row justify-between gap-2">
          <select className=" appearance-none rounded-lg bg-red-300 p-1 text-center text-xs focus-visible:outline-none">
            <option value="expenses">expenses</option>
            <option value="income">income</option>
            <option value="diaries">diaries</option>
          </select>
          <input
            type="number"
            placeholder="money amount"
            onChange={(e) => {
              setMoney(+e.target.value);
            }}
            className="min-w-0  rounded-lg border border-slate-300 p-1 text-xs focus-visible:outline-blue-500"
          />
          <input
            id="input-date"
            type="date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
            placeholder="date"
            className="w-[105px] rounded-lg border border-slate-300 p-1 text-[8px] focus-visible:outline-blue-500"
          />
        </div>
        <textarea
          placeholder="your description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="w-full rounded-lg border border-slate-300 p-2 focus-visible:outline-blue-500"
        ></textarea>
        <button
          onClick={addRecord}
          className="w-full rounded-lg bg-gradient-to-r from-red-200 to-sky-200 py-2"
        >
          Add
        </button>
      </div>
    </section>
  );
}
