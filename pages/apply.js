//Scholarship Application form
import { useState } from 'react';
import styled from 'styled-components';
import NavBar from '../components/Layout/Navbar';
import { SecondaryButton, ButtonWrapper } from '../components/Styles/CoolButton';

const Container = styled.div`
  max-width: 640px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  color: #000000;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #1e3a8a;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #1e3a8a;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

export default function Apply() {
  const [form, setForm] = useState({
    name: '',
    wallet: '',
    major: '',
    amount: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <NavBar />
      <Container>
        <Title>Apply for Scholarship</Title>
        {['name', 'wallet', 'major', 'amount'].map((field) => (
          <div key={field}>
            <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
            <Input
              name={field}
              placeholder={field === 'amount' ? 'e.g. 5 ETH' : ''}
              value={form[field]}
              onChange={handleChange}
            />
          </div>
        ))}
        <ButtonWrapper>
          <SecondaryButton><span>Submit Application</span></SecondaryButton>
        </ButtonWrapper>
      </Container>
    </>
  );
}