export const fetchUser = () => {
  const userInfo =
    localStorage.getItem("user") !== "undefined" &&
    localStorage.getItem("isNormalLogin") !== false
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  return userInfo;
};

export const fetchNormalUser = () => {
  const isNormalLogin =
    localStorage.getItem("user") !== "undefined" &&
    localStorage.getItem("isNormalLogin") !== false
      ? true
      : localStorage.clear();

  return isNormalLogin;
};

export const fetchCart = () => {
  const cartInfo =
    localStorage.getItem("cartItems") !== "undefined"
      ? JSON.parse(localStorage.getItem("cartItems"))
      : localStorage.clear();

  return cartInfo ? cartInfo : [];
};
