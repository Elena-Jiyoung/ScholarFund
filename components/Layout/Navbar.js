import Link from 'next/link';
import { Nav, Brand, NavLinks, StyledLink } from '../Styles/NavbarStyles';
import ConnectWalletButton from '../ConnectWalletButton';
import DashboardButton from '../DashboardButton';

const NavBar = () => {
  return (
    <Nav>
      <Brand href="/">ScholarFund</Brand>
      <NavLinks>
        <StyledLink href="/">Home</StyledLink>
        <StyledLink href="/apply">Apply</StyledLink>
        <DashboardButton />
        <ConnectWalletButton />
      </NavLinks>
    </Nav>
  );
};

export default NavBar;
