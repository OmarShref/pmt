import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setrecords } from "../redux/recordsReducer";

export default function Records() {
  const [isDelFinished, setIsDelFinished] = useState(true);

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
  const { records } = useSelector((state: any) => state.records);

  const getRecords = () => {
    axios({
      method: "get",
      withCredentials: true,
      url: "https://pmtbackend.onrender.com/records/getall",
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
        money: type === "diaries" ? 0 : money,
        type: type,
        description: description,
      },
      withCredentials: true,
      url: "https://pmtbackend.onrender.com/records/putone",
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

  const deleteRecord = async (index: number) => {
    if (isDelFinished) {
      setIsDelFinished(false);

      await axios({
        method: "put",
        data: {
          index: index,
        },
        withCredentials: true,
        url: "https://pmtbackend.onrender.com/records/deleteone",
      })
        .then((res) => {
          if (res.status === 200) {
            getRecords();
            setIsDelFinished(true);
          } else {
            alert("Error hapened please try again.");
            setIsDelFinished(true);
          }
        })
        .catch((err) => {
          setIsDelFinished(true);
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <section className="flex flex-auto flex-col justify-between overflow-hidden bg-transparent">
      <div className="overflow-y-scroll bg-transparent">
        {records
          .map((record: any, index: number) => (
            <div
              className={` ${
                record.type === "income"
                  ? "border-l-green-400"
                  : record.type === "expenses"
                  ? "border-l-red-400"
                  : record.type === "diaries"
                  ? "border-l-sky-400"
                  : "border-l-black"
              } relative my-2 flex flex-col justify-between rounded-lg border border-l-8  bg-white/10 p-4 pr-7 text-slate-700 shadow-lg`}
            >
              <i
                onClick={() => {
                  try {
                    deleteRecord(index);
                  } catch (error) {
                    console.log(error);
                  }
                }}
                className="fa-solid fa-trash absolute top-2 right-2 cursor-pointer text-xs transition hover:text-red-500 active:scale-90"
              ></i>
              <div className="flex flex-row justify-between">
                <p>{record.money}</p>
                <p>{record.date}</p>
              </div>
              <p className="whitespace-pre-line">{record.description}</p>
            </div>
          ))
          .reverse()}
      </div>
      <div className="flex flex-col gap-2 border-t border-t-slate-200 bg-transparent py-4">
        <div className="flex flex-row justify-between gap-2">
          <select
            onChange={(e) => {
              setType(e.target.value);
            }}
            className={`${
              type === "expenses"
                ? "bg-red-400"
                : type === "income"
                ? "bg-green-400"
                : type === "diaries"
                ? "bg-sky-400"
                : "bg-black"
            } cursor-pointer appearance-none rounded-lg  p-1 text-center text-xs text-slate-800 shadow focus-visible:outline-none sm:text-base`}
          >
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
            className="min-w-0  rounded-lg border border-slate-300 bg-white/10 p-1 text-xs shadow focus-visible:outline-blue-500 sm:text-base"
          />
          <input
            id="input-date"
            type="date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
            className="w-[105px] rounded-lg border border-slate-300 bg-white/10 p-1 text-[8px] shadow focus-visible:outline-blue-500 sm:w-fit sm:text-base"
          />
        </div>
        <textarea
          placeholder="your description"
          onChange={(e) => {
            e.target.value.length === 0
              ? setDescription(" ")
              : setDescription(e.target.value);
          }}
          dir="auto"
          className="w-full rounded-lg border border-slate-300 bg-white/10 p-2 shadow focus-visible:outline-blue-500"
        ></textarea>
        <button
          onClick={addRecord}
          className="w-full rounded-lg bg-gradient-to-r from-red-300 to-blue-300 py-2 text-lg text-slate-800 shadow-md transition active:scale-95"
        >
          Add
        </button>
      </div>
    </section>
  );
}
