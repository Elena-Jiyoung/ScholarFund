
// components/MilestoneUpload.js
import { useState } from 'react';
import { useScholarFundThirdWeb } from '@/hooks/useScholarFundThirdWeb';
import { SecondaryButton, ButtonWrapper } from './Styles/CoolButton';

export default function MilestoneUpload({ scholarId, milestoneId }) {
  const [ipfsHash, setIpfsHash] = useState('');
  const { submitScholarMilestoneProof } = useScholarFundThirdWeb();

  const handleSubmit = async () => {
    await submitScholarMilestoneProof(scholarId, milestoneId, ipfsHash);
  };

  return (
    <div>
      <input
        placeholder="IPFS Proof Hash"
        value={ipfsHash}
        onChange={(e) => setIpfsHash(e.target.value)}
      />
      <ButtonWrapper>
        <SecondaryButton onClick={handleSubmit}><span>Submit Proof</span></SecondaryButton>
      </ButtonWrapper>
    </div>
  );
}
