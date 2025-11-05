import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from './router/router';


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <div className='font-[Urbanist] pl-12 pr-12 pb-12 pt-7 max-w-[1600px] mx-auto bg-[#eaeced]'>
            <RouterProvider router={router} />
        </div>
    </StrictMode>,
)
