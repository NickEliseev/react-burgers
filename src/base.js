import Rebase from 're-base';
import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/auth';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB6mUa90yB6c2GnHj3JnDSXmlEqiNT2NBY",
    authDomain: "cheshire-very-hot-burgers.firebaseapp.com",
    databaseURL: "https://cheshire-very-hot-burgers-default-rtdb.europe-west1.firebasedatabase.app",
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;