import { useState, useEffect } from 'react';
import { useScholarFundThirdWeb } from '@/hooks/useScholarFundThirdWeb';
import Layout from '@/components/Layout/Layout';
import RoleBasedLayout from '@/components/Layout/RoleBasedLayout';
import {
  Container,
  Title,
  Section,
  Card,
  CardTitle,
  CardContent,
  Button
} from '@/components/Styles/DashboardStyles';

export default function StudentDashboard() {
  const { 
    submitScholarMilestoneProof,
    getScholars,
    address
  } = useScholarFundThirdWeb();
  const [scholarData, setScholarData] = useState(null);
  const [milestoneProof, setMilestoneProof] = useState('');

  useEffect(() => {
    loadScholarData();
  }, []);

  const loadScholarData = async () => {
    const scholars = await getScholars();
    const currentScholar = scholars.find(s => s.address.toLowerCase() === address.toLowerCase());
    setScholarData(currentScholar);
  };

  const handleSubmitMilestoneProof = async (milestoneId) => {
    await submitScholarMilestoneProof(scholarData.id, milestoneId, milestoneProof);
    loadScholarData();
  };

  if (!scholarData) {
    return (
      <Layout>
        <RoleBasedLayout>
          <Container>
            <Title>Loading...</Title>
          </Container>
        </RoleBasedLayout>
      </Layout>
    );
  }

  return (
    <Layout>
      <RoleBasedLayout>
        <Container>
          <Title>Student Dashboard</Title>
          
          <Section>
            <Card>
              <CardContent>
                <h2>Your Profile</h2>
                <p>Name: {scholarData.name}</p>
                <p>University: {scholarData.university}</p>
                <p>Major: {scholarData.major}</p>
                <p>Funding Raised: {scholarData.raisedAmount} ETH</p>
                <p>Funding Goal: {scholarData.totalFunding} ETH</p>
              </CardContent>
            </Card>
          </Section>

          <Section>
            <CardTitle>Milestones</CardTitle>
            {scholarData.milestones?.map(milestone => (
              <Card key={milestone.id}>
                <CardContent>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                  <p>Status: {milestone.status}</p>
                  {milestone.status === 'Pending' && (
                    <div>
                      <input
                        type="text"
                        placeholder="IPFS Proof Hash"
                        value={milestoneProof}
                        onChange={(e) => setMilestoneProof(e.target.value)}
                      />
                      <Button onClick={() => handleSubmitMilestoneProof(milestone.id)}>
                        Submit Proof
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </Section>
        </Container>
      </RoleBasedLayout>
    </Layout>
  );
} 