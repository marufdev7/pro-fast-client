import React from 'react';
import logo from '../../assets/logo.png';

const ProFastLogo = () => {
    return (
        <div className='flex items-end'>
            <img className='mb-2' src={logo} alt="ProFast Logo" />
            <p className='text-4xl font-extrabold -ml-4'>ProFast</p>
        </div>
    );
};

export default ProFastLogo;
