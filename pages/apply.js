//Scholarship Application form
import { useScholarFundThirdWeb } from '@/hooks/useScholarFundThirdWeb';
import ApplicationForm from '@/components/ApplicationForm';
import { useState, useEffect } from 'react';
import { 
  Container, 
  Title, 
  Description,
  RoleMessage,
  DonorMessage,
  ConnectMessage
} from '@/components/Styles/ApplicationStyles';

export default function Apply() {
  const { address, isAdmin, isValidator, isScholar } = useScholarFundThirdWeb();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (address !== undefined) {
      setIsLoading(false);
    }
  }, [address, isAdmin, isValidator, isScholar]);

  if (isLoading) {
    return (
      <Container>
        <Title>Loading...</Title>
      </Container>
    );
  }

  if (!address) {
    return (
      <Container>
        <Title>Apply for Scholarship</Title>
        <ConnectMessage>
          Please connect your wallet to apply for a scholarship.
        </ConnectMessage>
      </Container>
    );
  }

  if (isAdmin || isValidator) {
    return (
      <Container>
        <Title>Access Denied</Title>
        <RoleMessage>
          Administrators and Validators cannot submit scholarship applications.
        </RoleMessage>
      </Container>
    );
  }

  if (isScholar) {
    return (
      <Container>
        <Title>Access Denied</Title>
        <RoleMessage>
          You are already a scholar and cannot submit another application.
        </RoleMessage>
      </Container>
    );
  }

  // Default case - show application form for potential students
  return (
    <Container>
      <Title>Apply for Scholarship</Title>
      <Description>
        Fill out the form below to apply for a scholarship. Make sure to provide all required information
        and upload necessary documents. Your application will be reviewed by our validators.
      </Description>
      <ApplicationForm />
    </Container>
  );
}