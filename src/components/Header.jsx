import React, { useState, useEffect } from "react";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import RestaurantIcon from "../img/chef1.png";
import CustomerIcon from "../img/client.png";
import DeliveryPersonnelIcon from "../img/delivery.png";
import Logo from "../img/yummy-logo.png";
import UserIcon from "../img/avatar.png";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ isLoggedIn }] = useStateValue(); //check normal login user instead of google login,ect

  const [{ user, cartShow, cartItems, chatRoom }, dispatch] = useStateValue();

  const [customerIcon, setCustomerIcon] = useState(UserIcon);

  const [isMenu, setIsMenu] = useState(false);

  const navigate = useNavigate();

  const userType = JSON.parse(localStorage.getItem("userId")) || {};

  const [homeType, setHomeType] = useState("/");

  const [menuType, setMenuType] = useState("/menu");

  // console.log(isLoggedIn);

  const login = async () => {
    if (!user && !localStorage.getItem("isNormalLogin")) {
      try {
        const {
          user: { refreshToken, providerData },
        } = await signInWithPopup(firebaseAuth, provider);
        dispatch({
          type: actionType.SET_USER,
          user: providerData[0],
        });
        localStorage.setItem("user", JSON.stringify(providerData[0]));
        localStorage.setItem("userId", JSON.stringify(providerData[0].email));

        navigate("/");
      } catch (error) {
        console.log("Firebase authentication error:", error);
      }
    } else {
      setIsMenu(!isMenu);
    }
  };

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     setCustomerIcon(CustomerIcon);
  //   } else {
  //     setCustomerIcon(UserIcon);
  //   }
  // }, [isLoggedIn]);

  useEffect(() => {
    if (localStorage.getItem("isNormalLogin")) {
      setCustomerIcon(CustomerIcon);
      setHomeType("/");
      setMenuType("/menu");
    } else if (localStorage.getItem("user")) {
      setCustomerIcon(user.photoURL);
      setHomeType("/");
    } else if (localStorage.getItem("isRestaurantLogin")) {
      setHomeType("restaurantHome");
      setMenuType("/menuManager");
      setCustomerIcon(RestaurantIcon);
    } else if (localStorage.getItem("isDeliveryPersonnelLogin")) {
      setCustomerIcon(DeliveryPersonnelIcon);
      setHomeType("/googleMaps");
    }
  }, [isLoggedIn, user]);

  const logout = () => {
    setIsMenu(false);
    setMenuType("/menu");
    setHomeType("/");
    setCustomerIcon(UserIcon);

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });

    dispatch({
      type: actionType.LOGOUT_SUCCESS,
      isLoggedIn: false,
    });
    localStorage.clear();
  };

  const showChatRoom = () => {
    dispatch({
      type: actionType.SET_CHAT_ROOM_SHOW,
      chatRoom: !chatRoom,
    });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  function headingColor() {
    if (userType.userType === "Restaurant") {
      return "bg-blue-200";
    } else if (userType.userType === "Delivery Personnel") {
      return "bg-green-200";
    } else {
      return "bg-primary";
    }
  }

  return (
    <header
      className={`fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 ${headingColor()}`}
    >
      {/* desktop & tablet */}
      <div className="hidden  md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img
            src={Logo}
            className="w-12 object-cover rounded-full "
            alt="logo"
          />
          <p className="text-3xl font-bold" style={{ color: "#3bb19b" }}>
            Yummy Fast
          </p>
        </Link>

        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-24 "
          >
            <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              <Link to={homeType}>
                <p className="heading">Home</p>
              </Link>
            </li>
            {localStorage.getItem("isDeliveryPersonnelLogin") && (
              <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                <motion.div className="relative flex items-center justify-center">
                  <Link to={"/courierDashboard"}>
                    <p className="heading">Dashboard</p>
                  </Link>
                </motion.div>
              </li>
            )}
            {(user && user.email === "jason199754@gmail.com") ||
              (localStorage.getItem("isRestaurantLogin") && (
                <Link to={"/liveOrder"}>
                  <p className="heading">Live Order</p>
                </Link>
              ))}
            <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              {(user && user.email === "jason199754@gmail.com" || !localStorage.getItem("isDeliveryPersonnelLogin")) ||
              localStorage.getItem("isRestaurantLogin") === "true" ||
              localStorage.getItem("isNormalLogin") === "true" ? (
                <Link to={menuType}>
                  <p className="heading">Menus</p>
                </Link>
              ) : (
                localStorage.getItem("isDeliveryPersonnelLogin") === "true" &&  (
                  <Link to={"/courierOrderList"}>
                    <p className="heading">Orders</p>
                  </Link>
                )
              )}
            </li>
            {(localStorage.getItem("isNormalLogin") ||
              localStorage.getItem("user")) && (
              <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                <p className="heading">
                  <Link to={"/orderList"}>Orders</Link>
                </p>
              </li>
            )}{" "}
            {localStorage.getItem("isDeliveryPersonnelLogin") && (
              <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                <motion.div
                  className="relative flex items-center justify-center"
                  // whileHover={{ scale: 1.4 }}
                  // whileTap={{ scale: 0.8 }}
                  onClick={showChatRoom}
                >
                  <p className="heading">Chat</p>

                  <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                    <p className="text-xs text-white font-semibold">{0}</p>
                  </div>
                </motion.div>
              </li>
            )}
            <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              <Link
                to={
                  user || localStorage.getItem("isNormalLogin")
                    ? "/login"
                    : "/login"
                }
                onClick={logout}
              >
                <p className="heading">
                  {user ||
                  localStorage.getItem("isNormalLogin") ||
                  localStorage.getItem("isRestaurantLogin") ||
                  localStorage.getItem("isDeliveryPersonnelLogin")
                    ? "Logout"
                    : "Login | Signup"}
                </p>
              </Link>
            </li>
          </motion.ul>

          {localStorage.getItem("isNormalLogin") && (
            <motion.div
              className="relative flex items-center justify-center"
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.8 }}
              onClick={showCart}
            >
              <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" />
              {cartItems && cartItems.length > 0 && (
                <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                  <p className="text-xs text-white font-semibold">
                    {cartItems.length}
                  </p>
                </div>
              )}
            </motion.div>
          )}

          <div className="relative">
            <motion.img
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.6 }}
              // src={user ? user.photoURL : UserIcon}
              src={customerIcon}
              // src={localStorage.getItem("isNormalLogin")?CustomerIcon:UserIcon}

              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="userprofile"
              // onClick={login}
              onClick={() => (isMenu ? setIsMenu(false) : setIsMenu(true))}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                {(user && user.email === "jason199754@gmail.com") ||
                  (localStorage.getItem("isRestaurantLogin") && (
                    // {user || localStorage.getItem("isNormalLogin")&& (
                    <>
                      <Link to={"/createItem"}>
                        <p
                          className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base font-bold"
                          onClick={() => setIsMenu(false)}
                        >
                          Create Restaurant <MdAdd />
                        </p>
                      </Link>
                      <Link to={"/createFood"}>
                        <p
                          className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base font-bold"
                          onClick={() => setIsMenu(false)}
                        >
                          Create Food <MdAdd />
                        </p>
                      </Link>
                    </>
                  ))}

                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base font-bold"
                  onClick={
                    user || localStorage.getItem("isNormalLogin")
                      ? logout
                      : login
                  }
                >
                  {user || localStorage.getItem("isNormalLogin")
                    ? "Logout"
                    : "Login"}
                  <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {/* mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full ">
        {localStorage.getItem("isNormalLogin") && (
          <motion.div
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.8 }}
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" />
            {cartItems && cartItems.length > 0 && (
              <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </motion.div>
        )}

        <Link to={"/"} className="flex items-center gap-2">
          <img
            src={Logo}
            className="w-8 object-cover rounded-full"
            alt="logo"
          />
          <p
            className="text-headingColor text-4xl font-bold"
            style={{ color: "#3bb19b" }}
          >
            Yummy Fast
          </p>
        </Link>

        <div className="relative">
          <motion.img
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.6 }}
            // src={user ? user.photoURL : UserIcon}
            // src={localStorage.getItem("isNormalLogin")?CustomerIcon:UserIcon}
            src={customerIcon}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full mr-1"
            alt="userprofile"
            onClick={() => (isMenu ? setIsMenu(false) : setIsMenu(true))}
            // onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
            >
              {user && user.email === "jason199754@gmail.com" && (
                <>
                  <Link to={"/createItem"}>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base font-bold"
                      onClick={() => setIsMenu(false)}
                    >
                      Create Restaurant <MdAdd />
                    </p>
                  </Link>
                  <Link to={"/createFood"}>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base font-bold"
                      onClick={() => setIsMenu(false)}
                    >
                      Create Food <MdAdd />
                    </p>
                  </Link>
                </>
              )}

              <ul className="flex flex-col ">
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  <Link to={"/"}>Home</Link>
                </li>

                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  <Link to={menuType}>Menus</Link>
                </li>
                {(localStorage.getItem("isNormalLogin") ||
                  localStorage.getItem("user")) && (
                  <li
                    className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                    onClick={() => setIsMenu(false)}
                  >
                    <Link to={"/orderList"}>Orders</Link>
                  </li>
                )}
                {/* <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  <Link
                    to={isLoggedIn || user ? "/login" : "/login"}
                    onClick={logout}
                  >
                    {isLoggedIn || user ? "Logout" : "Login"}
                  </Link>
                </li> */}
              </ul>

              <p
                className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base font-bold"
                onClick={
                  user || localStorage.getItem("isNormalLogin") ? logout : login
                }
              >
                {user ||
                localStorage.getItem("isNormalLogin") ||
                localStorage.getItem("isRestaurantLogin")
                  ? "Logout"
                  : "Login | Signup"}
                <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
