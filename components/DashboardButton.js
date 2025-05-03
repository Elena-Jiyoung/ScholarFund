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
    console.log("[🔍] DashboardButton - Role check:");
    console.log("Address:", address);
    console.log("Is Admin:", isAdmin);
    console.log("Is Validator:", isValidator);
    console.log("Is Scholar:", isScholar);

    if (address !== undefined) {
      setIsLoading(false);
    }
  }, [address, isAdmin, isValidator, isScholar]);

  const getDashboardPath = () => {
    if (!address) {
      return null; // Don't show any path when not connected
    }
    if (isAdmin) {
      console.log("[🔍] Routing to admin dashboard");
      return '/admin/dashboard';
    }
    if (isValidator) {
      console.log("[🔍] Routing to validator dashboard");
      return '/admin/dashboard'; // Validators also go to admin dashboard
    }
    if (isScholar) {
      console.log("[🔍] Routing to student dashboard");
      return '/student/dashboard';
    }
    console.log("[🔍] Routing to donor dashboard");
    return '/donor/dashboard';
  };

  const getButtonText = () => {
    if (!address) {
      return null; // Don't show any text when not connected
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

  if (isLoading || !address) {
    return null;
  }

  const path = getDashboardPath();
  const text = getButtonText();

  if (!path || !text) {
    return null;
  }

  return (
    <Link href={path} passHref>
      <ActionButton>
        {text}
      </ActionButton>
    </Link>
  );
} 