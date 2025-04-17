import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  const [donationAmount, setDonationAmount] = useState('');
  const [selectedScholar, setSelectedScholar] = useState('');

  const scholars = [
    { name: 'Elena Choi', id: 'elena', goal: 5, raised: 2.4 },
    { name: 'John Doe', id: 'john', goal: 3, raised: 1.2 },
  ];

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🎓 ScholarFund</h1>
      <ConnectButton />

      <h2 className="text-xl mt-8 mb-4">Featured Students</h2>
      {scholars.map((s) => (
        <div key={s.id} className="border p-4 rounded mb-3">
          <p className="font-semibold">{s.name}</p>
          <p>Raised: {s.raised} / {s.goal} ETH</p>
          <progress value={s.raised} max={s.goal} className="w-full" />
        </div>
      ))}

      <h2 className="text-xl mt-8 mb-2">💸 Donate</h2>
      <select 
        className="border p-2 w-full mb-2"
        onChange={(e) => setSelectedScholar(e.target.value)}>
        <option value="">Select Student</option>
        {scholars.map((s) => (
          <option value={s.id} key={s.id}>{s.name}</option>
        ))}
      </select>
      <input 
        className="border p-2 w-full mb-2" 
        placeholder="Amount in ETH"
        value={donationAmount}
        onChange={(e) => setDonationAmount(e.target.value)}
      />
      <button className="bg-blue-500 text-white py-2 px-4 rounded w-full">
        Donate
      </button>
    </div>
  );
}