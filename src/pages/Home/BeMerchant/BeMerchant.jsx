import React from 'react';
import bgImage from '../../../assets/be-a-merchant-bg.png';
import boxImage from '../../../assets/location-merchant.png';

const BeMerchant = () => {
    return (
        <section
            className="relative rounded-2xl max-w-7xl mx-auto overflow-hidden my-12"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Overlay (optional for better contrast) */}
            <div className="absolute inset-0 bg-[#003B3F]/90"></div>

            <div className="relative px-6 lg:px-12 py-16 flex flex-col lg:flex-row items-center justify-between text-white">
                <div className="text-center lg:text-left space-y-4">
                    <h2 className="text-3xl md:text-4xl font-extrabold leading-snug">
                        Merchant and Customer Satisfaction is Our First Priority
                    </h2>
                    <p className="text-[#dadada] lg:w-2/3 text-sm md:text-base leading-relaxed">
                        We offer the lowest delivery charge with the highest value along
                        with 100% safety of your product. ProFast Courier delivers your
                        parcels in every corner of Bangladesh right on time.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                        <button className="bg-[#C7F033] text-black font-bold px-6 py-2 rounded-full hover:bg-[#b4da2e] transition">
                            Become a Merchant
                        </button>
                        <button className="border border-[#C7F033] text-[#C7F033]/95 px-6 py-2 rounded-full hover:bg-[#C7F033] hover:text-black font-bold transition">
                            Earn with ProFast Courier
                        </button>
                    </div>
                </div>

                <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center lg:justify-end">
                    <img
                        src={boxImage}
                        alt="Boxes"
                        className="w-80 md:w-96 lg:w-[420px] object-contain"
                    />
                </div>
            </div>
        </section>
    );
}

export default BeMerchant;