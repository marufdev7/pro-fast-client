import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEye, FaTrash, FaMoneyBillWave } from "react-icons/fa";
import { FiBox, FiPackage, FiPlus, FiTruck } from 'react-icons/fi';
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
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
            <section className="relative overflow-hidden rounded-3xl bg-[#003B3F] px-6 py-8 text-white shadow-lg sm:px-8 sm:py-10">
                <div className="absolute -right-12 -top-16 h-52 w-52 rounded-full bg-[#00A88E]/30 blur-3xl" />
                <div className="absolute -bottom-24 right-28 h-44 w-44 rounded-full bg-[#CAEB66]/15 blur-3xl" />
                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7EE7D6]">Delivery management</p><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">My parcels</h1><p className="mt-3 max-w-xl text-sm leading-6 text-white/75 sm:text-base">View bookings, complete payments, and track each parcel from pickup to delivery.</p></div>
                    <Link to="/send-parcel" className="btn border-[#CAEB66] bg-[#CAEB66] text-slate-900 hover:border-[#B8D94E] hover:bg-[#B8D94E]"><FiPlus /> Send a parcel</Link>
                </div>
            </section>

            <section className="mt-8 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                    <div><h2 className="text-xl font-bold text-slate-800">Parcel history</h2><p className="mt-1 text-sm text-slate-500">All your recent delivery requests in one place.</p></div>
                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#E8F8F4] px-3 py-1.5 text-xs font-semibold text-[#008D77]"><FiBox /> {parcels.length} {parcels.length === 1 ? 'parcel' : 'parcels'}</span>
                </div>

                {parcels.length === 0 ? (
                    <div className="px-6 py-16 text-center"><span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl text-slate-400"><FiPackage /></span><h3 className="mt-5 text-xl font-bold text-slate-700">No parcels yet</h3><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">When you create a delivery request, it will appear here with its payment and tracking details.</p><Link to="/send-parcel" className="btn mt-6 border-[#CAEB66] bg-[#CAEB66] text-slate-900 hover:border-[#B8D94E] hover:bg-[#B8D94E]"><FiPlus /> Send your first parcel</Link></div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table min-w-[860px]">
                            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th></th><th>Type</th><th>Name</th><th>Cost</th><th>Payment</th><th>Created at</th><th>Tracking</th><th className="text-center">Actions</th></tr></thead>
                            <tbody>
                                {sortedParcels.map((parcel, index) => (
                                    <tr key={parcel._id} className="text-xs transition hover:bg-[#F7FCFB] md:text-sm">
                                        <td className="font-semibold text-slate-400">{index + 1}</td>
                                        <td><span className={`badge ${typeColor(parcel.type)} text-[10px] font-semibold md:text-sm`}>{parcel.type === "document" ? "Document" : "Non-Document"}</span></td>
                                        <td><p className="font-semibold text-slate-800">{parcel.title}</p><p className="mt-1 text-[11px] text-slate-400">Parcel request</p></td>
                                        <td className="font-semibold text-slate-700">৳ {parcel.cost}</td>
                                        <td><span className={`badge border-0 px-3 py-3 ${parcel.payment_status === 'paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'} ${paymentBadge(parcel.payment_status)} text-sm md:text-[14px]`}>{parcel.payment_status}</span></td>
                                        <td className="text-gray-600">{parcel.creation_date}</td>
                                        <td className="font-semibold"><Link to={`/dashboard/track-parcel/${parcel.tracking_id}`} className="inline-flex items-center gap-1.5 text-[#008D77] hover:text-[#003B3F] hover:underline"><FiTruck /> Track parcel</Link></td>
                                        <td><div className="flex flex-wrap justify-center gap-2"><button onClick={() => handleView(parcel)} className="btn btn-xs border-slate-300 bg-white text-slate-600 hover:border-slate-400 hover:bg-slate-50"><FaEye /> View</button>{parcel.payment_status === "pending" && (<button onClick={() => handlePay(parcel._id)} className="btn btn-xs border-[#CAEB66] bg-[#CAEB66] text-slate-800 hover:border-[#B8D94E] hover:bg-[#B8D94E]"><FaMoneyBillWave /> Pay</button>)}<button onClick={() => handleDelete(parcel._id)} className="btn btn-xs border-rose-200 bg-white text-rose-600 hover:border-rose-300 hover:bg-rose-50"><FaTrash /> Delete</button></div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {selectedParcel && (
                    <dialog open className="modal">
                        <div className="modal-box max-w-xl rounded-2xl p-0">
                            <div className="bg-[#003B3F] px-6 py-5 text-white"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#7EE7D6]">Parcel details</p><h3 className="mt-1 text-2xl font-bold">{selectedParcel.title}</h3></div>
                            <div className="grid grid-cols-1 gap-3 p-6 text-sm sm:grid-cols-2"><p className="rounded-lg bg-slate-50 p-3"><b className="block text-xs uppercase tracking-wide text-slate-400">Type</b><span className="mt-1 block font-semibold text-slate-700">{selectedParcel.type === "document" ? "Document" : "Non-Document"}</span></p><p className="rounded-lg bg-slate-50 p-3"><b className="block text-xs uppercase tracking-wide text-slate-400">Cost</b><span className="mt-1 block font-semibold text-slate-700">৳ {selectedParcel.cost}</span></p><p className="rounded-lg bg-slate-50 p-3"><b className="block text-xs uppercase tracking-wide text-slate-400">Payment status</b><span className="mt-1 block font-semibold text-slate-700">{selectedParcel.payment_status}</span></p><p className="rounded-lg bg-slate-50 p-3"><b className="block text-xs uppercase tracking-wide text-slate-400">Parcel status</b><span className="mt-1 block font-semibold text-slate-700">{selectedParcel.parcel_status}</span></p><p className="rounded-lg bg-slate-50 p-3 sm:col-span-2"><b className="block text-xs uppercase tracking-wide text-slate-400">Tracking ID</b><span className="mt-1 block break-all font-mono font-semibold text-slate-700">{selectedParcel.tracking_id}</span></p><p className="rounded-lg bg-slate-50 p-3 sm:col-span-2"><b className="block text-xs uppercase tracking-wide text-slate-400">Booking time</b><span className="mt-1 block font-semibold text-slate-700">{selectedParcel.creation_date}</span></p></div>
                            <div className="modal-action m-0 border-t border-slate-100 px-6 py-4"><button className="btn border-slate-300 bg-white text-slate-700 hover:bg-slate-50" onClick={() => setSelectedParcel(null)}>Close</button></div>
                        </div>
                    </dialog>
                )}
            </section>
        </main>
    );
};

export default MyParcels;
