import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  deleteDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

// Saving new Item
export const saveItem = async (data) => {
  await setDoc(doc(firestore, "restaurants", `${Date.now()}`), data, {
    merge: true,
  });
};

export const saveFood = async (data) => {
  await setDoc(doc(firestore, "foods", `${Date.now()}`), data, {
    merge: true,
  });
};

export const saveOrder = async (data) => {
  await setDoc(doc(firestore, "orders", `${Date.now()}`), data, {
    merge: true,
  });
};

export const saveCourierOrder = async (data) => {
  await setDoc(doc(firestore, "courierOrders", `${Date.now()}`), data, {
    merge: true,
  });

};

export const saveUser = async (data) => {
  await setDoc(doc(firestore, "users", `${Date.now()}`), data, {
    merge: true,
  });
};

export const updateFoodItem = async (data) => {
  try {

    const foodRef = doc(firestore, "foods", `${data.id}`);
    await setDoc(foodRef, data, { merge: true });
  } catch (error) {
    console.error("Error updating food item: ", error);
  }
};

export const updateOrderStatus = async (data) => {
  try {
    const orderRef = doc(firestore, "orders", `${data?.id}`);
    console.log(data);
    await updateDoc(orderRef, {
      orderStatus: data?.orderStatus,
      courier: data?.courier
    });
  } catch (error) {
    console.error("Error updating order status: ", error);
  }
};

export const updateCourierOrderStatus = async (data) => {

  try {
    // Create a reference to the Firestore collection
    const courierCollection = collection(firestore, "courierOrders");

    const q = query(courierCollection, where("orderID", "==", data.id));
    // Get the matching documents
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      console.log("Test");
      await updateDoc(doc.ref, {
        orderStatus: data.orderStatus,
        rating: data.rating,
      });

    });
  } catch (error) {
    console.error("Error updataCourier documents: ", error);
  }
};

export const deleteRestaurantData = async (restaurantId) => {
  try {
    // Create a reference to the Firestore collection
    const restaurantsCollection = collection(firestore, "restaurants");

    // Create a query to find the document with the specified idToDelete
    const q = query(restaurantsCollection, where("id", "==", restaurantId));

    // Get the matching documents
    const querySnapshot = await getDocs(q);

    // Delete each matching document
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  } catch (error) {
    console.error("Error deleting documents: ", error);
  }
};

export const deleteFoodData = async (foodId) => {
  try {
    // Create a reference to the Firestore collection
    const foodsCollection = collection(firestore, "foods");

    // Create a query to find the document with the specified idToDelete
    const q = query(foodsCollection, where("id", "==", foodId));

    // Get the matching documents
    const querySnapshot = await getDocs(q);

    // Delete each matching document
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  } catch (error) {
    console.error("Error deleting documents: ", error);
  }
};

// getall restaurant items
export const getAllRestaurant = async () => {
  const items = await getDocs(
    query(collection(firestore, "restaurants"), orderBy("id", "desc"))
  );
  return items.docs.map((doc) => doc.data());
};

// "yummyRestaurant@gmail.com"
export const getRestaurantItems = async (email) => {
  try {
    const itemsCollection = collection(firestore, "foods");
    const q = query(
      itemsCollection,
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    // console.log(error);
  }
};



// getall food items
export const getAllFoods = async () => {
  const items = await getDocs(
    query(collection(firestore, "foods"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};

export const getAllOrders = async () => {
  const items = await getDocs(
    query(collection(firestore, "orders"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};

export const getOrderPlaced = async () => {

  const items = await getDocs(
    query(collection(firestore, "orders"), where("orderStatus", "==", "Preparing"))
  );

  return items.docs.map((doc) => doc.data());
}

export const getCourierOrders = async () => {

  const items = await getDocs(
    query(collection(firestore, "courierOrders"))
  );

  return items.docs.map((doc) => doc.data());
}

export const getCourierUser = async (id) => {
  const usersCollection = collection(firestore, "users");
  try {
    const q = query(
      usersCollection,
      where("email", "==", id),
    );
    // Get the matching user
    const querySnapshot = await getDocs(q);
    let userData = null;

    querySnapshot.forEach((doc) => {
      userData = doc.data();
    });
    return userData;
  } catch (error) {
    console.log(error);
  }
}


export const getUser = async (email, password) => {
  // Create a reference to the Firestore collection
  const usersCollection = collection(firestore, "users");

  const q = query(
    usersCollection,
    where("email", "==", email),
    where("password", "==", password)
  );
  // Get the matching user
  const querySnapshot = await getDocs(q);

  let userData = null;

  querySnapshot.forEach((doc) => {
    userData = doc.data();
  });
  console.log(userData);

  return userData;
};
