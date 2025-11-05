import React from "react";
import ServiceCard from "./ServiceCard";
import services from "../../../assets/data/services";

import {
    FaShippingFast,
    FaGlobeAmericas,
    FaWarehouse,
    FaMoneyBillWave,
    FaBuilding,
    FaUndoAlt
} from "react-icons/fa";

const iconMap = {
    1: FaShippingFast,
    2: FaGlobeAmericas,
    3: FaWarehouse,
    4: FaMoneyBillWave,
    5: FaBuilding,
    6: FaUndoAlt
};

const Services = () => {
    return (
        <section className="py-16 px-4 bg-[#03373D] rounded-2xl">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-4xl text-white font-extrabold mb-3">Our Services</h2>
                <p className="text-sm text-gray-300 max-w-2xl mx-auto">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero
                    hassle. From personal packages to business shipments — we deliver on
                    time, every time.
                </p>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => {
                        const Icon = iconMap[service.id];
                        return (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                icon={Icon}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
export default Services;