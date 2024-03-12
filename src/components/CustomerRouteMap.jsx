import { FaLocationArrow, FaTimes } from "react-icons/fa";
import restaurantIcon from "../img/restaurant_location_icon.png";
import { IoIosRestaurant } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  MarkerF,
  Autocomplete,
  DirectionsRenderer,
  InfoWindowF,
} from "@react-google-maps/api";
import { useRef, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const center = { lat: 22.3425, lng: 114.1062 };

// const markers = [
//   {
//     id: 1,
//     name: "Tsui Yuen Restaurant",
//     phone: "25874136",
//     position: { lat: 22.344726446429735, lng: 114.10720179936284 },
//   },
// ];

const libraries = ["places"];

const CustomerRouteMap = () => {
  //   const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBKommW2kllsVBuoh7Yd53jglvlgTymTv8",
    libraries,
  });

  useEffect(() => {
    if (isLoaded) {
      calculateRoute();
    }
  }, [isLoaded]);

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  //   const [distance, setDistance] = useState("");
  //   const [duration, setDuration] = useState("");
  //   const [activeMarker, setActiveMarker] = useState(null);

  /** @type React.MutableRefObject<HTMLInputElement> */
  //   const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  //   const destiantionRef = useRef();

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  //   const handleActiveMarker = (marker) => {
  //     if (marker === activeMarker) {
  //       return;
  //     }
  //     setActiveMarker(marker);
  //   };

  async function calculateRoute() {
    // if (originRef.current.value === "" || destiantionRef.current.value === "") {
    //   return;
    // }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin:
        "Mayfair Gardens Shopping Centre, Sai Shan Road, Tsing Yi, Hong Kong",
      destination: "Rambler Crest Tower 3, Tsing Yi Road, Tsing Yi, Hong Kong",
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    // setDistance(results.routes[0].legs[0].distance.text);
    // setDuration(results.routes[0].legs[0].duration.text);
  }

  //   function clearRoute() {
  //     setDirectionsResponse(null);
  //     setDistance("");
  //     setDuration("");
  //     originRef.current.value = "";
  //     destiantionRef.current.value = "";
  //   }

  return (
    <div className="flex flex-col items-center relative no-scrollbar">
      <div className="h-full w-full">
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "540px", height: "300px" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          //   onClick={() => setActiveMarker(null)}
          onLoad={(map) => setMap(map)}
        >
          {/* <Marker position={center} /> */}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
          {/*
          {markers.map(({ id, name, phone, position }) => (
            <MarkerF
              key={id}
              position={position}
              onClick={() => handleActiveMarker(id)}
              icon={{
                url: restaurantIcon,
                scaledSize: { width: 50, height: 50 },
              }}
            >
              {activeMarker === id ? (
                <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                  <div className="flex-col gap-4 justify-center items-center">
                    <div>
                      <IoIosRestaurant className="inline w-[30px] h-[30px] "></IoIosRestaurant>
                      <span className="font-semibold text-xl text-gray-400 ml-1">
                        {name}
                      </span>
                    </div>
                    <div className="">
                      <FaPhoneAlt className="inline  w-[30px] h-[20px]" />
                      <span className="font-semibold text-xl text-gray-400 ml-1">
                        {phone}
                      </span>
                    </div>
                    <br />
                    <hr />
                    <div className="mt-2">
                      <span className="text-xl font-semibold">Orders : </span>
                      <span className="font-semibold text-xl text-gray-400">
                        2
                      </span>
                    </div>
                    <div className="flex justify-center items-center mt-2">
                      <button
                        className="bg-emerald-400 p-2 rounded-md text-white text-xl font-semibold hover:bg-orange-500"
                        onClick={() => {
                          navigate("/courierOrders");
                        }}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </InfoWindowF>
              ) : null}
            </MarkerF>
          ))} */}
        </GoogleMap>
      </div>
      {/* <div className="p-4 rounded-lg m-4 bg-white shadow-md min-w-md z-10">
        <div className="flex space-x-2 justify-between">
          <div className="flex-grow">
            <Autocomplete>
              <input
                type="text"
                placeholder="Origin"
                ref={originRef}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </Autocomplete>
          </div>
          <div className="flex-grow">
            <Autocomplete>
              <input
                type="text"
                placeholder="Destination"
                ref={destiantionRef}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </Autocomplete>
          </div>
          <button
            className="bg-emerald-500 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded"
            type="submit"
            onClick={calculateRoute}
          >
            Calculate Route
          </button>
          <FaTimes
            onClick={clearRoute}
            className="cursor-pointer text-xl hover:text-red-500"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <span className="font-medium">Distance: {distance} </span>
          <span className="font-medium">Duration: {duration} </span>
          <FaLocationArrow
            className="cursor-pointer text-xl hover:text-emerald-500"
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          />
        </div>
      </div> */}
    </div>
  );
};

export default CustomerRouteMap;
