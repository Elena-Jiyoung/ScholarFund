// components/ApplicationForm.js
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useScholarFundThirdWeb } from '@/hooks/useScholarFundThirdWeb';
import { initStorageClient, uploadToIPFS, getIPFSUrl } from '@/lib/ipfsService';
import {
  FormContainer,
  FormGroup,
  Label,
  Input,
  FileInput,
  UploadStatus,
  UploadLink,
  ErrorMessage,
  SubmitButton,
  FormTitle,
  FormDescription
} from './Styles/ApplicationFormStyles';

export default function ApplicationForm() {
  const [form, setForm] = useState({
    name: '',
    university: '',
    major: '',
    amount: '',
    ipfsDocHash: '',
  });

  const [ipfsUrl, setIpfsUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const {
    address,
    connectWithMetamask,
    disconnectWallet,
    submitScholarshipApplication,
  } = useScholarFundThirdWeb();

  useEffect(() => {
    (async () => {
      try {
        await initStorageClient('jchoi9083@gmail.com');
      } catch (e) {
        console.error('IPFS Client Init Error:', e);
      }
    })();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    setError(null);
    
    try {
      // Initialize the client with user's email first
      // This should be done earlier in your app flow, possibly during login
      const userEmail = 'jchoi9083@gmail.com';
      await initStorageClient(userEmail);
      
      // Then upload the file
      const cid = await uploadToIPFS(file);
      
      // Get the public URL for the file
      const fileUrl = getIPFSUrl(cid);
      
      // Update your form state with the file URL
      setForm(prev => ({
        ...prev,
        documentUrl: fileUrl,
        documentCid: cid
      }));
      
      console.log('File uploaded successfully:', fileUrl);
    } catch (error) {
      console.error('File upload failed:', error);
      setError(error.message);
    } finally {
      setUploading(false);
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const amountInWei = ethers.utils.parseEther(form.amount.toString());
      await submitScholarshipApplication(
        form.name,
        form.university,
        form.major,
        amountInWei,
        form.ipfsDocHash
      );
      alert('Application submitted!');
      setForm({ name: '', university: '', major: '', amount: '', ipfsDocHash: '' });
      setIpfsUrl('');
      setError('');
    } catch (err) {
      console.error('Submission failed:', err);
      setError('Submission failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>Scholarship Application</FormTitle>
      <FormDescription>
        Please fill out the form below to apply for the scholarship. Make sure to provide all required information and upload necessary documents.
      </FormDescription>

      <div className="mb-4 text-right">
        {address ? (
          <button onClick={disconnectWallet} className="text-sm text-blue-600 underline">
            Disconnect Wallet
          </button>
        ) : (
          <button onClick={connectWithMetamask} className="text-sm text-blue-600 underline">
            Connect Wallet
          </button>
        )}
      </div>

      <FormGroup>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="university">University</Label>
        <Input
          id="university"
          name="university"
          type="text"
          value={form.university}
          onChange={handleChange}
          placeholder="Enter your university"
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="major">Major</Label>
        <Input
          id="major"
          name="major"
          type="text"
          value={form.major}
          onChange={handleChange}
          placeholder="Enter your major"
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="amount">Amount (ETH)</Label>
        <Input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          value={form.amount}
          onChange={handleChange}
          placeholder="Enter amount in ETH"
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="document">Supporting Document</Label>
        <FileInput
          id="document"
          type="file"
          onChange={handleFileUpload}
          disabled={uploading}
        />
        {uploading && <UploadStatus>Uploading...</UploadStatus>}
        {ipfsUrl && (
          <UploadStatus>
            Uploaded: <UploadLink href={ipfsUrl} target="_blank" rel="noreferrer">View Document</UploadLink>
          </UploadStatus>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormGroup>

      <SubmitButton type="submit" disabled={submitting || uploading}>
        {submitting ? 'Submitting...' : 'Submit Application'}
      </SubmitButton>
    </FormContainer>
  );
}
