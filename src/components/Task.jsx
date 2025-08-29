import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import axios from "axios"

const Task = () => {
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [company, setCompany] = useState("konsole");
  const [custom, setCustom] = useState("custom data");
  const [apiData, setApiData] = useState()
  const [delivery, setDelivery ] = useState(0)
  const [otherTotal, setOtherTotal ] = useState(0)
  const [fail, setFail ] = useState(0)

  const url = `https://smsc.datagenit.com/apismpp/v1/report.php?user_id=1&method=summarynew&date_from=${fromDate}&date_to=${toDate}&search_user_id=${company}&token=b8860908f2cf45f721a40d23f2e291f9&user_type=Admin`;

  const exampletestApi = async () => {
    try{
      const response = await axios.get(url)
      const ApiData = response.data.data 
      setApiData(ApiData)

      let other = 0;
      let delivered = 0;
      let failed = 0;
      
      Object.values(ApiData).forEach(date => {
        Object.values(date).forEach(senders => {
          Object.values(senders).forEach(sender => {
            delivered += parseInt(sender.delivered || 0)
            other += parseInt(sender.other || 0)
            failed += parseInt(sender.failed || 0)
          })
        })
      })

      setDelivery(delivered);
      setOtherTotal(other);
      setFail(failed)

    } catch (error) {
      console.log(error)
    }
  }

  const clickedHandler = () => {
    exampletestApi();
    //setToDate("");
    //setFromDate("");
    
  };

  
  return (
    <div className="bg-zinc-100 w-full min-h-full p-4">
      <div className="bg-white rounded p-3 shadow">
        <h1 className="text-xl capitalize font-semibold tracking-tight leading-none">
          filter options
        </h1>
        <div className="mt-6 md:flex items-center justify-between">
          <div className="flex flex-col gap-1 md:w-[22%]  ">
            <label className="text-md capitalize tracking-tight leading-none">
              data type
            </label>
            <select
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              className="border p-1.5 mt-1 outline-none  border-zinc-300 text-zinc-300 tracking-tight leading-none rounded"
            >
              <option value="custom data">custom data</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 md:w-[22%] md:mt-0 mt-8  ">
            <label className="text-md capitalize tracking-tight leading-none">
              from data
            </label>
            <input
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border p-1.5 mt-1 outline-none  border-zinc-300 text-zinc-300 tracking-tight leading-none rounded"
              type="date"
            />
          </div>
          <div className="flex flex-col gap-1 md:w-[22%] md:mt-0 mt-8  ">
            <label className="text-md capitalize tracking-tight leading-none">
              to date
            </label>
            <input
              className="border p-1.5 mt-1 outline-none  border-zinc-300 text-zinc-300 tracking-tight leading-none rounded"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 md:w-[22%] md:mt-0 mt-8  ">
            <label className="text-md capitalize tracking-tight leading-none">
              select company
            </label>
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="border p-1.5 mt-1 outline-none  border-zinc-300 text-zinc-300 tracking-tight leading-none rounded"
            >
              <option value="konsole">konsole</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-end md:mt-4 mt-6">
          <button
            onClick={clickedHandler}
            className="bg-black  hover:bg-blue-500 text-white flex font-semibold items-center justify-center px-6 py-2 rounded text-xl gap-3 "
          >
            <span className="mt-1.5 text-2xl">
              <IoIosSearch />
            </span>
            search
          </button>
        </div>
      </div>

      <div className="w-full p-1 mt-8 flex items-center justify-between ">
        <div className="w-[31%] p-4 capitalize font-semibold tracking-tight leading-none bg-white shadow rounded flex items-center justify-center flex-col ">
          <h1 className="">totol</h1>
          <span className="mt-5 text-zinc-400 ">{otherTotal}</span>
        </div>
        <div className="w-[31%] p-4 capitalize font-semibold tracking-tight leading-none bg-white shadow rounded flex items-center justify-center flex-col ">
          <h1 className="">Delivered</h1>
          <span className="mt-5 text-zinc-400 ">{delivery}</span>
        </div>
        <div className="w-[31%] p-4 capitalize font-semibold tracking-tight leading-none bg-white shadow rounded flex items-center justify-center flex-col ">
          <h1 className="">Failed</h1>
          <span className="mt-5 text-red-400 ">{fail}</span>
        </div>
      </div>
    </div>
  );
};

export default Task;
