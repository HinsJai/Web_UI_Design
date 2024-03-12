import React, { useEffect, useRef } from "react";
import { useState } from "react";
// import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "../registerStyles.module.css";
import BackgroundVideo from "./BackgroundVideo.js";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { saveUser } from "../utils/firebaseFunctions";

const RestaurantRegister = () => {
  const navigate = useNavigate();
  const [openAgreement, setOpenAgreement] = useState(false);

  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordMatchPatteren, setPasswordMatchPatteren] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState("");
  const [success, setSuccess] = useState(false);

  const [userType, setUserType] = useState("Restaurant");

  const createCustomerUser = async () => {
    try {
      const id = Date.now();
      const data = {
        id: id,
        restaurantName: restaurantName,
        address: address,
        phone: phone,
        email: email,
        password: password,
        userType: userType,
      };
      await saveUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    switch (userType) {
      case "Customer":
        navigate("/register");
        break;
      case "Restaurant":
        navigate("/registerRestaurant");
        break;
      case "Delivery Personnel":
        navigate("/registerDelivery");
        break;
      default:
        navigate("/register");
        break;
    }
  }, [userType]);

  useEffect(() => {
    // Call validateForm whenever any of the form input values change
    setValidPassword(password === confirmPassword);
    checkValidPassword();
    checkValidPhone();
    // validateForm();
  }, [restaurantName, address, phone, email, password, confirmPassword]);

  const clearRegister = () => {
    setRestaurantName("");
    setAddress("");
    setPhone("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setValidPassword(false);
    setPasswordMatchPatteren(false);
    setIsPhoneValid("");
    setAgreedToTerms(false);
  };

  const validateForm = () => {
    if (
      confirmPassword &&
      validPassword &&
      isPhoneValid &&
      passwordMatchPatteren &&
      password === confirmPassword &&
      agreedToTerms
    ) {
      createCustomerUser();
      setSuccess(true);
      clearRegister();
    } else {
      console.log("fail call");
    }
  };

  const checkValidPhone = () => {
    const isPhoneValid = phone && /^\d{8}$/.test(phone);
    setIsPhoneValid(isPhoneValid || phone === "");
  };

  const checkValidPassword = () => {
    const validPatterenPassword =
      password && /^[A-Z][A-Za-z\d]{7,}$/.test(password);
    // console.log(validPatterenPassword);
    setPasswordMatchPatteren(validPatterenPassword || password === "");
  };

  const handleClickOpen = (e) => {
    setOpenAgreement(true);
  };

  const handleDisgreeClose = () => {
    setAgreedToTerms(false);
    setOpenAgreement(false);
  };

  const handleAgreeClose = () => {
    setAgreedToTerms(true);
    setOpenAgreement(false);
  };

  useEffect(() => {
    checkValidPassword();
    setValidPassword(password === confirmPassword);
  }, [password, confirmPassword]);

  return (
    <>
      <BackgroundVideo />
      <div className={styles.signup_container}>
        <div className={styles.signup_form_container}>
          <div className={styles.left}>
            <h1>Welcome Back</h1>
            <Link to="/login">
              <button
                type="button"
                className={`${styles.white_btn} hover:bg-orange-300`}
              >
                Sign in
              </button>
            </Link>
          </div>
          <form
            className={styles.form_container}
            onSubmit={(e) => {
              e.preventDefault();
              validateForm();
            }}
          >
            <div className={styles.right}>
              {success && (
                <div className="">
                  <Alert
                    severity="success"
                    color="success"
                    sx={{
                      width: "500px",
                      fontSize: "16px",
                    }}
                  >
                    Register successfully!
                  </Alert>
                </div>
              )}
              <h1>Create Account</h1>

              <div className="flex justify-center items-center gap-10 py-2">
                <span className="font-semibold">Type of User: </span>
                <Box sx={{ minWidth: 120, backgroundColor: "#46c2ab" }}>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={userType}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      onChange={(e) => {
                        setUserType(e.target.value);
                      }}
                      sx={{ height: 50, fontWeight: "bold" }}
                    >
                      <MenuItem value={"Customer"}>Customer</MenuItem>
                      <MenuItem value={"Restaurant"}>Restaurant</MenuItem>
                      <MenuItem value={"Delivery Personnel"}>
                        Delivery Personnel
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <div className="flex flex-col gap-4 p-4">
                <Box
                  // component="form"
                  sx={{
                    "& > :not(style)": {
                      width: "46ch",
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
                    required
                    label="Restaurant Name"
                    placeholder="e.g. Yummy Restaurant"
                    value={restaurantName}
                    onChange={(e) => {
                      setRestaurantName(e.target.value);
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    "& > :not(style)": {
                      width: "46ch",
                      bgcolor: "white",
                      borderColor: "white",
                      borderRadius: "5px",
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    type="email"
                    required
                    label="Email"
                    placeholder="e.g. customer@gmail.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    "& > :not(style)": {
                      width: "46ch",
                      bgcolor: "white",
                      borderColor: "white",
                      borderRadius: "5px",
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    required
                    label="Address"
                    placeholder="e.g. Shop A, G/F, Ruby Mansion, 38-42 Nullah Road Prince Edward."
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    "& > :not(style)": {
                      width: "46ch",
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
                    required
                    type="number"
                    label="Phone"
                    placeholder="e.g. 58745128"
                    // pattern="^\d{8}$"
                    minLength={8}
                    maxLength={8}
                    value={phone}
                    inputProps={{
                      pattern: "\\d{8}", // This enforces 8 digits
                    }}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    error={!isPhoneValid}
                  />
                </Box>
                <Box
                  sx={{
                    "& > :not(style)": {
                      width: "46ch",
                      bgcolor: "white",
                      // border: 1,
                      borderColor: "white",
                      borderRadius: "5px",
                    },
                    "&.Mui-error": {
                      // This style applies when there's an error
                      borderColor: "red", // Change the border color to red
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    type="password"
                    required
                    label="Password"
                    placeholder="first letter is upper letter and total size of 8"
                    value={password}
                    // inputProps={{
                    //   pattern: "/^[A-Z][A-Za-zd]{8,}$/",
                    // }}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    error={!passwordMatchPatteren}
                    // defaultValue="First Name"
                  />
                </Box>

                <Box
                  // component="form"
                  sx={{
                    "& > :not(style)": {
                      width: "46ch",
                      bgcolor: "white",
                      // border: 1,
                      // borderColor: "white",
                      borderColor: "error.main",
                      borderRadius: "5px",
                    },
                    "&.Mui-error": {
                      // This style applies when there's an error
                      borderColor: "red", // Change the border color to red
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    type="password"
                    required
                    label="Confirm Password"
                    value={confirmPassword}
                    placeholder="same with password"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      // checkValidPassword();
                    }}
                    // error={!validPassword}
                    error={!(password === confirmPassword)}

                    // defaultValue="First Name"
                  />
                </Box>
              </div>
              <div className=" relative right-8 flex items-center justify-center">
                <Checkbox
                  checked={agreedToTerms}
                  onClick={() => setAgreedToTerms(!agreedToTerms)}
                  required
                />
                <p className="flex items-center justify-center">
                  I have read and agree to the
                  <span
                    className="text-blue-800 ml-1 cursor-pointer hover:border-blue-800 hover:border-b-2"
                    onClick={handleClickOpen}
                  >
                    terms of service
                  </span>
                </p>

                <Dialog
                  open={openAgreement}
                  keepMounted
                  onClose={handleDisgreeClose}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle>
                    {"Use Yummy Fast delivery service?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      You must be of legal age and capacity to use our services.
                      By using our services, you represent that you meet these
                      criteria. To access certain features, you may be required
                      to register. You are responsible for providing accurate
                      information during registration.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleDisgreeClose}>Disagree</Button>
                    <Button onClick={handleAgreeClose}>Agree</Button>
                  </DialogActions>
                </Dialog>
              </div>
              {/* {error && <div className={styles.error_msg}>{error}</div>} */}
              <button
                type="submit"
                className={`${styles.green_btn} hover:bg-orange-300`}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RestaurantRegister;
