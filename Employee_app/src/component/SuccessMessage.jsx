
import React from 'react';

const SuccessMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div style={{
      padding: '10px',
      backgroundColor: '#48bb78',
      color: 'white',
      marginBottom: '20px',
      borderRadius: '4px',
    }}>
      {message}
    </div>
  );
};

export default SuccessMessage;
