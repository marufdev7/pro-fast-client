import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading/Loading';
import { FiCreditCard, FiFileText, FiShield } from 'react-icons/fi';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isPending, data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    })

    if (isPending) {
        return <Loading />
    }

    return (
        <main className="mx-auto w-full px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
            <section className="relative overflow-hidden rounded-3xl bg-[#003B3F] px-6 py-8 text-white shadow-lg sm:px-8 sm:py-10">
                <div className="absolute -right-12 -top-16 h-52 w-52 rounded-full bg-[#00A88E]/30 blur-3xl" />
                <div className="absolute -bottom-24 right-28 h-44 w-44 rounded-full bg-[#CAEB66]/15 blur-3xl" />
                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7EE7D6]">Billing overview</p><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Payment history</h1><p className="mt-3 max-w-xl text-sm leading-6 text-white/75 sm:text-base">Review completed parcel payments and keep your transaction records organized.</p></div>
                    <span className="flex w-fit items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold backdrop-blur-sm"><FiShield className="text-[#CAEB66]" /> Secure payments</span>
                </div>
            </section>

            <section className="mt-8 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                    <div><h2 className="text-xl font-bold text-slate-800">Transaction records</h2><p className="mt-1 text-sm text-slate-500">A complete list of your successful payments.</p></div>
                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#E8F8F4] px-3 py-1.5 text-xs font-semibold text-[#008D77]"><FiCreditCard /> {payments.length} {payments.length === 1 ? 'payment' : 'payments'}</span>
                </div>
                {payments.length === 0 ? (
                    <div className="px-6 py-16 text-center"><span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl text-slate-400"><FiFileText /></span><h3 className="mt-5 text-xl font-bold text-slate-700">No payment records yet</h3><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">Completed payments for your parcel deliveries will appear here.</p></div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table table-sm min-w-[720px] md:table-md">
                            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th></th><th>Transaction ID</th><th className="hidden md:table-cell">Parcel ID</th><th>Amount</th><th className="text-xs md:text-sm">Paid at</th><th className="hidden md:table-cell">Method</th></tr></thead>
                            <tbody>
                                {payments.map((pay, index) => (
                                    <tr key={pay.transactionId} className="text-xs transition hover:bg-[#F7FCFB] md:text-sm">
                                        <td className="font-semibold text-slate-400">{index + 1}</td>
                                        <td><p className="font-mono font-semibold text-slate-700">{pay.transactionId}</p><p className="mt-1 text-[11px] text-slate-400">Successful transaction</p></td>
                                        <td className="hidden font-mono text-slate-600 md:table-cell">{pay.parcelId}</td>
                                        <td className="font-semibold text-slate-700"><span className="inline-flex items-center gap-1"> ৳ {(pay.amount / 100).toFixed(2)}</span></td>
                                        <td className="text-gray-600">{pay.paid_at_string}</td>
                                        <td className="hidden md:table-cell"><span className="badge border-0 bg-slate-100 px-3 py-3 font-semibold capitalize text-slate-600">{pay.paymentMethod}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </main>
    );
};

export default PaymentHistory;
