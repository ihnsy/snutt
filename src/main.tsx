import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Landing from '@/app/Landing';
import Login from '@/app/Login';
import Mypage from '@/app/Mypage';
import Timetable from '@/app/Timetable';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/mypage',
    element: <Mypage />,
  },
  {
    path: '/timetable',
    element: <Timetable />,
  },
]);

const root = document.getElementById('root');

if (root === null) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
