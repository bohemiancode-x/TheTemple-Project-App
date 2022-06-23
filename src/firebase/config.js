import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBK_xir3zvw171O9eHSkgeHmw0MRhjem6c",
    authDomain: "thetempleproject-e99d2.firebaseapp.com",
    projectId: "thetempleproject-e99d2",
    storageBucket: "thetempleproject-e99d2.appspot.com",
    messagingSenderId: "629320640991",
    appId: "1:629320640991:web:8709ce3bca3d9a500a7c6a"
  };

//init firebase
firebase.initializeApp(firebaseConfig)

//init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

//timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }