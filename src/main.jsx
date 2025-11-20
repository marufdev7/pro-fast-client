import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from './router/router';
import AOS from "aos";
import "aos/dist/aos.css";
import AuthProvider from './contexts/AuthContext/AuthProvider';

AOS.init({ duration: 1000, delay: 300 });

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <div className='font-[Urbanist] '>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </div>
    </StrictMode>,
)
