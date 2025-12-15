import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from './router/router';
import AOS from "aos";
import "aos/dist/aos.css";
import AuthProvider from './contexts/AuthContext/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

AOS.init({ duration: 1000, delay: 300 });

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <div className='font-[Urbanist] '>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
            </QueryClientProvider>
        </div>
    </StrictMode>,
)
