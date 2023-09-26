import React, { Fragment } from "react";
import Header from "./Header";
import Charts from "./Charts";

const PageContent = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="grid m-4 card place-items-center">
        <Header />
      </div>
      <div className="grid mx-4 card place-items-center">
        <Charts />
      </div>
    </div>
  );
};

export default PageContent;
