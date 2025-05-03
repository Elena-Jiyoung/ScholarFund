import NavBar from './Navbar';
import styled from 'styled-components';

const MainContent = styled.main`
  min-height: calc(100vh - 80px); // Ensure content takes up remaining viewport height
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