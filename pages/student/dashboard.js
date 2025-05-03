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
  DocumentLink,
  DocumentViewer,
  Input,
  FormGroup,
  Label
} from '@/components/Styles/DashboardStyles';
import { formatWeiToEth } from '@/utils/format';
import { getIPFSUrl } from '@/lib/ipfsService';
import styled from 'styled-components';
import MilestoneUpload from '@/components/MilestoneUpload';

const DashboardContainer = styled(Container)`
  height: 100vh;
  padding: 2rem;
  margin: 0;
  max-width: 100%;
  background: linear-gradient(135deg, #f6f9fc 0%, #f1f5f9 100%);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f5f9;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

const StyledSection = styled(Section)`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

const StyledCard = styled(Card)`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const StyledCardContent = styled(CardContent)`
  padding: 1.25rem;
  
  h3 {
    color: #1e293b;
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  p {
    color: #475569;
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }
`;

const StyledCardTitle = styled(CardTitle)`
  color: #1e293b;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const DocumentViewerContainer = styled(DocumentViewer)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

export default function StudentDashboard() {
  const { 
    submitScholarMilestoneProof,
    getScholars,
    contract,
    address
  } = useScholarFundThirdWeb();
  const [scholarData, setScholarData] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {
    loadScholarData();
  }, [address]);

  const loadScholarData = async () => {
    if (!address || !contract) return;
    
    try {
      const scholars = await getScholars();
      const currentScholar = scholars.find(s => s.walletAddress.toLowerCase() === address.toLowerCase());
      
      if (currentScholar) {
        setScholarData(currentScholar);
        // Fetch milestones for this scholar
        const ms = await contract.call('getScholarMilestones', [currentScholar.id]);
        // Format milestones with proper status
        const formattedMilestones = ms.map(m => ({
          ...m,
          id: m.id.toNumber(),
          fundAmount: formatWeiToEth(m.fundAmount)
        }));
        setMilestones(formattedMilestones);
      }
    } catch (error) {
      console.error('Error loading scholar data:', error);
    }
  };

  // Helper function to get pending milestones
  const getPendingMilestones = () => {
    return milestones.filter(m => m.status === 0); // Status 0 = Pending
  };

  const handleSubmitMilestoneProof = async (milestoneId) => {
    if (!scholarData) return;
    
    try {
      await submitScholarMilestoneProof(scholarData.id, milestoneId, milestoneProof);
      await loadScholarData();
    } catch (error) {
      console.error('Error submitting milestone proof:', error);
    }
  };

  if (!address) {
    return (
      <Layout>
        <RoleBasedLayout>
          <DashboardContainer>
            <Title>Please connect your wallet</Title>
          </DashboardContainer>
        </RoleBasedLayout>
      </Layout>
    );
  }

  if (!scholarData) {
    return (
      <Layout>
        <RoleBasedLayout>
          <DashboardContainer>
            <Title>No scholar profile found</Title>
            <p>Please make sure you have an approved scholarship application.</p>
          </DashboardContainer>
        </RoleBasedLayout>
      </Layout>
    );
  }

  return (
    <Layout>
      <RoleBasedLayout>
        <DashboardContainer>
          <Title>Student Dashboard</Title>
          
          <StyledSection>
            <StyledCardTitle>Your Profile</StyledCardTitle>
            <StyledCard>
              <StyledCardContent>
                <h3>Name: {scholarData.name}</h3>
                <p>University: {scholarData.university}</p>
                <p>Major: {scholarData.major}</p>
                <p>Funding Raised: {scholarData.raisedAmount} ETH</p>
                <p>Funding Goal: {scholarData.totalFunding} ETH</p>
              </StyledCardContent>
            </StyledCard>
          </StyledSection>

          <StyledSection>
            <StyledCardTitle>Pending Milestones</StyledCardTitle>
            {getPendingMilestones().length > 0 ? (
              getPendingMilestones().map((milestone) => (
                <StyledCard key={milestone.id}>
                  <StyledCardContent>
                    <h3>{milestone.title}</h3>
                    <p>{milestone.description}</p>
                    <p>Fund Amount: {milestone.fundAmount} ETH</p>
                    <MilestoneUpload scholarId={scholarData.id} milestoneId={milestone.id} />
                  </StyledCardContent>
                </StyledCard>
              ))
            ) : (
              <StyledCard>
                <StyledCardContent>
                  <p>No pending milestones</p>
                </StyledCardContent>
              </StyledCard>
            )}
          </StyledSection>

          <StyledSection>
            <StyledCardTitle>All Milestones</StyledCardTitle>
            {milestones.length > 0 ? (
              milestones.map((milestone) => (
                <StyledCard key={milestone.id}>
                  <StyledCardContent>
                    <h3>{milestone.title}</h3>
                    <p>{milestone.description}</p>
                    <p>Status: {milestone.status === 2 ? '✅ Complete' : milestone.status === 1 ? '⏳ Submitted' : '📝 Pending'}</p>
                    <p>Fund Amount: {milestone.fundAmount} ETH</p>
                    {milestone.status === 0 && (
                      <MilestoneUpload scholarId={scholarData.id} milestoneId={milestone.id} />
                    )}
                  </StyledCardContent>
                </StyledCard>
              ))
            ) : (
              <StyledCard>
                <StyledCardContent>
                  <p>No milestones found</p>
                </StyledCardContent>
              </StyledCard>
            )}
          </StyledSection>
        </DashboardContainer>

        {selectedDocument && (
          <DocumentViewerContainer>
            <iframe src={selectedDocument} title="Document Viewer" style={{ width: '100%', height: '100%', border: 'none' }} />
            <Button 
              onClick={() => setSelectedDocument(null)}
              style={{ position: 'absolute', top: '1rem', right: '1rem' }}
            >
              Close
            </Button>
          </DocumentViewerContainer>
        )}
      </RoleBasedLayout>
    </Layout>
  );
} 