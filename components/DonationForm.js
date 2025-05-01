
// components/DonateForm.js
import { useState, useEffect } from 'react';
import { useScholarFundThirdWeb } from '@/hooks/useScholarFundThirdWeb';
import { CoolButton, ButtonWrapper } from './Styles/CoolButton';

export default function DonateForm() {
  const [selectedScholar, setSelectedScholar] = useState('');
  const [amount, setAmount] = useState('');
  const [scholars, setScholars] = useState([]);
  const { getScholars, donateToScholar } = useScholarFundThirdWeb();

  useEffect(() => {
    (async () => {
      const data = await getScholars();
      setScholars(data);
    })();
  }, []);

  const handleDonate = async () => {
    await donateToScholar(selectedScholar, amount);
  };

  return (
    <div>
      <select onChange={(e) => setSelectedScholar(e.target.value)}>
        <option>Select Scholar</option>
        {scholars.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>
      <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount in ETH" />
      <ButtonWrapper>
        <CoolButton onClick={handleDonate}><span>Donate</span></CoolButton>
      </ButtonWrapper>
    </div>
  );
}
