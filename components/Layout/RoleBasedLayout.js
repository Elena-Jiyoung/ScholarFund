import { useScholarFundThirdWeb } from '@/hooks/useScholarFundThirdWeb';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { LoadingContainer, LoadingText } from '@/components/Styles/LoadingStyles';

export default function RoleBasedLayout({ children }) {
  const { isAdmin, isValidator, isScholar, address } = useScholarFundThirdWeb();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasRedirected, setHasRedirected] = useState(false);

  // Redirect based on role
  useEffect(() => {
    const checkRoleAndRedirect = async () => {
      if (!address) {
        setIsLoading(false);
        return;
      }

      const currentPath = router.pathname;
      
      // If user is on the landing page or apply page, don't redirect
      if (currentPath === '/' || currentPath === '/apply') {
        setIsLoading(false);
        return;
      }

      // Only redirect once
      if (hasRedirected) {
        setIsLoading(false);
        return;
      }
      
      // Admin routes
      if (isAdmin) {
        if (!currentPath.startsWith('/admin')) {
          setHasRedirected(true);
          await router.push('/admin/dashboard');
        }
      }
      // Validator routes
      else if (isValidator) {
        if (!currentPath.startsWith('/validator')) {
          setHasRedirected(true);
          await router.push('/validator/dashboard');
        }
      }
      // Scholar routes
      else if (isScholar) {
        if (!currentPath.startsWith('/student')) {
          setHasRedirected(true);
          await router.push('/student/dashboard');
        }
      }
      // Donor routes
      else {
        if (!currentPath.startsWith('/donor')) {
          setHasRedirected(true);
          await router.push('/donor/dashboard');
        }
      }
      setIsLoading(false);
    };

    checkRoleAndRedirect();
  }, [isAdmin, isValidator, isScholar, address, router, hasRedirected]);

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingText>Loading...</LoadingText>
      </LoadingContainer>
    );
  }

  return children;
} 