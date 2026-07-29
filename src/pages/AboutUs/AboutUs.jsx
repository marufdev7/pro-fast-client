import React from 'react';
import { Link } from 'react-router';
import {
    FaShippingFast,
    FaUsers,
    FaMapMarkedAlt,
    FaBoxOpen,
    FaHandshake,
    FaShieldAlt,
    FaLeaf,
    FaHeadset
} from 'react-icons/fa';

const stats = [
    { id: 1, icon: FaMapMarkedAlt, value: '64', label: 'Districts Covered' },
    { id: 2, icon: FaBoxOpen, value: '1M+', label: 'Parcels Delivered' },
    { id: 3, icon: FaUsers, value: '5K+', label: 'Active Riders' },
    { id: 4, icon: FaShippingFast, value: '99%', label: 'On-Time Delivery' }
];

const values = [
    {
        id: 1,
        icon: FaShieldAlt,
        title: 'Safety First',
        description:
            'Every parcel is handled with care and tracked end to end, so nothing goes missing on the way to its destination.'
    },
    {
        id: 2,
        icon: FaHandshake,
        title: 'Trust & Transparency',
        description:
            'Clear pricing, honest delivery estimates and real-time updates. No hidden charges, no surprises.'
    },
    {
        id: 3,
        icon: FaHeadset,
        title: 'People Powered Support',
        description:
            'A real support team available round the clock for merchants and customers whenever something needs attention.'
    },
    {
        id: 4,
        icon: FaLeaf,
        title: 'Smarter Logistics',
        description:
            'Optimized routing and regional hubs cut down travel time, fuel use and the cost you pay per delivery.'
    }
];

const milestones = [
    {
        id: 1,
        year: '2019',
        title: 'The Beginning',
        description:
            'ProFast Courier started in Dhaka with a handful of riders and a simple promise: same-day delivery, done right.'
    },
    {
        id: 2,
        year: '2021',
        title: 'Going Nationwide',
        description:
            'We opened regional hubs across the country and expanded our reach to every district in Bangladesh.'
    },
    {
        id: 3,
        year: '2023',
        title: 'Tech at the Core',
        description:
            'Live parcel tracking, automated rider assignment and online payments made every delivery easier to follow.'
    },
    {
        id: 4,
        year: 'Today',
        title: 'Growing Together',
        description:
            'Thousands of merchants and riders now grow their business on the ProFast Courier network every single day.'
    }
];

const AboutUs = () => {
    return (
        <section className="max-w-7xl mx-auto my-12 space-y-12 px-4 sm:px-6 lg:px-8">

            {/* Hero */}
            <div className="relative overflow-hidden rounded-3xl bg-[#003B3F] px-6 py-12 text-white shadow-lg sm:px-10 sm:py-16">
                <div className="absolute -right-12 -top-16 h-52 w-52 rounded-full bg-[#00A88E]/30 blur-3xl" />
                <div className="absolute -bottom-24 left-10 h-44 w-44 rounded-full bg-[#CAEB66]/15 blur-3xl" />
                <div className="relative max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7EE7D6]">About ProFast Courier</p>
                    <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                        Delivering trust, one parcel at a time
                    </h1>
                    <p className="mt-4 text-sm leading-6 text-white/75 sm:text-base">
                        From a small rider team in Dhaka to a nationwide logistics network, ProFast Courier exists to
                        make sending and receiving parcels effortless for merchants and customers across Bangladesh.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            to="/dashboard"
                            className="btn border-none bg-[#CAEB66] text-slate-900 hover:bg-[#B8D94E]"
                        >
                            Become a merchant
                        </Link>
                        <Link
                            to="/be-a-rider"
                            className="btn border-white/30 bg-transparent text-white hover:bg-white/10"
                        >
                            Join as a rider
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
                {stats.map(({ id, icon: Icon, value, label }) => (
                    <div
                        key={id}
                        className="rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm sm:p-6"
                    >
                        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F8F4] text-xl text-[#008D77]">
                            <Icon />
                        </span>
                        <p className="mt-4 text-2xl font-bold text-slate-800 sm:text-3xl">{value}</p>
                        <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">{label}</p>
                    </div>
                ))}
            </div>

            {/* Story */}
            <div className="grid gap-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-10 lg:grid-cols-2 lg:items-center">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#00A88E]">Our story</p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">
                        Built by people who understand delivery
                    </h2>
                    <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
                        ProFast Courier was founded to solve a problem every online seller in Bangladesh knows well:
                        getting a parcel from a shop to a doorstep, reliably and on time. What began as a small local
                        courier has grown into a nationwide network covering every district, backed by real-time
                        tracking and a support team that actually answers.
                    </p>
                    <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
                        Today, thousands of merchants trust ProFast Courier to move their products, and thousands of
                        riders earn a living delivering them, every single day.
                    </p>
                </div>
                <div className="rounded-2xl bg-[#F0FBF8] p-6 sm:p-8">
                    <h3 className="text-lg font-bold text-[#003B3F]">Our mission</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                        To make parcel delivery so dependable that businesses never have to think twice about it.
                    </p>
                    <div className="mt-6 h-px bg-[#C8EDE4]" />
                    <h3 className="mt-6 text-lg font-bold text-[#003B3F]">Our vision</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                        A Bangladesh where every district, however remote, is just one delivery away.
                    </p>
                </div>
            </div>

            {/* Values */}
            <div>
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#00A88E]">What we stand for</p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">Our core values</h2>
                </div>
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {values.map(({ id, icon: Icon, title, description }) => (
                        <div key={id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F8F4] text-xl text-[#008D77]">
                                <Icon />
                            </span>
                            <h3 className="mt-4 font-bold text-slate-800">{title}</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Milestones */}
            <div>
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#00A88E]">Our journey</p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">Milestones along the way</h2>
                </div>
                <div className="relative mt-10 space-y-8 border-l-2 border-[#C8EDE4] pl-8 sm:pl-10">
                    {milestones.map(({ id, year, title, description }) => (
                        <div key={id} className="relative">
                            <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-white bg-[#00A88E] shadow sm:-left-[49px]" />
                            <p className="text-sm font-bold text-[#00A88E]">{year}</p>
                            <h3 className="mt-1 font-bold text-slate-800">{title}</h3>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="relative overflow-hidden rounded-3xl bg-[#003B3F] px-6 py-10 text-center text-white shadow-lg sm:px-10 sm:py-14">
                <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[#CAEB66]/15 blur-3xl" />
                <div className="absolute -bottom-16 -right-10 h-48 w-48 rounded-full bg-[#00A88E]/25 blur-3xl" />
                <div className="relative mx-auto max-w-xl">
                    <h2 className="text-2xl font-bold sm:text-3xl">Ready to deliver with ProFast?</h2>
                    <p className="mt-3 text-sm leading-6 text-white/75 sm:text-base">
                        Join thousands of merchants and riders already growing with the ProFast Courier network.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <Link
                            to="/dashboard"
                            className="btn border-none bg-[#CAEB66] text-slate-900 hover:bg-[#B8D94E]"
                        >
                            Get started
                        </Link>
                        <Link
                            to="#"
                            className="btn border-white/40 bg-transparent text-white hover:bg-white/10"
                        >
                            Contact us
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;