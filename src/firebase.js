
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHas2RaU6izHkdfg_MWWQB1EU0_ETgNs4",
  authDomain: "travel2-f40fd.firebaseapp.com",
  projectId: "travel2-f40fd",
  storageBucket: "travel2-f40fd.appspot.com",
  messagingSenderId: "339843152194",
  appId: "1:339843152194:web:0611d6f54eab4eee2db0db"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);