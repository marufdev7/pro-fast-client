import React from 'react';
import features from '../../../assets/data/features';

const Features = () => {
    return (
        <section>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col gap-6">
                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            <div className="w-full md:w-1/3 lg:w-1/4 p-8 flex justify-center">
                                <div className="relative">
                                    <img
                                        src={feature.img}
                                        alt={feature.title}
                                        className="w-40 h-40 object-contain"
                                    />
                                </div>
                            </div>
                            <div className="hidden md:block border-l border-dashed h-32 border-[#03373D]/50"></div>

                            <div className="flex-1 p-8">
                                <h3 className="text-2xl font-bold md:text-3xl md:font-extrabold text-[#03373D] mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-base leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;