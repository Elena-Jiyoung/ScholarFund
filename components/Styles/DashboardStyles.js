import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 2rem;
  text-align: center;
`;

export const Section = styled.section`
  margin-bottom: 3rem;
`;

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
`;

export const CardTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 1.5rem;
`;

export const CardContent = styled.div`
  h2, h3 {
    font-family: 'Inter', sans-serif;
    color: #1e3a8a;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 0.5rem;
    color: #4a5568;
  }

  select {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
  }
`;

export const Button = styled.button`
  background-color: #1e3a8a;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 1rem;

  &:hover {
    background-color: #1e40af;
    transform: translateY(-1px);
  }

  &:last-child {
    margin-right: 0;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;

  &:focus {
    outline: none;
    border-color: #1e3a8a;
    box-shadow: 0 0 0 2px rgba(30, 58, 138, 0.1);
  }
`; 