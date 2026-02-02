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

    return (
        <div className="overflow-x-auto bg-white rounded-xl p-4 shadow min-h-screen">
            <h2 className="text-2xl font-semibold mb-4">My Payment History</h2>
            {payments.length === 0 ? (
                <p className="text-center text-xl font-bold text-gray-500">
                    No active deliveries
                </p>
            ) : (
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
            )}
        </div>
    );
};

export default PaymentHistory;