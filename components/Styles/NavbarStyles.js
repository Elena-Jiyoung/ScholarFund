import styled from 'styled-components';
import Link from 'next/link';

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  margin: 0 0 10px 0;
  background-color: #1e3a8a;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const Brand = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 1px;
  color: #fcfa8a;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #ffffff;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: 500;
  position: relative;
  padding: 0.5rem 0;
  transition: color 0.3s ease;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 2px;
    background-color: #fcfa8a;
    transition: width 0.3s ease-in-out;
  }

  &:hover {
    color: #fcfa8a;
  }

  &:hover:after {
    width: 100%;
  }
`;

export const WalletContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
`;

export const WalletAddress = styled.span`
  font-size: 0.875rem;
  color: #fcfa8a;
`;

export const DisconnectButton = styled.button`
  background-color: transparent;
  border: 1px solid #fcfa8a;
  color: #fcfa8a;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #fcfa8a;
    color: #1e3a8a;
  }
`;

