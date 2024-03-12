import React from "react";
import CountDown from "./CountDown.tsx";
import OfferProduct from "../img/offerProduct.png";
import BgOffer from "../img/offerBg.png";
import { useNavigate } from "react-router-dom";

const Offer = () => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-offer h-500 flex flex-col md:flex-row md:justify-between md:h-[80vh]"
      style={{ backgroundImage: `url(${BgOffer})`, backgroundSize: "cover" }}
    >
      {/* text container */}
      <div className="flex-1 flex flex-col justify-center items-center text-center gap-8 p-6">
        <h1 className="text-white text-5xl font-bold xl:text-6xl">
          Delicious Burger & French Fry
        </h1>
        <p className="text-white xl:text-3xl">
          Progressively simplify effective e-toilers and process-centric methods
          of empowerment. Quickly pontificate parallel.
        </p>
        <CountDown />
        <button className="orderBtn" onClick={() => navigate("/menu")}>
          Order Now
        </button>
      </div>
      {/* img container */}
      <div className="flex-1 w-full relative md:h-full flex justify-center items-center">
        <img src={OfferProduct} alt="" className="object-contain" />
      </div>
    </div>
  );
};

export default Offer;
