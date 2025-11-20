import React from 'react';
import { Outlet } from 'react-router';
import authImg from '../assets/authImage.png';
import ProFastLogo from '../components/ProFastLogo/ProFastLogo';

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="lg:bg-[linear-gradient(to_right,white_50%,#FAFDF0_50%)] pl-12 pt-12">
                <ProFastLogo />
            </div>
            <div className="flex flex-col items-center lg:flex-row-reverse">
                <div className='flex-1 bg-[#FAFDF0] lg:min-h-[90vh] flex items-center justify-center'>
                    <img
                        src={authImg}
                        alt="Authentication Illustration"
                        className="w-3/4 lg:w-full"
                    />
                </div>
                <div className='flex-1'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;