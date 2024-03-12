import React, { useEffect, useState } from "react";
import { getRestaurantItems } from "../utils/firebaseFunctions";
import { motion } from "framer-motion";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import EditFoodContainer from "./EditFoodContainer.jsx";

import { MdDelete } from "react-icons/md";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import { deleteFoodData } from "../utils/firebaseFunctions";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

import SoftDrinkDataGrid from "./SoftDrinkDataGrid.jsx";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MenuManager = ({ data }) => {
  const navigate = useNavigate();

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [editFood, setEditFood] = useState(null);
  const [deleteFood, setDeleteFood] = useState(null);
  const [open, setOpen] = useState(false);

  const [alert, setAlert] = useState("invisible");

  const [userType, setUserType] = useState(
    JSON.parse(localStorage.getItem("userId")) || {}
  );
  const [restaurantItems, setRestaurantItems] = useState([]);

  const [filteredItems, setFilteredItems] = useState([]);

  const searchItem = restaurantItems.map((item) => ({ label: item?.title }));

  const [soldOutItem, setSoldOutItem] = useState("");

  const handleRestaurantItems = async () => {
    await getRestaurantItems(userType.email).then((data) => {
      if (data) {
        setRestaurantItems(data); // Set the restaurant items in state
      } else {
        console.log("Fail to get restaurant items");
      }
    });
  };

  useEffect(() => {
    handleRestaurantItems();

    if (restaurantItems.length > 0 && selectedItem && selectedItem.label) {
      const filteredItems = restaurantItems.filter(
        (item) => item.title === selectedItem.label
      );
      setFilteredItems(filteredItems);
    } else {
      setSelectedItem(null);
      setFilteredItems([]);
    }
  }, [data, selectedItem, alert]);

  const handleItemSelect = (event, value) => {
    setSelectedItem(value);
  };

  const isOptionEqualToValue = (option, value) => option.label === value.label;

  const handleDeleteClick = (item) => {
    setDeleteFood(item);
    handleDeleteOpen();
  };

  const handleEditItemClick = (item) => {
    setEditFood(item);
    handleClickOpen();
    // setDeleteOpen(false);
  };

  const handleDeleteItem = () => {
    deleteFoodData(deleteFood.id);
    setDeleteOpen(false);
    setAlert("visible");
    setTimeout(() => {
      setAlert("invisible");
    }, 4000);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const soldOut = (itemId) => {
    if (soldOutItem) {
      setSoldOutItem("");
    } else {
      setSoldOutItem(itemId);
    }
  };

  return (
    <>
      {/* <div> */}
      <div className="flex items-center justify-start mt-4 mb-4">
        <h1 className="text-gray-700 text-4xl font-semibold">Menu Manager</h1>
        <Stack sx={{ width: "50%" }} spacing={2} className={`ml-4 ${alert}`}>
          <Alert severity="success" variant="filled">
            <AlertTitle>Success</AlertTitle>
            <p className="font-semibold"> Food items is delete successfully!</p>
          </Alert>
        </Stack>
        <Autocomplete
          className="absolute right-14"
          disablePortal
          id="combo-box"
          options={searchItem}
          sx={{ width: 300 }}
          onChange={handleItemSelect}
          renderInput={(params) => <TextField {...params} label="Foods" />}
          isOptionEqualToValue={isOptionEqualToValue}
        />
      </div>
      {/* </div> */}
      <div className="w-full flex items-center justify-center bg-white overflow-auto">
        <div className="w-[100%]  border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center ">
          <div>
            <div className="absolute right-20">
              <button
                className=" bg-emerald-500 w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg hover:bg-orange-300 transition-all ease-in-out duration-100"
                onClick={() => {
                  navigate("/createFood");
                }}
              >
                <span className="font-semibold">
                  <IoMdAdd className="inline text-xl font-semibold mr-2 mb-1" />
                  New Item
                </span>
              </button>
            </div>
            <p className="text-2xl mb-6 font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-24 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-green-400 to-green-600 transition-all ease-in-out duration-100">
              Noodles
              <span className="text-gray-400 text-xl ml-3">
                (Total: {restaurantItems.length})
              </span>
            </p>
          </div>

          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {filteredItems && filteredItems.length > 0 ? (
                <Grid xs={2} sm={4} md={4} key={filteredItems[0]?.id}>
                  <div className=" h-[350px] w-[600px]  bg-cardOverlay py-2 px-4  backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative border-2 rounded-xl">
                    <motion.div
                      whileTap={{ scale: 0.8 }}
                      className={`absolute right-4 top-4 p-2 ${
                        soldOutItem === filteredItems[0]?.id
                          ? "bg-emerald-500"
                          : "bg-red-500"
                      } rounded-md  ${
                        soldOutItem === filteredItems[0]?.id
                          ? "hover:bg-red-500"
                          : "hover:bg-emerald-500"
                      }`}
                    >
                      <button
                        className="font-semibold"
                        onClick={() => soldOut(filteredItems[0]?.id)}
                      >
                        {soldOutItem === filteredItems[0]?.id
                          ? "RESTOCK"
                          : "SOLD OUT"}
                      </button>
                    </motion.div>
                    <div className="w-full flex items-center justify-between">
                      <motion.div
                        className="w-40 h-40 -mt-8 drop-shadow-2xl cursor-pointer"
                        whileHover={{ scale: 1.2 }}
                        //   onClick={handleFoodOptionOpen}
                      >
                        <img
                          src={filteredItems[0]?.imageURL}
                          alt=""
                          className={`w-full h-full object-contain ${
                            soldOutItem === filteredItems[0]?.id
                              ? "filter blur-sm"
                              : ""
                          }`}
                        />
                      </motion.div>
                      <CiEdit
                        onClick={() => handleEditItemClick(filteredItems[0])}
                        className="text-4xl text-emerald-500 cursor-pointer hover:text-orange-400"
                      />
                      <MdDelete
                        className="text-red-500 text-4xl hover:text-orange-400 cursor-pointer"
                        onClick={() => handleDeleteClick(filteredItems[0])}
                      ></MdDelete>
                      <p className="text-4xl text-headingColor font-semibold relative bottom-3">
                        <span className="text-red-500 ">$ </span>
                        {filteredItems[0]?.price}
                      </p>
                    </div>

                    <div className="w-full flex flex-col items-end justify-end -mt-2">
                      <p className="text-textColor font-semibold text-base md:text-lg uppercase">
                        {filteredItems[0]?.title}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {filteredItems[0]?.desc}
                      </p>
                    </div>
                  </div>
                </Grid>
              ) : restaurantItems && restaurantItems.length > 0 ? (
                restaurantItems.map((item) => (
                  <Grid xs={2} sm={4} md={4} key={item?.id}>
                    <div className=" h-[300px]  bg-cardOverlay py-2 px-4  backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative border-2 rounded-xl">
                      <motion.div
                        whileTap={{ scale: 0.8 }}
                        className={`absolute right-4 top-4 p-2 ${
                          soldOutItem === item?.id
                            ? "bg-emerald-500"
                            : "bg-red-500"
                        } rounded-md  ${
                          soldOutItem === item?.id
                            ? "hover:bg-red-500"
                            : "hover:bg-emerald-500"
                        }`}
                      >
                        <button
                          className="font-semibold"
                          onClick={() => soldOut(item?.id)}
                        >
                          {soldOutItem === item?.id ? "RESTOCK" : "SOLD OUT"}
                        </button>
                      </motion.div>
                      <div className="w-full flex items-center justify-between">
                        <motion.div
                          className="w-40 h-40 -mt-8 drop-shadow-2xl cursor-pointer"
                          whileHover={{ scale: 1.2 }}
                          //   onClick={handleFoodOptionOpen}
                        >
                          <img
                            src={item?.imageURL}
                            alt=""
                            className={`w-full h-full object-contain ${
                              soldOutItem === item?.id ? "filter blur-sm" : ""
                            }`}
                          />
                        </motion.div>

                        <CiEdit
                          onClick={() => handleEditItemClick(item)}
                          className="text-4xl text-green-400 hover:text-orange-400 cursor-pointer"
                        />
                        <MdDelete
                          className="text-red-500 text-4xl hover:text-orange-400 cursor-pointer"
                          onClick={() => handleDeleteClick(item)}
                        ></MdDelete>
                        <div className="mt-4">
                          <p className="text-4xl text-headingColor font-semibold relative bottom-3">
                            <span className="text-red-500 ">$ </span>
                            {item?.price}
                          </p>
                        </div>
                      </div>

                      <div className="w-full flex flex-col items-end justify-end -mt-2">
                        <p className="text-textColor font-semibold text-base md:text-lg uppercase">
                          {item?.title}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {item?.desc}
                        </p>
                      </div>
                    </div>
                  </Grid>
                ))
              ) : (
                <div className="w-full flex flex-col items-center justify-center">
                  <p className="text-xl text-headingColor font-semibold my-2">
                    Loading...
                  </p>
                </div>
              )}
            </Grid>
          </Box>
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-4 bg-white overflow-auto">
        <div className="w-[100%]  border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center ">
          <SoftDrinkDataGrid></SoftDrinkDataGrid>
        </div>
      </div>
      <React.Fragment>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar className="bg-green-400">
              <IconButton
                edge="start"
                color="black"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                <p className="text-black">Edit Food</p>
              </Typography>
            </Toolbar>
          </AppBar>
          {/* {console.log("editFood", editFood)} */}
          <EditFoodContainer data={editFood} />
        </Dialog>
      </React.Fragment>

      <Dialog
        open={deleteOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDeleteClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Do you confirm delete  ${deleteFood?.title} ?`}</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button sx={{ color: "red" }} onClick={handleDeleteItem}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
//  <EditFoodContainer />
export default MenuManager;
