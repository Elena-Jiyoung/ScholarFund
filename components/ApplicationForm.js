// // components/ApplicationForm.js
// import { useState } from 'react';
// import { useScholarFundThirdWeb } from '@/hooks/useScholarFundThirdWeb';
// import { SecondaryButton, ButtonWrapper } from './Styles/CoolButton';

// export default function ApplicationForm() {
//   const [form, setForm] = useState({ name: '', university: '', major: '', amount: '', ipfsDocHash: '' });
//   const { submitScholarshipApplication } = useScholarFundThirdWeb();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     await submitScholarshipApplication(
//       form.name,
//       form.university,
//       form.major,
//       form.amount,
//       form.ipfsDocHash
//     );
//   };

//   return (
//     <div>
//       {Object.entries(form).map(([key, value]) => (
//         <div key={key}>
//           <label>{key}</label>
//           <input name={key} value={value} onChange={handleChange} placeholder={key} />
//         </div>
//       ))}
//       <ButtonWrapper>
//         <SecondaryButton onClick={handleSubmit}><span>Submit</span></SecondaryButton>
//       </ButtonWrapper>
//     </div>
//   );
// }

// components/ApplicationForm.js
// components/ApplicationForm.js
import { useEffect, useState } from 'react';
import { useScholarFundThirdWeb } from '@/hooks/useScholarFundThirdWeb';
import { SecondaryButton, ButtonWrapper } from './Styles/CoolButton';
import { initStorachaClient, uploadToIPFS, getIPFSUrl } from '@/lib/ipfsService';

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
  const { submitScholarshipApplication } = useScholarFundThirdWeb();

  useEffect(() => {
    initStorachaClient('jchoi9083@gmail.com'); 
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const cid = await uploadToIPFS(file);
      setForm((prev) => ({ ...prev, ipfsDocHash: cid }));
      setIpfsUrl(getIPFSUrl(cid));
    } catch (err) {
      setError('Upload failed. Check console for details.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitScholarshipApplication(
        form.name,
        form.university,
        form.major,
        form.amount,
        form.ipfsDocHash
      );
      alert('Application submitted!');
      setForm({ name: '', university: '', major: '', amount: '', ipfsDocHash: '' });
      setIpfsUrl('');
    } catch (err) {
      console.error('Submission failed:', err);
      alert('Submission failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="university" placeholder="University" value={form.university} onChange={handleChange} />
      <input name="major" placeholder="Major" value={form.major} onChange={handleChange} />
      <input name="amount" type="number" step="0.01" placeholder="Amount (ETH)" value={form.amount} onChange={handleChange} />

      <input type="file" onChange={handleFileUpload} disabled={uploading} />
      {uploading && <p>Uploading...</p>}
      {ipfsUrl && <p>Uploaded: <a href={ipfsUrl} target="_blank" rel="noreferrer">{ipfsUrl}</a></p>}
      {error && <p className="text-red-500">{error}</p>}

      <ButtonWrapper>
        <SecondaryButton type="submit" disabled={submitting || uploading}>
          <span>{submitting ? 'Submitting...' : 'Submit Application'}</span>
        </SecondaryButton>
      </ButtonWrapper>
    </form>
  );
}
