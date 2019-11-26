import firebase from 'firebase';


var firebaseConfig = {
    apiKey: "AIzaSyB5jSAbEzw2k4VGtCYoJCa8aPZMYHWHhXU",
    authDomain: "social-master-31ab1.firebaseapp.com",
    databaseURL: "https://social-master-31ab1.firebaseio.com",
    projectId: "social-master-31ab1",
    storageBucket: "social-master-31ab1.appspot.com",
    messagingSenderId: "866603587739",
    appId: "1:866603587739:web:e943596ad3199f68d0ce3e",
    measurementId: "G-EZ5EHN5LJQ"
  };
 
  const fire = firebase.initializeApp(firebaseConfig);
  export default fire;
  