//Scholarship Application form
import { useState } from 'react';
import NavBar from '../components/Layout/Navbar';
import ApplicationForm from '../components/ApplicationForm';
import {
  PageWrapper,
  Container,
  Title,
  Description,
  ContentWrapper,
  Section,
  SectionTitle,
  SectionDescription
} from '../components/Styles/ApplyPageStyles';

export default function Apply() {
  return (
    <>
      <NavBar />
      <PageWrapper>
        <Container>
          <Title>Apply for Scholarship</Title>
          <Description>
            Complete the application form below to apply for our scholarship program. 
            We're committed to supporting students in their educational journey.
          </Description>
          
          <ContentWrapper>
            <Section>
              <SectionTitle>Application Process</SectionTitle>
              <SectionDescription>
                Please provide accurate information and ensure all required documents are uploaded. 
                Our team will review your application and get back to you within 5-7 business days.
              </SectionDescription>
              <ApplicationForm />
            </Section>
          </ContentWrapper>
        </Container>
      </PageWrapper>
    </>
  );
}