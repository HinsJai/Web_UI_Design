import { FaLocationArrow, FaTimes } from "react-icons/fa";
import restaurantIcon from "../img/restaurant_location_icon.png";
import { IoIosRestaurant } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEventNote } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdNotifications, IoIosTime } from "react-icons/io";

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
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";

const center = { lat: 22.3425, lng: 114.1062 };

const markers = [
  {
    id: 1,
    name: "Tsui Yuen Restaurant",
    phone: "25874136",
    orders: 4,
    position: { lat: 22.344726446429735, lng: 114.10720179936284 },
  },
  {
    id: 2,
    name: "花花宮煮",
    phone: "25784125",
    orders: 3,
    position: { lat: 22.344594963407665, lng: 114.10727153679427 },
  },
  {
    id: 3,
    name: "Korean Table Restaurant",
    phone: "29856314",
    orders: 2,
    position: { lat: 22.34421105708035, lng: 114.10771208961665 },
  },
  {
    id: 4,
    name: "初心",
    phone: "233691125",
    orders: 2,
    position: { lat: 22.34383707379282, lng: 114.1068683205513 },
  },
];

const libraries = ["places"];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const GoogleMaps = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  }, []);
  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBKommW2kllsVBuoh7Yd53jglvlgTymTv8",
    libraries,
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [activeMarker, setActiveMarker] = useState(null);

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  return (
    <div className="mt-2">
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid Grid xs={2} sm={3} md={3}>
            <Item sx={{ bgcolor: "greenyellow" }}>
              <div>
                <MdOutlineEventNote className="text-emerald-500 text-4xl ml-1" />
              </div>
              <div className="flex items-start p-2">
                <p className="font-semibold text-2xl">Nearly Orders : </p>
                <p className="text-2xl ml-1 text-gray-600">11</p>
              </div>
            </Item>
          </Grid>
          <Grid Grid xs={2} sm={3} md={3}>
            <Item sx={{ bgcolor: "#eeeeee" }}>
              <div>
                <FaLocationDot className=" text-4xl ml-1" />
              </div>
              <div className="flex items-start p-2">
                <p className="font-semibold text-2xl">Location : </p>
                <p className="text-2xl ml-1 text-gray-600">TSING YI IVE</p>
              </div>
            </Item>
          </Grid>
          <Grid Grid xs={2} sm={3} md={3}>
            <Item sx={{ bgcolor: "#f8bbd0" }}>
              <div>
                <IoMdNotifications className="text-red-500  text-4xl ml-1" />
              </div>
              <div className="flex items-start p-2">
                <p className="font-semibold text-2xl">Notification : </p>
                <p className="text-2xl ml-1 text-gray-600">0</p>
              </div>
            </Item>
          </Grid>
          <Grid Grid xs={2} sm={3} md={3}>
            <Item sx={{ bgcolor: "#b3e5fc" }}>
              <div>
                <IoIosTime className="text-blue-500  text-4xl ml-1" />
              </div>
              <div className="flex items-start p-2">
                <p className="font-semibold text-2xl">Date Time : </p>
                <p className="text-xl ml-1 font-semibold text-gray-600">
                  {time.toLocaleTimeString() + "   "}
                  {time.toLocaleDateString()}
                </p>
              </div>
            </Item>
          </Grid>
        </Grid>
      </Box>
      <div className="mt-2">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item sx={{ height: "80%" }}>
                {markers.map(({ id, name, phone, orders, position }) => (
                  <div key={id}>
                    <div className="flex-col gap-2 justify-start items-start  border-2 rounded-md mt-2 p-2">
                      <div className="flex items-start justify-start">
                        <div className="font-semibold text-xl  ml-1">
                          <IoIosRestaurant className="inline  w-[30px] h-[30px]" />
                          <span className="text-gray-400 ml-4 text-2xl">
                            {name}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start justify-start mt-2">
                        <div className="font-semibold text-xl  ml-1">
                          <FaPhoneAlt className="inline  w-[30px] h-[20px]" />
                          <span className="text-gray-400 ml-4 text-2xl">
                            {phone}
                          </span>
                        </div>
                        <div className="absolute left-60">
                          <button
                            className="bg-emerald-400 p-2 rounded-md text-white ml-60 text-xl font-semibold hover:bg-orange-500"
                            onClick={() => {
                              navigate("/courierOrders");
                            }}
                          >
                            Details
                          </button>
                        </div>
                      </div>
                      <div className="flex items-start justify-start mt-2">
                        <span className="text-xl font-semibold">
                          <MdOutlineEventNote className="text-emerald-500 text-4xl ml-1" />
                        </span>
                        <span className="text-gray-400 ml-4 text-2xl">
                          {orders}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </Item>
            </Grid>

            <Grid xs={8}>
              <div className="flex flex-col items-center h-screen w-screen relative">
                <div className="absolute top-0 left-0 right-0 h-[80%] w-[62%] border-2 border-emerald-500">
                  <GoogleMap
                    center={center}
                    zoom={16}
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    options={{
                      zoomControl: false,
                      streetViewControl: false,
                      mapTypeControl: false,
                      fullscreenControl: false,
                    }}
                    onClick={() => setActiveMarker(null)}
                    onLoad={(map) => setMap(map)}
                  >
                    <Marker position={center} />
                    {directionsResponse && (
                      <DirectionsRenderer directions={directionsResponse} />
                    )}
                    {markers.map(({ id, name, phone, orders, position }) => (
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
                          <InfoWindowF
                            onCloseClick={() => setActiveMarker(null)}
                          >
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
                                <span className="text-xl font-semibold">
                                  Orders :{" "}
                                </span>
                                <span className="font-semibold text-xl text-gray-400">
                                  {orders}
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
                    ))}
                  </GoogleMap>
                </div>
                <div className="absolute left-[15%] p-4 rounded-lg m-4  bg-white shadow-md min-w-md z-10">
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
                        map.setZoom(20);
                      }}
                    />
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default GoogleMaps;
