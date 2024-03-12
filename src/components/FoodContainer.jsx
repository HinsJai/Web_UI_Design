import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import Delivery from "../img/delivery.png";
import CartContainer from "./CartContainer";

import {
  MdChevronLeft,
  MdChevronRight,
  MdKeyboardBackspace,
  MdStarRate,
  MdAttachMoney,
  MdLocationOn,
} from "react-icons/md";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const FoodContainer = ({ data }) => {
  // const rowContainer = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const [{ cartItems }, dispatch] = useStateValue();
  const foodContainer = useRef(null);
  const [scrollValue, setScrollValue] = useState(0);

  // Access the item object from the location state
  const { item } = location.state || {};

  const [filteredItems, setFilteredItems] = useState([]);

  const foodType = item.category;
  const deliveryFee = item.deliveryFee;
  const restaurantName = item.title;
  const address = item.address;
  const [openFoodOption, setOpenFoodOption] = useState(false);

  const [items, setItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  const addToCart = () => {
    // Add the delivery fee to the cart items
    console.log(items);

    const updatedItems = items.map((item) => {
      return {
        ...item,
        deliveryFee: deliveryFee,
        restaurantName: restaurantName,
        address: address,
      };
    });
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: updatedItems,
    });
    console.log(JSON.parse(localStorage.getItem("cartItems")));
  };

  useEffect(() => {
    addToCart();
  }, [items]);

  useEffect(() => {
    // Check if data is available before filtering
    if (data) {
      // Filter the items based on the foodType
      const filteredItems = data.filter((item) => item.category === foodType);

      // Update the filteredItems state
      setFilteredItems(filteredItems);
    }
  }, [data, foodType]);

  //smooth the scroll
  useEffect(() => {
    const scrollContainer = foodContainer.current;
    const targetScrollLeft = scrollValue;

    const currentScrollLeft = scrollContainer.scrollLeft;
    const distance = Math.abs(targetScrollLeft - currentScrollLeft);
    const duration = 500;

    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const scrollStep = Math.min(progress / duration, 1) * distance;

      if (currentScrollLeft < targetScrollLeft) {
        scrollContainer.scrollLeft = currentScrollLeft + scrollStep;
      } else {
        scrollContainer.scrollLeft = currentScrollLeft - scrollStep;
      }

      if (progress < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [scrollValue]);

  const handleScrollLeft = () => {
    if (scrollValue > 0) {
      setScrollValue(0);
    } else {
      setScrollValue(scrollValue - 300);
    }
  };

  const handleScrollRight = () => {
    if (scrollValue < 0) {
      setScrollValue(0);
    } else {
      setScrollValue(scrollValue + 300);
    }
  };

  const handleFoodOptionOpen = () => {
    setOpenFoodOption(true);
  };

  const handleFoodOptionClose = () => {
    setOpenFoodOption(false);
  };

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
        <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
          <div
            className="flex items-center gap-2 justify-center  px-4 py-1 hover:bg-orange-200 rounded-full cursor-pointer"
            onClick={() => navigate("/menu")}
          >
            <MdKeyboardBackspace className="text-[2rem] text-green-500" />
            <p className="text-xl px-2 text-green-600">Back</p>
          </div>

          <div className="flex items-center justify-center">
            <img
              src={item.imageURL}
              alt=""
              className="w-auto h-auto object-fit rounded-lg"
            />
          </div>
        </div>

        <div className="py-2 flex-1 flex items-center relative">
          <div className="w-full h-full top-0 left-0 flex items-start justify-start  py-10 gap-4 flex-wrap">
            <div className="w-full mt-6 flex flex-col gap-10 items-start justify-start px-4">
              <p className="text-5xl text-headingColor font-semibold">
                {item?.title}
              </p>
              <div className="flex items-center gap-5">
                <MdLocationOn className="text-3xl" />
                <p className="text-xl text-textColor font-semibold">
                  {item?.address}
                  {item?.deliveryFee}
                </p>
              </div>
              <div className="flex items-center justify-center mt-1">
                <MdStarRate className="text-gray-700 text-4xl inline mr-2" />
                <p className="text-green-600 font-semibold mt-1 text-2xl">
                  {item?.rating}/5 ({item?.reviews}+)
                </p>
              </div>
              <div className="flex items-center gap-5">
                <MdAttachMoney className="text-3xl" />
                <p className="text-3xl text-textColor font-semibold">
                  Delivery Fee: <span className=" text-red-500">$ </span>
                  {item?.deliveryFee}
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 mr-2 overflow-hidden drop-shadow-xl">
                  <img
                    src={Delivery}
                    className="w-full h-full object-contain"
                    alt="delivery"
                  />
                </div>
                <p className="text-2xl text-textColor">
                  Delivery in around 45 min
                </p>
              </div>
              <div>
                <p className="text-xl text-textColor  text-center md:text-left md:w-[80%]">
                  {item?.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full mb-6 mt-10">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-green-400 to-green-600 transition-all ease-in-out duration-100">
            Foods
          </p>
          <div className="hidden md:flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.7 }}
              className="w-10 h-10 rounded-lg bg-green-500 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center "
              onClick={handleScrollLeft}
            >
              <MdChevronLeft className="text-4xl text-white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.7 }}
              className="w-10 h-10 rounded-lg bg-green-500 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center "
              onClick={handleScrollRight}
            >
              <MdChevronRight className="text-4xl text-white" />
            </motion.div>
          </div>
        </div>
      </section>
      <div
        ref={foodContainer}
        className={
          "w-full flex items-center gap-3  my-6 scroll-smooth overflow-x-scroll scrollbar-none"
        }
      >
        {/* {data && data.length > 0 ? (
          data.map((item) => ( */}
        {filteredItems && filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item?.id}
              className="w-275 h-[385px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative border-2 rounded-xl"
            >
              <div className="w-full flex items-center justify-between">
                <motion.div
                  className="w-40 h-40 -mt-8 drop-shadow-2xl cursor-pointer"
                  whileHover={{ scale: 1.2 }}
                  onClick={handleFoodOptionOpen}
                >
                  <img
                    src={item?.imageURL}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                <p className="text-lg text-headingColor font-semibold relative bottom-3">
                  <span className="text-base text-red-500">$ </span>
                  {item?.price}
                </p>

                <motion.div
                  whileTap={{ scale: 0.75 }}
                  className="w-10 h-10 rounded-full bg-red-600 hover:bg-green-400 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                  onClick={() => {
                    // Check if the item is already in the cart
                    const existingItem = items.find(
                      (cartItem) => cartItem.id === item.id
                    );
                    if (existingItem) {
                      // If the item is already in the cart, update its qty
                      console.log(existingItem);
                      existingItem.qty += 1;
                      setItems([...items]); // Update the state with the modified item
                    } else {
                      // If the item is not in the cart, add it with qty 1
                      setItems([
                        ...items,
                        {
                          ...item,
                          qty: 1,
                        },
                      ]);
                    }
                    handleFoodOptionOpen();
                  }}
                >
                  <MdShoppingBasket className="text-white" />
                </motion.div>
              </div>

              <div className="w-full flex flex-col items-end justify-end -mt-2">
                <p className="text-textColor font-semibold text-base md:text-lg uppercase">
                  {item?.title}
                </p>
                <p className="mt-1 text-sm text-gray-500">{item?.desc}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full flex flex-col items-center justify-center">
            <p className="text-xl text-headingColor font-semibold my-2">
              Loading...
            </p>
          </div>
        )}
      </div>
      <div>
        <Dialog
          open={openFoodOption}
          onClose={handleFoodOptionClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Food Option Select"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {/* <span className="border border-gray-400 rounded-xl p-2"> */}
              {/* <textarea
                  rows="4"
                  cols="100"
                  placeholder="Free to write your review..."
                  className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                ></textarea> */}
              {/* </span> */}

              <span className="flex flex-col gap-4 mt-2">
                <span className="text-red-400">Required</span>
                <span className="flex flex-col gap-2">
                  <span className="">
                    <input
                      className="cursor-pointer"
                      id="radio_1"
                      type="radio"
                      name="noodleType"
                    />
                    <span className="font-semibold ml-2">幼麵</span>
                  </span>
                  <span className="">
                    <input
                      className="cursor-pointer"
                      id="radio_2"
                      type="radio"
                      name="noodleType"
                    />
                    <span className="font-semibold ml-2">米粉</span>
                  </span>
                  <span className="">
                    <input
                      className="cursor-pointer"
                      id="radio_3"
                      type="radio"
                      name="noodleType"
                    />
                    <span className="font-semibold ml-2">河粉</span>
                  </span>
                  <span className="">
                    <input
                      className="cursor-pointer"
                      id="radio_3"
                      type="radio"
                      name="noodleType"
                    />
                    <span className="font-semibold ml-2">粗麵</span>
                  </span>
                </span>
                <span className="flex flex-col gap-2">
                  <span className="font-semibold text-black">雙併</span>
                  <span>
                    <input type="checkbox" className="cursor-pointer" />
                    <span className="ml-2 font-semibold">魚皮餃</span>
                  </span>
                  <span>
                    <input type="checkbox" className="cursor-pointer" />
                    <span className="ml-2 font-semibold">豬肉</span>
                  </span>
                  <span>
                    <input type="checkbox" className="cursor-pointer" />
                    <span className="ml-2 font-semibold">魷魚</span>
                  </span>
                  <span>
                    <input type="checkbox" className="cursor-pointer" />
                    <span className="ml-2 font-semibold">牛腩</span>
                  </span>
                </span>

                <span className="flex flex-col gap-2">
                  <span className="font-semibold text-black">
                    飲料
                    <span className="font-semibold text-red-500">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;凍飲 +
                      $8.00
                    </span>
                  </span>

                  <span>
                    <input
                      className="cursor-pointer"
                      id="radio_1"
                      type="radio"
                      name="drink"
                    />
                    <span className="ml-2 font-semibold">凍檸茶</span>
                  </span>
                  <span>
                    <input
                      className="cursor-pointer"
                      id="radio_2"
                      type="radio"
                      name="drink"
                    />
                    <span className="ml-2 font-semibold">凍咖啡</span>
                  </span>
                  <span>
                    <input
                      id="radio_3"
                      type="radio"
                      name="drink"
                      className="cursor-pointer"
                    />
                    <span className="ml-2 font-semibold">凍奶茶</span>
                  </span>
                  <span>
                    <input
                      id="radio_4"
                      type="radio"
                      name="drink"
                      className="cursor-pointer"
                    />
                    <span className="ml-2 font-semibold">熱檸茶</span>
                  </span>
                  <span>
                    <input
                      id="radio_5"
                      type="radio"
                      name="drink"
                      className="cursor-pointer"
                    />
                    <span className="ml-2 font-semibold">熱咖啡</span>
                  </span>
                  <span>
                    <input
                      id="radio_6"
                      type="radio"
                      name="drink"
                      className="cursor-pointer"
                    />
                    <span className="ml-2 font-semibold">熱奶茶</span>
                  </span>
                </span>
              </span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleFoodOptionClose}>Cancel</Button>
            <Button onClick={handleFoodOptionClose} autoFocus>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default FoodContainer;
