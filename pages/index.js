//home + donate page
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavBar from '../components/Layout/Navbar';
import { CoolButton, ButtonWrapper } from '../components/Styles/CoolButton';
import DonationForm from '../components/DonationForm';
import { useScholarFundThirdWeb } from '@/hooks/useScholarFundThirdWeb';
const Container = styled.div`
  max-width: 640px;
  height: auto;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  color: #000000; 
  border-radius: 12px;
`;
const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.15; /* Adjust transparency */
  z-index: 0;
`;

const Overlay = styled.div`
  position: relative;
  width: 100%;
  z-index: 1; /* ✅ Keeps text above the background */
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1e3a8a;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #1e3a8a;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const StudentCard = styled.div`
  background-color: #fcfa8a;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ProgressBar = styled.progress`
  width: 100%;
  height: 14px;
  margin-top: 0.5rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  font-size: 1rem;
`;

export default function Home() {
  const { getScholars } = useScholarFundThirdWeb();
  const [scholars, setScholars] = useState([]);

  useEffect(() => {
    (async () => {
      const s = await getScholars();
      setScholars(s);
    })();
  }, []);
  // const [donationAmount, setDonationAmount] = useState('');
  // const [selectedScholar, setSelectedScholar] = useState('');

  // const scholars = [
  //   { name: 'Elena Choi', id: 'elena', goal: 5, raised: 2.4 },
  //   { name: 'John Doe', id: 'john', goal: 3, raised: 1.2 },
  // ];

  return (
    <>
      <PageWrapper>

      <BackgroundImage src="/scholarship-image.jpg" alt="Landing Background" />
      <Overlay>
      <NavBar />

      <Container>
        <Title>ScholarFund</Title>

        <SectionTitle>Featured Students</SectionTitle>
        <CardGrid>
          {scholars.map((s) => (
            <StudentCard key={s.id}>
              <h3 style={{ color: '#1e3a8a' }}>{s.name}</h3>
              <p>Raised: {s.raisedAmount} / {s.totalFunding} ETH</p>
              <ProgressBar value={parseFloat(s.raisedAmount)} max={parseFloat(s.totalFunding)} />
            </StudentCard>
          ))}
        </CardGrid>

        <SectionTitle>Make a Donation</SectionTitle>
        <DonationForm />
      </Container>
      </Overlay>
      </PageWrapper>
    </>
  );
}
