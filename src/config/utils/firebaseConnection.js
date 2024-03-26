import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {v4} from 'uuid'

const firebaseConfig = {
    apiKey: "AIzaSyAISpjaRR5EO881yGW7xcJ1ljTXFNC567o",
    authDomain: "fir-4b-374d7.firebaseapp.com",
    databaseURL: "https://fir-4b-374d7-default-rtdb.firebaseio.com",
    projectId: "fir-4b-374d7",
    storageBucket: "fir-4b-374d7.appspot.com",
    messagingSenderId: "867511776458",
    appId: "1:867511776458:web:dcf778fb12e5d2cfe9b033"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export async function uploadFile(file) {
    const storageRef = ref(storage, `pictures/${v4()}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    
    return url;
} 

export {app, db, storage};