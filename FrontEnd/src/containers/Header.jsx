import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { TbLanguage } from "react-icons/tb";
import { IoSunnyOutline } from "react-icons/io5";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { TbBell } from "react-icons/tb";

const Header = () => {
  return (
    <div className="navbar shadow-lg h-fit justify-between border border-solid text-gray-500 border-gray-300 px-4 py-0 rounded-md">
      <div className="menu menu-horizontal p-0">
        <IoSearchOutline className="text-2xl" />
        <input
          type="text"
          placeholder="Search"
          className="input w-24 md:w-auto"
        />
      </div>
      <ul className="menu menu-horizontal p-0">
        <li>
          <a className="text-2xl">
            <TbLanguage />
          </a>
        </li>
        <li>
          <a className="text-2xl">
            <IoSunnyOutline />
          </a>
        </li>
        <li>
          <a className="text-2xl">
            <AiOutlineAppstoreAdd />
          </a>
        </li>
        <li>
          <a className="text-2xl">
            <TbBell />
          </a>
        </li>
        <div className="avatar online">
          <div className="rounded-full">
            <img src="/vite.svg" />
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Header;
