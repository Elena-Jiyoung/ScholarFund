// components/MilestoneUpload.js
import { useState } from 'react';
import { useScholarFundThirdWeb } from '@/hooks/useScholarFundThirdWeb';
import { SecondaryButton, ButtonWrapper } from './Styles/CoolButton';
import { initStorageClient, uploadToIPFS } from '@/lib/ipfsService';
import styled from 'styled-components';

const FileInput = styled.input`
  margin: 1rem 0;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  width: 100%;
`;

const UploadStatus = styled.div`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #4a5568;
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  margin-top: 0.5rem;
  font-size: 0.875rem;
`;

export default function MilestoneUpload({ scholarId, milestoneId }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const { submitScholarMilestoneProof } = useScholarFundThirdWeb();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setUploading(true);
    setError('');

    try {
      // Initialize IPFS client
      await initStorageClient('jchoi9083@gmail.com'); // This should be the student's email
      
      // Upload file to IPFS
      const ipfsHash = await uploadToIPFS(file);
      
      // Submit the milestone proof with the IPFS hash
      await submitScholarMilestoneProof(scholarId, milestoneId, ipfsHash);
      
      // Reset form
      setFile(null);
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <FileInput
        type="file"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <UploadStatus>Uploading...</UploadStatus>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <ButtonWrapper>
        <SecondaryButton 
          onClick={handleSubmit}
          disabled={!file || uploading}
        >
          <span>{uploading ? 'Uploading...' : 'Submit Proof'}</span>
        </SecondaryButton>
      </ButtonWrapper>
    </div>
  );
}
