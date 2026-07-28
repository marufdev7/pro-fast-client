import React from 'react';
import loadingSvg from '../../assets/loading.svg';

const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="flex flex-col items-center justify-center">
                <img src={loadingSvg} alt="Loading" className='h-64 w-64' />
            </div>
        </div>
    );
};

export default Loading;