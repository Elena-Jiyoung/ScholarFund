//Student Dashboard (status & milestone requests)
export default function Dashboard() {
    return (
      <div className="p-8 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">🎓 Student Dashboard</h1>
        <p>Status: ✅ Approved</p>
        <p>Raised: 2.4 / 5 ETH</p>
  
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Milestones</h2>
          <div className="border p-3 rounded mb-2">
            <p>📦 Milestone 1: ✅ Complete</p>
          </div>
          <div className="border p-3 rounded mb-2">
            <p>📦 Milestone 2: ⏳ Pending</p>
            <button className="bg-purple-500 text-white px-4 py-1 rounded mt-2">
              Upload Proof
            </button>
          </div>
          <button className="bg-blue-600 text-white py-2 px-4 rounded w-full mt-4">
            Request Funds
          </button>
        </div>
      </div>
    );
  }
  