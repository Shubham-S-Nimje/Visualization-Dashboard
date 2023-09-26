import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import data from "../../jsondata.json";

const AreaChart = (props) => {
  const [energyData, setEnergyData] = useState([]);
  const svgRef = useRef();

  useEffect(() => {
    // Filter data for the "Energy" sector
    const filteredData = data.filter((entry) => entry.sector === "Energy");

    // Extract year and intensity data for the "Energy" sector
    const energyChartData = filteredData.map((entry) => ({
      year: new Date(entry.published).getFullYear(),
      intensity: entry.intensity,
    }));

    setEnergyData(energyChartData);
  }, []);

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 50, left: 40 };
    const width = 640 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(energyData, (d) => d.intensity)])
      .nice()
      .range([0, width]);

    const y = d3
      .scaleBand()
      .domain(energyData.map((d) => d.year))
      .range([height, 0]);

    const area = d3
      .area()
      .x((d) => x(d.intensity))
      .y0(height)
      .y1((d) => y(d.year));

    svg
      .append("path")
      .datum(energyData)
      .attr("class", "area")
      .attr("d", area)
      .attr("fill", "steelblue")
      .attr("opacity", 0.7);

    const xAxis = d3.axisBottom(x).ticks(5);
    const yAxis = d3.axisLeft(y);

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

    svg.append("g").attr("class", "y-axis").call(yAxis);
  }, [energyData]);

  return (
    <div className="m-10">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default AreaChart;
