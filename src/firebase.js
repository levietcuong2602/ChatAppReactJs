import firebase from 'firebase';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyCpEDZaOjAVSDCbgNS9mGX8pPKSAEBiPS4",
    authDomain: "react-slash.firebaseapp.com",
    databaseURL: "https://react-slash.firebaseio.com",
    projectId: "react-slash",
    storageBucket: "react-slash.appspot.com",
    messagingSenderId: "69293857940"
};
firebase.initializeApp(config);
export default firebase;
