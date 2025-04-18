//Scholarship Application Form
import { useState } from 'react';
import styled from 'styled-components';
import NavBar from '../components/Layout/Navbar';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
  color: #000000;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #1e3a8a;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.75rem;
`;

const Button = styled.button`
  width: 100%;
  background-color: #fcfa8a;
  color: #000000;
  padding: 0.75rem;
  border: none;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #f3f05e;
  }
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
          <Input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
          />
        ))}
        <Button>Submit Application</Button>
      </Container>
    </>
  );
}