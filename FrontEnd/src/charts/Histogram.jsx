import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
// import data from "../../jsondata.json";
import { useSelector } from "react-redux";

const Histogram = () => {
  const [topicCounts, setTopicCounts] = useState({});
  const [selectedPestle, setSelectedPestle] = useState("Industries");
  const svgRef = useRef();
  const data = useSelector((state) => state.data.data);

  useEffect(() => {
    d3.select(svgRef.current).selectAll("*").remove();
    const pestleData = data.filter((entry) => entry.pestle === selectedPestle);
    const topics = pestleData.map((entry) => entry.topic);

    const topicCountsObj = topics.reduce((counts, topic) => {
      counts[topic] = (counts[topic] || 0) + 1;
      return counts;
    }, {});

    setTopicCounts(topicCountsObj);
  }, [selectedPestle, data]);

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 60, left: 100 };
    const width = 1024 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const topicsArray = Object.entries(topicCounts);

    topicsArray.sort((a, b) => b[1] - a[1]);

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(topicsArray, (d) => d[1])])
      .nice()
      .range([0, width]);

    const y = d3
      .scaleBand()
      .domain(topicsArray.map((d) => d[0]))
      .range([height, 0])
      .padding(0.1);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    const xAxisGrid = d3.axisBottom(x).tickSize(height).tickFormat("");
    // const yAxisGrid = d3.axisLeft(y).tickSize(-width).tickFormat("");

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("stroke-width", 0.2)
      .call(xAxisGrid);

    // svg.append("g").attr("class", "y-axis")
    // .attr("stroke-width", 0.2).call(yAxisGrid);

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10)
      .style("text-anchor", "middle")
      .text("Value");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.left)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Sector");

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

    svg.append("g").attr("class", "y-axis").call(yAxis);

    svg
      .selectAll(".bar")
      .data(topicsArray)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", 0)
      .attr("y", (d) => y(d[0]))
      .attr("width", (d) => x(d[1]))
      .attr("height", y.bandwidth())
      .attr("fill", (d) => colorScale(d[0]));
  }, [topicCounts]);

  const handlePestleChange = (e) => {
    setSelectedPestle(e.target.value);
  };

  return (
    <div className="w-fit">
      <div className="flex justify-between text-center items-center">
        <div className="items-center m-2">
          <h3 className="font-bold text-2xl">Pestle</h3>
        </div>
        <div className="m-2 shadow-lg flex-col bg-primary text-white py-1 px-2 rounded-md">
          <span className="font-bold">Select pestle:</span>
          <select
            value={selectedPestle}
            onChange={handlePestleChange}
            className="my-1 mx-2 text-center rounded-md text-primary"
          >
            {Array.from(new Set(data.map((d) => d.pestle)))
              .filter((pestle) => pestle)
              .map((pestle) => (
                <option key={pestle} value={pestle}>
                  {pestle}
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

export default Histogram;
