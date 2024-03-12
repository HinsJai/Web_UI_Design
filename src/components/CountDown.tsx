import React from "react";
import Countdown from "react-countdown";

const CountDown = () => {
  const endDate = new Date("2023-10-28");
  return <Countdown date={endDate} className="font-bold text-5xl text-yellow-200"/>;
};

export default CountDown;
