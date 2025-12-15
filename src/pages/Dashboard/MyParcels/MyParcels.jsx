import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEye, FaTrash, FaMoneyBillWave } from "react-icons/fa";

const MyParcels = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [] } = useQuery({
        queryKey: ['my-parcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return res.data;
        }
    })

    const sortedParcels = useMemo(() => {
        return [...parcels].sort(
            (a, b) => new Date(b.creation_date) - new Date(a.creation_date)
        );
    }, [parcels]);

    const paymentBadge = (status) =>
        status === "paid"
            ? "text-green-700 font-medium"
            : status === "pending"
                ? "text-yellow-700 font-medium"
                : "text-gray-600 font-medium";


    const typeColor = (type) =>
        type === "document"
            ? "badge bg-gray-100 text-gray-700 border border-gray-300"
            : "badge bg-gray-200 text-gray-800 border border-gray-400";


    const handleView = (parcel) => {
        console.log("View parcel:", parcel);
        // TODO: open modal or navigate to detail page
    };

    const handlePay = (parcel) => {
        console.log("Pay parcel:", parcel);
        // TODO: trigger payment flow
    };

    const handleDelete = (parcel) => {
        console.log("Delete parcel:", parcel);
        // TODO: call API to delete parcel
    };


    return (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="table table-zebra">
                <thead className="bg-base-200">
                    <tr>
                        <th></th>
                        <th>Type</th>
                        <th>Created At</th>
                        <th>Cost</th>
                        <th>Payment Status</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {sortedParcels.map((parcel, index) => (
                        <tr key={parcel._id}>
                            <td>{index + 1}</td>

                            <td>
                                <span className={`badge ${typeColor(parcel.type)}`}>
                                    {parcel.type === "document"
                                        ? "Document"
                                        : "Non-Document"}
                                </span>
                            </td>

                            <td className="text-sm text-gray-600">
                                {parcel.creation_date}
                            </td>

                            <td className="font-semibold">৳ {parcel.cost}</td>

                            <td>
                                <span className={`badge ${paymentBadge(parcel.payment_status)}`}>
                                    {parcel.payment_status}
                                </span>
                            </td>

                            <td>
                                <div className="flex justify-center gap-2">
                                    <button
                                        onClick={() => handleView(parcel)}
                                        className="btn btn-xs btn-outline"
                                    >
                                        <FaEye /> View
                                    </button>

                                    {parcel.payment_status === "pending" && (
                                        <button
                                            onClick={() => handlePay(parcel)}
                                            className="btn btn-xs text-green-600/90 hover:text-green-600 btn-outline"
                                        >
                                            <FaMoneyBillWave /> Pay
                                        </button>
                                    )}

                                    <button
                                        onClick={() => handleDelete(parcel._id)}
                                        className="btn btn-xs text-rose-600/90 hover:text-red-600 btn-outline"
                                    >
                                        <FaTrash /> Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyParcels;