import firebase from 'firebase'
import firestore from 'firebase/firestore'
var config = {
    apiKey: "AIzaSyB6rrmcaGvlaMK0545FO0F8fOE2LVxJ7T4",
    authDomain: "proiect-web-f0d78.firebaseapp.com",
    databaseURL: "https://proiect-web-f0d78.firebaseio.com",
    projectId: "proiect-web-f0d78",
    storageBucket: "",
    messagingSenderId: "236534245625"
  };
 const firebaseApp = firebase.initializeApp(config);
 firebaseApp.firestore().settings({timestampsInSnapshots: true}) 
 export default firebaseApp.firestore()