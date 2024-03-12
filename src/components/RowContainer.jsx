import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MdStarRate } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();
  const navigate = useNavigate();
  
  useEffect(() => {
    const scrollContainer = rowContainer.current;
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

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-3  my-2 cursor-pointer .scroll-container ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-275 h-[330px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative border-2"
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
  );
};

export default RowContainer;
