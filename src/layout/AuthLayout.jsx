import React from 'react';
import { Outlet } from 'react-router';
import authImg from '../assets/authImage.png';
import ProFastLogo from '../components/ProFastLogo/ProFastLogo';

const AuthLayout = () => {
    return (
        <div className="min-h-screen">
            <div className="lg:bg-[linear-gradient(to_right,#eaeced_50%,#FAFDF0_50%)] pt-4 pb-4">
                <ProFastLogo />
            </div>
            <div className="flex flex-col items-center  lg:flex-row-reverse">
                <div className='flex-1 bg-[#FAFDF0]'>
                    <img
                        src={authImg}
                        className=""
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