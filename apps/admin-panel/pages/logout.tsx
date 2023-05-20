import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
export default function Logout() {
  const route = useRouter();
  useEffect(() => {
    Cookies.remove('user');
    route.push('/login');
  }, [route]);

  return null;
}
