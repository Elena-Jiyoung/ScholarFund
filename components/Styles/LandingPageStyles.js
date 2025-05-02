import styled from 'styled-components';

export const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
`;

export const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.2;
  z-index: 0;
`;

export const Overlay = styled.div`
  position: relative;
  width: 100%;
  z-index: 1;
  padding: 2rem 1rem;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 4rem 0;
  margin-bottom: 4rem;
`;

export const Title = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 4rem;
  font-weight: 800;
  color: #1e3a8a;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  background: linear-gradient(135deg, #1e3a8a 0%, #2c5282 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const Subtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  color: #4a5568;
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const SectionTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: #fcfa8a;
    border-radius: 2px;
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

export const StudentCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, #fcfa8a, #1e3a8a);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  }
`;

export const StudentName = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 1rem;
`;

export const ProgressBar = styled.progress`
  width: 100%;
  height: 12px;
  margin: 1rem 0;
  border-radius: 6px;
  overflow: hidden;

  &::-webkit-progress-bar {
    background-color: #e2e8f0;
    border-radius: 6px;
  }

  &::-webkit-progress-value {
    background: linear-gradient(to right, #fcfa8a, #1e3a8a);
    border-radius: 6px;
  }

  &::-moz-progress-bar {
    background: linear-gradient(to right, #fcfa8a, #1e3a8a);
    border-radius: 6px;
  }
`;

export const ProgressText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #4a5568;
  margin-top: 0.5rem;
  text-align: center;
`;

export const DonationSection = styled.section`
  border-radius: 16px;
  padding: 3rem;
  margin-top: 4rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
`;

export const DonationTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 2rem;
  text-align: center;
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
`;

export const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  }
`;

export const StatNumber = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 0.5rem;
`;

export const StatLabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #4a5568;
`; 