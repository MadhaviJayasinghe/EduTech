import firebase from 'firebase/app';
import "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyARfDtS9oHq2DzOM4bWSdNt7vJQ-xmHel0',
  authDomain: 'edutechapp-afe0f.firebaseapp.com',
  databaseURL: 'https://edutechapp-afe0f.firebaseio.com',
  projectId: 'edutechapp-afe0f',
  storageBucket: 'edutechapp-afe0f.appspot.com',
  messagingSenderId: '621231790608',
  appId: '1:621231790608:android:7fb83101cb9e823abec895',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };