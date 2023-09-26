import React, { Fragment, useState } from "react";
import BarChart from "../charts/BarChart";
import * as d3 from "d3";
import AreaChart from "../charts/AreaChart";
import DonutChart from "../charts/DonutChart";
import Histogram from "../charts/Histogram";
import LineChart from "../charts/LineChart";
import ScatterPlot from "../charts/ScatterPlot";

const Charts = () => {
  return (
    <Fragment>
      <div className="flex flex-col w-full gap-4">
        <div className="grid h-fit border rounded-md border-solid border-gray-300 place-items-center">
          <ScatterPlot />
        </div>
        <div className="grid h-fit border rounded-md border-solid border-gray-300 place-items-center">
          <BarChart />
        </div>
        <div className="grid h-fit place-items-center">
          <div className="flex flex-col w-full gap-4 lg:flex-row">
            <div className="grid flex-grow border rounded-md border-solid border-gray-300 place-items-center">
              <AreaChart />
            </div>
            <div className="grid flex-grow border rounded-md border-solid border-gray-300 place-items-center">
              <DonutChart />
            </div>
          </div>
        </div>
        <div className="grid h-fit border rounded-md border-solid border-gray-300 place-items-center">
          <Histogram />
        </div>
        <div className="grid h-fit place-items-center">
          <div className="flex flex-col w-full gap-4 lg:flex-row">
            <div className="grid flex-grow border rounded-md border-solid border-gray-300 place-items-center">
              <LineChart />
            </div>

            <div className="grid flex-grow h-32  border rounded-md border-solid border-gray-300 place-items-center">
              content
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Charts;
