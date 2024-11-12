import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCjONScUSML-k-3QO4QGFMD22qGf8IRFpU",
    authDomain: "storageimage-5a244.firebaseapp.com",
    projectId: "storageimage-5a244",
    storageBucket: "storageimage-5a244.appspot.com",
    messagingSenderId: "668688028276",
    appId: "1:668688028276:web:975fc1eaf1a2d53bff7721",
    measurementId: "G-DWXTJ0S5LS"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Storage and export it
const storage = getStorage(firebaseApp);

export { storage };
