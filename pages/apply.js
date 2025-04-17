//Scholarship Application Form
import { useState } from 'react';

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
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Apply for Scholarship</h1>
      {['name', 'wallet', 'major', 'amount'].map((field) => (
        <input
          key={field}
          className="border p-2 w-full mb-3"
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={form[field]}
          onChange={handleChange}
        />
      ))}
      <button className="bg-green-600 text-white py-2 px-4 rounded w-full">
        Submit Application
      </button>
    </div>
  );
}