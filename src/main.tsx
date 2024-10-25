import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import { Landing } from '@/app/Landing'

const routers = createBrowserRouter([
  {
      path: "/",
      element: <Landing />,
    },
]);

const root = document.getElementById('root');

if (root === null) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={routers} />
  </StrictMode>,
);
