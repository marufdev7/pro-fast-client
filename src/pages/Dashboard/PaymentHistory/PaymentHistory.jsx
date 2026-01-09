import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading/Loading';

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

    if (payments.length === 0) {
        return (
            <div className="bg-white h-screen rounded-xl p-10 text-center text-gray-500">
                You have no payment history yet.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
            <table className="table table-sm md:table-md min-w-[600px]">
                <thead className="bg-gray-50 text-gray-600 text-xs md:text-sm">
                    <tr>
                        <th></th>
                        <th>Transaction ID</th>
                        <th className="hidden md:table-cell">Parcel ID</th>
                        <th>Amount</th>
                        <th className="text-xs md:text-sm">Paid at</th>
                        <th className="hidden md:table-cell">Method</th>
                    </tr>
                </thead>

                <tbody>
                    {payments.map((pay, index) => (
                        <tr key={pay.transactionId} className="hover text-xs md:text-sm">
                            <td>{index + 1}</td>

                            <td className="font-mono">{pay.transactionId}</td>

                            <td className="hidden md:table-cell">{pay.parcelId}</td>

                            <td className="font-semibold">৳ {(pay.amount / 100).toFixed(2)}</td>

                            <td className="text-gray-600">{pay.paid_at_string}</td>

                            <td className="hidden md:table-cell capitalize">{pay.paymentMethod}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;