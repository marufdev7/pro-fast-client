import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import ClientMarquee from '../ClientMarquee/ClientMarquee';
import Features from '../Features/Features';

const Home = () => {
    return (
        <div>
            <Banner />
            <Services />
            <ClientMarquee />
            <Features />
        </div>
    );
};

export default Home;