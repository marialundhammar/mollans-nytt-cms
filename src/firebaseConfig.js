import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfwXE0sFE0w-0Aon__MGft6M3ZqsXmJas",
  authDomain: "mollan-nytt-cms.firebaseapp.com",
  projectId: "mollan-nytt-cms",
  storageBucket: "mollan-nytt-cms.appspot.com",
  messagingSenderId: "437689177765",
  appId: "1:437689177765:web:dc521afaf72adc16459f4c",
  measurementId: "G-Y4N182X5L7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
