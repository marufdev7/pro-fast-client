import React, { useRef, useState } from 'react';
import CoverageMap from './CoverageMap';
import { useLoaderData } from 'react-router';
import { FaSearch } from 'react-icons/fa';

const Coverage = () => {
    const warehouses = useLoaderData();
    const [search, setSearch] = useState("");
    const inputRef = useRef(null);
    return (
        <section className="md:p-12 p-6 mt-8 mb-16 rounded-3xl bg-white">
            <h1 className="text-3xl font-bold mb-6">
                We are available in 64 districts
            </h1>

            {/* without  search button. controlled input */}
            {/* <div className='mb-5'>
                <input
                    type="text"
                    placeholder="Search district..."
                    className="border p-2 rounded w-full max-w-md"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div> */}

            {/* Uncontrolled input with search button */}
            <div className="relative mb-5 max-w-md w-full">
                <input
                    type="text"
                    placeholder="Search here"
                    className="w-full border border-gray-400 focus:outline-0 focus:border-gray-800 bg-gray-200/30 rounded-3xl pl-10 pr-24 py-2 text-sm"
                    ref={inputRef}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setSearch(inputRef.current.value);
                        }
                    }}
                />

                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">
                    <FaSearch />
                </span>

                <button
                    onClick={() => setSearch(inputRef.current.value)}
                    className="absolute right-0.5 top-1/2 -translate-y-1/2 bg-[#CAEB66] hover:bg-[#B8D94E] text-black font-bold px-5 py-2 rounded-3xl cursor-pointer text-sm"
                >
                    Search
                </button>
            </div>


            <CoverageMap warehouses={warehouses} searchText={search} />
        </section>
    );
};

export default Coverage;