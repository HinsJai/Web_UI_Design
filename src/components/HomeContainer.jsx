import React from "react";
import Delivery from "../img/delivery.png";
import HeroBg from "../img/heroBg.png";
import { heroData } from "../utils/data";
import Offer from "./Offer.jsx";
import { useNavigate } from "react-router-dom";

const HomeContainer = () => {
  const navigate = useNavigate();

  return (
    <>
      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
        id="home"
      >
        <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
          <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
            <p className="text-base text-green-500 font-semibold">
              Bike Delivery
            </p>
            <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
              <img
                src={Delivery}
                className="w-full h-full object-contain"
                alt="delivery"
              />
            </div>
          </div>

          <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
            The Fastest Delivery to
            <span className="text-green-600 text-[3rem] lg:text-[5rem]">
              Your Door
            </span>
          </p>

          <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
            We started as a restaurant food-delivery service, working with
            national dining chains as well as local, independent favourites. Our
            service unlocked delivery for over 90% of the partners on our
            platform – businesses that never previously offered delivery. Our
            model has dramatically expanded the number of restaurants that can
            offer delivery and as a result it has opened up new food options for
            consumers around the world.
          </p>

          <button
            type="button"
            className="bg-gradient-to-br from-green-300 to-orange-300 w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
            onClick={() => {
              navigate("/menu");
            }}
          >
            Order Now
          </button>
        </div>
        <div className="py-2 flex-1 flex items-center relative">
          <img
            src={HeroBg}
            className=" ml-auto h-420 w-full  lg:h-650"
            alt="hero-bg"
          />

          <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-36  py-4 gap-4 flex-wrap">
            {heroData &&
              heroData.map((food) => (
                <div
                  key={food.id}
                  className="  lg:w-190  p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
                >
                  <img
                    src={food.imageSrc}
                    className="w-20 lg:w-40 -mt-10 lg:-mt-20 "
                    alt=""
                  />
                  <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                    {food.name}
                  </p>

                  <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">
                    {food.desc}
                  </p>

                  <p className="text-sm font-semibold text-headingColor">
                    <span className="text-xs text-red-600">$</span>
                    {food.price}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>
      <Offer />
    </>
  );
};

export default HomeContainer;
