/**
 * como instalar o firebase
 * yarn add firebase
 * 
 */

import firebase from 'firebase/compat/app';


import 'firebase/compat/auth';
import 'firebase/compat/database';

// Your web app's Firebase configuration
// copiado do firebase

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  };
  
firebase.initializeApp(firebaseConfig);


//pra usar na aplicação com o nome
const auth = firebase.auth();
const database = firebase.database();

export {firebase, auth, database}