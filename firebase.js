var firebaseConfig = {
  apiKey: "AIzaSyDRCJpk3vBYnDLInpZd9w86Bb_0gT37MyA",
  authDomain: "todo-live-e13fa.firebaseapp.com",
  projectId: "todo-live-e13fa",
  storageBucket: "todo-live-e13fa.appspot.com",
  messagingSenderId: "1026729815294",
  appId: "1:1026729815294:web:6b59dd101ede9166a649af",
  measurementId: "G-6JJZRPF7RC",
};

firebase.initializeApp(firebaseConfig); //connec
firebase.analytics(); //fir
var db = firebase.firestore();
