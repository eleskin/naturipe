import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBdKWj0Y4jM_hmcyA8YUSIEAk4EZxoEmpU',
  authDomain: 'my-project-1558775535295.firebaseapp.com',
  projectId: 'my-project-1558775535295',
  storageBucket: 'my-project-1558775535295.appspot.com',
  messagingSenderId: '645661619503',
  appId: '1:645661619503:web:36eb0d39f654c3df9f5dda',
  measurementId: 'G-T51ZW0CWJX'
};

let db;

if (!firebase.apps.length) {
  db = firebase.initializeApp(firebaseConfig).firestore();
} else {
  db = firebase.app().firestore();
}

export default db;
