import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarPlot } from "@mui/x-charts/BarChart";
import { LinePlot } from "@mui/x-charts/LineChart";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import CircularProgress from "@mui/joy/CircularProgress";
import { GoDotFill } from "react-icons/go";
import DeliveryPersonnelIcon from "../img/delivery.png";
import Box from "@mui/material/Box";
import { FaEdit, FaRegUser, FaPhoneAlt, FaWalking } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdAttachMoney,
  MdDescription,
  MdFoodBank,
  MdImage,
} from "react-icons/md";

// import Grid from "@mui/joy/Grid";

import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

import { Stacked, Pie, SparkLine } from "../components";
import {
  courierEarningData,
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

const CourierDashboard = () => {
  const [time, setTime] = useState(new Date());
  const [courierDetails, setCourierDetails] = useState(false);
  const [name, setName] = useState("Peter Wong");
  const [email, setEmail] = useState("deliveryPersonnel@gmail.com");
  const [phone, setPhone] = useState("65784125");
  const [deliveryTool, setDeliveryTool] = useState("Walk");
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  }, []);

  const handleCourierEditOpen = () => {
    setCourierDetails(true);
  };

  const handleCourierEditClose = () => {
    setCourierDetails(false);
  };

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
      <div className="bg-white  dark:bg-secondary-dark-bg h-68 rounded-xl w-[1720px]  p-4  m-4  bg-hero-pattern bg-no-repeat bg-cover bg-center">
        {/* <Grid container spacing={3} sx={{ flexGrow: 1 }}>
          <Grid item xs> */}
        {/* <div className=""> */}
        {/* <Container> */}
        <div>
          <p className="text-2xl font-semibold">Profile</p>
        </div>
        <Box sx={{ width: "100%" }}>
          <Grid container spacing={4}>
            <Grid item xs={6} md={6}>
              <Card sx={{ borderRadius: "15px" }}>
                <CardContent sx={{ p: 2 }}>
                  <Grid container direction="row" alignItems="center">
                    <div>
                      <CardMedia
                        component="img"
                        image={DeliveryPersonnelIcon}
                        alt="Generic placeholder image"
                        sx={{ width: "160px", borderRadius: "10px" }}
                      />
                    </div>
                    <div className="flex-row ml-4">
                      <Typography variant="h5" className="">
                        Peter Wong
                      </Typography>
                      <Typography variant="body1" className="text-gray-400">
                        Senior courier
                      </Typography>
                    </div>
                    <Grid item sx={{ flexGrow: 1, ml: 3 }}>
                      <div>
                        <p className="font-semibold text-xl">
                          Information
                          <FaEdit
                            className="inline float-right cursor-pointer hover:text-orange-500"
                            onClick={() => {
                              handleCourierEditOpen();
                            }}
                          />
                        </p>
                      </div>
                      <hr className="h-1 mb-1" />
                      <div
                        className="d-flex justify-content-start rounded-md p-2 mb-2"
                        style={{ backgroundColor: "#efefef" }}
                      >
                        <div>
                          <p className="small text-muted mb-1 font-semibold">
                            Email
                          </p>
                          <p className="mb-0">deliveryPersonnel@gmail.com</p>
                        </div>
                        <div className="mt-2">
                          <p className="small text-muted mb-1  font-semibold">
                            Phone
                          </p>
                          <p className="mb-0">{phone}</p>
                        </div>
                        <div className="mt-2 d-flex justify-content-between">
                          <div>
                            <p className="flex small text-muted mb-1 font-semibold">
                              Rating
                            </p>
                            <p className="mb-0">4.8/5</p>
                          </div>
                          <div>
                            <p className="small text-muted mb-1 font-semibold">
                              Delivery Tool
                            </p>
                            <p className="mb-0">{deliveryTool}</p>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} md={6}>
              <Card sx={{ borderRadius: "15px" }}>
                <CardContent sx={{ p: 2 }}>
                  <ChartContainer
                    series={series}
                    width={700}
                    height={282}
                    xAxis={[
                      {
                        id: "hours",
                        data: [
                          7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                          21,
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
                    <ChartsXAxis
                      label="Hours"
                      position="bottom"
                      axisId="hours"
                    />
                    <ChartsYAxis
                      label="Revenue (hundred)"
                      position="left"
                      axisId="eco"
                    />
                  </ChartContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        {/* </Container> */}
        {/* </div> */}
        {/* </Grid>
        </Grid> */}
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-semibold">Monthly report</h2>
      </div>
      <div className="flex m-3 flex-wrap justify-center gap-32 items-center">
        {courierEarningData.map((item) => (
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
                  $21051.78
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
              <p className="text-2xl font-semibold ">$143,246</p>
              <p className="text-gray-600">Yearly earn</p>
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
      <Dialog
        open={courierDetails}
        onClose={() => handleCourierEditClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div className="w-full flex items-center justify-center">
            <div className="w-[120%] md:w-[120%] border border-gray-300 rounded-lg p-20 flex flex-col items-center justify-center gap-4">
              <p className="text-gray-700 text-2xl">Courier Profile</p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`w-full p-2 rounded-lg text-center text-lg font-semibold `}
              >
                {/* {msg} */}
              </motion.p>
              {/* )} */}
              <div
                className={`w-[130%]  border-b border-gray-300 flex p-2 items-center gap-2 bg-gray-200`}
              >
                <FaRegUser className="text-gray-700 text-2xl" />
                <input
                  type="text"
                  required
                  disabled
                  value={name}
                  placeholder="Courier Name"
                  className={`w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor `}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div
                className={`w-[130%]  border-b border-gray-300 flex p-2 items-center gap-2  bg-gray-200`}
              >
                <MdAlternateEmail className="text-gray-700 text-2xl" />
                <input
                  type="text"
                  required
                  disabled
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Price"
                  className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                />
              </div>

              <div
                className={`w-[130%]  border-b border-gray-300 flex p-2 items-center gap-2  ${
                  !editable ? "bg-gray-200" : "bg-white"
                }`}
              >
                <FaPhoneAlt className="text-gray-700 text-2xl" />
                <input
                  type="text"
                  required
                  disabled={!editable}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Price"
                  className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                />
              </div>

              <div className={`w-[135%]   flex p-2 items-center gap-2  `}>
                <FaWalking className="text-gray-700 text-2xl mr-2" />
                <select
                  value={deliveryTool}
                  disabled={!editable}
                  onChange={(e) => setDeliveryTool(e.target.value)}
                  className={` bg-primary outline-none w-full text-lg border-b-2 border-gray-200 p-2 rounded-md cursor-pointer ${
                    !editable ? "text-gray-500" : "bg-black"
                  }`}
                >
                  <option value="other">Select Delivery Tool</option>

                  <option
                    value={"Walk"}
                    className="bg-primary text-base border-0 outline-none capitalize text-headingColor"
                  >
                    Walk
                  </option>
                  <option
                    value={"Bicycle"}
                    className="bg-primary text-base border-0 outline-none capitalize text-headingColor"
                  >
                    Bicycle
                  </option>
                  <option
                    value={"Walk"}
                    className="bg-primary text-base border-0 outline-none capitalize text-headingColor"
                  >
                    Walk
                  </option>
                </select>
              </div>
            </div>
          </div>
        </DialogContent>
        <div className="felx justify-between">
          <div className="flex float-left bg-emerald-400 hover:bg-orange-400 p-2 m-2 ml-6 rounded-md">
            {!editable && (
              <Button onClick={() => setEditable(true)}>
                <p className="text-white font-semibold text-xl">Edit</p>
              </Button>
            )}
            {editable && (
              <Button onClick={() => setEditable(false)}>
                <p className="text-white font-semibold text-xl">Save</p>
              </Button>
            )}
          </div>
          <div className="flex float-right bg-red-400 hover:bg-blue-400 p-2 m-2 mr-6 rounded-md">
            {!editable && (
              <Button onClick={() => handleCourierEditClose()}>
                <p className="text-white font-semibold text-xl">Close</p>
              </Button>
            )}
            {editable && (
              <Button onClick={() => setEditable(false)}>
                <p className="text-white font-semibold text-xl">Cancel</p>
              </Button>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CourierDashboard;
