import Link from 'next/link';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1e3a8a;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Brand = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 1px;
  color: #fcfa8a;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: 500;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0%;
    height: 2px;
    background-color: #fcfa8a;
    transition: width 0.3s ease-in-out;
  }

  &:hover:after {
    width: 100%;
  }
`;

export default function NavBar() {
  return (
    <Nav>
      <Brand>ScholarFund</Brand>
      <NavLinks>
        <StyledLink href="/">Home</StyledLink>
        <StyledLink href="/apply">Apply</StyledLink>
        <StyledLink href="/dashboard">Dashboard</StyledLink>
      </NavLinks>
    </Nav>
  );
}
