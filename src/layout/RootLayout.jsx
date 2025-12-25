import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shared/Navbar/Navbar';
import Footer from '../pages/shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='md:pl-10 md:pr-10 md:pb-10 md:pt-7 max-w-[1600px] mx-auto bg-[#eaeced]'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default RootLayout;