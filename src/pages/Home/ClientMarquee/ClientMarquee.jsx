import React from "react";
import Marquee from "react-fast-marquee";
import brands from "../../../assets/data/brands";

const ClientMarquee = () => {
    return (
        <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-[#03373D] mb-8">
                    We've helped thousands of sales teams
                </h2>

                <Marquee
                    speed={40}
                    gradient={false}
                    pauseOnHover={true}
                    className="flex items-center gap-10"
                >
                    {brands.map((brand) => (
                        <div
                            key={brand.id}
                            className="min-w-[120px] h-16 flex items-center justify-center mx-8"
                        >
                            <img
                                src={brand.src}
                                alt={brand.alt}
                                className="object-contain transition-all duration-300"
                            />
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    );
};

export default ClientMarquee;
