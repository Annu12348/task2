import React from "react";

const Task = () => {
  return (
    <div className="bg-zinc-100 w-full min-h-full p-4">
      <div className="bg-white rounded p-3">
        <h1 className="text-xl capitalize font-semibold tracking-tight leading-none">
          filter options
        </h1>
        <div className="mt-6">
          <div className="flex flex-col gap-1 w-[22%]  ">
            <label className="text-md capitalize tracking-tight leading-none">
              data type
            </label>
            <select className="border p-1.5 outline-none  border-zinc-300 text-zinc-300 tracking-tight leading-none rounded">
              <option>custom data</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
