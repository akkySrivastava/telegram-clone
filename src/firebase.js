import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDsbL8imhJtCzzQ_dRqAZrNsJ2DBmseNAA",
    authDomain: "telegram-clone-akky.firebaseapp.com",
    databaseURL: "https://telegram-clone-akky.firebaseio.com",
    projectId: "telegram-clone-akky",
    storageBucket: "telegram-clone-akky.appspot.com",
    messagingSenderId: "989123062947",
    appId: "1:989123062947:web:d36448999436aaff366316",
    measurementId: "G-E2LHVDF3EC"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore()
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider};
  export default db;  