import { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import ConnectWalletButton from '@/components/ConnectWalletButton';
import { useScholarFundThirdWeb } from '@/hooks/useScholarFundThirdWeb';
import {
  PageWrapper,
  BackgroundImage,
  Overlay,
  Container,
  HeroSection,
  Title,
  Subtitle,
  SectionTitle,
  CardGrid,
  StudentCard,
  StudentName,
  ProgressBar,
  ProgressText,
  DonationSection,
  DonationTitle,
  StatsContainer,
  StatCard,
  StatNumber,
  StatLabel
} from '@/components/Styles/LandingPageStyles';

export default function Home() {
  const { getScholars } = useScholarFundThirdWeb();
  const [scholars, setScholars] = useState([]);

  useEffect(() => {
    (async () => {
      const s = await getScholars();
      setScholars(s);
    })();
  }, []);

  return (
    <Layout>
      <PageWrapper>
        <BackgroundImage src="/scholarship-image.jpg" alt="Background" />
        <Overlay>
          <Container>
            <HeroSection>
              <Title>Empowering Education Through Blockchain</Title>
              <Subtitle>
                ScholarFund is revolutionizing education funding by connecting students with global donors through decentralized technology. 
                Join us in making education accessible to all.
              </Subtitle>
            </HeroSection>

            <StatsContainer>
              <StatCard>
                <StatNumber>{scholars.length}</StatNumber>
                <StatLabel>Students Supported</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber>100%</StatNumber>
                <StatLabel>Transparent Funding</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber>24/7</StatNumber>
                <StatLabel>Global Access</StatLabel>
              </StatCard>
            </StatsContainer>

            <SectionTitle>Featured Students</SectionTitle>
            <CardGrid>
              {scholars.map((s) => (
                <StudentCard key={s.id}>
                  <StudentName>{s.name}</StudentName>
                  <ProgressBar 
                    value={parseFloat(s.raisedAmount)} 
                    max={parseFloat(s.totalFunding)} 
                  />
                  <ProgressText>
                    {s.raisedAmount} ETH raised of {s.totalFunding} ETH goal
                  </ProgressText>
                </StudentCard>
              ))}
            </CardGrid>

            <DonationSection>
              <DonationTitle>Make a Difference Today</DonationTitle>
              <p>Connect your wallet to become a donor and support students in need.</p>
              <ConnectWalletButton />
            </DonationSection>
          </Container>
        </Overlay>
      </PageWrapper>
    </Layout>
  );
}
