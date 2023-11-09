import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAXAvNWxghArXGOWczIVSZK5lFLoml6o1Q",
  authDomain: "pwayrs-environment.firebaseapp.com",
  projectId: "pwayrs-environment",
  storageBucket: "pwayrs-environment.appspot.com",
  messagingSenderId: "339862237374",
  appId: "1:339862237374:web:fc0253e73fb5b2a7a66eef",
  measurementId: "G-9MHYEFVS9B"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export { db };