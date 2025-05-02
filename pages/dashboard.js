//Student Dashboard (status & milestone requests)
import styled from 'styled-components';
import NavBar from '../components/Layout/Navbar';
import { useState, useEffect } from 'react';
import { SecondaryButton, ButtonWrapper } from '../components/Styles/CoolButton';
import MilestoneUpload from '../components/MilestoneUpload';
import { useScholarFundThirdWeb } from '@/hooks/useScholarFundThirdWeb';
const Container = styled.div`
  max-width: 640px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  color: #000000;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;
const PageWrapper = styled.div`
  background: linear-gradient(to right, #fcfa8a 0%, #ffffff 100%);
  min-height: 100vh;
  padding-top: 3rem;
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #1e3a8a;
  margin-bottom: 10px;
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
  const { getScholars, contract, address } = useScholarFundThirdWeb();
  const [myScholar, setMyScholar] = useState(null);
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    (async () => {
      const all = await getScholars();
      const found = all.find((s) => s.walletAddress.toLowerCase() === address?.toLowerCase());
      if (found) {
        setMyScholar(found);
        const ms = await contract.call('getScholarMilestones', [found.id]);
        setMilestones(ms);
      }
    })();
  }, [address]);

  return (
    <>
      <NavBar />
      <PageWrapper>
      <Container>
        <Title>🎓 Student Dashboard</Title>
        {myScholar && (
            <>
              <p>Status: ✅ Approved</p>
              <p>Raised: {myScholar.raisedAmount} / {myScholar.totalFunding} ETH</p>
              <Section>
                <h2 style={{ color: '#1e3a8a', fontWeight: '600' , marginBottom: '10px' }}>Milestones</h2>
                {milestones.map((m, idx) => (
                  <MilestoneCard key={idx}>
                    <p>📦 {m.title}: {m.status === 2 ? '✅ Complete' : m.status === 1 ? '⏳ Submitted' : '📝 Pending'}</p>
                    {m.status === 0 && (
                      <MilestoneUpload scholarId={myScholar.id} milestoneId={m.id.toNumber()} />
                    )}
                  </MilestoneCard>
                ))}
              </Section>
            </>
          )}
        {/* <p>Status: ✅ Approved</p>
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
          </ButtonWrapper> */}
        {/* </Section> */}
      </Container>
      </PageWrapper>
    </>
  );
}