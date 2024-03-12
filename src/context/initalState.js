import {
  fetchNormalUser,
  fetchUser,
  fetchCart,
} from "../utils/fetchLocalStorageData";

const userInfo = fetchUser();
const normalUserLogin = fetchNormalUser();
const cartInfo = fetchCart();

export const initialState = {
  user: userInfo,
  isLoggedIn: normalUserLogin,
  restaurantItems: null,
  foodItems: null,
  cartShow: false,
  cartItems: cartInfo,
  restaurantOwnItems: null,
  chatRoom: false,
};
