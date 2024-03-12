import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MdStarRate } from "react-icons/md";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useStateValue } from "../context/StateProvider";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../utils/data";
import { useNavigate } from "react-router-dom";

const RestaurantContainer = () => {
  const [{ restaurantItems }, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);
  const restaurantContainer = useRef(null);
  const navigate = useNavigate();

  const [filter, setFilter] = useState("noodle");

  const restaurantType = restaurantItems?.filter((n) => n.category === filter);

  //smooth the scroll
  useEffect(() => {
    const scrollContainer = restaurantContainer.current;
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

  return (
    <div
      id="menu"
      className="w-full h-auto flex flex-col items-center justify-center"
    >
      <div className="flex items-center justify-center mb-4">
        <h1 className="font-semibold text-4xl">Near you</h1>
      </div>

      <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
        {categories &&
          categories.map((category) => (
            <motion.div
              whileTap={{ scale: 0.75 }}
              key={category.id}
              className={`group ${
                filter === category.category ? "bg-green-500" : "bg-card"
              } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-orange-500 `}
              onClick={() => setFilter(category.category)}
            >
              <div
                className={`w-10 h-10 rounded-full shadow-lg ${
                  filter === category.category ? "bg-white" : "bg-green-500"
                } group-hover:bg-white flex items-center justify-center`}
              >
                <IoFastFood
                  className={`${
                    filter === category.category
                      ? "text-textColor"
                      : "text-white"
                  } group-hover:text-textColor text-lg`}
                />
              </div>
              <p
                className={`text-sm ${
                  filter === category.category ? "text-white" : "text-textColor"
                } group-hover:text-white`}
              >
                {category.name}
              </p>
            </motion.div>
          ))}
      </div>

      <div className="w-full flex items-center justify-between">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-24 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-green-400 to-green-600 transition-all ease-in-out duration-100">
          {filter}
        </p>
        <div className="hidden md:flex gap-3 items-center">
          <motion.div
            whileTap={{ scale: 0.7 }}
            className="w-10 h-10 rounded-lg bg-green-500 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
            onClick={handleScrollLeft}
          >
            <MdChevronLeft className="text-4xl text-white" />
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.7 }}
            className="w-10 h-10 rounded-lg bg-green-500 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
            onClick={handleScrollRight}
          >
            <MdChevronRight className="text-4xl text-white" />
          </motion.div>
        </div>
      </div>
      <div
        className={`w-full flex items-center gap-3  my-2 cursor-pointer .scroll-container overflow-x-scroll scrollbar-none`}
        ref={restaurantContainer}
      >
        {restaurantType && restaurantType.length > 0 ? (
          restaurantType.map((item) => (
            <div
              key={item?.id}
              className="w-275 h-[330px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative border-2"
              // onClick={() => navigate("/food")}
              onClick={() => navigate("/food", { state: { item } })}
            >
              <div className="flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-full h-full -mt-8 drop-shadow-2xl"
                >
                  <img
                    src={item?.imageURL}
                    alt=""
                    className="w-80 h-40 object-fit rounded-lg"
                  />
                  <div className="rounded-lg bg-green-300 flex items-center justify-center">
                    Around 40 min
                  </div>
                </motion.div>
              </div>

              <div className="w-full mt-6 flex flex-col gap-4 items-start justify-start px-4">
                <p className="text-2xl h-12 text-headingColor font-semibold">
                  {item?.title}
                </p>
                <div className="flex items-center justify-center mt-1">
                  <MdStarRate className="text-gray-700 text-2xl inline mr-2" />
                  <p className="text-green-600 font-semibold mt-1">
                    {item?.rating}/5 ({item?.reviews}+)
                  </p>
                </div>
                <div className="flex items-center gap-8">
                  <p className="text-lg text-textColor font-semibold">
                    Delivery Fee: <span className=" text-red-500">$ </span>
                    {item?.deliveryFee}
                  </p>
                </div>
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
    </div>
  );
};

export default RestaurantContainer;
