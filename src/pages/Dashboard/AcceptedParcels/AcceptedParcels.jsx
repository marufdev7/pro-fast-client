import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const AcceptedParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ["rider-parcels", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/riders/parcels?email=${user.email}`
            );
            return res.data;
        },
    });


    // Pickup mutation
    const pickupMutation = useMutation({
        mutationFn: (id) => axiosSecure.patch(`/parcels/${id}/pickup`),
        onSuccess: () => {
            queryClient.invalidateQueries(["rider-parcels"]);
            Swal.fire("Picked up", "Parcel is now in transit", "success");
        },
    });

    // Deliver mutation
    const deliverMutation = useMutation({
        mutationFn: (id) => axiosSecure.patch(`/parcels/${id}/deliver`),
        onSuccess: () => {
            queryClient.invalidateQueries(["rider-parcels"]);
            Swal.fire("Delivered", "Parcel delivered successfully", "success");
        },
    });

    const handlePickup = (id) => {
        Swal.fire({
            title: "Confirm pickup?",
            text: "This parcel will be marked as in transit.",
            icon: "question",
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                pickupMutation.mutate(id);
            }
        });
    };

    const handleDeliver = (id) => {
        Swal.fire({
            title: "Confirm delivery?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                deliverMutation.mutate(id);
            }
        });
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="bg-white rounded-xl shadow min-h-screen p-4">
            <h2 className="text-2xl font-semibold mb-4">My Deliveries</h2>
            {parcels.length === 0 ? (
                <p className="text-center text-xl font-bold text-gray-500">
                    No active deliveries
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Tracking ID</th>
                                <th>Receiver</th>
                                <th>Address</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {parcels.map((parcel, index) => (
                                <tr key={parcel._id}>
                                    <td>{index + 1}</td>
                                    <td>{parcel.tracking_id}</td>
                                    <td>{parcel.receiverName}</td>
                                    <td>{parcel.receiverAddress}</td>
                                    <td className="capitalize">{parcel.parcel_status}</td>
                                    <td>
                                        {parcel.parcel_status === "rider-assigned" && (
                                            <button
                                                className="btn btn-sm btn-warning"
                                                onClick={() => handlePickup(parcel._id)}
                                                disabled={pickupMutation.isPending}
                                            >
                                                Picked Up
                                            </button>
                                        )}

                                        {parcel.parcel_status === "in-transit" && (
                                            <button
                                                className="btn btn-sm btn-success"
                                                onClick={() => handleDeliver(parcel._id)}
                                                disabled={deliverMutation.isPending}
                                            >
                                                Delivered
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AcceptedParcels;