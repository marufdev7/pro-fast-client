import React from 'react';
import ProFastLogo from '../../../components/ProFastLogo/ProFastLogo';
import { FaLinkedinIn, FaXTwitter, FaFacebookF, FaYoutube } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-neutral-content py-10 px-5 rounded-2xl text-center">
            <div className="max-w-3xl mx-auto">
                <h2 className="flex items-center justify-center gap-2 text-2xl font-semibold text-white mb-3">
                    <ProFastLogo />
                </h2>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                    From personal packages to business shipments — we deliver on time, every time.
                </p>

                <div className="border-t border-b border-dashed border-gray-600 my-6 py-3 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
                    <a href="#">Services</a>
                    <a href="#">Coverage</a>
                    <a href="#">About Us</a>
                    <a href="#">Pricing</a>
                    <a href="#">Blog</a>
                    <a href="#">Contact</a>
                </div>

                <div className="flex justify-center gap-5 text-2xl">
                    <a href="#" className="text-gray-900 bg-sky-600 rounded-full p-2 hover:opacity-80"><FaLinkedinIn /></a>
                    <a href="#" className="text-gray-900 bg-white rounded-full p-2 hover:opacity-80"><FaXTwitter /></a>
                    <a href="#" className="text-white bg-sky-500 rounded-full p-2 hover:opacity-80"><FaFacebookF /></a>
                    <a href="#" className="text-white bg-red-600 rounded-full p-2 hover:opacity-80"><FaYoutube /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;