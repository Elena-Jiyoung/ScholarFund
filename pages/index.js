import { useState } from 'react';
import { ScholarCard } from '../components/ScholarCard';
import Navbar from '../components/Layout/Navbar';
import styled from 'styled-components';
import { CoolButton, ButtonWrapper } from '../components/Styles/CoolButton';
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
  color: #000000;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1e3a8a;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  color: #1e3a8a;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
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
      <Navbar />
      <Container>
        <Title>🎓 ScholarFund</Title>

        <SectionTitle>Featured Students</SectionTitle>
        {scholars.map((s) => (
          <ScholarCard key={s.id} name={s.name} goal={s.goal} raised={s.raised} />
        ))}

        <SectionTitle>💸 Donate</SectionTitle>
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
        <ButtonWrapper><CoolButton>Donate</CoolButton></ButtonWrapper>
      </Container>
    </>
  );
}