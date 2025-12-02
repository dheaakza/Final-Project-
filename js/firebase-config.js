import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Konfigurasi dari SRS/User
const firebaseConfig = {
    apiKey: "AIzaSyD91hePG2Xin9pkuAleExN7WdESa7ciNyo",
    authDomain: "finalproject-3e687.firebaseapp.com",
    databaseURL: "https://finalproject-3e687-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "finalproject-3e687",
    storageBucket: "finalproject-3e687.firebasestorage.app",
    messagingSenderId: "157598051624",
    appId: "1:157598051624:web:c9701016718c106344f41d",
    measurementId: "G-XWYKDJDG51"
};

// Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };