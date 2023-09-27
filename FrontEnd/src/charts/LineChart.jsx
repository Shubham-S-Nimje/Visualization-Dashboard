import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
// import data from "../../jsondata.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";

const LineChart = (props) => {
  const [energyData, setEnergyData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date("2016-01-01"));
  const [visibleSectors, setVisibleSectors] = useState([]);
  const svgRef = useRef();
  const yAxisRef = useRef();
  const data = useSelector((state) => state.data.data);

  useEffect(() => {
    const selectedYearData = data.filter(
      (entry) =>
        new Date(entry.published).getFullYear() ===
          selectedYear.getFullYear() && entry.intensity !== ""
    );

    const sectors = Array.from(
      new Set(
        selectedYearData.map((entry) => entry.sector != "" && entry.sector)
      )
    );

    const sectorData = sectors
      .map((sector) => {
        const sectorChartData = Array.from({ length: 12 }, () => 0);
        selectedYearData
          .filter((entry) => entry.sector === sector)
          .forEach((entry) => {
            const month = new Date(entry.published).getMonth();
            sectorChartData[month] = parseFloat(entry.intensity);
          });
        return {
          sector,
          data: sectorChartData,
        };
      })
      .filter((sectorData) => sectorData.data.some((value) => value !== 0));

    setEnergyData(sectorData);
    setVisibleSectors(sectors.slice(0, 3));
  }, [selectedYear, data]);

  useEffect(() => {
    d3.select(svgRef.current).selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    const width = 1024 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain([0, 11]).range([0, width]);

    const visibleSectorData = energyData.filter((sectorData) =>
      visibleSectors.includes(sectorData.sector)
    );
    const yMax = d3.max(visibleSectorData, (sectorData) =>
      d3.max(sectorData.data)
    );
    const y = d3.scaleLinear().domain([0, yMax]).nice().range([height, 0]);

    const line = d3
      .line()
      .x((d, i) => x(i))
      .y((d) => y(d))
      .curve(d3.curveBasis);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    visibleSectorData.forEach((sectorData) => {
      svg
        .append("path")
        .datum(sectorData.data)
        .attr("class", "line")
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", color(sectorData.sector))
        .attr("stroke-width", 3);

      svg
        .append("text")
        .attr("x", width - 100)
        .attr("y", y(sectorData.data[11]))
        .attr("fill", color(sectorData.sector))
        .text(sectorData.sector);
    });

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

    svg
      .append("g")
      .attr("class", "x-axis")
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10)
      .style("text-anchor", "middle")
      .text("Months");

    const yAxisGroup = svg.append("g").attr("class", "y-axis").call(yAxis);

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
      .attr("class", "y-axis")
      .append("text")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 10)
      .style("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Intensity");

    yAxisRef.current = yAxisGroup;
  }, [selectedYear, energyData, visibleSectors]);

  const handleYearChange = (date) => {
    setSelectedYear(date);
  };

  const toggleSectorVisibility = (sector) => {
    if (visibleSectors.includes(sector)) {
      setVisibleSectors(visibleSectors.filter((s) => s !== sector));
    } else {
      setVisibleSectors([...visibleSectors, sector]);
    }
  };

  return (
    <div className="w-fit items-center">
      <div className="flex justify-between text-center items-center">
        <div className="items-center m-2">
          <h3 className="font-bold text-2xl">Intensity</h3>
          <p>Sectors</p>
        </div>
        <div className="m-2 shadow-lg flex-col bg-primary text-white py-1 px-2 rounded-md">
          <span className="font-bold">Year:</span>
          <DatePicker
            selected={selectedYear}
            onChange={handleYearChange}
            dateFormat="yyyy"
            showYearPicker
            className="my-1 mx-2 text-center rounded-md text-primary"
          />
        </div>
      </div>
      <svg ref={svgRef} className="mx-auto items-center"></svg>
      <div className="flex flex-wrap min-w-fit items-center">
        {energyData.map((sectorData) => (
          <div key={sectorData.sector} className="form-control">
            <label className="cursor-pointer label">
              <input
                type="checkbox"
                onClick={() => toggleSectorVisibility(sectorData.sector)}
                checked={visibleSectors.includes(sectorData.sector)}
                className="checkbox checkbox-success mx-2"
              />
              <span className="label-text">{sectorData.sector}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LineChart;
