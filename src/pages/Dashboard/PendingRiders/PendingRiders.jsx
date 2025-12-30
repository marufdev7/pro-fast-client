import { useState } from "react";
import Swal from "sweetalert2";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading";


const PendingRiders = () => {
    const [selectedRider, setSelectedRider] = useState(null);
    const axiosSecure = useAxiosSecure();

    const { isPending, data: riders = [], refetch } = useQuery({
        queryKey: ['pending-riders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders/pending');
            return res.data;
        }
    });

    if (isPending) {
        return <Loading />
    }

    const updateStatus = async (rider, status, email) => {
        const confirm = await Swal.fire({
            title: `${status === "approved" ? "Approve" : "Reject"} rider?`,
            icon: status === "approved" ? "question" : "warning",
            showCancelButton: true,
            confirmButtonText: "Confirm",
        });

        if (!confirm.isConfirmed) return;

        const res = await axiosSecure.patch(`/riders/${rider._id}`, { status, email });

        if (res.data.modifiedCount > 0) {
            await refetch();
            Swal.fire("Success", `Rider ${status}`, "success");
        }
    };

    return (
        <>
            <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
                <table className="table table-md">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th className="hidden md:table-cell">Region</th>
                            <th>Status</th>
                            <th className="hidden lg:table-cell">Applied</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {riders.map((rider, index) => (
                            <tr key={rider._id} className="hover">
                                <td>{index + 1}</td>

                                <td>
                                    <p className="font-semibold">{rider.name}</p>
                                    <p className="text-xs text-gray-500">{rider.email}</p>
                                </td>

                                <td className="hidden md:table-cell">{rider.region}</td>

                                <td>
                                    <span
                                        className={`badge badge-outline ${rider.status === "pending"
                                            ? "badge-warning"
                                            : rider.status === "approved"
                                                ? "badge-success"
                                                : "badge-error"
                                            }`}
                                    >
                                        {rider.status}
                                    </span>
                                </td>

                                <td className="hidden lg:table-cell text-sm text-gray-500">
                                    {rider.application_date}
                                </td>

                                <td>
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => setSelectedRider(rider)}
                                            className="btn btn-xs btn-outline"
                                        >
                                            <FaEye /> View
                                        </button>

                                        {rider.status === "pending" && (
                                            <>
                                                <button
                                                    onClick={() => updateStatus(rider, "active", rider.email)}
                                                    className="btn btn-xs bg-emerald-600 text-white"
                                                >
                                                    <FaCheck /> Approve
                                                </button>

                                                <button
                                                    onClick={() => updateStatus(rider, "rejected", rider.email)}
                                                    className="btn btn-xs bg-rose-600 text-white"
                                                >
                                                    <FaTimes /> Reject
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Rider Details Modal */}
            {selectedRider && (
                <dialog open className="modal">
                    <div className="modal-box max-w-xl">
                        <h3 className="font-bold text-lg mb-4">Rider Details</h3>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <p><b>Name:</b> {selectedRider.name}</p>
                            <p><b>Age:</b> {selectedRider.age}</p>
                            <p><b>Email:</b> {selectedRider.email}</p>
                            <p><b>Contact:</b> {selectedRider.contact}</p>
                            <p><b>NID:</b> {selectedRider.nid}</p>
                            <p><b>Region:</b> {selectedRider.region}</p>
                            <p><b>District:</b> {selectedRider.district}</p>
                            <p><b>Warehouse:</b> {selectedRider.warehouse}</p>
                            <p><b>Bike:</b> {selectedRider.bike_brand}</p>
                            <p><b>Bike Reg:</b> {selectedRider.bike_registration}</p>
                        </div>

                        <div className="modal-action">
                            <button
                                className="btn btn-outline"
                                onClick={() => setSelectedRider(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    );
};

export default PendingRiders;