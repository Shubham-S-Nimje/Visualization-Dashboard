import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import data from "../../jsondata.json";

const ScatterPlot = (props) => {
  const [scatterData, setScatterData] = useState([]);
  const svgRef = useRef();

  useEffect(() => {
    // Filter data for the "Energy" sector
    const filteredData = data.filter((entry) => entry.sector === "Energy");

    // Extract intensity and likelihood data for the "Energy" sector
    const scatterChartData = filteredData.map((entry) => ({
      intensity: entry.intensity,
      likelihood: entry.likelihood,
    }));

    setScatterData(scatterChartData);
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
      .domain([0, d3.max(scatterData, (d) => d.intensity)])
      .nice()
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(scatterData, (d) => d.likelihood)])
      .nice()
      .range([height, 0]);

    svg
      .selectAll("circle")
      .data(scatterData)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => x(d.intensity))
      .attr("cy", (d) => y(d.likelihood))
      .attr("r", 5) // Radius of the circle
      .attr("fill", "steelblue");

    const xAxis = d3.axisBottom(x).ticks(5);
    const yAxis = d3.axisLeft(y).ticks(5);

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

    svg.append("g").attr("class", "y-axis").call(yAxis);
  }, [scatterData]);

  return (
    <div className="m-10">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default ScatterPlot;
