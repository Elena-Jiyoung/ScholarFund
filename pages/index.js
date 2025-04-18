//home + donate page
import { useState } from 'react';
import styled from 'styled-components';
import NavBar from '../components/Layout/Navbar';
import { CoolButton, ButtonWrapper } from '../components/Styles/CoolButton';

const Container = styled.div`
  max-width: 640px;
  height: auto;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  color: #000000;
  border-radius: 12px;
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
  const [donationAmount, setDonationAmount] = useState('');
  const [selectedScholar, setSelectedScholar] = useState('');

  const scholars = [
    { name: 'Elena Choi', id: 'elena', goal: 5, raised: 2.4 },
    { name: 'John Doe', id: 'john', goal: 3, raised: 1.2 },
  ];

  return (
    <>
      <NavBar />
      <Container>
        <Title>ScholarFund</Title>

        <SectionTitle>Featured Students</SectionTitle>
        <CardGrid>
          {scholars.map((s) => (
            <StudentCard key={s.id}>
              <h3 style={{ color: '#1e3a8a' }}>{s.name}</h3>
              <p>Raised: {s.raised} / {s.goal} ETH</p>
              <ProgressBar value={s.raised} max={s.goal} />
            </StudentCard>
          ))}
        </CardGrid>

        <SectionTitle>Make a Donation</SectionTitle>
        <Select onChange={(e) => setSelectedScholar(e.target.value)}>
          <option value="">Select Student</option>
          {scholars.map((s) => (
            <option value={s.id} key={s.id}>{s.name}</option>
          ))}
        </Select>
        <Input
          placeholder="Amount in ETH"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
        />
        <ButtonWrapper>
          <CoolButton><span>Donate</span></CoolButton>
        </ButtonWrapper>
      </Container>
    </>
  );
}
