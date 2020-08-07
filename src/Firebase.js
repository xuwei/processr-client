import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'; 
import 'firebase/database';

const config = {
    apiKey: "AIzaSyB2UN_o8aW_YUS2OKX__uvPzuk2bPb3_c0",
    authDomain: "processr-f7076.firebaseapp.com",
    databaseURL: "https://processr-f7076.firebaseio.com",
    projectId: "processr-f7076",
    storageBucket: "processr-f7076.appspot.com",
    messagingSenderId: "477386478080",
    appId: "1:477386478080:web:763026e4d6b4a0c511bee5"
  };
  
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase; 