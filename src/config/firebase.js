import firebase from 'firebase';


export default function() {
  let config = {
    apiKey: "AIzaSyDI164I2P48cv4CliXCc00v0LiAqWXrWiw",
    authDomain: "asterius-app.firebaseapp.com",
    databaseURL: "https://asterius-app.firebaseio.com",
    projectId: "asterius-app",
    storageBucket: "asterius-app.appspot.com",
    messagingSenderId: "254713862614"
  };
  firebase.initializeApp(config);
}
