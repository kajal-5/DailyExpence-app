import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDGJWPo3rA_BoZdiRHAWGnLbtiSQeaNJYA",
  authDomain: "loginpage-dailyexpence-app.firebaseapp.com",
  projectId: "loginpage-dailyexpence-app",
  storageBucket: "loginpage-dailyexpence-app.firebasestorage.app",
  messagingSenderId: "317072796839",
  appId: "1:317072796839:web:f33190b2f5a41a0d573f82",
  measurementId: "G-Z01SPDMMLS"
};

export const app = initializeApp(firebaseConfig);