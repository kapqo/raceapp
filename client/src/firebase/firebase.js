import firebase from 'firebase/app';
import 'firebase/firebase-storage'

const firebaseConfig = {
    apiKey: "AIzaSyAVD1MXS7nfRvl4M7119vmffvlH3hL0pDU",
    authDomain: "raceappstorage.firebaseapp.com",
    projectId: "raceappstorage",
    storageBucket: "raceappstorage.appspot.com",
    messagingSenderId: "18931924631",
    appId: "1:18931924631:web:493fe064f5f6bba65c73d2",
    measurementId: "G-5T3QL9FYKG"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default }