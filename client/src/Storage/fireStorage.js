import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyABd7IPkowJJyNeEb2pT2ZbHA3oSjnUmYo",
    authDomain: "inventory-manger-e389f.firebaseapp.com",
    projectId: "inventory-manger-e389f",
    storageBucket: "inventory-manger-e389f.appspot.com",
    messagingSenderId: "936411659308",
    appId: "1:936411659308:web:3c43db8d688c132e07a589",
    measurementId: "G-MV4V6M1SVS",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
