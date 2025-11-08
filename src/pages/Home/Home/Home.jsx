import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import ClientMarquee from '../ClientMarquee/ClientMarquee';
import Features from '../Features/Features';
import BeMerchant from '../BeMerchant/BeMerchant';

const Home = () => {
    return (
        <div>
            <Banner />
            <Services />
            <ClientMarquee />
            <hr className="mb-14 text-[#003B3F]/90 max-w-7xl mx-auto border-dashed" />
            <Features />
            <hr className="mt-14 mb-14 text-[#003B3F]/90 max-w-7xl mx-auto border-dashed" />
            <BeMerchant />
        </div>
    );
};

export default Home;