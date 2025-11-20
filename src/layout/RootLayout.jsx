import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shared/Navbar/Navbar';
import Footer from '../pages/shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='pl-10 pr-10 pb-10 pt-7 max-w-[1600px] mx-auto bg-[#eaeced]'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default RootLayout;