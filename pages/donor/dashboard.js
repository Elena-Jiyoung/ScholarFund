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
  Input,
  Select,
  Label,
  FormGroup,
  ErrorMessage
} from '@/components/Styles/DashboardStyles';
import styled from 'styled-components';

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e2e8f0;
  border-radius: 4px;
  margin-top: 0.5rem;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(to right, #fcfa8a, #1e3a8a);
  border-radius: 4px;
  transition: width 0.3s ease;
`;

const ScholarCard = styled(Card)`
  transition: transform 0.2s ease;
  &:hover {
    transform: translateY(-2px);
  }
`;

export default function DonorDashboard() {
  const { getScholars, donateToScholar } = useScholarFundThirdWeb();
  const [scholars, setScholars] = useState([]);
  const [selectedScholar, setSelectedScholar] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedScholarData, setSelectedScholarData] = useState(null);

  useEffect(() => {
    loadScholars();
  }, []);

  const loadScholars = async () => {
    const scholarList = await getScholars();
    setScholars(scholarList);
  };

  const handleScholarSelect = (e) => {
    const scholarId = e.target.value;
    setSelectedScholar(scholarId);
    setError('');
    
    if (scholarId) {
      const scholar = scholars.find(s => s.id === scholarId);
      setSelectedScholarData(scholar);
    } else {
      setSelectedScholarData(null);
    }
  };

  const validateDonation = (amount) => {
    if (!selectedScholarData) {
      return false;
    }
    
    const remainingAmount = selectedScholarData.totalFunding - selectedScholarData.raisedAmount;
    if (amount > remainingAmount) {
      setError(`Donation amount exceeds the remaining funding goal. Maximum allowed: ${remainingAmount} ETH`);
      return false;
    }
    return true;
  };

  const handleDonate = async () => {
    if (!selectedScholar || !donationAmount) {
      setError('Please enter a donation amount');
      return;
    }
    
    const amount = parseFloat(donationAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid donation amount');
      return;
    }

    if (!validateDonation(amount)) {
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      await donateToScholar(selectedScholar, donationAmount);
      setDonationAmount('');
      await loadScholars();
    } catch (error) {
      console.error('Donation failed:', error);
      setError('Transaction failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <RoleBasedLayout>
        <Container>
          <Title>Donor Dashboard</Title>
          
          <Section>
            <Card>
              <CardContent>
                <CardTitle>Make a Donation</CardTitle>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                
                <FormGroup>
                  <Label htmlFor="scholar-select">Select a Scholar</Label>
                  <Select
                    id="scholar-select"
                    value={selectedScholar} 
                    onChange={handleScholarSelect}
                  >
                    <option value="">Choose a scholar to support</option>
                    {scholars.map(scholar => (
                      <option key={scholar.id} value={scholar.id}>
                        {scholar.name} - {scholar.university} (Goal: {scholar.totalFunding} ETH, Raised: {scholar.raisedAmount} ETH)
                      </option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="amount-input">Donation Amount (ETH)</Label>
                  <Input
                    id="amount-input"
                    type="number"
                    placeholder="Enter amount in ETH"
                    value={donationAmount}
                    onChange={(e) => {
                      setDonationAmount(e.target.value);
                      setError('');
                    }}
                    min="0.0001"
                    step="0.0001"
                  />
                  {selectedScholarData && (
                    <p style={{ fontSize: '0.875rem', color: '#4a5568', marginTop: '0.5rem' }}>
                      Remaining goal: {selectedScholarData.totalFunding - selectedScholarData.raisedAmount} ETH
                    </p>
                  )}
                </FormGroup>

                <Button 
                  onClick={handleDonate}
                  disabled={!selectedScholar || !donationAmount || isLoading}
                >
                  {isLoading ? 'Processing...' : 'Donate'}
                </Button>
              </CardContent>
            </Card>
          </Section>

          <Section>
            <CardTitle>Available Scholars</CardTitle>
            {scholars.map(scholar => (
              <ScholarCard key={scholar.id}>
                <CardContent>
                  <h3>{scholar.name}</h3>
                  <p>University: {scholar.university}</p>
                  <p>Major: {scholar.major}</p>
                  <p>Funding Raised: {scholar.raisedAmount} ETH</p>
                  <p>Funding Goal: {scholar.totalFunding} ETH</p>
                  <div>
                    Progress: {((scholar.raisedAmount / scholar.totalFunding) * 100).toFixed(2)}%
                    <ProgressBar>
                      <ProgressFill style={{ width: `${(scholar.raisedAmount / scholar.totalFunding) * 100}%` }} />
                    </ProgressBar>
                  </div>
                </CardContent>
              </ScholarCard>
            ))}
          </Section>
        </Container>
      </RoleBasedLayout>
    </Layout>
  );
} 