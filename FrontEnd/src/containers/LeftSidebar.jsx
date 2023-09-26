import React from "react";
import routes from "../routes/sidebar";
import { LuCircleDot } from "react-icons/lu";

const LeftSidebar = () => {
  return (
    <div className="w-1/5 max-md:hidden h-screen place-items-center border-r border-solid border-gray-300">
      <div className="flex items-center justify-between m-4">
        <a href={"/"} className="flex w-full gap-2 justify-center">
          <img
            className="mask mask-squircle w-6"
            src="/vite.svg"
            alt="vite+react"
          />
          <p className="font-bold text-xl">Vite+React</p>
        </a>
        <LuCircleDot className="text-lg text-gray-600" />
      </div>

      <ul className="menu rounded-lg text-gray-500">
        {routes.map((data, k) => {
          return data.submenu ? (
            <li key={k}>
              <details close>
                <summary className="text-2xl font-semibold">
                  {data.icon}
                  <p className="text-base">{data.name}</p>
                  <div className="badge badge-primary badge-md py-3 px-2">
                    3
                  </div>
                </summary>
                <ul>
                  {data.submenu.map((data, k) => {
                    return (
                      <li>
                        <a className="text-[10px]">
                          {data.icon}
                          <p className="text-base">{data.name}</p>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </details>
            </li>
          ) : (
            <li>
              <a className="text-2xl font-semibold">
                {data.icon}
                <p className="text-base font-semibold mx-2">{data.name}</p>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LeftSidebar;
