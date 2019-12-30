import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyAwC7CYUq5hC-a3wbJ-Io9oOl7HCDes-g8',
    authDomain: 'my-awesome-workout-diary.firebaseapp.com',
    projectId: 'my-awesome-workout-diary'
});

const firebase_db = firebase.firestore();

// firebase auth
const firebase_isLogin = () => {
    return !!firebase.auth().currentUser;
}

const firebase_signIn = (email, password) => {
    const USER_NAME = 'user-name';
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        localStorage.setItem(USER_NAME, firebase.auth().currentUser.displayName);
        console.log('Sign in like ', localStorage.getItem(USER_NAME));
        document.controller.renderMessage(`Привет, ${firebase.auth().currentUser.displayName}!`, 'green');
        firebase_getUserData();
        return true;
    }).catch((error) => {
        console.log(error.code + ' : ' + error.message);
        document.controller.renderMessage(`${error.code} : ${error.message}`, 'red');
        return false;
    })
}

const firebase_signOut = () => {
    const USER_NAME = 'user-name';
    firebase.auth().signOut().then(() => {
        console.log('Sign out');
        document.controller.renderMessage(`До свидания, ${localStorage.getItem(USER_NAME)}`, 'green');
        localStorage.removeItem(USER_NAME);
    }).catch((error) => {
        console.log(error.code + ' : ' + error.message);
        document.controller.renderMessage(`${error.code} : ${error.message}`, 'red');
    });
}

const firebase_getUserData = () => {
    const user = firebase_db.doc('users/kopchikovich');
    user.get().then((doc) => {
        if (doc.exists) {
            const userData = doc.data();
            const USER_MILEAGE = 'user-mileage';
            const METERS_IN_KILOMETERS = 1000;
            localStorage.setItem(USER_MILEAGE, `${(userData.mileageInMeters/METERS_IN_KILOMETERS).toFixed(1)}`);
        }
        }).catch((error) => {
            console.log(error.code + ' : ' + error.message);
            document.controller.renderMessage(`${error.code} : ${error.message}`, 'red');
        });
    }



export {firebase_db, firebase_isLogin, firebase_signIn, firebase_signOut, firebase_getUserData}