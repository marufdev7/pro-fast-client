import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router';
import { FiAlertCircle, FiArrowLeft, FiBox, FiCheckCircle, FiClock, FiMapPin, FiNavigation } from 'react-icons/fi';
import useAxios from '../../../hooks/useAxios';

const formatDate = (date) => {
    if (!date) return 'Time unavailable';
    const parsedDate = new Date(date);
    return Number.isNaN(parsedDate.getTime())
        ? date
        : parsedDate.toLocaleString('en-BD', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        });
};

const TrackParcel = () => {
    const { tracking_id } = useParams();
    const axiosInstance = useAxios();

    const {
        data: trackings = [],
        isPending,
        isError,
    } = useQuery({
        queryKey: ['track-parcel', tracking_id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/trackings/${tracking_id}/logs`);
            return res.data;
        },
    });

    return (
        <main className="mx-auto w-full px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
            <Link to="/dashboard/my-parcels" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#008D77]">
                <FiArrowLeft /> Back to my parcels
            </Link>

            <section className="relative mt-4 overflow-hidden rounded-3xl bg-[#003B3F] px-6 py-8 text-white shadow-lg sm:px-8 sm:py-10">
                <div className="absolute -right-10 -top-16 h-52 w-52 rounded-full bg-[#00A88E]/30 blur-3xl" />
                <div className="absolute -bottom-16 right-28 h-40 w-40 rounded-full bg-[#CAEB66]/15 blur-3xl" />
                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7EE7D6]">Parcel journey</p>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Track your parcel</h1>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-white/75 sm:text-base">Follow every update from booking to delivery.</p>
                    </div>
                    <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
                        <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Tracking ID</p>
                        <p className="mt-1 break-all font-mono text-sm font-bold text-[#CAEB66]">{tracking_id}</p>
                    </div>
                </div>
            </section>

            <section className="mt-8 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7" aria-labelledby="tracking-history-heading">
                <div className="flex flex-col gap-2 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 id="tracking-history-heading" className="text-xl font-bold text-slate-800">Tracking history</h2>
                        <p className="mt-1 text-sm text-slate-500">Latest updates for this shipment.</p>
                    </div>
                    {!isPending && !isError && trackings.length > 0 && (
                        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#E8F8F4] px-3 py-1.5 text-xs font-semibold text-[#008D77]">
                            <span className="h-2 w-2 rounded-full bg-[#00A88E]" /> {trackings.length} updates
                        </span>
                    )}
                </div>

                {isPending ? (
                    <div className="space-y-6 py-7">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="flex gap-4 animate-pulse">
                                <div className="h-10 w-10 shrink-0 rounded-full bg-slate-100" />
                                <div className="flex-1 pt-1"><div className="h-4 w-3/4 rounded bg-slate-100" /><div className="mt-3 h-3 w-1/3 rounded bg-slate-100" /></div>
                            </div>
                        ))}
                    </div>
                ) : isError ? (
                    <div className="my-6 flex items-start gap-3 rounded-2xl border border-rose-100 bg-rose-50 px-5 py-4 text-rose-700">
                        <FiAlertCircle className="mt-0.5 shrink-0 text-xl" />
                        <div><p className="font-semibold">Unable to load tracking updates</p><p className="mt-1 text-sm text-rose-600">Please refresh the page and try again.</p></div>
                    </div>
                ) : trackings.length === 0 ? (
                    <div className="py-14 text-center">
                        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl text-slate-400"><FiNavigation /></span>
                        <h3 className="mt-4 font-bold text-slate-700">No tracking updates yet</h3>
                        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">Your parcel is being prepared. Updates will appear here once its journey begins.</p>
                    </div>
                ) : (
                    <ol className="relative mt-7 space-y-7 before:absolute before:bottom-5 before:left-5 before:top-5 before:w-px before:bg-slate-200 sm:before:left-6">
                        {trackings.map((log, index) => {
                            const isLatest = index === trackings.length - 1;
                            const Icon = isLatest ? FiCheckCircle : index === 0 ? FiBox : FiMapPin;

                            return (
                                <li key={log._id || log.id || `${log.created_at}-${index}`} className="relative flex gap-4 sm:gap-5">
                                    <span className={`z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white sm:h-12 sm:w-12 ${isLatest ? 'bg-[#00A88E] text-white shadow-md shadow-[#00A88E]/25' : 'bg-[#E8F8F4] text-[#008D77]'}`}>
                                        <Icon className="text-lg" />
                                    </span>
                                    <div className="min-w-0 flex-1 rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3.5 sm:px-5">
                                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
                                            <p className="font-semibold leading-6 text-slate-800">{log.message || 'Parcel status updated'}</p>
                                            <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-slate-500"><FiClock /> {formatDate(log.created_at)}</span>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                )}
            </section>
        </main>
    );
};

export default TrackParcel;
