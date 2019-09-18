import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCwM6JIo0ZayO4MFqgMJeadg7PqWRe1QEs",
    authDomain: "bingefest-1b070.firebaseapp.com",
    databaseURL: "https://bingefest-1b070.firebaseio.com",
    projectId: "bingefest-1b070",
    storageBucket: "",
    messagingSenderId: "49592450024",
    appId: "1:49592450024:web:96a2c6e27974bf3c7b825d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;