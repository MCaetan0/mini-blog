import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6z5z5D-fWcwapga47K7MtrqYf0uekRys",
  authDomain: "miniblog-bed02.firebaseapp.com",
  projectId: "miniblog-bed02",
  storageBucket: "miniblog-bed02.appspot.com",
  messagingSenderId: "237222936092",
  appId: "1:237222936092:web:b685030621283b9e1da9d9",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export { db };
