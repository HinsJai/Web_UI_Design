import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";

const ScrollButton = ({ direction, onClick }) => (
  <motion.div
    whileTap={{ scale: 0.7 }}
    className="w-10 h-10 rounded-lg bg-green-500 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center "
    onClick={onClick}
  >
    {direction === "left" ? (
      <MdChevronLeft className="text-4xl text-white" />
    ) : (
      <MdChevronRight className="text-4xl text-white" />
    )}
  </motion.div>
);

ScrollButton.propTypes = {
  direction: PropTypes.oneOf(["left", "right"]).isRequired,
  onClick: PropTypes.func.isRequired,
};

const MainContainer = () => {
  const [{ restaurantItems }, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);

  const handleScroll = useCallback(
    (direction) => {
      if (
        (scrollValue > 0 && direction === "left") ||
        (scrollValue < 0 && direction === "right")
      ) {
        setScrollValue(0);
      }
      setScrollValue(
        (scrollValue) => scrollValue + (direction === "left" ? -400 : 400)
      );
    },
    [scrollValue]
  );

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />
      <section className="w-full mb-6 mt-10">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-green-400 to-green-600 transition-all ease-in-out duration-100">
            Restaurant
          </p>
          <div className="hidden md:flex gap-3 items-center">
            <ScrollButton
              direction="left"
              onClick={() => handleScroll("left")}
            />
            <ScrollButton
              direction="right"
              onClick={() => handleScroll("right")}
            />
          </div>
        </div>
        <RowContainer
          scrollValue={scrollValue}
          flag={true}
          data={restaurantItems}
        />
      </section>
    </div>
  );
};

export default React.memo(MainContainer);
