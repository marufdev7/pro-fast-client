import { Link } from 'react-router';
import { FiArrowRight, FiBox, FiCheckCircle, FiMapPin, FiPackage, FiSend, FiTruck } from 'react-icons/fi';
import useAuth from '../../../hooks/useAuth';

const UserDashboardHome = () => {
    const { user } = useAuth();
    const firstName = user?.displayName?.trim().split(' ')[0] || 'there';

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
            <section className="relative overflow-hidden rounded-3xl bg-[#003B3F] px-6 py-8 text-white shadow-lg sm:px-8 sm:py-10">
                <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#00A88E]/30 blur-3xl" />
                <div className="absolute -bottom-24 right-28 h-48 w-48 rounded-full bg-[#CAEB66]/15 blur-3xl" />
                <div className="relative flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#7EE7D6]">Your delivery space</p>
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Welcome back, {firstName}!</h1>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
                            Send parcels, follow their journey, and keep every delivery in one convenient place.
                        </p>
                    </div>
                    <Link to="/send-parcel" className="btn border-[#CAEB66] bg-[#CAEB66] text-slate-900 hover:border-[#B8D94E] hover:bg-[#B8D94E]">
                        <FiSend /> Send a parcel
                    </Link>
                </div>
            </section>

            <section className="mt-8" aria-labelledby="quick-actions-heading">
                <div className="mb-4">
                    <h2 id="quick-actions-heading" className="text-xl font-bold text-slate-800">Quick actions</h2>
                    <p className="mt-1 text-sm text-slate-500">Everything you need for your next delivery.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Link to="/send-parcel" className="group relative overflow-hidden rounded-2xl bg-[#E8F8F4] p-6 transition hover:-translate-y-1 hover:shadow-md sm:p-7">
                        <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-[#00A88E]/10" />
                        <div className="relative flex items-start justify-between gap-4">
                            <div>
                                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl text-[#008D77] shadow-sm"><FiPackage /></span>
                                <h3 className="mt-5 text-xl font-bold text-[#003B3F]">Book a delivery</h3>
                                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">Create a parcel request in a few simple steps and we’ll take it from there.</p>
                            </div>
                            <FiArrowRight className="mt-1 text-xl text-[#008D77] transition group-hover:translate-x-1" />
                        </div>
                    </Link>

                    <Link to="/dashboard/my-parcels" className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-200 hover:shadow-md sm:p-7">
                        <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-[#CAEB66]/20" />
                        <div className="relative flex items-start justify-between gap-4">
                            <div>
                                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F7FBEA] text-xl text-[#758F20] shadow-sm"><FiTruck /></span>
                                <h3 className="mt-5 text-xl font-bold text-[#003B3F]">My parcels</h3>
                                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">Review your bookings, make payments, and check delivery progress.</p>
                            </div>
                            <FiArrowRight className="mt-1 text-xl text-slate-500 transition group-hover:translate-x-1 group-hover:text-[#758F20]" />
                        </div>
                    </Link>
                </div>
            </section>

            <section className="mt-8 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7" aria-labelledby="how-it-works-heading">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2 id="how-it-works-heading" className="text-xl font-bold text-slate-800">Delivery made simple</h2>
                        <p className="mt-1 text-sm text-slate-500">Three straightforward steps from booking to delivery.</p>
                    </div>
                    <Link to="/send-parcel" className="hidden items-center gap-2 text-sm font-semibold text-[#008D77] hover:text-[#003B3F] sm:inline-flex">Start a delivery <FiArrowRight /></Link>
                </div>

                <div className="mt-7 grid gap-6 md:grid-cols-3">
                    <div className="relative md:pr-6 md:after:absolute md:after:right-0 md:after:top-6 md:after:h-px md:after:w-6 md:after:bg-slate-200">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8F8F4] font-bold text-[#008D77]">01</span>
                        <FiBox className="mt-4 text-2xl text-[#008D77]" />
                        <h3 className="mt-3 font-bold text-slate-800">Book your parcel</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-500">Add pickup, delivery, and parcel details.</p>
                    </div>
                    <div className="relative md:pr-6 md:after:absolute md:after:right-0 md:after:top-6 md:after:h-px md:after:w-6 md:after:bg-slate-200">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8F8F4] font-bold text-[#008D77]">02</span>
                        <FiMapPin className="mt-4 text-2xl text-[#008D77]" />
                        <h3 className="mt-3 font-bold text-slate-800">We pick it up</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-500">A rider is assigned to collect your parcel.</p>
                    </div>
                    <div>
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8F8F4] font-bold text-[#008D77]">03</span>
                        <FiCheckCircle className="mt-4 text-2xl text-[#008D77]" />
                        <h3 className="mt-3 font-bold text-slate-800">Delivered safely</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-500">Follow progress until your parcel reaches its destination.</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default UserDashboardHome;
