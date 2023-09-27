import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
// import data from "../../jsondata.json";
import { useSelector } from "react-redux";

const BarChart = () => {
  const [barData, setBarData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState("Intensity");
  const data = useSelector((state) => state.data.data);
  const margin = { top: 20, right: 250, bottom: 60, left: 150 };
  const width = 1024 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svgRef = useRef();

  useEffect(() => {
    const formattedData = data
      .map((d) => ({
        sector: d.sector !== "" && d.sector,
        intensity: parseFloat(d.intensity),
        likelihood: parseFloat(d.likelihood),
        relevance: parseFloat(d.relevance),
      }))
      .filter(
        (d) =>
          !isNaN(d.intensity) || !isNaN(d.likelihood) || !isNaN(d.relevance)
      );

    const groupedData = d3.rollup(
      formattedData,
      (v) => ({
        Intensity: d3.sum(v, (d) => d.intensity),
        Likelihood: d3.sum(v, (d) => d.likelihood),
        Relevance: d3.sum(v, (d) => d.relevance),
      }),
      (d) => d.sector
    );

    setBarData([...groupedData.entries()]);
  }, [selectedMetric, data]);

  useEffect(() => {
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(barData, (d) => d[1][selectedMetric])])
      .nice()
      .range([0, width]);

    const y = d3
      .scaleBand()
      .domain(barData.map((d) => d[0]))
      .range([0, height])
      .padding(0.2);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    svg
      .selectAll("rect")
      .data(barData)
      .enter()
      .append("rect")
      .attr("y", (d) => y(d[0]))
      .attr("height", y.bandwidth())
      .attr("x", 0)
      .attr("width", (d) => x(d[1][selectedMetric]))
      .style("fill", (d) => colorScale(d[0]));

    const yAxis = d3.axisLeft(y);
    const xAxis = d3.axisBottom(x);

    svg.append("g").attr("class", "y-axis").call(yAxis);

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
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

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

    const legend = svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${width - 100},20)`);

    const legendColor = d3
      .scaleOrdinal()
      .domain(barData.map((d) => d[0]))
      .range(d3.schemeCategory10);

    const legendLabels = barData.map((d) => d[0]);

    legend
      .selectAll(".legend-item")
      .data(legendLabels)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(0,${i * 20})`);

    legend
      .selectAll(".legend-item")
      .append("rect")
      .attr("width", 10)
      .attr("height", 10)
      .attr("x", margin.right - 120)
      .attr("y", margin.top - 50)
      .attr("fill", (d) => legendColor(d));

    legend
      .selectAll(".legend-item")
      .append("text")
      .attr("x", margin.right - 100)
      .attr("y", margin.top - 40)
      .text((d) => d);
  }, [barData, selectedMetric]);

  const handleMetricChange = (e) => {
    setSelectedMetric(e.target.value);
  };

  return (
    <div className="w-fit">
      <div className="flex justify-between text-center items-center">
        <div className="items-center m-2">
          <h3 className="font-bold text-2xl">Sector</h3>
        </div>
        <div className="flex m-2 shadow-lg flex-row bg-primary text-white py-1 px-2 rounded-md">
          <span className="font-bold">Select :</span>
          <select
            onChange={handleMetricChange}
            value={selectedMetric}
            className="m-1 text-center rounded-md text-primary"
          >
            <option value="Intensity">Intensity</option>
            <option value="Likelihood">Likelihood</option>
            <option value="Relevance">Relevance</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
};

export default BarChart;
