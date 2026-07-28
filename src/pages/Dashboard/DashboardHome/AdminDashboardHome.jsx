import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import {
    FiAlertCircle,
    FiArrowRight,
    FiBox,
    FiCheckCircle,
    FiClock,
    FiTruck,
    FiUserPlus,
    FiUsers,
} from 'react-icons/fi';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const statusStyles = {
    delivered: {
        icon: FiCheckCircle,
        accent: 'bg-emerald-500',
        iconColor: 'text-emerald-600',
        iconBg: 'bg-emerald-50',
    },
    pending: {
        icon: FiClock,
        accent: 'bg-amber-400',
        iconColor: 'text-amber-600',
        iconBg: 'bg-amber-50',
    },
    assigned: {
        icon: FiTruck,
        accent: 'bg-sky-500',
        iconColor: 'text-sky-600',
        iconBg: 'bg-sky-50',
    },
    default: {
        icon: FiBox,
        accent: 'bg-[#00A88E]',
        iconColor: 'text-[#008D77]',
        iconBg: 'bg-[#E8F8F4]',
    },
};

const formatStatus = (status) => String(status || 'Unknown')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const AdminDashboardHome = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: parcelStats = [],
        isPending,
        isError,
    } = useQuery({
        queryKey: ['delivery-status-stat'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels/delivery-status/stats');
            return res.data;
        },
    });

    const totalParcels = parcelStats.reduce((total, stat) => total + Number(stat.count || 0), 0);

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
            <section className="relative overflow-hidden rounded-3xl bg-[#003B3F] px-6 py-8 text-white shadow-lg sm:px-8 sm:py-10">
                <div className="absolute -right-12 -top-16 h-52 w-52 rounded-full bg-[#00A88E]/30 blur-2xl" />
                <div className="absolute -bottom-24 right-32 h-44 w-44 rounded-full bg-amber-300/10 blur-2xl" />
                <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#7EE7D6]">Operations overview</p>
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Admin dashboard</h1>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
                            Keep an eye on parcel movement and take care of your team from one place.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-sm">
                        <p className="text-sm text-white/70">Total parcels</p>
                        <p className="mt-1 text-3xl font-bold">{isPending ? '—' : totalParcels}</p>
                    </div>
                </div>
            </section>

            <section className="mt-8" aria-labelledby="delivery-status-heading">
                <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                        <h2 id="delivery-status-heading" className="text-xl font-bold text-slate-800">Delivery status</h2>
                        <p className="mt-1 text-sm text-slate-500">A live snapshot of parcels across your network.</p>
                    </div>
                    <span className="hidden items-center gap-2 text-sm font-medium text-slate-500 sm:flex">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" /> Live data
                    </span>
                </div>

                {isPending ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="h-40 animate-pulse rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                                <div className="h-11 w-11 rounded-xl bg-slate-100" />
                                <div className="mt-5 h-4 w-24 rounded bg-slate-100" />
                                <div className="mt-3 h-7 w-16 rounded bg-slate-100" />
                            </div>
                        ))}
                    </div>
                ) : isError ? (
                    <div className="flex items-center gap-3 rounded-2xl border border-rose-100 bg-rose-50 px-5 py-4 text-rose-700">
                        <FiAlertCircle className="shrink-0 text-xl" />
                        <p className="text-sm font-medium">We couldn’t load the parcel statistics. Please refresh and try again.</p>
                    </div>
                ) : parcelStats.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                        <FiBox className="mx-auto text-3xl text-slate-400" />
                        <p className="mt-3 font-semibold text-slate-700">No parcel activity yet</p>
                        <p className="mt-1 text-sm text-slate-500">Delivery statistics will appear here as parcels are created.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {parcelStats.map((stat) => {
                            const statusKey = String(stat._id || '').toLowerCase();
                            const style = statusStyles[statusKey] || statusStyles.default;
                            const Icon = style.icon;

                            return (
                                <article key={stat._id} className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md sm:p-6">
                                    <span className={`absolute inset-x-0 top-0 h-1 ${style.accent}`} />
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-slate-500">{formatStatus(stat._id)}</p>
                                            <p className="mt-2 text-4xl font-bold tracking-tight text-slate-800">{stat.count}</p>
                                            <p className="mt-1 text-sm text-slate-400">parcels</p>
                                        </div>
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${style.iconBg} ${style.iconColor}`}>
                                            <Icon className="text-xl" />
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>

            <section className="mt-8 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="quick-actions-heading">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 id="quick-actions-heading" className="text-xl font-bold text-slate-800">Quick actions</h2>
                        <p className="mt-1 text-sm text-slate-500">Jump straight into the tasks that keep deliveries moving.</p>
                    </div>
                </div>
                <div className="mt-5 grid gap-3 md:grid-cols-3">
                    <Link to="/dashboard/assign-rider" className="group flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-[#00A88E] hover:bg-[#F0FBF8]">
                        <span className="flex items-center gap-3"><FiUserPlus className="text-xl text-[#008D77]" /><span><span className="block font-semibold text-slate-800">Assign a rider</span><span className="text-sm text-slate-500">Match parcels with riders</span></span></span>
                        <FiArrowRight className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#008D77]" />
                    </Link>
                    <Link to="/dashboard/pending-riders" className="group flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-[#00A88E] hover:bg-[#F0FBF8]">
                        <span className="flex items-center gap-3"><FiUsers className="text-xl text-[#008D77]" /><span><span className="block font-semibold text-slate-800">Review riders</span><span className="text-sm text-slate-500">Approve new applications</span></span></span>
                        <FiArrowRight className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#008D77]" />
                    </Link>
                    <Link to="/dashboard/active-riders" className="group flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-[#00A88E] hover:bg-[#F0FBF8]">
                        <span className="flex items-center gap-3"><FiTruck className="text-xl text-[#008D77]" /><span><span className="block font-semibold text-slate-800">Active riders</span><span className="text-sm text-slate-500">View your delivery fleet</span></span></span>
                        <FiArrowRight className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#008D77]" />
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default AdminDashboardHome;
