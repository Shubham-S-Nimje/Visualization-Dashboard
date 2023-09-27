import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useSelector } from "react-redux";
// import data from "../../jsondata.json";

const BubbleChart = () => {
  const [bubbleData, setBubbleData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [averages, setAverages] = useState({});
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  const data = useSelector((state) => state.data.data);

  const margin = { top: 20, right: 30, bottom: 60, left: 60 };
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svgRef = useRef();

  useEffect(() => {
    const formattedData = data.map((d) => ({
      intensity: parseFloat(d.intensity),
      relevance: parseFloat(d.relevance),
      region: d.region,
    }));

    setBubbleData(formattedData);
  }, [data]);

  useEffect(() => {
    d3.select(svgRef.current).selectAll("*").remove();

    const regionAverages = {};

    bubbleData.forEach((d) => {
      if (!regionAverages[d.region]) {
        regionAverages[d.region] = {
          intensitySum: 0,
          relevanceSum: 0,
          count: 0,
        };
      }

      regionAverages[d.region].intensitySum += d.intensity;
      regionAverages[d.region].relevanceSum += d.relevance;
      regionAverages[d.region].count += 1;
    });

    const averageValues = {};

    for (const region in regionAverages) {
      const avgIntensity =
        regionAverages[region].intensitySum / regionAverages[region].count;
      const avgRelevance =
        regionAverages[region].relevanceSum / regionAverages[region].count;
      averageValues[region] = { avgIntensity, avgRelevance };
    }

    setAverages(averageValues);
  }, [bubbleData, selectedRegion]);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const filteredData = bubbleData.filter(
      (d) => !selectedRegion || d.region === selectedRegion
    );

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(filteredData, (d) => d.intensity)])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(filteredData, (d) => d.relevance)])
      .range([height, 0]);

    svg
      .selectAll("circle")
      .data(filteredData)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.intensity))
      .attr("cy", (d) => y(d.relevance))
      .attr("r", 5)
      .style("fill", (d) => colorScale(d.region));

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

    svg.append("g").attr("class", "y-axis").call(yAxis);

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
      .text("Relevance");
  }, [bubbleData, selectedRegion, colorScale]);

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  return (
    <div className="w-fit">
      <div className="flex justify-between text-center items-center">
        <div className="items-center m-2">
          <h3 className="font-bold text-2xl">Relevance</h3>
        </div>
        <div className="flex m-2 shadow-lg flex-row bg-primary text-white py-1 px-2 rounded-md">
          <span className="font-bold">Region</span>
          <select
            value={selectedRegion}
            onChange={handleRegionChange}
            className="m-1 text-center rounded-md text-primary"
          >
            <option value="">All</option>
            {Object.keys(averages).map((region) => (
              <option key={region} value={region}>
                {region}
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

export default BubbleChart;
