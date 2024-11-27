import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from './component/Navigation';
import SuccessMessage from './component/SuccessMessage';
import EmployeeList from './component/EmployeeList';
import EmployeeForm from './component/EmployeeForm';
import Footer from './component/Footer';

import "./App.css";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activePage, setActivePage] = useState('home');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch employees from API on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  // Save new or updated employee to the backend
  const handleSaveEmployee = async (employee) => {
    try {
      if (currentEmployee) {
        await axios.put(`http://localhost:5000/employees/${employee.id}`, employee);
        setEmployees(employees.map(e => (e.id === employee.id ? employee : e)));
        setSuccessMessage('Employee updated successfully!');
      } else {
        const response = await axios.post('http://localhost:5000/employees', employee);
        setEmployees([...employees, { ...employee, id: response.data.id }]);
        setSuccessMessage('Employee added successfully!');
      }

      setCurrentEmployee(null);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving employee:', error);
      setSuccessMessage('Error saving employee');
    }
  };

  // Edit employee
  const handleEditEmployee = (employee) => {
    setCurrentEmployee(employee);
    setActivePage('addEmployee');
  };

  // Delete employee
  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/employees/${id}`);
      setEmployees(employees.filter(employee => employee.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', justifyContent: "center", alignItems: "center", height: "100%" }}>
      <Navigation setActivePage={setActivePage} />
      <SuccessMessage message={successMessage} />

      {activePage === 'home' && (
        <h1 style={{ marginTop: "20%", color: "#35A6FF", fontSize: '70px' }}>Welcome to the Employee Management App</h1>
      )}

      {activePage === 'employees' && (
        <>
          <input
            type="text"
            placeholder="Search by ID..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              padding: '10px',
              marginBottom: '20px',
              width: '300px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <EmployeeList
            employees={employees}
            onEdit={handleEditEmployee}
            onDelete={handleDeleteEmployee}
            searchTerm={searchTerm}
          />
        </>
      )}

      {activePage === 'addEmployee' && (
        <EmployeeForm
          employee={currentEmployee}
          onSave={handleSaveEmployee}
          onCancel={() => setCurrentEmployee(null)}
        />
      )}

      <Footer />
    </div>
  );
};

export default App;
