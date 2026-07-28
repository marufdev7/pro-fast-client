import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEye, FaTrash, FaMoneyBillWave } from "react-icons/fa";
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router';

const MyParcels = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [selectedParcel, setSelectedParcel] = useState(null);

    const { data: parcels = [], refetch } = useQuery({
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
                : "text-green-600 font-medium";


    const typeColor = (type) =>
        type === "document"
            ? "badge bg-gray-100 text-gray-700 border border-gray-300"
            : "badge bg-gray-200 text-gray-800 border border-gray-400";


    const handleView = (parcel) => {
        setSelectedParcel(parcel);
    };

    const handlePay = (id) => {
        // console.log("Proceed to payment", id);
        navigate(`/dashboard/payment/${id}`);
    };

    const handleDelete = async (id) => {
        // console.log("Delete parcel:", id);
        const result = await Swal.fire({
            title: "Delete parcel?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, delete",
        });

        if (!result.isConfirmed) return;

        try {
            axiosSecure.delete(`/parcels/${id}`)
                .then(res => {
                    // console.log(res.data);
                    if (res.data.deletedCount) {
                        Swal.fire({
                            title: "Deleted",
                            text: "Parcel has been removed successfully.",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false,
                        });
                        refetch();
                    }
                })

        } catch (error) {
            Swal.fire({
                title: "Failed",
                text: "Unable to delete parcel. Try again.",
                icon: "error",
            });
        }
    };

    return (
        <div className="overflow-x-auto bg-white p-4 rounded-xl shadow min-h-screen">
            <h2 className="text-2xl font-bold mb-4 text-[#03464D]">My Parcels</h2>
            {parcels.length === 0 ? (
                <p className="text-center text-xl font-bold text-gray-500">
                    No parcels available for assignment.
                </p>
            ) : (
                <table className="table table-zebra min-w-[640px]">
                    <thead className="bg-base-200 text-xs md:text-sm">
                        <tr>
                            <th></th>
                            <th>Type</th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Payment Status</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sortedParcels.map((parcel, index) => (
                            <tr key={parcel._id} className="text-xs md:text-sm">
                                <td>{index + 1}</td>

                                <td>
                                    <span className={`badge ${typeColor(parcel.type)} text-[10px] md:text-sm`}>
                                        {parcel.type === "document" ? "Document" : "Non-Document"}
                                    </span>
                                </td>

                                <td className="font-semibold">{parcel.title}</td>

                                <td className="font-semibold">৳ {parcel.cost}</td>

                                <td>
                                    <span className={`badge ${paymentBadge(parcel.payment_status)} text-sm md:text-[14px]`}>
                                        {parcel.payment_status}
                                    </span>
                                </td>

                                <td className="text-gray-600">{parcel.creation_date}</td>

                                <td className="font-semibold">
                                    {/* {parcel.tracking_id} */}
                                    <Link to={`/dashboard/track-parcel/${parcel.tracking_id}`} className="text-blue-600 hover:underline"> Track this Parcel</Link>
                                </td>

                                <td>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => handleView(parcel)}
                                            className="btn btn-xs btn-outline"
                                        >
                                            <FaEye /> View
                                        </button>

                                        {parcel.payment_status === "pending" && (
                                            <button
                                                onClick={() => handlePay(parcel._id)}
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
            )}

            {selectedParcel && (
                <dialog open className="modal">
                    <div className="modal-box max-w-xl">
                        <h3 className="text-lg font-bold mb-4">Parcel Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <p><b>Name:</b> {selectedParcel.title}</p>
                            <p><b>Type:</b> {selectedParcel.type === "document" ? "Document" : "Non-Document"}</p>
                            <p><b>Cost:</b> ৳ {selectedParcel.cost}</p>
                            <p><b>Payment Status:</b> {selectedParcel.payment_status}</p>
                            <p><b>Parcel Status:</b> {selectedParcel.parcel_status}</p>
                            <p><b>Tracking ID:</b> {selectedParcel.tracking_id}</p>
                            <p className="sm:col-span-2"><b>Booking Time:</b> {selectedParcel.creation_date}</p>
                        </div>
                        <div className="modal-action">
                            <button className="btn btn-outline" onClick={() => setSelectedParcel(null)}>
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default MyParcels;