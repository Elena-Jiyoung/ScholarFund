//Student Dashboard (status & milestone requests)
import styled from 'styled-components';
import Navbar from '../components/Layout/Navbar';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
  color: #000000;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #1e3a8a;
`;

const MilestoneBox = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background-color: #fcfa8a;
  color: #000000;
  padding: 0.5rem 1rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  margin-top: 0.5rem;

  &:hover {
    background-color: #f3f05e;
  }
`;

export default function Dashboard() {
    return (
      <>
        <Navbar />
        <Container>
          <Title>🎓 Student Dashboard</Title>
            <p>Status: ✅ Approved</p>
            <p>Raised: 2.4 / 5 ETH</p>
            <h2 style={{ marginTop: '1.5rem', fontWeight: 'bold' }}>Milestones</h2>
          <MilestoneBox>
            <p>📦 Milestone 1: ✅ Complete</p>
          </MilestoneBox>
          <MilestoneBox>
            <p>📦 Milestone 2: ⏳ Pending</p>
            <Button>Upload Proof</Button>
          </MilestoneBox>
          <Button style={{ width: '100%' }}>Request Funds</Button>
        </Container>
      </>
    );
  }
  