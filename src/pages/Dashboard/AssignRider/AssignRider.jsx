import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaUserPlus } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import Swal from "sweetalert2";

const AssignRider = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedParcel, setSelectedParcel] = useState(null);
    const queryClient = useQueryClient();

    // Load assignable parcels
    const { data: parcels = [], isPending, refetch } = useQuery({
        queryKey: ["assignable-parcels"],
        queryFn: async () => {
            const res = await axiosSecure.get(
                "/parcels?payment_status=paid&parcel_status=pending"
            );
            return res.data;
        },
    });

    // Load riders by district
    const { data: riders = [], isPending: ridersLoading } = useQuery({
        queryKey: ["riders", selectedParcel?.receiverWarehouse],
        enabled: !!selectedParcel,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/riders/available?district=${selectedParcel.receiverWarehouse}`
            );
            return res.data;
        },
    });
    // console.log("Selected Parcel:", selectedParcel);
    // console.log("Riders Data:", riders);

    const assignRiderMutation = useMutation({
        mutationFn: async ({ parcelId, rider }) => {
            return axiosSecure.patch(`/parcels/${parcelId}/assign-rider`, {
                parcelId,
                riderId: rider._id,
                riderName: rider.name,
            });
        },
        onSuccess: () => {
            Swal.fire("Assigned", "Parcel is now in transit", "success");
            queryClient.invalidateQueries(["assignable-parcels"]);
            refetch();
        },
        onError: () => {
            Swal.fire("Error", "Failed to assign rider", "error");
        },
    });

    const handleAssignRider = async (parcelId, rider) => {
        // console.log(parcelId, rider);
        const confirm = await Swal.fire({
            title: "Assign this rider?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Assign",
        });

        if (!confirm.isConfirmed) return;

        assignRiderMutation.mutate({ parcelId, rider });
    };


    if (isPending) return <Loading />;

    return (
        <div className="bg-white rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Assign Rider</h2>

            {parcels.length === 0 ? (
                <p className="text-gray-500">
                    No parcels available for assignment.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Tracking ID</th>
                                <th>Type</th>
                                <th>Route</th>
                                <th>Title</th>
                                <th>Created</th>
                                <th>Cost</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {parcels.map((parcel, index) => (
                                <tr key={parcel._id}>
                                    <td>{index + 1}</td>

                                    <td className="font-mono text-sm">
                                        {parcel.tracking_id}
                                    </td>

                                    <td>
                                        <span className="badge badge-outline">
                                            {parcel.type}
                                        </span>
                                    </td>

                                    <td className="text-sm">
                                        {parcel.senderWarehouse} → {parcel.receiverWarehouse}
                                    </td>

                                    <td className="text-sm">{parcel.title}</td>

                                    <td className="text-sm">
                                        {parcel.creation_date}
                                    </td>

                                    <td className="font-semibold">
                                        ৳{parcel.cost}
                                    </td>

                                    <td className="text-center">
                                        <button
                                            className="btn btn-xs btn-outline flex items-center gap-1"
                                            onClick={() => setSelectedParcel(parcel)}
                                        >
                                            <FaUserPlus />
                                            Assign
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Assign Rider Modal */}
            {selectedParcel && (
                <div data-aos="zoom-in" data-aos-duration="300" className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
                    <div className="bg-white rounded-lg w-full max-w-3xl p-6">
                        <h3 className="text-lg font-semibold mb-2">
                            Assign Rider
                        </h3>

                        <p className="text-sm mb-4">
                            <strong>Route:</strong>{" "}
                            {selectedParcel.senderWarehouse} → {selectedParcel.receiverWarehouse}
                        </p>

                        <p className="text-sm mb-4">
                            <strong>Receiver:</strong>
                            <br />
                            Name: {selectedParcel.receiverName}
                            <br />
                            Mobile: {selectedParcel.receiverContact}
                            <br />
                            Address: {selectedParcel.receiverAddress}
                        </p>

                        {ridersLoading ? (
                            <Loading />
                        ) : riders.length === 0 ? (
                            <p className="text-sm text-red-500">
                                No riders found for this Warehouse.
                            </p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Phone</th>
                                            <th>District</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {riders.map((rider) => (
                                            <tr key={rider._id}>
                                                <td>{rider.name}</td>
                                                <td>{rider.contact}</td>
                                                <td>{rider.district}</td>
                                                <th>{rider.working_status || "Available"}</th>
                                                <td>
                                                    <button
                                                        className="btn btn-xs btn-success flex items-center gap-1"
                                                        onClick={() =>
                                                            handleAssignRider(selectedParcel._id, rider)
                                                        }
                                                        disabled={rider.working_status === "in-delivery"}

                                                    >
                                                        <FaUserPlus />
                                                        Assign
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <div className="mt-5 text-right">
                            <button
                                className="btn btn-sm"
                                onClick={() => setSelectedParcel(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignRider;