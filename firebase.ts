import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = { 
    apiKey: "AIzaSyB3-ELDZdPfrLIex_kmd23sT4trW4ngApo", 
    authDomain: "zengootp.firebaseapp.com", 
    projectId: "zengootp", 
    storageBucket: "zengootp.firebasestorage.app", 
    messagingSenderId: "171175859418", 
    appId: "1:171175859418:web:cd81f90ca0c460607e81e3", 
    measurementId: "G-5H9Y74FKMN" 
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
