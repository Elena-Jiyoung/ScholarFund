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
  Button,
  Input
} from '@/components/Styles/DashboardStyles';

export default function DonorDashboard() {
  const { getScholars, donateToScholar } = useScholarFundThirdWeb();
  const [scholars, setScholars] = useState([]);
  const [selectedScholar, setSelectedScholar] = useState('');
  const [donationAmount, setDonationAmount] = useState('');

  useEffect(() => {
    loadScholars();
  }, []);

  const loadScholars = async () => {
    const scholarList = await getScholars();
    setScholars(scholarList);
  };

  const handleDonate = async () => {
    if (!selectedScholar || !donationAmount) return;
    await donateToScholar(selectedScholar, donationAmount);
    setDonationAmount('');
    loadScholars();
  };

  return (
    <Layout>
      <RoleBasedLayout>
        <Container>
          <Title>Donor Dashboard</Title>
          
          <Section>
            <Card>
              <CardContent>
                <h2>Make a Donation</h2>
                <select 
                  value={selectedScholar} 
                  onChange={(e) => setSelectedScholar(e.target.value)}
                >
                  <option value="">Select a Scholar</option>
                  {scholars.map(scholar => (
                    <option key={scholar.id} value={scholar.id}>
                      {scholar.name} - {scholar.university}
                    </option>
                  ))}
                </select>
                <Input
                  type="number"
                  placeholder="Amount in ETH"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                />
                <Button onClick={handleDonate}>Donate</Button>
              </CardContent>
            </Card>
          </Section>

          <Section>
            <CardTitle>Available Scholars</CardTitle>
            {scholars.map(scholar => (
              <Card key={scholar.id}>
                <CardContent>
                  <h3>{scholar.name}</h3>
                  <p>University: {scholar.university}</p>
                  <p>Major: {scholar.major}</p>
                  <p>Funding Raised: {scholar.raisedAmount} ETH</p>
                  <p>Funding Goal: {scholar.totalFunding} ETH</p>
                  <div>
                    Progress: {((scholar.raisedAmount / scholar.totalFunding) * 100).toFixed(2)}%
                  </div>
                </CardContent>
              </Card>
            ))}
          </Section>
        </Container>
      </RoleBasedLayout>
    </Layout>
  );
} 