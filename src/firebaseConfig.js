import { initializeApp } from 'firebase';

const app = initializeApp({
    apiKey: 'AIzaSyDVLVhtbrUNFZOo0zqS2c6Js3skYE0ftkE',
    authDomain: 'database-indiebook.firebaseapp.com',
    databaseURL: 'https://database-indiebook.firebaseio.com',
    projectId: 'database-indiebook',
    storageBucket: 'database-indiebook.appspot.com',
    messagingSenderId: '481868126269',
    appId : '1:481868126269:web:6369a7590b8c8ddc7db254',
   measurementId : 'G-CNXS2EFS3E' 
});

// firebase utils
export const db = app.firestore();
export const auth = app.auth();
export const storage = app.storage();
export const currentUser = auth.currentUser;