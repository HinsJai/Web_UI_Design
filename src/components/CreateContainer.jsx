import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { categories } from "../utils/data";

import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdDescription,
  MdDeliveryDining,
  MdFoodBank,
  MdImage,
  MdStarRate,
  MdLocationOn,
  MdReviews,
} from "react-icons/md";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Loader from "./Loader";
import { storage } from "../firebase.config";
import { getMetadata } from "firebase/storage";
import { useStateValue } from "../context/StateProvider";
import {
  getAllRestaurant,
  saveItem,
  deleteRestaurantData,
} from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState("");
  const [deliveryFee, setDeliveryFee] = useState("");
  const [category, setCategory] = useState(null);
  const [address, setAddress] = useState("");
  const [imageAsset, setImageAsset] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successUploaded, setSuccessUploaded] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [restaurantId, setRestaurantId] = useState("");
  const [{ restaurantItems }, dispatch] = useStateValue();

  function previewImg(e) {
    setSuccessUploaded(false);
    const selectedFile = e.target.files[0];
    setSelectedImg(URL.createObjectURL(selectedFile));
    setImageAsset(selectedFile);
  }

  function deletePrviewImg() {
    setSelectedImg(null);
    setSuccessUploaded(false);
    setImageAsset(null);
    setIsLoading(false);
  }

  const deleteDatabaseImage = () => {
    setIsLoading(true);

    try {
      if (!imageAsset) {
        // Handle the case when no image is selected
        setIsLoading(false);
        setMsg("Please select an image.");
        setAlertStatus("danger");
        setFields(true);
        return;
      }

      const storageRef = ref(storage, `Images/${imageAsset.name}`);

      deleteObject(storageRef).then(() => {
        deleteRestaurantData(restaurantId);
        setImageAsset(null);
        setIsLoading(false);
        setMsg("restaurant delete on database successfully!");
        setAlertStatus("success");
        setFields(true);
        setTimeout(() => {
          setFields(false);
        }, 4000);
      });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setMsg("Error while deleting the image. Please try again.");
      setAlertStatus("danger");
      setFields(true);
    }
  };

  const uploadImage = async () => {
    setIsLoading(true);

    try {
      if (!imageAsset) {
        // Handle the case when no image is selected
        setIsLoading(false);
        setMsg("Please select an image.");
        setAlertStatus("danger");
        setFields(true);
        return;
      }

      const imageFile = imageAsset;
      const storageRef = ref(storage, `Images/${imageFile.name}`);

      // Check if an image with the same name already exists
      try {
        const existingImageRef = ref(storage, `Images/${imageFile.name}`);
        await getMetadata(existingImageRef);

        // If metadata exists, it means an image with the same name already exists
        setIsLoading(false);
        setMsg(
          "An image with the same name already exists. Please choose a different name."
        );
        setAlertStatus("danger");
        setFields(true);
        return;
      } catch (error) {
        // If the error is "object-not-found," the image doesn't exist, and you can proceed with uploading
        if (error.code !== "storage/object-not-found") {
          throw error; // Rethrow other errors
        }
      }

      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      // Wait for the image upload to complete
      await uploadTask;

      // Once the upload is complete, get the download URL
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

      // Save the restaurant data
      saveDetails(downloadURL);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setMsg("Error while uploading or saving data. Please try again.");
      setAlertStatus("danger");
      setFields(true);
    }
  };

  const saveDetails = async (imageURL) => {
    console.log(imageURL);
    setIsLoading(true);

    try {
      if (!title || !desc || !imageAsset || !deliveryFee || !category) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const id = Date.now();
        setRestaurantId(id);
        const data = {
          id: id,
          title: title,
          address: address,
          imageURL: imageURL,
          category: category,
          desc: desc,
          rating: 0,
          reviews: 0,
          deliveryFee: deliveryFee,
        };
        // saveItem(data);
        await saveItem(data);
        setImageURL(imageURL);
        setIsLoading(false);
        setFields(true);
        setSuccessUploaded(true);
        setMsg("Image uploaded successfully!");
        // clearData();
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading : Try again!");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
    fetchData();
  };

  const fetchData = async () => {
    await getAllRestaurant().then((data) => {
      dispatch({
        type: actionType.SET_RESTAURANT_ITEMS,
        restaurantItems: data,
      });
    });
  };

  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setDeliveryFee("");
    setDesc("");
    setCategory(null);
    setSuccessUploaded(false);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[50%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-700 text-2xl">Create Restaurant</p>
        {/* // after uploaded image message */}
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-500 text-black"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-gray-700 text-2xl" />
          <input
            type="text"
            required
            value={title}
            placeholder="Restaurant Name"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdLocationOn className="text-gray-700 text-2xl" />
          <input
            type="text"
            required
            value={address}
            placeholder="Restaurant Address"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="w-full flex items-center text-gray-400">
          <MdFoodBank className="text-gray-700 text-xl" />
          <select
            onChange={(e) => setCategory(e.target.value)}
            className=" bg-primary outline-none w-full text-lg border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other">Select Category</option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  value={item.category}
                  className="bg-primary text-base border-0 outline-none capitalize text-headingColor"
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        {/* <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdStarRate className="text-gray-700 text-2xl" />
          <input
            type="number"
            step="0.1"
            min="1.0"
            max="5.0"
            required
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Rating (1.0-5.0)"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdReviews className="text-gray-700 text-2xl" />
          <input
            type="number"
            required
            value={reviews}
            onChange={(e) => setReviews(e.target.value)}
            placeholder="Reviews"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div> */}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdDeliveryDining className="text-gray-700 text-2xl" />
          <input
            type="text"
            required
            value={deliveryFee}
            onChange={(e) => setDeliveryFee(e.target.value)}
            placeholder="Delivery Fee (e.g. Free or 20)"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdDescription className="text-gray-700 text-2xl" />
            <textarea
              rows="4"
              cols="100"
              value={desc}
              placeholder="Input your restaurant description"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg py-4">
          <p className={`text-gray-400 text-2xl`}>
            <MdImage
              className={`inline text-gray-700 text-2xl mr-2 ${
                isLoading ? "hidden" : ""
              }`}
            />
            {isLoading ? "Loading..." : "Image"}
          </p>
          {isLoading ? (
            <Loader />
          ) : (
            // check image is exist or not in box
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <div>
                      <input
                        type="file"
                        name="uploadimage"
                        accept="image/*"
                        // onChange={uploadImage}
                        onChange={previewImg}
                        className="w-0 h-0"
                      />
                    </div>
                  </label>
                </>
              ) : (
                <>
                  {/* else show image in box and have delete btn */}
                  <div className="relative h-full p-4">
                    <img
                      src={selectedImg}
                      alt="uploaded image"
                      className="w-full h-full object-fit"
                    />

                    <button
                      type="button"
                      className="absolute bottom-3 right-2 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                      onClick={
                        successUploaded ? deleteDatabaseImage : deletePrviewImg
                      }
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            // onClick={saveDetails}
            onClick={uploadImage}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
