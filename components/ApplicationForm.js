// components/ApplicationForm.js
import { useState } from 'react';
import { useScholarFundThirdWeb } from '@/hooks/useScholarFundThirdWeb';
import { SecondaryButton, ButtonWrapper } from './Styles/CoolButton';

export default function ApplicationForm() {
  const [form, setForm] = useState({ name: '', university: '', major: '', amount: '', ipfsDocHash: '' });
  const { submitScholarshipApplication } = useScholarFundThirdWeb();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await submitScholarshipApplication(
      form.name,
      form.university,
      form.major,
      form.amount,
      form.ipfsDocHash
    );
  };

  return (
    <div>
      {Object.entries(form).map(([key, value]) => (
        <div key={key}>
          <label>{key}</label>
          <input name={key} value={value} onChange={handleChange} placeholder={key} />
        </div>
      ))}
      <ButtonWrapper>
        <SecondaryButton onClick={handleSubmit}><span>Submit</span></SecondaryButton>
      </ButtonWrapper>
    </div>
  );
}
