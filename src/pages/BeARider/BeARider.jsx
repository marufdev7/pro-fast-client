import React from 'react';
import BeARiderForm from './BeARiderForm';
import agentPending from '../../assets/agent-pending.png'
import { useLoaderData } from 'react-router';

const BeARider = () => {
    const serviceCenters = useLoaderData();
    return (
        <div className='bg-white rounded-3xl mt-8 mb-8 pb-20 lg:pr-24 lg:pl-24'>
            <div className='w-full lg:w-1/2 space-y-4 pt-5 pl-4 lg:pl-0'>
                <h1 className='text-[#03464D] text-5xl font-bold'>Be a Rider</h1>
                <p className='text-[#606060]'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            </div>
            <hr className='text-gray-300 mt-12 mb-12' />
            <div className='flex justify-between'>
                <BeARiderForm serviceCenters={serviceCenters} />
                <img className='hidden md:block w-1/2' src={agentPending} alt="" />
            </div>
        </div>
    );
};

export default BeARider;