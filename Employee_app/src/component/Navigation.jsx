// Navigation.js
import React from 'react';

const Navigation = ({ setActivePage }) => {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px',
      backgroundColor: '#2d3748',
      padding: '10px',
      borderRadius: '8px',
    }}>
      <button
        onClick={() => setActivePage('home')}
        style={{ padding: '10px 20px', margin: '5px', color: 'white', backgroundColor: '#38a169', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Home
      </button>
      <button
        onClick={() => setActivePage('employees')}
        style={{ padding: '10px 20px', margin: '5px', color: 'white', backgroundColor: '#38a169', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Employees
      </button>
      <button
        onClick={() => setActivePage('addEmployee')}
        style={{ padding: '10px 20px', margin: '5px', color: 'white', backgroundColor: '#38a169', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Add Employee
      </button>
    </nav>
  );
};

export default Navigation;
