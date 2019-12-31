import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import {Calendar} from './components/month'

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyAwC7CYUq5hC-a3wbJ-Io9oOl7HCDes-g8',
    authDomain: 'my-awesome-workout-diary.firebaseapp.com',
    projectId: 'my-awesome-workout-diary'
});

const firebase_db = firebase.firestore();

const printError = (error) => {
    console.log(error.code + ' : ' + error.message);
    document.controller.renderMessage(`${error.code} : ${error.message}`, 'red');
}

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
    }).catch(printError);
}

const firebase_signOut = () => {
    const USER_NAME = 'user-name';
    firebase.auth().signOut().then(() => {
        console.log('Sign out');
        document.controller.renderMessage(`До свидания, ${localStorage.getItem(USER_NAME)}`, 'green');
        localStorage.clear();
    }).catch(printError);
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
    }).catch(printError);
}

const firebase_getMonthWorkouts = (date) => {
    const year = date.getFullYear();
    const monthNameEng = Calendar.prototype.getMonthNameInEng(date.getMonth());
    firebase_db.collection(`users/kopchikovich/workouts/${year}/${monthNameEng}`).get().then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
            querySnapshot.forEach((doc) => {
                const workout = doc.data();
                const MILLISECONDS_IN_SECONDS = 1000;
                const workoutDate = new Date(+workout.timeStop.seconds*MILLISECONDS_IN_SECONDS);
                const dateString = `${year}-${workoutDate.getMonth()+1}-${workoutDate.getDate()}`;
                if (localStorage.getItem(dateString)) {
                    let workoutsArray = JSON.parse(localStorage.getItem(dateString));
                    const isSame = (elem) => {
                        return elem.name === workout.name;
                    };
                    if (!workoutsArray.some(isSame)) {
                        workoutsArray.push(workout);
                        localStorage.setItem(dateString, JSON.stringify(workoutsArray));
                    }
                } else {
                    localStorage.setItem(dateString, JSON.stringify([workout]));
                }
            })
        } else {
            const monthNum = +date.getMonth();
            let monthName = Calendar.prototype.getMonthName(monthNum).toLowerCase();
            monthName = monthNum === 2 || monthNum === 7 ? monthName + 'е' : monthName.slice(0, -1) + 'е';
            document.controller.renderMessage(`В ${monthName} нет тренировок записанных в firestore`, 'green');
        }
    }).catch(printError);
}


export {firebase_db, firebase_isLogin, firebase_signIn, firebase_signOut, firebase_getUserData, firebase_getMonthWorkouts}