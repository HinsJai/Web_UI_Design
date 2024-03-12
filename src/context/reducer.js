export const actionType = {
  SET_USER: "SET_USER",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  SET_RESTAURANT_ITEMS: "SET_RESTAURANT_ITEMS",
  SET_FOOD_ITEMS: "SET_FOOD_ITEMS",
  SET_CART_SHOW: "SET_CART_SHOW",
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_RESTAURANT_OWN_ITEMS: "SET_RESTAURANT_OWN_ITEMS",
  SET_CHAT_ROOM_SHOW: "SET_CHAT_ROOM_SHOW",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };
    case actionType.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case actionType.SET_RESTAURANT_ITEMS:
      return {
        ...state,
        restaurantItems: action.restaurantItems,
      };
    case actionType.SET_FOOD_ITEMS:
      return {
        ...state,
        foodItems: action.foodItems,
      };
    case actionType.SET_CART_SHOW:
      return {
        ...state,
        cartShow: action.cartShow,
      };
    case actionType.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.cartItems,
      };
    case actionType.SET_RESTAURANT_OWN_ITEMS:
      return {
        ...state,
        restaurantOwnItems: action.restaurantOwnItems,
      };
    case actionType.SET_CHAT_ROOM_SHOW:
      return {
        ...state,
        chatRoom: action.chatRoom,
      };

    default:
      return state;
  }
};

export default reducer;
