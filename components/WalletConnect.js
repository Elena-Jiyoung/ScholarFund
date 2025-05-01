import { useState, useEffect } from 'react';
import { useScholarFund } from '../lib/useScholarFund';

/**
 * Component for connecting to MetaMask wallet
 */
export default function WalletConnect() {
  const {
    isConnected,
    account,
    loading,
    error,
    initialize,
    isAdmin,
    isValidator,
    isScholar
  } = useScholarFund();
  
  const [displayAddress, setDisplayAddress] = useState('');

  // Format the wallet address for display
  useEffect(() => {
    if (account) {
      const shortened = `${account.slice(0, 6)}...${account.slice(-4)}`;
      setDisplayAddress(shortened);
    } else {
      setDisplayAddress('');
    }
  }, [account]);

  // Get user role
  const getUserRole = () => {
    if (isAdmin) return 'Admin';
    if (isValidator) return 'Validator';
    if (isScholar) return 'Scholar';
    return 'Donor';
  };

  return (
    <div className="wallet-connect">
      {!isConnected ? (
        <button
          className="connect-button"
          onClick={initialize}
          disabled={loading}
        >
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div className="wallet-info">
          <span className="wallet-address">{displayAddress}</span>
          <span className="user-role">{getUserRole()}</span>
        </div>
      )}
      
      {error && <div className="error-message">{error}</div>}
      
      <style jsx>{`
        .wallet-connect {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .connect-button {
          background-color: #4a90e2;
          color: white;
          padding: 10px 16px;
          border: none;
          border-radius: 4px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .connect-button:hover {
          background-color: #357abD;
        }
        
        .connect-button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
        
        .wallet-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .wallet-address {
          background-color: #f0f0f0;
          padding: 6px 12px;
          border-radius: 16px;
          font-family: monospace;
        }
        
        .user-role {
          background-color: #e2e2e2;
          color: #333;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8rem;
        }
        
        .error-message {
          color: #d32f2f;
          margin-top: 8px;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}