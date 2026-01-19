import { useQuery } from "@tanstack/react-query";
import { FaUserPlus } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const AssignRider = () => {
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], isPending } = useQuery({
        queryKey: ["assignable-parcels"],
        queryFn: async () => {
            const res = await axiosSecure.get(
                "/parcels?payment_status=paid&parcel_status=pending"
            );
            return res.data;
        },
    });
    console.log(parcels);

    if (isPending) return <Loading />;

    return (
        <div className="bg-white rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">
                Assign Rider
            </h2>

            {parcels.length === 0 ? (
                <p className="text-gray-500">No parcels available for assignment.</p>
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

                                    <td className="text-sm">
                                        {parcel.title}
                                    </td>

                                    <td className="text-sm">
                                        {parcel.creation_date}
                                    </td>

                                    <td className="font-semibold">
                                        ৳{parcel.cost}
                                    </td>

                                    <td className="text-center">
                                        <button
                                            className="btn btn-xs btn-outline flex items-center gap-1"
                                            onClick={() => console.log("Assign rider:", parcel)}
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
        </div>
    );
};

export default AssignRider;