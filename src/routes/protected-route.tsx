import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useToken } from '@/utils/contexts/token';

const ProtectedRoute = () => {
  const { user } = useToken();
  const { pathname } = useLocation();

  const token = Cookies.get('token');
  const role = user?.role;

  const authProtected = ['/login', '/register'];
  const protectedByToken = ['/profile', '/profile/edit', '/dashboard', '/dashboard/books', '/dashboard/borrows', '/cart'];
  const adminProtected = ['/dashboard', '/dashboard/books', '/dashboard/borrows'];
  const userProtected = ['/cart'];

  if (authProtected.includes(pathname)) {
    if (token) return <Navigate to="/" />;
  }

  if (protectedByToken.includes(pathname)) {
    if (!token) return <Navigate to="/login" />;
  }

  if (adminProtected.includes(pathname)) {
    if (role !== 'admin') return <Navigate to="/" />;
  }

  if (userProtected.includes(pathname)) {
    if (role !== 'user') return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
