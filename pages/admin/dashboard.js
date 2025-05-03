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

const DashboardContainer = styled(Container)`
  overflow-y: auto;
  height: calc(100vh - 80px);
  padding: 2rem;
  margin: 0;
  max-width: 100%;
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

export default function AdminDashboard() {
  const { 
    getPendingApplications, 
    reviewScholarshipApplication, 
    getScholars,
    createScholarMilestone,
    contract,
    reviewMilestone
  } = useScholarFundThirdWeb();
  const [pendingApplications, setPendingApplications] = useState([]);
  const [scholars, setScholars] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedScholar, setSelectedScholar] = useState('');
  const [milestoneTitle, setMilestoneTitle] = useState('');
  const [milestoneDescription, setMilestoneDescription] = useState('');
  const [milestoneAmount, setMilestoneAmount] = useState('');
  const [pendingMilestones, setPendingMilestones] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [applications, scholarList, pendingMs] = await Promise.all([
      getPendingApplications(),
      getScholars(),
      getPendingMilestoneSubmissions()
    ]);
    setPendingApplications(applications);
    setScholars(scholarList);
    setPendingMilestones(pendingMs);
  };

  const handleReviewApplication = async (applicationId, approved) => {
    await reviewScholarshipApplication(applicationId, approved);
    loadData();
  };

  const handleViewDocument = (ipfsDocHash) => {
    if (!ipfsDocHash) return;
    const documentUrl = getIPFSUrl(ipfsDocHash);
    setSelectedDocument(documentUrl);
  };

  const handleReviewMilestone = async (scholarId, milestoneId, approved) => {
    try {
      // MilestoneStatus enum: 2 = Approved, 3 = Rejected
      const status = approved ? 2 : 3;
      await reviewMilestone({
        args: [scholarId, milestoneId, status]
      });
      loadData();
    } catch (error) {
      console.error('Error reviewing milestone:', error);
    }
  };

  const handleCreateMilestone = async () => {
    if (!selectedScholar || !milestoneTitle || !milestoneDescription || !milestoneAmount) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await createScholarMilestone(selectedScholar, milestoneTitle, milestoneDescription, milestoneAmount);
      // Clear form
      setMilestoneTitle('');
      setMilestoneDescription('');
      setMilestoneAmount('');
      setSelectedScholar('');
      // Reload data
      loadData();
    } catch (error) {
      console.error('Error creating milestone:', error);
      alert('Failed to create milestone');
    }
  };

  return (
    <Layout>
      <RoleBasedLayout>
        <DashboardContainer>
          <Title>Admin Dashboard</Title>
          
          <Section>
            <CardTitle>Pending Applications</CardTitle>
            {pendingApplications.map(app => (
              <Card key={app.id}>
                <CardContent>
                  <h3>{app.name}</h3>
                  <p>University: {app.university}</p>
                  <p>Major: {app.major}</p>
                  <p>Funding Requested: {formatWeiToEth(app.fundingRequested)} ETH ({app.fundingRequested} Wei)</p>
                  {app.ipfsDocHash && (
                    <div>
                      <DocumentLink onClick={() => handleViewDocument(app.ipfsDocHash)}>
                        View Application Documents
                      </DocumentLink>
                    </div>
                  )}
                  <div>
                    <Button onClick={() => handleReviewApplication(app.id, true)}>Approve</Button>
                    <Button onClick={() => handleReviewApplication(app.id, false)}>Reject</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </Section>

          <Section>
            <CardTitle>Create Milestone</CardTitle>
            <Card>
              <CardContent>
                <FormGroup>
                  <Label htmlFor="scholar-select">Select Scholar</Label>
                  <select
                    id="scholar-select"
                    value={selectedScholar}
                    onChange={(e) => setSelectedScholar(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
                  >
                    <option value="">Select a scholar</option>
                    {scholars.map(scholar => (
                      <option key={scholar.id} value={scholar.id}>
                        {scholar.name} - {scholar.university}
                      </option>
                    ))}
                  </select>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="milestone-title">Milestone Title</Label>
                  <Input
                    id="milestone-title"
                    type="text"
                    value={milestoneTitle}
                    onChange={(e) => setMilestoneTitle(e.target.value)}
                    placeholder="Enter milestone title"
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="milestone-description">Description</Label>
                  <Input
                    id="milestone-description"
                    type="text"
                    value={milestoneDescription}
                    onChange={(e) => setMilestoneDescription(e.target.value)}
                    placeholder="Enter milestone description"
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="milestone-amount">Fund Amount (ETH)</Label>
                  <Input
                    id="milestone-amount"
                    type="number"
                    value={milestoneAmount}
                    onChange={(e) => setMilestoneAmount(e.target.value)}
                    placeholder="Enter fund amount in ETH"
                    min="0.0001"
                    step="0.0001"
                  />
                </FormGroup>

                <Button onClick={handleCreateMilestone}>Create Milestone</Button>
              </CardContent>
            </Card>
          </Section>

          <Section>
            <CardTitle>Active Scholars</CardTitle>
            {scholars.map(scholar => (
              <Card key={scholar.id}>
                <CardContent>
                  <h3>{scholar.name}</h3>
                  <p>University: {scholar.university}</p>
                  <p>Major: {scholar.major}</p>
                  <p>Funding Raised: {formatWeiToEth(scholar.raisedAmount)} ETH ({scholar.raisedAmount} Wei)</p>
                </CardContent>
              </Card>
            ))}
          </Section>

          <Section>
            <CardTitle>Pending Milestone Submissions</CardTitle>
            {pendingMilestones.map(([scholarId, milestoneId]) => {
              const scholar = scholars.find(s => s.id === scholarId);
              const milestone = scholar?.milestones?.find(m => m.id === milestoneId);
              
              if (!scholar || !milestone) return null;

              return (
                <Card key={`${scholarId}-${milestoneId}`}>
                  <CardContent>
                    <h3>{scholar.name}</h3>
                    <p>University: {scholar.university}</p>
                    <p>Milestone: {milestone.title}</p>
                    <p>Description: {milestone.description}</p>
                    <p>Fund Amount: {formatWeiToEth(milestone.fundAmount)} ETH</p>
                    {milestone.ipfsProofHash && (
                      <div>
                        <DocumentLink onClick={() => handleViewDocument(milestone.ipfsProofHash)}>
                          View Milestone Proof
                        </DocumentLink>
                      </div>
                    )}
                    <div>
                      <Button onClick={() => handleReviewMilestone(scholarId, milestoneId, true)}>Approve</Button>
                      <Button onClick={() => handleReviewMilestone(scholarId, milestoneId, false)}>Reject</Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </Section>
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