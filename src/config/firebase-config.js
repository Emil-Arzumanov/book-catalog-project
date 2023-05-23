import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDX5u3roBapQHja3z9ZRQZTDRooJOo7lzU",
    authDomain: "book-catalog-project-b97f6.firebaseapp.com",
    projectId: "book-catalog-project-b97f6",
    storageBucket: "book-catalog-project-b97f6.appspot.com",
    messagingSenderId: "29234658973",
    appId: "1:29234658973:web:f369d676072c07633c1e74",
    measurementId: "G-0SVP76L4KY"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);