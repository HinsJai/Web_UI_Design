import { useState } from "react";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "../loginStyles.module.css";
import BackgroundVideo from "./BackgroundVideo.js";
// import User from "../User.json";
import { actionType } from "../context/reducer.js";
import { getUser } from "../utils/firebaseFunctions";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Login() {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [username, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [loginFail, setLoginFail] = useState(false);
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  // const [authenticated, setauthenticated] = useState(
  //   localStorage.getItem(localStorage.getItem("isNormalLogin") || false)
  // );

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
    }
  };

  const handleLogin = async () => {
    await getUser(username, password).then((data) => {
      if (data) {
        // If user data is found, log in
        setUserType(data.userType);
        // setauthenticated(true);

        localStorage.setItem("userId", JSON.stringify(data));
        dispatch({
          type: actionType.SET_USER,
          user: data,
        });

        dispatch({ type: actionType.LOGIN_SUCCESS });
        handleLoginSuccess(data.userType);
        console.log("Successfully logged in!");
      } else {
        // If no user data is found, handle the error
        setLoginFail(true);
        setTimeout(() => {
          setLoginFail(false);
        }, 3000);
        console.log("Fail to login");
      }
    });
  };

  const handleLoginSuccess = (userType) => {
    if (userType === "Customer") {
      localStorage.setItem("isNormalLogin", true);
      navigate("/");
    } else if (userType === "Restaurant") {
      localStorage.setItem("isRestaurantLogin", true);
      navigate("/restaurantHome");
    } else if (userType === "Delivery Personnel") {
      localStorage.setItem("isDeliveryPersonnelLogin", true);
      navigate("/googleMaps");
    }
  };

  return (
    <>
      <BackgroundVideo />
      <div className={styles.login_container}>
        <div className={`${styles.login_form_container}`}>
          <div className={styles.left}>
            <div className={styles.form_container}>
              <div className="p-4">
                {loginFail && (
                  <Stack sx={{ width: "500px" }} spacing={2}>
                    <Alert severity="error">Fail to login!</Alert>
                  </Stack>
                )}
              </div>
              <h1>Login Account</h1>
              <div className="mb-4">
                <Box
                  sx={{
                    "& > :not(style)": {
                      width: "38ch",
                      bgcolor: "white",
                      // border: 1,
                      borderColor: "white",
                      borderRadius: "5px",
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    type="email"
                    label="Email"
                    placeholder="e.g. customer@gmail.com"
                    value={username}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </Box>
              </div>

              <div className="mb-4">
                <Box
                  sx={{
                    "& > :not(style)": {
                      width: "38ch",
                      bgcolor: "white",
                      // border: 1,
                      borderColor: "white",
                      borderRadius: "5px",
                    },
                    "&.Mui-error": {
                      borderColor: "red",
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Box>
              </div>

              <button
                type="submit"
                className={`${styles.green_btn} hover:bg-orange-300`}
                onClick={handleLogin}
              >
                Sign In
              </button>
            </div>
            <div
              className="flex justify-between items-center mt-4 mb-4 mx-auto"
              style={{ width: "60%" }}
            >
              <div
                className="border-b-2 border-stone-700"
                style={{ width: "40%" }}
              ></div>
              <p style={{ margin: "0", textAlign: "center" }}>OR</p>
              <div
                className="border-b-2 border-stone-700"
                style={{ width: "40%" }}
              ></div>
            </div>
            <div className="flex flex-row gap-10">
              <GoogleIcon
                sx={{ fontSize: 50 }}
                className="hover:bg-slate-200 rounded-full p-2 cursor-pointer"
                onClick={login}
              />
              <FacebookIcon
                sx={{ fontSize: 50 }}
                className="hover:bg-slate-200 rounded-full p-2 cursor-pointer"
              />
              <TwitterIcon
                sx={{ fontSize: 50 }}
                className="hover:bg-slate-200 rounded-full p-2 cursor-pointer"
              />
            </div>
          </div>
          <div className={styles.right}>
            <h1>Sign up Here ?</h1>
            <Link to="/register">
              <button
                type="button"
                className={`${styles.white_btn} hover:bg-orange-300`}
              >
                Sing Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
