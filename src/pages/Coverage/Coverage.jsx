import React from 'react';
import CoverageMap from './CoverageMap';
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const warehouses = useLoaderData();
    console.log(warehouses);
    return (
        <section className="py-16">
            <h2 className="text-3xl font-bold mb-6">
                We are available in 64 districts
            </h2>

            <CoverageMap />

            {/* Search box will be added later */}
        </section>
    );
};

export default Coverage;