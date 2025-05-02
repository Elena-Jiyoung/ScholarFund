import { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import ConnectWalletButton from '@/components/ConnectWalletButton';
import { useScholarFundThirdWeb } from '@/hooks/useScholarFundThirdWeb';
import Link from 'next/link';
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
  DonationDescription,
  StatsContainer,
  StatCard,
  StatNumber,
  StatLabel,
  ActionButtons,
  ActionButton,
  RoleSection,
  RoleCard,
  RoleTitle,
  RoleDescription
} from '@/components/Styles/LandingPageStyles';

export default function Home() {
  const { getScholars, isAdmin, isValidator, isScholar, address } = useScholarFundThirdWeb();
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

            {address && !isAdmin && !isValidator && !isScholar && (
              <RoleSection>
                <RoleCard>
                  <RoleTitle>Become a Student</RoleTitle>
                  <RoleDescription>
                    Apply for a scholarship to fund your education. Submit your application and required documents for review.
                  </RoleDescription>
                  <Link href="/apply" passHref>
                    <ActionButton>Apply Now</ActionButton>
                  </Link>
                </RoleCard>

                <RoleCard>
                  <RoleTitle>Become a Donor</RoleTitle>
                  <RoleDescription>
                    Support students in need by contributing to their education fund. Make a difference in someone's life today.
                  </RoleDescription>
                  <Link href="/donor/dashboard" passHref>
                    <ActionButton>Start Donating</ActionButton>
                  </Link>
                </RoleCard>
              </RoleSection>
            )}

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
              <DonationDescription>
                Connect your wallet to become a donor and support students in need.
              </DonationDescription>
              <ConnectWalletButton />
            </DonationSection>
          </Container>
        </Overlay>
      </PageWrapper>
    </Layout>
  );
}
