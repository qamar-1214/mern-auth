// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-project-9ad7c.firebaseapp.com",
  projectId: "mern-auth-project-9ad7c",
  storageBucket: "mern-auth-project-9ad7c.appspot.com",
  messagingSenderId: "152978593649",
  appId: "1:152978593649:web:18515fe8307d6631e088d0",
  measurementId: "G-KW7F94LB6Y",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
