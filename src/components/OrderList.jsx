import React, { useState, useEffect } from "react";
import { getAllOrders } from "../utils/firebaseFunctions";
import { MdNoteAlt } from "react-icons/md";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ProgressBar, Step } from "react-step-progress-bar";
import "../MultiStepProgressBar.css";
import { TiTickOutline } from "react-icons/ti";
import { PiCookingPot } from "react-icons/pi";
import { CiDeliveryTruck } from "react-icons/ci";
import { AiOutlineHome } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import StarIcon from "@mui/icons-material/Star";

const OrderList = () => {
  const [orders, setOrder] = useState([]);

  const [openFeedback, setOpenFeedback] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);

  const [index, setIndex] = useState(0);

  const [estimatedDateTime, setEstimatedDateTime] = useState("");

  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  function getBackgroundColor(orderStatus) {
    switch (orderStatus) {
      case "Order Placed":
        return "bg-blue-200";
      case "Preparing":
        return "bg-yellow-200";
      case "On the way":
        return "bg-green-200";
      case "Delivered":
        return "bg-purple-200";
      default:
        return "bg-blue-200";
    }
  }

  function getProgress(order = orders[index]) {
    let progress = 0;

    if (order && order.orderStatus) {
      switch (order.orderStatus) {
        case "Order Placed":
          progress = 16;
          break;
        case "Preparing":
          progress = 49.5;
          break;
        case "On the way":
          progress = 82.5;
          break;
        case "Delivered":
          progress = 100;
          break;
        default:
          progress = 0;
      }
    }

    return progress;
  }

  const handleFeedbackOpen = () => {
    setOpenFeedback(true);
  };

  const handleFeedbackClose = () => {
    setOpenFeedback(false);
    setValue(0);
  };

  const getEstimatedTime = () => {
    const order = orders[index];
    const orderDate = order.orderDate;
    const timePart = orderDate.split(" ")[1];
    const chineseTime = timePart.match(/(上午|下午)/)[0];
    const timeWithoutAmPm = timePart.replace(/(上午|下午)/, "");

    const eta = order.eta;
    const etaRange = eta.split("-").map(Number);
    const averageEta = (etaRange[0] + etaRange[1]) / 2;

    const estimatedTime = new Date(
      `${orderDate.split(" ")[0]} ${timeWithoutAmPm}`
    );
    estimatedTime.setMinutes(estimatedTime.getMinutes() + averageEta);

    setEstimatedDateTime(
      estimatedTime.toLocaleString().replace(/(上午|下午)/, chineseTime)
    );
  };

  const handleDetailsOpen = () => {
    getEstimatedTime();
    setOpenDetails(true);
  };

  const handleDetailsClose = () => {
    setOpenDetails(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getAllOrders().then((data) => {
      setOrder(data);

      console.log(data);
    });
  };

  return (
    <div>
      <div className="bg-white p-8 rounded-md w-full">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h1 className="text-gray-600 font-semibold text-2xl">Food Oders</h1>
          </div>
          <div className="flex items-end justify-end">
            <div className="flex bg-gray-50 items-center p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="bg-gray-50 outline-none ml-1 block"
                type="text"
                name=""
                id=""
                placeholder="search"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-lg font-semibold text-gray-600 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-lg font-semibold text-gray-600 uppercase tracking-wider">
                      Estimated Arrival
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-lg font-semibold text-gray-600 uppercase tracking-wider">
                      Created at
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-lg font-semibold text-gray-600 uppercase tracking-wider">
                      Total Price
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-lg font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-lg font-semibold text-gray-600 uppercase tracking-wider">
                      Details
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-lg font-semibold text-gray-600 uppercase tracking-wider">
                      Feedback
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders && orders.length > 0 ? (
                    orders.map((order, index) => (
                      <tr
                        key={order.id}
                        className={
                          index % 2 === 0 ? "border-gray-200" : "bg-gray-100"
                        }
                      >
                        <td
                          className={`px-5 py-5 border-b ${
                            index % 2 === 0 ? "border-gray-200" : "bg-gray-100"
                          }  text-base`}
                        >
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {order.id}
                            </p>
                          </div>
                        </td>
                        <td
                          className={`px-5 py-5 border-b ${
                            index % 2 === 0 ? "border-gray-200" : "bg-gray-100"
                          } text-base`}
                        >
                          <p className="text-gray-900 whitespace-no-wrap">
                            {order.eta} min
                          </p>
                        </td>
                        <td
                          className={`px-5 py-5 border-b ${
                            index % 2 === 0 ? "border-gray-200" : "bg-gray-100"
                          }  text-base`}
                        >
                          <p className="text-gray-900 whitespace-no-wrap">
                            {order.orderDate}
                          </p>
                        </td>
                        <td
                          className={`px-5 py-5 border-b ${
                            index % 2 === 0 ? "border-gray-200" : "bg-gray-100"
                          } text-base`}
                        >
                          <p className="text-gray-900 whitespace-no-wrap">
                            ${order.totalPrice}
                          </p>
                        </td>
                        <td
                          className={`px-5 py-5 border-b ${
                            index % 2 === 0 ? "border-gray-200" : "bg-gray-100"
                          } text-base`}
                        >
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              className={`absolute inset-0 ${getBackgroundColor(
                                order.orderStatus
                              )} opacity-50 rounded-full`}
                            ></span>
                            <span className="relative">
                              {order.orderStatus}
                            </span>
                          </span>
                        </td>
                        <td
                          className={`px-5 py-5 border-b ${
                            index % 2 === 0 ? "border-gray-200" : "bg-gray-100"
                          } text-base`}
                        >
                          <motion.button
                            className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-600 bg-green-500  font-semibold py-2 px-4 rounded-2xl"
                            whileHover={{ scale: 1.4 }}
                            whileTap={{ scale: 0.8 }}
                            onClick={() => {
                              setIndex(index);
                              handleDetailsOpen();
                            }}
                          >
                            <BiCommentDetail className="text-xl" />
                          </motion.button>
                        </td>

                        <td className="flex items-center px-5 py-5 justify-center">
                          <motion.button
                            className="text-sm text-indigo-50 transition duration-150 hover:bg-green-500 bg-orange-600  font-semibold py-2 px-4 rounded-2xl"
                            whileHover={{ scale: 1.4 }}
                            whileTap={{ scale: 0.8 }}
                            onClick={() => {
                              handleFeedbackOpen();
                              // setIndex(index);
                            }}
                          >
                            <MdNoteAlt className="text-xl" />
                          </motion.button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="w-full flex flex-col items-center justify-center">
                      <td className="text-xl text-headingColor font-semibold my-2">
                        Loading...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                <span className="text-xs xs:text-sm text-gray-900">
                  Showing 1 to 6 of 50 order record
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-500 bg-green-600 font-semibold py-2 px-4 rounded-l">
                    Prev
                  </button>
                  &nbsp; &nbsp;
                  <button className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-500 bg-green-600  font-semibold py-2 px-4 rounded-r">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <Dialog
          open={openDetails}
          onClose={handleDetailsClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <p className="text-2xl flex justify-center items-center">
              Order Details
            </p>
          </DialogTitle>
          <DialogContent>
            <ProgressBar percent={getProgress(orders[index])}>
              <Step>
                {({ accomplished, index }) => (
                  <div
                    className={`indexedStep ${
                      accomplished ? "accomplished" : null
                    }`}
                  >
                    <TiTickOutline className="text-xl" />
                  </div>
                )}
              </Step>
              <Step>
                {({ accomplished, index }) => (
                  <div
                    className={`indexedStep ${
                      accomplished ? "accomplished" : null
                    }`}
                  >
                    <PiCookingPot className="text-xl" />
                  </div>
                )}
              </Step>
              <Step>
                {({ accomplished, index }) => (
                  <div
                    className={`indexedStep ${
                      accomplished ? "accomplished" : null
                    }`}
                  >
                    <CiDeliveryTruck className="text-xl" />
                  </div>
                )}
              </Step>
              <Step>
                {({ accomplished, index }) => (
                  <div
                    className={`indexedStep ${
                      accomplished ? "accomplished" : null
                    }`}
                  >
                    <AiOutlineHome className="text-xl" />
                  </div>
                )}
              </Step>
            </ProgressBar>

            <div className="mt-8 p-4">
              <div className="">
                <p className="text-xl font-semibold">
                  Estimated Arrival Time: {estimatedDateTime}
                </p>
              </div>
              <div>
                <p className="text-xl font-semibold py-2">
                  Order Status :{" "}
                  <span className="text-gray-500">
                    {" "}
                    {orders[index]?.orderStatus}
                  </span>
                </p>
              </div>
              <div className="">
                <p className="text-xl font-semibold py-2">Restaurant Details</p>
                <p className="">
                  Restaurant Name :
                  <span className="text-gray-400">
                    {" "}
                    {orders[index]?.cartItems[0]?.restaurantName}
                  </span>
                </p>
                <p className="">
                  Restaurant Address :
                  <span className="text-gray-400">
                    {" "}
                    {orders[index]?.cartItems[0]?.address}
                  </span>
                </p>
              </div>
              <div className="mt-4 space-y-2 rounded-lg border h-60 flex flex-col bg-gray-50 px-2 py-2 sm:px-6 overflow-y-scroll ">
                {orders[index]?.cartItems.map((item) => (
                  <div
                    className="flex flex-col gap-4 rounded-lg bg-gray-50 sm:flex-row border-2"
                    key={item.id}
                  >
                    <img
                      className="m-2 h-24 w-24 rounded-md object-cover object-center"
                      src={item?.imageURL}
                      alt=""
                    />
                    <div className="flex w-full flex-col px-4 py-4">
                      <span className="font-semibold">{item?.title}</span>
                      <span className="float-right text-gray-400 mt-2">
                        Qty:{" "}
                        <span className="text-textColor">{item?.qty || 0}</span>
                      </span>
                      <p className="text-lg font-bold mt-2">
                        $ {item?.price || 0}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end items-end">
                <p className="font-semibold text-xl mt-4 mr-4">Total Price</p>
                <p className="text-xl font-semibold">
                  $ {orders[index]?.totalPrice}
                </p>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDetailsClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog
          open={openFeedback}
          onClose={handleFeedbackClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Feedback"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div className="border border-gray-400 rounded-xl p-2 mb-4">
                <textarea
                  rows="4"
                  cols="100"
                  placeholder="Free to write your review..."
                  className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                ></textarea>
              </div>
            </DialogContentText>
            <Typography component="legend">Delivery rate</Typography>
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleFeedbackClose}>Cancel</Button>
            <Button onClick={handleFeedbackClose} autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default OrderList;
