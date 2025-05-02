import { useScholarFundThirdWeb } from '@/hooks/useScholarFundThirdWeb';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { ActionButton } from './Styles/LandingPageStyles';

export default function DashboardButton() {
  const { address, isAdmin, isValidator, isScholar } = useScholarFundThirdWeb();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only set loading to false once we have the role information
    if (address !== undefined) {
      setIsLoading(false);
    }
  }, [address, isAdmin, isValidator, isScholar]);

  const getDashboardPath = () => {
    if (!address) {
      return '/';
    }
    if (isAdmin) {
      return '/admin/dashboard';
    }
    if (isValidator) {
      return '/validator/dashboard';
    }
    if (isScholar) {
      return '/student/dashboard';
    }
    // Default to donor dashboard
    return '/donor/dashboard';
  };

  const getButtonText = () => {
    if (!address) {
      return 'Connect Wallet';
    }
    if (isAdmin) {
      return 'Admin Dashboard';
    }
    if (isValidator) {
      return 'Validator Dashboard';
    }
    if (isScholar) {
      return 'Student Dashboard';
    }
    return 'Donor Dashboard';
  };

  if (isLoading) {
    return null; // Or a loading spinner if you prefer
  }

  return (
    <Link href={getDashboardPath()} passHref>
      <ActionButton>
        {getButtonText()}
      </ActionButton>
    </Link>
  );
} 