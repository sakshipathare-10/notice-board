import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6TJEwHF4zsAgqNNWR7ZIBSm-r4l9CiYI",
  authDomain: "fir-project-b60c3.firebaseapp.com",
  projectId: "fir-project-b60c3",
  storageBucket: "fir-project-b60c3.firebasestorage.app",
  messagingSenderId: "870314005583",
  appId: "1:870314005583:web:a92773dd69aba0b578463a",
  measurementId: "G-JSZFZMHL13",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);