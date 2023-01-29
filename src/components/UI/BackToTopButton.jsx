import React, { useState, useEffect } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import styled from 'styled-components';

function BackToTopButton() {
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function handleScroll() {
    if (window.pageYOffset > 100) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  }

  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <Button style={{ visibility: visibility ? 'visible' : 'hidden' }} onClick={handleClick}>
      <IoIosArrowUp fill="#f9f9f9" style={{ fontSize: '1rem', fontWeight: 'bold' }} />
    </Button>
  );
}

export default BackToTopButton;

const Button = styled.button`
  padding: 8px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: none;
  background-color: #1dca1d;
  opacity: 70%;
  position: fixed;
  left: 96%;
  top: 80%;
  cursor: pointer;

  @media (max-width: 1024px) {
    left: 95%;
  }
  @media (max-width: 768px) {
    left: 90%;
  }
  @media (max-width: 640px) {
    left: 85%;
    top: 90%;
  }
`;
