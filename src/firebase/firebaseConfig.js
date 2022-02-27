import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//**********Configuración de firebase,con credenciales y todo */
//configuración para conectar la autenticación con firebase
const firebaseConfig = {
    apiKey: "AIzaSyDPt01uOSOuHrbKUlYtvHy8rx_m8zDAIwk",
    authDomain: "react-app-f3cb9.firebaseapp.com",
    databaseURL: "https://react-app-f3cb9-default-rtdb.firebaseio.com",
    projectId: "react-app-f3cb9",
    storageBucket: "react-app-f3cb9.appspot.com",
    messagingSenderId: "149436733702",
    appId: "1:149436733702:web:49d91db08ec0ab13f36687"
  };
//esto es parte de la configuración de arriba
firebase.initializeApp(firebaseConfig);

     //bd 
const db = firebase.firestore();
//hacer la autenticación con google
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

//exportaciones para utilizarlas en otros archivos
export {
    db,
    googleAuthProvider, 
    firebase
}