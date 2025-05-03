import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f6f9fc 0%, #f1f5f9 100%);
  width: 100%;
  position: relative;
  overflow: visible;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
  letter-spacing: -0.025em;
`;

export const Section = styled.div`
  margin-bottom: 2.5rem;
`;

export const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.15);
  }
`;

export const CardTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 1.25rem;
  padding: 1.5rem 1.5rem 0;
  letter-spacing: -0.025em;
`;

export const CardContent = styled.div`
  padding: 1.5rem;

  h3 {
    font-size: 1.35rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.75rem;
    letter-spacing: -0.025em;
  }

  p {
    color: #4a5568;
    margin-bottom: 0.75rem;
    line-height: 1.6;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2rem;
`;

export const Label = styled.label`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
  letter-spacing: -0.025em;
`;

export const Select = styled.select`
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  color: #2d3748;
  background-color: white;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234a5568'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.5em;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 4px rgba(66, 153, 225, 0.2);
  }

  &:hover {
    border-color: #cbd5e0;
  }
`;

export const Input = styled.input`
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  color: #2d3748;
  background-color: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 4px rgba(66, 153, 225, 0.2);
  }

  &:hover {
    border-color: #cbd5e0;
  }
`;

export const Button = styled.button`
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-top: 1.5rem;
  letter-spacing: -0.025em;

  &:hover {
    background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: linear-gradient(135deg, #cbd5e0 0%, #a0aec0 100%);
    cursor: not-allowed;
  }
`;

export const DocumentLink = styled.button`
  background: none;
  border: none;
  color: #4299e1;
  text-decoration: none;
  cursor: pointer;
  padding: 0.5rem 0;
  margin: 0.5rem 0;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background: linear-gradient(90deg, #4299e1 0%, #3182ce 100%);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  &:hover {
    color: #3182ce;
    
    &:after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
`;

export const DocumentViewer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 80%;
  max-width: 800px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.2);

  iframe {
    width: 100%;
    height: 60vh;
    border: none;
    margin-bottom: 1rem;
    border-radius: 8px;
  }

  button {
    align-self: flex-end;
    background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  }
`;

export const ErrorMessage = styled.div`
  background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%);
  color: #c53030;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  border: 1px solid #fed7d7;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`; 