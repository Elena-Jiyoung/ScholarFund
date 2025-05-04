import NavBar from './Navbar';
import styled from 'styled-components';

const MainContent = styled.main`
  padding: 30px 0 0 0; // Adjust padding to account for fixed navbar
  min-height: calc(100vh - 30px); // Ensure content takes up remaining viewport height
  background-color: #f8fafc;
`;

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <MainContent>
        {children}
      </MainContent>
    </>
  );
} 