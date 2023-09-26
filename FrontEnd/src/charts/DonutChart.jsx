import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import data from "../../jsondata.json";

const DonutChart = (props) => {
  const [intensityData, setIntensityData] = useState([]);
  const svgRef = useRef();

  useEffect(() => {
    setIntensityData(data.map((entry) => entry.intensity));
  }, []);

  useEffect(() => {
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;
    const donutWidth = 75;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie()(intensityData);

    const arc = d3
      .arc()
      .innerRadius(radius - donutWidth)
      .outerRadius(radius);

    const arcs = svg.selectAll("arc").data(pie).enter().append("g");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i));

    const arcLabel = d3.arc().innerRadius(radius).outerRadius(radius);

    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arcLabel.centroid(d)})`)
      .attr("dy", "0.35em")
      .text((d) => d.data);

  }, [intensityData]);

  return (
    <div className="m-10">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default DonutChart;
