import { useQuery } from '@tanstack/react-query';
import { FiAlertCircle, FiCalendar, FiPackage, FiTrendingUp } from 'react-icons/fi';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const formatDate = (dateStr) => {
    const parsed = new Date(dateStr);
    if (isNaN(parsed)) return dateStr;
    return parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const ChartTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-lg border border-slate-100 bg-white px-3 py-2 shadow-md">
            <p className="text-xs font-medium text-slate-500">{formatDate(label)}</p>
            <p className="text-sm font-bold text-[#008D77]">{payload[0].value} delivered</p>
        </div>
    );
};

const RiderDashboardHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: deliveryStats = [], isPending, isError } = useQuery({
        queryKey: ['rider-delivery-per-day', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get('/riders/delivery-per-day', {
                params: { email: user.email },
            });
            return res.data;
        },
    });

    const totalDelivered = deliveryStats.reduce((sum, day) => sum + Number(day.deliveredCount || 0), 0);
    const todayStr = new Date().toLocaleDateString('en-US');
    const todayEntry = deliveryStats.find((day) => day.date === todayStr);
    const bestDay = deliveryStats.reduce(
        (best, day) => (Number(day.deliveredCount) > Number(best?.deliveredCount || 0) ? day : best),
        null
    );

    const summaryCards = [
        { label: 'Total delivered', value: totalDelivered, icon: FiPackage, iconColor: 'text-[#008D77]', iconBg: 'bg-[#E8F8F4]' },
        { label: "Today's deliveries", value: todayEntry?.deliveredCount || 0, icon: FiCalendar, iconColor: 'text-sky-600', iconBg: 'bg-sky-50' },
        { label: 'Best day', value: bestDay ? `${bestDay.deliveredCount} parcels` : '—', icon: FiTrendingUp, iconColor: 'text-amber-600', iconBg: 'bg-amber-50' },
    ];

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
            <section className="relative overflow-hidden rounded-3xl bg-[#003B3F] px-6 py-8 text-white shadow-lg sm:px-8 sm:py-10">
                <div className="absolute -right-12 -top-16 h-52 w-52 rounded-full bg-[#00A88E]/30 blur-2xl" />
                <div className="absolute -bottom-24 right-32 h-44 w-44 rounded-full bg-amber-300/10 blur-2xl" />
                <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#7EE7D6]">Rider overview</p>
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Welcome back{user?.displayName ? `, ${user.displayName}` : ''}
                        </h1>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
                            Track how many parcels you've delivered, day by day.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-sm">
                        <p className="text-sm text-white/70">Total delivered</p>
                        <p className="mt-1 text-3xl font-bold">{isPending ? '—' : totalDelivered}</p>
                    </div>
                </div>
            </section>

            <section className="mt-8">
                {isPending ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="h-32 animate-pulse rounded-2xl border border-slate-100 bg-white p-6 shadow-sm" />
                        ))}
                    </div>
                ) : isError ? (
                    <div className="flex items-center gap-3 rounded-2xl border border-rose-100 bg-rose-50 px-5 py-4 text-rose-700">
                        <FiAlertCircle className="shrink-0 text-xl" />
                        <p className="text-sm font-medium">We couldn't load your delivery stats. Please refresh and try again.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {summaryCards.map((card) => {
                            const Icon = card.icon;
                            return (
                                <article key={card.label} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-slate-500">{card.label}</p>
                                            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-800">{card.value}</p>
                                        </div>
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.iconBg} ${card.iconColor}`}>
                                            <Icon className="text-xl" />
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>

            <section className="mt-8 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-800">Deliveries per day</h2>
                    <p className="mt-1 text-sm text-slate-500">How your delivery volume has trended recently.</p>
                </div>

                {isPending ? (
                    <div className="h-72 animate-pulse rounded-xl bg-slate-50" />
                ) : isError ? null : deliveryStats.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                        <FiPackage className="mx-auto text-3xl text-slate-400" />
                        <p className="mt-3 font-semibold text-slate-700">No deliveries yet</p>
                        <p className="mt-1 text-sm text-slate-500">
                            Your daily delivery counts will show up here once you start delivering parcels.
                        </p>
                    </div>
                ) : (
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={deliveryStats} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="date"
                                    tickFormatter={formatDate}
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                    axisLine={{ stroke: '#e2e8f0' }}
                                    tickLine={false}
                                />
                                <YAxis
                                    allowDecimals={false}
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip content={<ChartTooltip />} cursor={{ fill: '#f0fbf8' }} />
                                <Bar dataKey="deliveredCount" fill="#00A88E" radius={[6, 6, 0, 0]} barSize={36} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </section>
        </main>
    );
};

export default RiderDashboardHome;
