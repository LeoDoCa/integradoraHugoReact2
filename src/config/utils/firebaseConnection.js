import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const app = firebase.initializeApp ({
  "projectId": "fir-4b-374d7",
  "appId": "1:867511776458:web:17d84c77654d6ff2e9b033",
  "databaseURL": "https://fir-4b-374d7-default-rtdb.firebaseio.com",
  "storageBucket": "fir-4b-374d7.appspot.com",
  "locationId": "us-central",
  "apiKey": "AIzaSyAISpjaRR5EO881yGW7xcJ1ljTXFNC567o",
  "authDomain": "fir-4b-374d7.firebaseapp.com",
  "messagingSenderId": "867511776458"
});


const db = getFirestore(app);
const storage = getStorage(app);
 

export {app};
export { storage as firebaseStorage };