import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import data from "../../jsondata.json";
import ReactDatePicker from "react-datepicker";
import { useSelector } from "react-redux";

const ScatterPlot = () => {
  const [scatterData, setScatterData] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const data = useSelector((state) => state.data.data);

  const margin = { top: 20, right: 30, bottom: 60, left: 60 };
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svgRef = useRef();

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  useEffect(() => {
    const formattedData = data.map((d) => ({
      intensity: parseFloat(d.intensity),
      likelihood: parseFloat(d.likelihood),
      topic: d.topic,
    }));

    setScatterData(formattedData);
  }, [data]);

  useEffect(() => {
    d3.select(svgRef.current).selectAll("*").remove();

    const filteredData = scatterData.filter(
      (d) => !selectedTopic || d.topic === selectedTopic
    );

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(scatterData, (d) => d.intensity)])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(scatterData, (d) => d.likelihood)])
      .range([height, 0]);

    svg
      .selectAll("circle")
      .data(filteredData)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.intensity))
      .attr("cy", (d) => y(d.likelihood))
      .attr("r", 5)
      .style("fill", (d) => colorScale(d.topic));

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    const xAxisGrid = d3.axisBottom(x).tickSize(height).tickFormat("");
    const yAxisGrid = d3.axisLeft(y).tickSize(-width).tickFormat("");

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("stroke-width", 0.2)
      .call(xAxisGrid);

    svg
      .append("g")
      .attr("class", "y-axis")
      .attr("stroke-width", 0.2)
      .call(yAxisGrid);

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10)
      .style("text-anchor", "middle")
      .text("Intensity");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 20)
      .style("text-anchor", "middle")
      .text("likelihood");

    svg.append("g").attr("class", "y-axis").call(yAxis);
  }, [scatterData, selectedTopic]);

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
  };

  return (
    <div className="w-fit">
      <div className="flex justify-between text-center items-center">
        <div className="items-center m-2">
          <h3 className="font-bold text-2xl">Likelihood</h3>
        </div>
        <div className="m-2 shadow-lg flex-col bg-primary text-white py-1 px-2 rounded-md">
          <span className="font-bold">Topic</span>
          <select
            value={selectedTopic}
            onChange={handleTopicChange}
            className="m-1 text-center rounded-md text-primary"
          >
            <option value="">All</option>
            {Array.from(new Set(data.map((d) => d.topic)))
              .filter(Boolean)
              .map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="flex justify-center">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
};

export default ScatterPlot;
