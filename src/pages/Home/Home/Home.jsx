import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import ClientMarquee from '../ClientMarquee/ClientMarquee';

const Home = () => {
    return (
        <div>
            <Banner />
            <Services />
            <ClientMarquee />
        </div>
    );
};

export default Home;