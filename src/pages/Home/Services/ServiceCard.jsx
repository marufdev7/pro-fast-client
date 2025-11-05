import React from 'react';

const ServiceCard = ({ service, icon: Icon }) => {
    const { title, description } = service;
    return (
        <article
            className="card bg-white hover:bg-[#CAEB66] p-6 h-64 rounded-2xl transition-colors duration-300 delay-100"
        >
            <div className="flex flex-col items-center gap-5">
                <div className="w-12 h-12 flex items-center justify-center bg-teal-800 rounded-full">
                    {Icon ? <Icon className="w-6 h-6 text-white" aria-hidden="true" /> : null}
                </div>
                <div>
                    <h3 id={`service-${title}`} className="text-2xl text-[#03373D] font-bold">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-800 mt-2">{description}</p>
                </div>
            </div>
        </article>
    );
};

export default ServiceCard;