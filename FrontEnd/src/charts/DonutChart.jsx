import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
// import data from "../../jsondata.json";
import { useSelector } from "react-redux";

const DonutChart = () => {
  const [pieData, setPieData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const data = useSelector((state) => state.data.data);

  const margin = { top: 20, right: 10, bottom: 60, left: 100 };
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svgRef = useRef();
  const pieGroupRef = useRef();

  useEffect(() => {
    const formattedData = data
      .filter((entry) => {
        const endYear = entry.end_year.toString();
        return endYear.startsWith(selectedYear) && entry.topic;
      })
      .filter((entry) => entry.end_year !== "");

    const groupedData = d3.rollup(
      formattedData,
      (v) => v.length,
      (entry) => entry.topic
    );

    setPieData([...groupedData.entries()]);
  }, [selectedYear, data]);

  useEffect(() => {
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const pieGroup = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`)
      .attr("ref", pieGroupRef);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie().value((d) => d[1]);

    const pieChartData = pie(pieData);

    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(Math.min(width, height) / 2);

    pieGroup
      .selectAll("path")
      .data(pieChartData)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => colorScale(d.data[0]));

    const legend = svg
      .selectAll(".legend-item")
      .data(pieData.map((d) => d[0]))
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(0, ${i * 20})`)
      .attr("key", (d) => d);

    legend
      .append("rect")
      .attr("width", 10)
      .attr("height", 10)
      .attr("x", width - margin.right + 20)
      .attr("y", (d, i) => margin.top - 50 + i * 20)
      .attr("fill", (d) => colorScale(d));

    legend
      .append("text")
      .attr("x", width - margin.right + 40)
      .attr("y", (d, i) => margin.top - 40 + i * 20)
      .text((d) => `${d}`);
  }, [pieData]);

  const uniqueYears = [
    ...new Set(data.map((entry) => entry.end_year.toString())),
  ].filter(Boolean);

  return (
    <div className="w-fit">
      <div className="flex justify-between text-center items-center">
        <div className="items-center m-2">
          <h3 className="font-bold text-2xl">Topic</h3>
        </div>
        <div className="m-2 shadow-lg flex-col bg-primary text-white py-1 px-2 rounded-md">
          <span className="font-bold">Year :</span>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="m-1 text-center rounded-md text-primary"
          >
            <option value="">All</option>
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default DonutChart;
