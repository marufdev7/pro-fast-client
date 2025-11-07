import React from 'react';
import features from '../../../assets/data/features';
import FeatureCard from './FeatureCard';

const Features = () => {
    return (
        <section>
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex flex-col gap-6">
                    {features.map((feature) => (
                        <FeatureCard key={feature.id} feature={feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;