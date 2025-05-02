import styled from 'styled-components';

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
`;

export const LoadingText = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  color: #1e3a8a;
  font-weight: 600;
  position: relative;
  padding-left: 2rem;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1.5rem;
    height: 1.5rem;
    border: 3px solid #1e3a8a;
    border-radius: 50%;
    border-right-color: transparent;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: translateY(-50%) rotate(360deg);
    }
  }
`; 