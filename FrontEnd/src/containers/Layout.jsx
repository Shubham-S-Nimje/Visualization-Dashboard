import React, { useEffect } from "react";
import LeftSidebar from "./LeftSidebar";
import PageContent from "./PageContent";
import { useDispatch } from "react-redux";
import jsonData from "../../jsondata.json";
import { setData, setError, setStatus } from "../store";

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDataFromBackend = async () => {
      dispatch(setStatus("loading..."));

      try {
        const response = await fetch("http://localhost:3000/fetch/fetch-all");
        if (!response.ok) {
          throw new Error("Unable to fetch data) Network Erorr)");
        }
        const data = await response.json();
        dispatch(setData(data));
        dispatch(setStatus("succeeded!.."));
      } catch (error) {
        dispatch(setData(jsonData));
        dispatch(setError(error.message));
      }
    };

    fetchDataFromBackend();
  }, [dispatch]);

  return (
    <div className="flex flex-row">
      <LeftSidebar />
      <PageContent />
    </div>
  );
};

export default Layout;
