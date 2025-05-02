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

export default function AdminDashboard() {
  const { getPendingApplications, reviewScholarshipApplication, getScholars } = useScholarFundThirdWeb();
  const [pendingApplications, setPendingApplications] = useState([]);
  const [scholars, setScholars] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [applications, scholarList] = await Promise.all([
      getPendingApplications(),
      getScholars()
    ]);
    setPendingApplications(applications);
    setScholars(scholarList);
  };

  const handleReviewApplication = async (applicationId, approved) => {
    await reviewScholarshipApplication(applicationId, approved);
    loadData();
  };

  return (
    <Layout>
      <RoleBasedLayout>
        <Container>
          <Title>Admin Dashboard</Title>
          
          <Section>
            <CardTitle>Pending Applications</CardTitle>
            {pendingApplications.map(app => (
              <Card key={app.id}>
                <CardContent>
                  <h3>{app.name}</h3>
                  <p>University: {app.university}</p>
                  <p>Major: {app.major}</p>
                  <p>Funding Requested: {app.fundingRequested} ETH</p>
                  <div>
                    <Button onClick={() => handleReviewApplication(app.id, true)}>Approve</Button>
                    <Button onClick={() => handleReviewApplication(app.id, false)}>Reject</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </Section>

          <Section>
            <CardTitle>Active Scholars</CardTitle>
            {scholars.map(scholar => (
              <Card key={scholar.id}>
                <CardContent>
                  <h3>{scholar.name}</h3>
                  <p>University: {scholar.university}</p>
                  <p>Major: {scholar.major}</p>
                  <p>Funding Raised: {scholar.raisedAmount} ETH</p>
                </CardContent>
              </Card>
            ))}
          </Section>
        </Container>
      </RoleBasedLayout>
    </Layout>
  );
} 