import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { enableMocking } from '@/shared/api/mocks/index.ts';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
});