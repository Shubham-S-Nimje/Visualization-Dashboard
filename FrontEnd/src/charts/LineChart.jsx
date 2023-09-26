import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import data from "../../jsondata.json";

const LineChart = (props) => {
  const [energyData, setEnergyData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2016); // Default selected year
  const svgRef = useRef();

  useEffect(() => {
    // Filter data for the "Energy" sector
    const filteredData = data.filter((entry) => entry.sector === "Energy");

    // Extract year and intensity data for the "Energy" sector
    const energyChartData = filteredData.map((entry) => ({
      year: new Date(entry.published).getFullYear(),
      month: new Date(entry.published).getMonth(),
      intensity: entry.intensity,
    }));

    setEnergyData(energyChartData);
  }, []);

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 20, left: 40 };
    const width = 1024 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Filter the data based on the selected year
    const filteredData = energyData.filter((d, i) => d.year === 2016);
    // console.log(filteredData);
    // Create SVG container

    const x = d3.scaleLinear().domain([0, 11]).range([0, width]);

    const y = d3.scaleLinear().domain([0, 100]).range([height, 0]);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const line = d3
      .line()
      .x((d) => x(d.month))
      .y((d) => y(d.intensity))
      .curve(d3.curveBasis);

    svg
      .append("path")
      .datum(filteredData)
      .attr("class", "line")
      .attr("d", (value) => line(value))
      .attr("fill", "none")
      .attr("stroke", "steelblue");

    const xAxis = d3
      .axisBottom(x)
      .tickValues(d3.range(12))
      .tickFormat((month) => {
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        return monthNames[month];
      });

    const yAxis = d3.axisLeft(y).ticks(5);

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

    svg.append("g").attr("class", "y-axis").call(yAxis);
  }, [selectedYear, energyData]);

  // Handle year dropdown change
  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  return (
    <div className="m-10 w-full">
      <label htmlFor="yearSelect">Select Year:</label>
      <select
        id="yearSelect"
        name="yearSelect"
        value={selectedYear}
        onChange={handleYearChange}
      >
        <option value={2016}>2016</option>
        <option value={2017}>2017</option>
        <option value={2018}>2018</option>
      </select>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default LineChart;
