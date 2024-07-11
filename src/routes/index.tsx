import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Homepage from '@/pages';
import Login from '@/pages/auth/login';
import Register from '@/pages/auth/register';
import Profile from '@/pages/users/profile';
import EditProfile from '@/pages/users/edit-profile';
import BookDetail from '@/pages/books/detail';
import AdminPage from '@/pages/admin';
import CartPage from '@/pages/cart';
import NotFound from '@/pages/not-found';
import ProtectedRoute from './protected-route';

export default function Router() {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
          loader: () => 'Homepage | Library App',
          element: <Homepage />,
        },
        {
          path: '/login',
          loader: () => 'Login | Library App',
          element: <Login />,
        },
        {
          path: '/register',
          loader: () => 'Register | Library App',
          element: <Register />,
        },
        {
          path: '/profile',
          loader: () => 'Profile | Library App',
          element: <Profile />,
        },
        {
          path: '/profile/edit',
          loader: () => 'Edit Profile | Library App',
          element: <EditProfile />,
        },
        {
          path: '/books',
          loader: () => 'List of Books | Library App',
          element: <Homepage />,
        },
        {
          path: '/books/:id_book',
          loader: () => 'Detail Book | Library App',
          element: <BookDetail />,
        },
        {
          path: '/dashboard',
          loader: () => 'Dashboard | Library App',
          element: <AdminPage />,
        },
        {
          path: '/dashboard/books',
          loader: () => 'Admin Books | Library App',
          element: <AdminPage />,
        },
        {
          path: '/dashboard/borrows',
          loader: () => 'Admin Borrows | Library App',
          element: <AdminPage />,
        },
        {
          path: '/cart',
          loader: () => 'Cart | Library App',
          element: <CartPage />,
        },
        {
          path: '*',
          loader: () => 'Not Found | Library App',
          element: <NotFound />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
