import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBBsvaPATBYYjcJ6C4nKg_qW3yzzivLVBE",
  authDomain: "itp4506-assignment-1c9ef.firebaseapp.com",
  databaseURL: "https://itp4506-assignment-1c9ef-default-rtdb.firebaseio.com",
  projectId: "itp4506-assignment-1c9ef",
  storageBucket: "itp4506-assignment-1c9ef.appspot.com",
  messagingSenderId: "668594916990",
  appId: "1:668594916990:web:c7d12f17ede5fd1769522f",
  measurementId: "G-SGTSBE303C",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
