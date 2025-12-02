import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { db } from "./firebase-config.js";

// --- TASK OPERATIONS ---
export const subscribeToTasks = (userId, callback) => {
    const q = query(
        collection(db, 'users', userId, 'tasks'), 
        orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, (snapshot) => {
        const tasks = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        callback(tasks);
    });
};

export const addTask = async (userId, taskData) => {
    await addDoc(collection(db, 'users', userId, 'tasks'), {
        ...taskData,
        createdAt: serverTimestamp(),
        isCompleted: false
    });
};

export const updateTask = async (userId, taskId, taskData) => {
    const taskRef = doc(db, 'users', userId, 'tasks', taskId);
    await updateDoc(taskRef, {
        ...taskData,
        updatedAt: serverTimestamp()
    });
};

export const deleteTask = async (userId, taskId) => {
    await deleteDoc(doc(db, 'users', userId, 'tasks', taskId));
};

export const toggleTaskCompletion = async (userId, taskId, currentStatus) => {
    const taskRef = doc(db, 'users', userId, 'tasks', taskId);
    await updateDoc(taskRef, { isCompleted: !currentStatus });
    return !currentStatus; // Return new status
};

// --- JOURNAL OPERATIONS ---
export const subscribeToJournals = (userId, callback) => {
    const q = query(collection(db, 'users', userId, 'journals'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
        const journals = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        callback(journals);
    });
};

export const addJournal = async (userId, journalData) => {
    await addDoc(collection(db, 'users', userId, 'journals'), {
        ...journalData,
        createdAt: serverTimestamp()
    });
};