import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import data from "../../jsondata.json";

const Histogram = (props) => {
  const [intensityData, setIntensityData] = useState([]);
  const svgRef = useRef();

  useEffect(() => {
    setIntensityData(data.map((entry) => entry.intensity));
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

    const x = d3.scaleLinear().domain([0, d3.max(intensityData)]).nice().range([0, width]);

    const histogram = d3
      .histogram()
      .domain(x.domain())
      .thresholds(x.ticks(10))(intensityData);

    const y = d3.scaleLinear().domain([0, d3.max(histogram, (d) => d.length)]).nice().range([height, 0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    svg.append("g").attr("class", "x-axis").attr("transform", `translate(0,${height})`).call(xAxis);

    svg.append("g").attr("class", "y-axis").call(yAxis);

    svg
      .selectAll(".bar")
      .data(histogram)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.x0) + 1)
      .attr("y", (d) => y(d.length))
      .attr("width", (d) => x(d.x1) - x(d.x0) - 1)
      .attr("height", (d) => height - y(d.length))
      .attr("fill", "steelblue");

  }, [intensityData]);

  return (
    <div className="m-10">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Histogram;
