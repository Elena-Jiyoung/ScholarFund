import { useScholarFundThirdWeb } from '@/hooks/useScholarFundThirdWeb';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { LoadingContainer, LoadingText } from '@/components/Styles/LoadingStyles';

export default function RoleBasedLayout({ children }) {
  const { isAdmin, isValidator, isScholar, address } = useScholarFundThirdWeb();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (!address) {
        setIsLoading(false);
        return;
      }

      const currentPath = router.pathname;
      
      // Public routes that don't need protection
      if (currentPath === '/' || currentPath === '/apply') {
        setIsLoading(false);
        return;
      }

      // Determine the correct dashboard path based on role
      let correctPath = '';
      if (isAdmin || isValidator) {
        // Admins and Validators go to the admin dashboard
        correctPath = '/admin/dashboard';
      } else if (isScholar) {
        correctPath = '/student/dashboard';
      } else {
        correctPath = '/donor/dashboard';
      }

      // If we're not on the correct path, redirect once
      if (!currentPath.startsWith(correctPath.split('/')[1])) {
        await router.push(correctPath);
      }

      setIsLoading(false);
    };

    checkAccess();
  }, [address, isAdmin, isValidator, isScholar, router]);

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingText>Loading...</LoadingText>
      </LoadingContainer>
    );
  }

  return children;
} 