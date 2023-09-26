import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import data from "../../jsondata.json";

const BarChart = (props) => {
  const [sectorData, setSectorData] = useState([]);
  const svgRef = useRef();

  useEffect(() => {
    setSectorData(data);
  }, []);

  useEffect(() => {
    const width = 640;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 50, left: 40 };

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const sectors = Array.from(new Set(sectorData.map((entry) => entry.sector)));
    const yScale = d3
      .scaleBand()
      .domain(sectors)
      .range([margin.top, height - margin.bottom])
      .padding(0.1);

    const maxIntensity = d3.max(sectorData, (d) => d.intensity);
    const maxXValue = Math.max(maxIntensity);

    const xScale = d3
      .scaleLinear()
      .domain([0, maxXValue])
      .nice()
      .range([margin.left, width - margin.right]);

    const xAxis = d3.axisBottom(xScale).ticks(5);
    const yAxis = d3.axisLeft(yScale);

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis);

    svg
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    sectors.forEach((sector, i) => {
      const sectorDataFiltered = sectorData.filter((entry) => entry.sector === sector);

      svg
        .selectAll(".bar-" + i)
        .data(sectorDataFiltered)
        .enter()
        .append("rect")
        .attr("class", "bar-" + i)
        .attr("y", (d) => yScale(sector))
        .attr("x", (d) => margin.left)
        .attr("height", yScale.bandwidth())
        .attr("width", (d) => xScale(d.intensity) - margin.left)
        .attr("fill", color(sector));
    });
  }, [sectorData]);

  return (
    <div className="m-10">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default BarChart;
