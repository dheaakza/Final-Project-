import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { auth } from "./firebase-config.js";

// Login Email/Password
export const loginEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Login Error", error);
        throw error;
    }
};

// Register Email/Password
export const registerEmail = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Register Error", error);
        throw error;
    }
};

// Login Google
export const loginGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        console.error("Google Auth Error", error);
        throw error;
    }
};

// Logout
export const logoutUser = async () => {
    try {
        await signOut(auth);
        // UI Handler akan menangani perubahan state via monitorAuthState
    } catch (error) {
        console.error("Logout Error", error);
    }
};

// Monitor Status
export const monitorAuthState = (callback) => {
    onAuthStateChanged(auth, callback);
};