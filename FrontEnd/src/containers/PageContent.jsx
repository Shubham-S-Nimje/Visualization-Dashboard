import React, { Fragment } from "react";
import Header from "./Header";
import Charts from "./Charts";
import { useSelector } from "react-redux";

const PageContent = () => {
  // const data = useSelector((state) => state.data.data);
  // console.log(data);

  return (
    <div className="flex flex-col">
      <div className="grid m-4 max-md:mx-auto card place-items-center">
        <Header />
      </div>
      <div className="grid mx-4 card place-items-center">
        <Charts />
      </div>
    </div>
  );
};

export default PageContent;
