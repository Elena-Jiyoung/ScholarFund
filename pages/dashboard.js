//Student Dashboard (status & milestone requests)
import styled from 'styled-components';
import NavBar from '../components/Layout/Navbar';
import { SecondaryButton, ButtonWrapper } from '../components/Styles/CoolButton';

const Container = styled.div`
  max-width: 640px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  color: #000000;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #1e3a8a;
`;

const Section = styled.div`
  margin-top: 2rem;
`;

const MilestoneCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #f9f9f9;
`;

export default function Dashboard() {
  return (
    <>
      <NavBar />
      <Container>
        <Title>🎓 Student Dashboard</Title>
        <p>Status: ✅ Approved</p>
        <p>Raised: 2.4 / 5 ETH</p>

        <Section>
          <h2 style={{ color: '#1e3a8a', fontWeight: '600' , marginBottom: '10px' }}>Milestones</h2>
          <MilestoneCard>
            <p>📦 Milestone 1: ✅ Complete</p>
          </MilestoneCard>
          <MilestoneCard>
            <p>📦 Milestone 2: ⏳ Pending</p>
            <ButtonWrapper>
              <SecondaryButton><span>Upload Proof</span></SecondaryButton>
            </ButtonWrapper>
          </MilestoneCard>
          <ButtonWrapper>
            <SecondaryButton><span>Request Funds</span></SecondaryButton>
          </ButtonWrapper>
        </Section>
      </Container>
    </>
  );
}