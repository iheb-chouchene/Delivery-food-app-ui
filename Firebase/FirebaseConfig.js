import  firebase  from 'firebase/compat/app';
import  "firebase/compat/auth";
import  "firebase/compat/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCV50cxGHYQMABvGl6hhDxpUv0eUSh2glo",
  authDomain: "foodapp-5bdcf.firebaseapp.com",
  projectId: "foodapp-5bdcf",
  storageBucket: "foodapp-5bdcf.appspot.com",
  messagingSenderId: "1078811355688",
  appId: "1:1078811355688:web:53be8a52a501d6564a231d"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase }



