import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeList = ({ onEdit }) => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State to store the search input

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/employees');
        setEmployees(response.data); // Assuming the response contains the employee list
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/employees/${id}`);
      setEmployees(employees.filter(employee => employee.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Employee List</h2>
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Employees..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
        style={styles.searchBar}
      />
      
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeaderRow}>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Surname</th>
            <th style={styles.tableHeader}>Email</th>
            <th style={styles.tableHeader}>Phone</th>
            <th style={styles.tableHeader}>Position</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length === 0 ? (
            <tr>
              <td colSpan="6" style={styles.noEmployees}>No employees found</td>
            </tr>
          ) : (
            filteredEmployees.map((employee, index) => (
              <tr key={employee.id} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                <td style={styles.tableData}>{employee.name}</td>
                <td style={styles.tableData}>{employee.surname}</td>
                <td style={styles.tableData}>{employee.email}</td>
                <td style={styles.tableData}>{employee.phone}</td>
                <td style={styles.tableData}>{employee.position}</td>
                <td style={styles.tableData}>
                  <button
                    onClick={() => onEdit(employee)}
                    style={styles.editButton}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(employee.id)}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    margin: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  searchBar: {
    width: '300px', // Decrease the width here
    padding: '10px',
    fontSize: '16px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    display: 'block',
    marginLeft: 'auto', // Center the search bar
    marginRight: 'auto', // Center the search bar
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeaderRow: {
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  tableHeader: {
    padding: '12px 15px',
    textAlign: 'left',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  tableData: {
    padding: '12px 15px',
    textAlign: 'left',
    fontSize: '14px',
    borderBottom: '1px solid #ddd',
  },
  evenRow: {
    backgroundColor: '#f2f2f2',
  },
  oddRow: {
    backgroundColor: '#fff',
  },
  noEmployees: {
    textAlign: 'center',
    fontStyle: 'italic',
    padding: '20px',
    fontSize: '16px',
    color: '#666',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '8px',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};


export default EmployeeList;
