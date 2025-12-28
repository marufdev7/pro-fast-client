import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaBan } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";


const ActiveRiders = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState("");

    const { data: riders = [], isPending, refetch } = useQuery({
        queryKey: ["active-riders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders/active");
            return res.data;
        },
    });

    const filteredRiders = useMemo(() => {
        return riders.filter((r) =>
            r.contact.toLowerCase().includes(search.toLowerCase())
        );
    }, [riders, search]);

    if (isPending) return <Loading />;

    const handleDeactivate = async (rider) => {
        const confirm = await Swal.fire({
            title: "Deactivate rider?",
            text: "This rider will no longer receive parcels.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Deactivate",
        });

        if (!confirm.isConfirmed) return;

        const res = await axiosSecure.patch(`/riders/${rider._id}`, {
            status: "inactive",
        });

        if (res.data.modifiedCount) {
            Swal.fire("Success", "Rider deactivated", "success");
            refetch();
        }
    };

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">
                <h2 className="text-lg font-semibold">Active Riders</h2>

                <input
                    type="text"
                    placeholder="Search by phone number"
                    className="input input-bordered input-sm w-full md:w-64"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {filteredRiders.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">
                    No active riders found.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-sm">
                        <thead className="bg-base-200">
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Region</th>
                                <th>Warehouse</th>
                                <th>Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredRiders.map((rider, index) => (
                                <tr key={rider._id}>
                                    <td>{index + 1}</td>
                                    <td>{rider.name}</td>
                                    <td>{rider.contact}</td>
                                    <td>{rider.region}</td>
                                    <td>{rider.warehouse}</td>
                                    <td>
                                        <span className="badge badge-success badge-outline">
                                            Active
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            onClick={() => handleDeactivate(rider)}
                                            className="btn btn-xs btn-outline btn-error"
                                        >
                                            <FaBan className="mr-1" />
                                            Deactivate
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

export default ActiveRiders;