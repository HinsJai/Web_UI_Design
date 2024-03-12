import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { registerLicense } from '@syncfusion/ej2-base';

import {
  CreateContainer,
  Header,
  HomeContainer,
  MainContainer,
  Login,
  Register,
  RestaurantRegister,
  DeliveryPersonnelRegister,
  Footer,
  FoodContainer,
  RestaurantContainer,
  CreateFoodContainer,
  CartContainer,
  Checkout,
  OrderList,
  Restaurant,
  RestaurantHome,
  MenuManager,
  LiveOrder,
  GoogleMaps,
  CourierOrders,
  CourierOrderList,
  ChatRoom,
  ChatRoomContainer,
  CourierDashboard,
} from "./components";
import { useStateValue } from "./context/StateProvider";
import { getAllRestaurant, getAllFoods, getRestaurantItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";

registerLicense('Ngo9BigBOggjHTQxAR8/V1NHaF5cWWdCf1FpRGVGfV5yd0VEalxYTndcUj0eQnxTdEZiWH5YcXBUT2VfVEVwWA==');


const App = () => {
  const [{ restaurantItems, foodItems, cartShow, restaurantOwnItems,chatRoom }, dispatch] = useStateValue();

  const fetchRestaurantData = async () => {
    await getAllRestaurant().then((data) => {
      dispatch({
        type: actionType.SET_RESTAURANT_ITEMS,
        restaurantItems: data,
      });
    });
  };

  useEffect(() => {
    fetchRestaurantData();
  }, []);


  const fetchRestaurantItems = async () => {
    await getRestaurantItems().then((data) => {
      dispatch({
        type: actionType.SET_RESTAURANT_OWN_ITEMS,
        restaurantOwnItems: data,
      });
    });
  };

  useEffect(() => {
    fetchRestaurantItems();
  }, []);

  useEffect(() => { }, [cartShow,chatRoom]);

  const fetchFoodData = async () => {
    await getAllFoods().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchFoodData();
  }, []);

  return (
    <AnimatePresence mode="wait">
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          {cartShow && <CartContainer />}
          {chatRoom && <ChatRoomContainer />}
          <Routes>
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/createFood" element={<CreateFoodContainer />} />

            <Route
              path="/menu"
              element={<RestaurantContainer data={restaurantItems} />}
            />
            <Route path="/food" element={<FoodContainer data={foodItems} />} />
            <Route path="/" element={<MainContainer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/registerRestaurant"
              element={<RestaurantRegister />}
            />
            <Route
              path="/registerDelivery"
              element={<DeliveryPersonnelRegister />}
            />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orderList" element={<OrderList />} />
            <Route path="/restaurantHome" element={<RestaurantHome />} />
            <Route path="/menuManager" element={<MenuManager data={restaurantOwnItems} />} />
            <Route path="/liveOrder" element={<LiveOrder />} />
            <Route path="/googleMaps" element={<GoogleMaps />} />
            <Route path="/courierOrders" element={<CourierOrders />} />
            <Route path="/courierOrderList" element={<CourierOrderList />} />
            <Route path="/chatRoom" element={<ChatRoom />} />
            <Route path="/courierDashboard" element={<CourierDashboard />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </AnimatePresence>
  );
};

export default App;
