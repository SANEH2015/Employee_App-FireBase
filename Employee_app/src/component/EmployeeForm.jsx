// EmployeeForm.js
import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ employee, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    position: '',
    id: '',
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        surname: employee.surname,
        email: employee.email,
        phone: employee.phone,
        position: employee.position,
        id: employee.id,
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      name: '',
      surname: '',
      email: '',
      phone: '',
      position: '',
      id: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', textAlign: 'center' }}>
      <h2>{employee ? 'Edit Employee' : 'Add Employee'}</h2>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
        style={inputStyle}
      />
      <input
        type="text"
        name="surname"
        value={formData.surname}
        onChange={handleChange}
        placeholder="Surname"
        required
        style={inputStyle}
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        style={inputStyle}
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
        style={inputStyle}
      />
      <input
        type="text"
        name="position"
        value={formData.position}
        onChange={handleChange}
        placeholder="Position"
        required
        style={inputStyle}
      />
      <input
        type="text"
        name="id"
        value={formData.id}
        onChange={handleChange}
        placeholder="Employee ID"
        required
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>Save</button>
      <button type="button" onClick={onCancel} style={buttonStyle}>Cancel</button>
    </form>
  );
};

const inputStyle = {
  margin: '10px',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  width: '300px',
};

const buttonStyle = {
  padding: '10px',
  margin: '10px',
  borderRadius: '5px',
  backgroundColor: '#4CAF50',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
};

export default EmployeeForm;
