// components/Styles/ApplicationFormStyles.js
import styled from 'styled-components';

export const FormContainer = styled.form`
  max-width: 700px;
  margin: 3rem auto;
  padding: 2.5rem 3rem;
  background: #f9fafb;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
`;

export const FormGroup = styled.div`
  margin-bottom: 1.75rem;
`;

export const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2d3748;
  font-size: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1.8px solid #cbd5e0;
  border-radius: 10px;
  font-size: 1rem;
  color: #2d3748;
  background-color: #ffffff;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.25);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

export const FileInput = styled(Input)`
  padding: 1.2rem;
  border: 2px dashed #cbd5e0;
  background-color: #edf2f7;
  text-align: center;

  &:hover {
    border-color: #3182ce;
    background-color: #fff;
  }
`;

export const UploadStatus = styled.p`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #4a5568;
`;

export const UploadLink = styled.a`
  color: #3182ce;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.p`
  color: #e53e3e;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #2b6cb0;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.15s ease;

  &:hover {
    background-color: #2c5282;
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
    transform: none;
  }
`;

export const FormTitle = styled.h2`
  color: #2b6cb0;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`;

export const FormDescription = styled.p`
  color: #4a5568;
  font-size: 1.125rem;
  margin-bottom: 2rem;
  text-align: center;
  line-height: 1.6;
`;
