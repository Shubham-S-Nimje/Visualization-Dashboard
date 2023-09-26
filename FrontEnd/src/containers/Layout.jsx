import React from "react";
import LeftSidebar from "./LeftSidebar";
import PageContent from "./PageContent";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="flex flex-row">
      <LeftSidebar />
      <PageContent />
    </div>
  );
};

export default Layout;
