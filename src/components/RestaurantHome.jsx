import React, { useEffect, useState } from "react";

import { BarPlot } from "@mui/x-charts/BarChart";
import { LinePlot } from "@mui/x-charts/LineChart";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import CircularProgress from "@mui/joy/CircularProgress";
import { GoDotFill } from "react-icons/go";
import Grid from "@mui/joy/Grid";

import { Stacked, Pie, SparkLine } from "../components";
import {
  earningData,
  SparklineAreaData,
  SparklineAreaData2,
  ecomPieChartData,
} from "../utils/data.js";

const series = [
  {
    type: "bar",
    stack: "",
    yAxisKey: "eco",
    data: [1, 2, 3, 4, 5],
  },
  {
    type: "line",
    yAxisKey: "pib",
    color: "red",
    data: [10000, 17000, 24000, 40000, 100000],
  },
];

const RestaurantHome = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  }, []);

  return (
    <div className="w-full h-auto flex flex-col mt-4 items-center justify-center">
      <div className="flex">
        <div className="flex items-center justify-center mb-4">
          <h1 className="font-semibold text-4xl">Dashboard</h1>
        </div>
        <div className="absolute right-16 bg-green-100 rounded-md w-40 mr-6">
          <div className="p-1 relative left-4">
            <p className="text-xl font-semibold">{time.toLocaleTimeString()}</p>
            <p className="text-xl font-semibold">{time.toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      <div className="bg-white  dark:bg-secondary-dark-bg h-68 rounded-xl w-[1720px]  p-8 pt-9 m-4  bg-hero-pattern bg-no-repeat bg-cover bg-center">
        <Grid container spacing={3} sx={{ flexGrow: 1 }}>
          <Grid xs>
            <div>
              <CircularProgress
                sx={{ "--CircularProgress-size": "180px" }}
                determinate
                value={5}
              >
                1 / 20
              </CircularProgress>
              <div className="font-bold text-2xl mt-4 ml-4">Live Orders</div>
            </div>
          </Grid>
          <Grid xs>
            <div>
              <CircularProgress
                sx={{ "--CircularProgress-size": "180px" }}
                determinate
                value={15}
              >
                3 / 20
              </CircularProgress>
              <div className="font-bold text-2xl mt-4">Preparing Orders</div>
            </div>
          </Grid>
          <Grid>
            <div className="mt-10">
              <p className="font-bold text-gray-600 text-2xl">Earnings</p>
              <p className="text-2xl text-black mt-4">$7230.00</p>
            </div>
          </Grid>
          <Grid>
            <ChartContainer
              series={series}
              width={700}
              height={250}
              xAxis={[
                {
                  id: "hours",
                  data: [
                    7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
                  ],
                  scaleType: "band",
                  valueFormatter: (value) => value.toString(),
                },
              ]}
              yAxis={[
                {
                  id: "eco",
                  scaleType: "linear",
                },
                {
                  id: "pib",
                  scaleType: "log",
                },
              ]}
            >
              <BarPlot />
              <LinePlot />
              <ChartsXAxis label="Hours" position="bottom" axisId="hours" />
              <ChartsYAxis
                label="Revenue (thousand)"
                position="left"
                axisId="eco"
              />
            </ChartContainer>
          </Grid>
        </Grid>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-semibold">Monthly report</h2>
      </div>
      <div className="flex m-3 flex-wrap justify-center gap-32 items-center">
        {earningData.map((item) => (
          <div
            key={item.title}
            className="bg-white h-44 dark:text-gray-600 dark:bg-secondary-dark-bg md:w-60 p-4 pt-9 rounded-2xl "
          >
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
            >
              {item.icon}
            </button>
            <p className="mt-3">
              <span className="text-lg font-semibold">{item.amount}</span>
              <span className={`text-sm text-${item.pcColor} ml-2`}>
                {item.percentage}
              </span>
            </p>
            <p className="text-sm text-gray-600  mt-1">{item.title}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-60 flex-wrap ">
        <div className="bg-white dark:text-gray-600 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-880  ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Revenue Updates</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                <span>
                  <GoDotFill />
                </span>
                <span>Expense</span>
              </p>
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span>
                  <GoDotFill />
                </span>
                <span>Budget</span>
              </p>
            </div>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div className=" border-r-1 border-color m-4 pr-10">
              <div>
                <p>
                  <span className="text-3xl font-semibold">$93,438</span>
                  <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                    23%
                  </span>
                </p>
                <p className="text-gray-500 mt-1">Budget</p>
              </div>
              <div className="mt-8">
                <p className="text-3xl font-semibold">$48,487</p>

                <p className="text-gray-500 mt-1">Expense</p>
              </div>

              <div className="mt-5">
                <SparkLine
                  currentColor="black"
                  id="line-sparkLine"
                  type="Line"
                  height="80px"
                  width="250px"
                  data={SparklineAreaData2}
                  color="black"
                />
              </div>
              <div className="mt-10 w-25 h-10">
                <button className="bg-black text-white p-2 rounded-md hover:drop-shadow-xl hover:bg-orange-400">
                  Download Report
                </button>
              </div>
            </div>
            <div>
              <Stacked width="320px" height="360px" />
            </div>
          </div>
        </div>
        <div className="w-[600px]">
          <div
            className=" rounded-2xl md:w-400 p-10 m-3"
            style={{ backgroundColor: "white" }}
          >
            <div className="flex justify-between items-center ">
              <p className="font-semibold text-black text-2xl">Earnings</p>

              <div>
                <p className="text-2xl text-black font-semibold mt-8">
                  $63,448.78
                </p>
                <p className="text-gray-600">Monthly revenue</p>
              </div>
            </div>

            <div className="mt-4">
              <SparkLine
                currentColor="white"
                id="column-sparkLine"
                height="100px"
                type="Column"
                data={SparklineAreaData}
                width="320"
                color="rgb(242, 252, 253)"
              />
            </div>
          </div>

          <div className="bg-white dark:text-gray-600 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10">
            <div>
              <p className="text-2xl font-semibold ">$43,246</p>
              <p className="text-gray-600">Yearly sales</p>
            </div>

            <div className="w-40">
              <Pie
                id="pie-chart"
                data={ecomPieChartData}
                legendVisiblity={false}
                height="160px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHome;
