import styled from 'styled-components';

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.5rem 0;
`;

export const CoolButton = styled.button`
  position: relative;
  padding: 0.75rem 1.5rem;
  font-size: 16px;
  font-weight: bold;
  background: transparent;
  color: #1e3a8a;
  text-transform: uppercase;
  letter-spacing: 2px;
  border: 2px solid #1e3a8a;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -75%;
    width: 50%;
    height: 100%;
    background: linear-gradient(120deg, transparent, #fcfa8a, transparent);
    transform: skewX(-20deg);
    z-index: 0;
    transition: left 0.5s ease-in-out;
  }

  &:hover::before {
    left: 150%;
  }

  &:hover {
    color: black;
    background-color: #fcfa8a;
    border-color: #fcfa8a;
    box-shadow: 0 0 10px #fcfa8a, 0 0 40px #fcfa8a, 0 0 80px #fcfa8a;
  }

  span {
    position: relative;
    z-index: 1;
  }
`;


export const SecondaryButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 16px;
  font-weight: bold;
  border: 2px solid #1e3a8a;
  border-radius: 8px;
  background-color: #ffffff;
  color: #1e3a8a;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: #1e3a8a;
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(30, 58, 138, 0.2);
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.97);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  span {
    position: relative;
    z-index: 1;
  }
`;
