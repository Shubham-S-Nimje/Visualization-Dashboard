import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
// import data from "../../jsondata.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";

const AreaChart = (props) => {
  const [pestleData, setPestleData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date("2016-01-01"));
  const [visiblePestles, setVisiblePestles] = useState([]);
  const svgRef = useRef();
  const data = useSelector((state) => state.data.data);

  useEffect(() => {
    const selectedYearData = data.filter(
      (entry) =>
        new Date(entry.published).getFullYear() ===
          selectedYear.getFullYear() && entry.intensity !== ""
    );

    const pestles = Array.from(
      new Set(
        selectedYearData.map((entry) => entry.pestle !== "" && entry.pestle)
      )
    );

    const pestleDataArray = pestles
      .map((pestle) => {
        const pestleChartData = Array.from({ length: 12 }, () => 0);
        selectedYearData
          .filter((entry) => entry.pestle === pestle)
          .forEach((entry) => {
            const month = new Date(entry.published).getMonth();
            pestleChartData[month] = parseFloat(entry.intensity);
          });
        return {
          pestle,
          data: pestleChartData,
        };
      })
      .filter((pestleData) => pestleData.data.some((value) => value !== 0));

    setPestleData(pestleDataArray);
    setVisiblePestles(pestles.slice(0, 3));
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

    const yMax = d3.max(pestleData, (pestleData) => d3.max(pestleData.data));
    const y = d3.scaleLinear().domain([0, yMax]).nice().range([height, 0]);

    const area = d3
      .area()
      .x((d, i) => x(i))
      .y0(height)
      .y1((d) => y(d))
      .curve(d3.curveBasis);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    pestleData.forEach((pestleData) => {
      if (visiblePestles.includes(pestleData.pestle)) {
        svg
          .append("path")
          .datum(pestleData.data)
          .attr("class", "area")
          .attr("d", area)
          .attr("fill", color(pestleData.pestle));

        svg
          .append("text")
          .attr("x", width - 100)
          .attr("y", y(pestleData.data[11]))
          .attr("fill", color(pestleData.pestle))
          .text(pestleData.pestle);
      }
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

    svg.append("g").attr("class", "y-axis").call(yAxis);

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
  }, [selectedYear, pestleData, visiblePestles]);

  const handleYearChange = (date) => {
    setSelectedYear(date);
  };

  const togglePestleVisibility = (pestle) => {
    if (visiblePestles.includes(pestle)) {
      setVisiblePestles(visiblePestles.filter((p) => p !== pestle));
    } else {
      setVisiblePestles([...visiblePestles, pestle]);
    }
  };

  return (
    <div className="max-w-fit items-center">
      <div className="flex justify-between text-center items-center">
        <div className="items-center m-2">
          <h3 className="font-bold text-2xl">Intensity</h3>
          <p>Pestles</p>
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
        {pestleData.map((pestleData) => (
          <div key={pestleData.pestle} className="form-control">
            <label className="cursor-pointer label">
              <input
                type="checkbox"
                onClick={() => togglePestleVisibility(pestleData.pestle)}
                checked={visiblePestles.includes(pestleData.pestle)}
                className="checkbox checkbox-success mx-2"
              />
              <span className="label-text">{pestleData.pestle}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AreaChart;
