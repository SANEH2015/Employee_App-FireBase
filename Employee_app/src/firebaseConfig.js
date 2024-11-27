import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAy_HDSwx_O9D9etsKKEeVX_MT_RwOC0tY",
  authDomain: "employee-s-app.firebaseapp.com",
  projectId: "employee-s-app",
  storageBucket: "employee-s-app.appspot.com",
  messagingSenderId: "288465368725",
  appId: "1:288465368725:web:4453af2c99b1e805f04d9c",
  measurementId: "G-DZLT7MGVSK"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch all employees
export const fetchEmployees = async () => {
  const employees = [];
  const querySnapshot = await getDocs(collection(db, 'employees'));
  querySnapshot.forEach((doc) => {
    employees.push({ id: doc.id, ...doc.data() });
  });
  return employees;
};

// Add a new employee
export const addEmployee = async (employeeData) => {
  const docRef = await addDoc(collection(db, 'employees'), employeeData);
  return { id: docRef.id, ...employeeData };
};

// Delete an employee
export const deleteEmployee = async (id) => {
  await deleteDoc(doc(db, 'employees', id));
};

// Update an existing employee
export const updateEmployee = async (id, updatedData) => {
  const employeeRef = doc(db, 'employees', id);
  await updateDoc(employeeRef, updatedData);
};

// Export Firestore instance
export { db };
