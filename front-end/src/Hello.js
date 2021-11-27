import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hello = () => {
  const history = useNavigate();
  const handleClick = () => history.push('/goodbye');
  
  return (
    <button type="button" onClick={handleClick}>
      Goodbye
    </button>
  );
};

export default Hello;