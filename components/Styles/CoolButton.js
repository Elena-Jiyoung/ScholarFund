import styled from 'styled-components';

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.5rem 0;
`;

export const CoolButton = styled.button`
  position: relative;
  padding: 12px 24px;
  font-size: 16px;
  background: transparent;
  color: #1e3a8a;
  text-transform: uppercase;
  letter-spacing: 2px;
  border: 2px solid #1e3a8a;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: 0.3s;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -75%;
    width: 50%;
    height: 100%;
    background: linear-gradient(120deg, transparent, #fcfa8a, transparent);
    transform: skewX(-20deg);
  }

  &:hover {
    color: black;
    background-color: #fcfa8a;
    box-shadow: 0 0 10px #fcfa8a, 0 0 40px #fcfa8a, 0 0 80px #fcfa8a;
    border-color: #fcfa8a;
  }

  &:hover:before {
    left: 150%;
    transition: 0.5s;
  }
`;