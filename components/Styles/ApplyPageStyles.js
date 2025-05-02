import styled from 'styled-components';

export const PageWrapper = styled.div`
  background: linear-gradient(135deg, #fcfa8a 0%, #ffffff 100%);
  min-height: 100vh;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const Title = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 1.5rem;
  text-align: center;
  background: linear-gradient(135deg, #1e3a8a 0%, #2c5282 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

export const Description = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #4a5568;
  text-align: center;
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

export const Section = styled.section`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
`;

export const SectionTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 1.5rem;
`;

export const SectionDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  color: #4a5568;
  margin-bottom: 1.5rem;
`; 