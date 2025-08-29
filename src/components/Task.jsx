import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";

const Task = () => {
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [company, setCompany] = useState("konsole");
  const [custom, setCustom] = useState("custom data");
  const [apiData, setApiData] = useState([]);
  const [delivery, setDelivery] = useState(0);
  const [otherTotal, setOtherTotal] = useState(0);
  const [fail, setFail] = useState(0);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  console.log(apiData);

  const url = `https://smsc.datagenit.com/apismpp/v1/report.php?user_id=1&method=summarynew&date_from=${fromDate}&date_to=${toDate}&search_user_id=${company}&token=b8860908f2cf45f721a40d23f2e291f9&user_type=Admin`;

  const exampletestApi = async () => {
    try {
      const response = await axios.get(url);
      const ApiData = response.data.data;

      let other = 0;
      let delivered = 0;
      let failed = 0;

      Object.values(ApiData).forEach((date) => {
        Object.values(date).forEach((senders) => {
          const sendersId = Object.entries(senders);
          setApiData(sendersId);
          Object.values(senders).forEach((sender) => {
            delivered += parseInt(sender.delivered || 0);
            other += parseInt(sender.other || 0);
            failed += parseInt(sender.failed || 0);
          });
        });
      });

      const totals = other + delivered + failed;

      setTotal(totals);

      setDelivery(delivered);
      setOtherTotal(other);
      setFail(failed);
    } catch (error) {
      console.log(error);
    }
  };

  const clickedHandler = () => {
    exampletestApi();
    //setToDate("");
    //setFromDate("");
  };

  const onClickHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-zinc-100 w-full min-h-full p-4">
      <div className="bg-white rounded p-3 shadow">
        <h1 className="text-xl capitalize font-semibold tracking-tight leading-none">
          filter options
        </h1>
        <div className="mt-6 md:flex items-center justify-between">
          <div className="flex flex-col gap-1 md:w-[22%] w-full  ">
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
          <div className="flex flex-col gap-1 md:w-[22%]  w-full md:mt-0 mt-8  ">
            <label className="text-md capitalize tracking-tight leading-none">
              from data
            </label>
            <input
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border p-1.5 mt-1 outline-none w-full border-zinc-300 text-zinc-300 tracking-tight leading-none rounded"
              type="date"
              placeholder="from date"
            />
          </div>
          <div className="flex flex-col gap-1 md:w-[22%] w-full md:mt-0 mt-8  ">
            <label className="text-md capitalize tracking-tight leading-none">
              to date
            </label>
            <input
              className="border p-1.5 mt-1 outline-none w-full  border-zinc-300 text-zinc-300 tracking-tight leading-none rounded"
              type="date"
              placeholder="to date"
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
          <span className="mt-5 text-zinc-400 ">{total}</span>
        </div>
        <div className="w-[31%] p-4 capitalize font-semibold tracking-tight leading-none bg-white shadow rounded flex items-center justify-center flex-col ">
          <h1 className="">Delivered</h1>
          <span className="mt-5 text-green-500 ">{delivery}</span>
        </div>
        <div className="w-[31%] p-4 capitalize font-semibold tracking-tight leading-none bg-white shadow rounded flex items-center justify-center flex-col ">
          <h1 className="">Failed</h1>
          <span className="mt-5 text-red-400 ">{fail}</span>
        </div>
      </div>

      <div className="p-3 w-full bg-white mt-8 rounded shadow">
        <h1 className="text-md font-semibold tracking-tight leading-none">
          Account Wise Summary
        </h1>
        <div className="w-full bg-zinc-300 mt-4 flex items-center justify-center  border-1 border-zinc-600 rounded-t ">
          <div className="w-[20%] flex items-center p-2 justify-center border-r-1 ">
            <h1 className="md:text-xl text-[13px] text-center   font-semibold capitalize">Company Name</h1>
          </div>
          <div className="w-[20%] flex items-center p-2 justify-center border-r-1 ">
            <h1 className="md:text-xl text-[13px] text-center font-semibold capitalize">Total Sent</h1>
          </div>
          <div className="w-[20%] flex items-center p-2 justify-center border-r-1 ">
            <h1 className="md:text-xl text-[12.5px] text-center font-semibold capitalize">
              Total Delivered
            </h1>
          </div>
          <div className="w-[20%] flex items-center p-2 justify-center border-r-1 ">
            <h1 className="md:text-xl text-[13px] text-center font-semibold capitalize">Total Failed</h1>
          </div>
          <div className="w-[20%] flex items-center p-2 justify-center  ">
            <h1 className="md:text-xl text-[13px] text-center font-semibold capitalize">Sender ID Wise</h1>
          </div>
        </div>
        <div className="w-full bg-zinc-300  flex items-center justify-center  border-l-1 border-r-1 border-b-1 border-zinc-600 rounded-b ">
          <div className="w-[20%] flex items-center p-2 justify-center border-r-1 ">
            <h1 className="md:text-md text-[15.5px] text-zinc-500 capitalize">{company}</h1>
          </div>
          <div className="w-[20%] flex items-center p-2 justify-center border-r-1 ">
            <h1 className="text-md capitalize text-blue-400">{total}</h1>
          </div>
          <div className="w-[20%] flex items-center p-2 justify-center border-r-1 ">
            <h1 className="text-md text-green-600 capitalize">{delivery}</h1>
          </div>
          <div className="w-[20%] flex items-center p-2 justify-center border-r-1 ">
            <h1 className="text-md capitalize text-red-600">{fail}</h1>
          </div>
          <div className="w-[20%] flex items-center p-2 justify-center   ">
            <button
              onClick={onClickHandler}
              className="md:bg-black bg-blue-500 text-white md:px-4 px-2  capitalize rounded hover:bg-blue-500"
              disabled={apiData.length === 0}
            >
              {apiData.length > 0 ? "view" : "view"}
            </button>
          </div>
        </div>
        {isOpen ? (
          <div className="rounded p-1 mt-7">
            <h1 className="font-semibold capitalize text-md tracking-tight leading-none">
              Sender ID Wise Details
            </h1>
            <div className="w-full border-1 mt-2 border-zinc-700 bg-zinc-300 rounded">
              <div className="w-full flex items-center justify-center    ">
                <div className="p-3 w-[25%]  border-zinc-700 flex items-center justify-center ">
                  <h1 className="md:text-md text-[12px] font-bold capitalize tracking-tight leading-none">
                    Sender ID
                  </h1>
                </div>
                <div className="p-3 w-[25%] border-l-1 border-r-1 border-zinc-700 flex items-center justify-center ">
                  <h1 className="text-md font-semibold capitalize tracking-tight leading-none">
                    Delivered
                  </h1>
                </div>
                <div className="p-3 w-[25%] border-r-1 border-zinc-700 flex items-center justify-center ">
                  <h1 className="text-md font-semibold capitalize tracking-tight leading-none">
                    Failed
                  </h1>
                </div>
                <div className="p-3 w-[25%] flex items-center justify-center ">
                  <h1 className="text-md font-semibold capitalize tracking-tight leading-none">
                    other
                  </h1>
                </div>
              </div>
              {apiData.map(([id, details], i) => (
                <div
                  key={i}
                  className="w-full flex items-center justify-center border-t-1"
                >
                  <div className="p-3 w-[25%] border-r-1 border-zinc-700 flex items-center justify-center ">
                    <h1 className="text-md text-zinc-500 capitalize tracking-tight leading-none">
                      {id}
                    </h1>
                  </div>
                  <div className="p-3 w-[25%] border-r-1 border-zinc-700 flex items-center justify-center ">
                    <h1 className="text-md text-green-600 font-semibold capitalize tracking-tight leading-none">
                      {details.delivered || 0}
                    </h1>
                  </div>
                  <div className="p-3 w-[25%] border-r-1 border-zinc-700 flex items-center justify-center ">
                    <h1 className="text-md text-red-500 font-semibold capitalize tracking-tight leading-none">
                      {details.failed || 0}
                    </h1>
                  </div>
                  <div className="p-3 w-[25%] flex items-center justify-center ">
                    <h1 className="text-md font-semibold text-blue-500 capitalize tracking-tight leading-none">
                      {details.other || 0}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Task;
