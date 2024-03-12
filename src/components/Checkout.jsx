import React, { useState, useEffect } from "react";
import { saveOrder } from "../utils/firebaseFunctions";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { IoCashOutline, IoCardOutline } from "react-icons/io5";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import OctopusCard from "../img/Octopus-card-adult.png";
import OctopusQRCode from "../img/Octopus-qr-code.png";
import AlipayLogo from "../img/alipay-logo.png";
import AlipalyQRCode from "../img/Aliplay-QR-code.png";

const Checkout = () => {
  const [isDelivery, setIsDelivery] = useState(true);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiredDate, setCardExpiredDate] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState(null);
  const [region, setRegion] = useState("Hong Kong Island");
  const [mainAddress, setMainAddress] = useState("");
  const [optionalAddress, setOptionalAddress] = useState("");
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = new useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryFees, setDeliveryFees] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [openOtherPayment, setOtherPayment] = useState(false);
  const [openOctopusPayment, setOpenOctopusPayment] = useState(false);
  const [openAlipayPayment, setOpenAlipayPayment] = useState(false);

  const [{}, dispatch] = useStateValue();
  // const [progress, setProgress] = useState(0);

  const deliveryFee =
    cartItems[0]?.deliveryFee === "Free" || isDelivery === false
      ? 0
      : parseInt(cartItems[0]?.deliveryFee);

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTotalPrice(totalPrice);
    setDeliveryFees(deliveryFee);
  }, [totalPrice, cartItems, deliveryFee, isDelivery]);

  useEffect(() => {
    // Call validateForm whenever any of the form input values change
    validateForm();
  }, [
    cardNumber,
    customerName,
    phone,
    region,
    mainAddress,
    cartItems,
    paymentMethod,
  ]);

  // useEffect(() => {
  //   const interval = 5000; // n seconds in milliseconds
  //   const steps = 100; // Number of steps to complete in n seconds
  //   const stepDuration = interval / steps;

  //   const timer = setInterval(() => {
  //     setProgress((oldProgress) => {
  //       if (oldProgress === 100) {
  //         clearInterval(timer); // Clear the interval when progress reaches 100
  //         return 100;
  //       }
  //       const diff = 100 / steps;
  //       return Math.min(oldProgress + diff, 100);
  //     });
  //   }, stepDuration);

  //   return () => {
  //     clearInterval(timer); // Clean up the interval when the component unmounts
  //   };
  // }, []);

  const validateForm = () => {
    // Check if all required fields are filled and meet the patterns
    const isCardNumberValid = /^\d{4}-\d{4}-\d{4}-\d{4}$/.test(cardNumber);
    const isPhoneValid = phone && /^\d{8}$/.test(phone);
    const isCardExpiredDateValid = cardExpiredDate.length === 5;
    const isCardCVCValid = cardCVC.length === 3;

    // Set the form validity based on all conditions
    if (paymentMethod === "Credit Card") {
      setIsFormValid(
        customerName &&
          isCardNumberValid &&
          isCardExpiredDateValid &&
          isCardCVCValid &&
          isPhoneValid &&
          region &&
          mainAddress &&
          cartItems
      );
    } else if (paymentMethod === "Cash") {
      setIsFormValid(isPhoneValid && region && mainAddress);
    } else if (paymentMethod === "Other Payment Method") {
      setIsFormValid(isPhoneValid && region && mainAddress);
    }
  };

  const clearCardDetails = () => {
    setCardNumber("");
    setCardExpiredDate("");
    setCardCVC("");
    setCustomerName("");
    setPhone(null);
    setRegion("Hong Kong Island");
    setMainAddress("");
    setOptionalAddress("");
  };

  const createOrder = async () => {
    try {
      if (isFormValid) {
        {
          const id = Date.now();
          const data = {
            id: id,
            paymentMethod: paymentMethod,
            customerName: customerName,
            phone: phone,
            region: region,
            userAddress: mainAddress,
            optionalAddress: optionalAddress,
            userInfo: localStorage.getItem("userId"),
            delivery: isDelivery,
            totalPrice: totalPrice,
            orderDeliveryFee: deliveryFees,
            cartItems: cartItems,
            eta: isDelivery ? "30-40" : "15",
            orderDate: new Date().toLocaleString(),
            orderStatus: "Order Placed",
          };
          await saveOrder(data);

          localStorage.setItem("cartItems", JSON.stringify([]));
          dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: [],
          });

          setIsOrderPlaced(true);
          window.scrollTo(0, 0);
          clearCardDetails();
          setTimeout(() => {
            navigate("/");
          }, 4000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOtherPaymentOpen = () => {
    setOtherPayment(true);
  };

  const handleOtherPaymentClose = () => {
    setOtherPayment(false);
  };

  const handleOpenOctopusPaymentOpen = () => {
    setOpenOctopusPayment(true);
  };

  const handleOpenOctopusPaymentClose = () => {
    setOpenOctopusPayment(false);
  };

  const handleOpenAlipayPaymentOpen = () => {
    setOpenAlipayPayment(true);
  };

  const handleOpenAlipayPaymentClose = () => {
    setOpenAlipayPayment(false);
  };

  return (
    <>
      {isOrderPlaced && (
        // <Box sx={{ width: "100%" }}>
        //   <LinearProgress variant="determinate" value={progress} />
        // </Box>
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="success" />
        </Stack>
      )}
      <div className="flex flex-col items-center border-b py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <div className="flex flex-row gap-10">
          <a href="#" className="text-2xl font-bold text-gray-800">
            Checkout
          </a>
          {isOrderPlaced && (
            <div>
              <Stack sx={{ width: "100%", fontSize: "30px" }} spacing={2}>
                <Alert severity="success" sx={{ fontSize: "18px" }}>
                  <strong>Order place successfully!</strong>
                </Alert>
              </Stack>
            </div>
          )}
        </div>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Food</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                {/* <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </a> */}
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Checkout</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  3
                </a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 py-5">
        <div className="px-4">
          <div className="">
            <p className="text-xl font-medium py-2">Restaurant Details</p>
            <p className="">
              Restaurant Name :
              <span className="text-gray-400">
                {" "}
                {cartItems[0]?.restaurantName}
              </span>
            </p>
            <p className="">
              Restaurant Address :
              <span className="text-gray-400"> {cartItems[0]?.address}</span>
            </p>
          </div>
          <div className="py-4">
            <p className="text-xl font-medium">Order Summary</p>
            <p className="text-gray-400">
              Check your items. And select a suitable delivery method.
            </p>
          </div>
          <div className="mt-1 space-y-2 rounded-lg border h-60 flex flex-col bg-gray-50 px-2 py-2 sm:px-6 overflow-y-scroll">
            {cartItems.map((item) => (
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
                  <p className="text-lg font-bold mt-2">$ {item?.price || 0}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-lg font-medium">Delivery Methods</p>
          <div className="mt-2 grid gap-2">
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="deliveryMethod"
                checked={isDelivery === true}
                onChange={() => setIsDelivery(true)}
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >
                <div className="w-14 object-contain" />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 30-40 minus
                  </p>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="deliveryMethod"
                checked={isDelivery === false}
                onChange={() => setIsDelivery(false)}
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_2"
              >
                <div className="w-14 object-contain" />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Self pick-up</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Preparation : 15 minus
                  </p>
                </div>
              </label>
            </div>
          </div>
          <p className="mt-8 text-lg font-medium">Payment Methods</p>
          <div className="mt-2 grid gap-2">
            <div className="relative">
              <input
                id="radio_3"
                className="peer hidden"
                type="radio"
                name="paymentMethod"
                checked={paymentMethod === "Cash"}
                onChange={() => setPaymentMethod("Cash")}
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_3"
              >
                <div className="w-14 object-contain" />
                <div className="ml-5">
                  <IoCashOutline className="inline text-2xl mr-4" />
                  <span className="mt-2 font-semibold">Cash payment</span>
                  <p className="text-slate-500 text-sm leading-6">
                    You should pay for delivery personnel
                  </p>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                type="radio"
                name="paymentMethod"
                id="radio_4"
                checked={paymentMethod === "Credit Card"}
                onChange={() => setPaymentMethod("Credit Card")}
              />
              {/* {console.log(paymentMethod)} */}
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_4"
              >
                <div className="w-14 object-contain" />
                <div className="ml-5">
                  <IoCardOutline className="inline text-2xl mr-4" />
                  <span className="mt-2 font-semibold">
                    Credit Card payment
                  </span>
                  <p className="text-slate-500 text-sm leading-6">
                    You should pay for credit card
                  </p>
                </div>
              </label>
            </div>

            <div className="relative">
              <input
                className="peer hidden"
                type="radio"
                name="otherPaymentMethod"
                id="radio_5"
                checked={paymentMethod === "Other Payment Method"}
                onChange={() => {
                  setPaymentMethod("Other Payment Method");
                  setOtherPayment(true);
                }}
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_5"
              >
                <div className="w-14 object-contain" />
                <div className="ml-5">
                  <IoCardOutline className="inline text-2xl mr-4" />
                  <span className="mt-2 font-semibold">Other payment</span>
                  <p className="text-slate-500 text-sm leading-6">
                    You can choose other payment method
                  </p>
                </div>
              </label>
              <div>
                <Dialog
                  open={openOtherPayment}
                  onClose={handleOtherPaymentClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Other payment select"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <span className="flex items-center justify-center border border-gray-400 rounded-xl p-2 hover:bg-orange-400">
                        <button
                          className=""
                          onClick={() => {
                            handleOpenOctopusPaymentOpen();
                          }}
                        >
                          <img
                            src={OctopusCard}
                            className="w-40 h-auto p-2"
                            alt=""
                          />
                          Octopus
                        </button>
                      </span>
                      <span className="flex items-center justify-center border border-gray-400 rounded-xl p-2 hover:bg-blue-300 mt-2">
                        <button
                          className=""
                          onClick={() => {
                            handleOpenAlipayPaymentOpen();
                          }}
                        >
                          <img src={AlipayLogo} className="w-24" alt="" />
                          Alipay
                        </button>
                      </span>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleOtherPaymentClose}>Close</Button>
                  </DialogActions>
                </Dialog>
              </div>
              <div>
                <Dialog
                  open={openOctopusPayment}
                  onClose={handleOpenOctopusPaymentOpen}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <span className="flex items-center justify-center">
                        <img
                          src={OctopusQRCode}
                          className="w-50 h-50 p-2"
                          alt=""
                        />
                      </span>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => {
                        handleOpenOctopusPaymentClose();
                        handleOtherPaymentClose();
                      }}
                    >
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
              <div>
                <Dialog
                  open={openAlipayPayment}
                  onClose={handleOpenAlipayPaymentClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <span className="flex items-center justify-center">
                        <img
                          src={AlipalyQRCode}
                          className="w-50 h-50 p-2"
                          alt=""
                        />
                      </span>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => {
                        handleOpenAlipayPaymentClose();
                        handleOtherPaymentClose();
                      }}
                    >
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <form action="" onSubmit={(e) => e.preventDefault()}>
            <p className="text-xl font-medium">Payment Details</p>
            <p className="text-gray-400">
              Complete your order by providing your payment details.
            </p>
            <div className="">
              <label
                htmlFor="card-holder"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Card Holder
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="card-holder"
                  name="card-holder"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 required"
                  placeholder="Your full name"
                  required={paymentMethod === "Cash"}
                  disabled={
                    paymentMethod === "Cash" ||
                    paymentMethod === "Other Payment Method"
                  }
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                  }}
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                    />
                  </svg>
                </div>
              </div>
              <label
                htmlFor="card-no"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Card Details
                <p className="text-red-500 inline-block px-4">
                  {/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(cardNumber) ||
                  paymentMethod === "Cash" ||
                  cardNumber === ""
                    ? ""
                    : "Please enter a valid credit card number in the format xxxx-xxxx-xxxx-xxxx"}
                </p>
              </label>
              <div className="flex">
                <div className="relative w-7/12 flex-shrink-0">
                  <input
                    type="text"
                    id="card-no"
                    name="card-no"
                    disabled={
                      paymentMethod === "Cash" ||
                      paymentMethod === "Other Payment Method"
                    }
                    required={paymentMethod === "Cash"}
                    className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    pattern="^\d{4}-\d{4}-\d{4}-\d{4}$"
                    minLength={19}
                    maxLength={19}
                    value={cardNumber}
                    title="Please enter a valid credit card number in the format xxxx-xxxx-xxxx-xxxx"
                    onChange={(e) => {
                      // Remove hyphens and non-digit characters
                      const input = e.target.value.replace(/\D/g, "");

                      // Insert hyphens after every fourth digit, excluding the last group of four digits
                      const formattedInput = input.replace(
                        /(\d{4}(?!$))/g,
                        "$1-"
                      );

                      // Update the input field with the formatted value
                      e.target.value = formattedInput;
                      setCardNumber(formattedInput);
                    }}
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg
                      className="h-4 w-4 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                      <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                    </svg>
                  </div>
                </div>
                <input
                  type="text"
                  name="credit-expiry"
                  className="w-full rounded-md border border-gray-200 ml-4  px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="MM/YY"
                  minLength={5}
                  maxLength={5}
                  disabled={
                    paymentMethod === "Cash" ||
                    paymentMethod === "Other Payment Method"
                  }
                  value={cardExpiredDate}
                  required={paymentMethod === "Cash"}
                  onChange={(e) => {
                    const input = e.target.value;

                    // Remove any non-numeric characters
                    const numericInput = input.replace(/\D/g, "");

                    // Format the input with a hyphen after the first 2 numbers
                    let formattedInput = numericInput.slice(0, 2);
                    if (numericInput.length > 2) {
                      formattedInput += "/" + numericInput.slice(2);
                    }

                    e.target.value = formattedInput;
                    setCardExpiredDate(e.target.value);
                  }}
                />
                <input
                  type="text"
                  name="credit-cvc"
                  className="w-1/6 flex-shrink-0 rounded-md border ml-4 border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="CVC"
                  minLength={3}
                  maxLength={3}
                  value={cardCVC}
                  required={paymentMethod === "Cash"}
                  disabled={
                    paymentMethod === "Cash" ||
                    paymentMethod === "Other Payment Method"
                  }
                  onChange={(e) => {
                    setCardCVC(e.target.value);
                  }}
                />
              </div>
              <label
                htmlFor="delivery-addresss"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Delivery Address
              </label>
              <div className="flex flex-col sm:flex-row">
                <div className="relative flex-shrink-0 sm:w-7/12">
                  <input
                    type="text"
                    id="delivery-addresss"
                    name="delivery-addresss"
                    className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    value={mainAddress}
                    placeholder="Address"
                    required
                    // disabled={paymentMethod === "Cash"}
                    onChange={(e) => setMainAddress(e.target.value)}
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3"></div>
                </div>
                <select
                  type="text"
                  name="billing-state"
                  className="w-full rounded-md border ml-4 border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  required
                  // disabled={paymentMethod === "Cash"}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  <option value="Hong Kong Island">Hong Kong Island</option>
                  <option value="Kowloon">Kowloon</option>
                  <option value="New Territories">New Territories</option>
                </select>
              </div>
              <div className="relative flex-shrink-0 sm:w-7/12 mt-4">
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  value={optionalAddress}
                  required
                  // disabled={paymentMethod === "Cash"}
                  placeholder="Apartment, suite, etc (optional)"
                  onChange={(e) => setOptionalAddress(e.target.value)}
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3"></div>
              </div>

              <label
                htmlFor="phone"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Phone
              </label>

              <div className="relative flex-shrink-0 sm:w-7/12 mt-4">
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g. 54587412"
                  pattern="^\d{8}$" // Regular expression to match exactly 8 digits
                  required
                  // disabled={paymentMethod === "Cash"}
                  minLength={8}
                  maxLength={8}
                  onChange={(e) => {
                    const input = e.target.value;
                    if (input.length !== 8 || !/^\d{8}$/.test(input)) {
                      e.target.setCustomValidity(
                        "Please enter exactly 8 digits."
                      );
                    } else {
                      e.target.setCustomValidity("");
                    }
                    setPhone(e.target.value);
                  }}
                />
                <div className="flex flex-row items-center mt-2">
                  <Checkbox />
                  Save the user information for next time
                </div>
              </div>
              <div className="mt-4 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Subtotal</p>
                  <p className="font-semibold text-gray-900">
                    $ {totalPrice || 0}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    Delivery Fee
                  </p>
                  <p className="font-semibold text-gray-900">
                    $ {deliveryFees || 0}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">
                  $ {totalPrice + deliveryFees || 0}
                </p>
              </div>
            </div>
            <div className="relative flex flex-row items-end justify-end mt-40">
              <button
                className={`mt-4 mb-8 w-full rounded-md px-6 py-3 font-medium text-white ${
                  isFormValid
                    ? "cursor-pointer bg-green-600 hover:bg-orange-500"
                    : "bg-gray-300"
                }`}
                disabled={!isFormValid}
                onClick={createOrder}
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
