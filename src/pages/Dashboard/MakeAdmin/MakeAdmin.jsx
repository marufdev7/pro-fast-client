import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const MakeAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const [email, setEmail] = useState("");

    const { data: users = [], refetch, isFetching } = useQuery({
        queryKey: ["search-user", email],
        enabled: false,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/search?email=${email}`);
            return res.data;
        },
    });

    const handleSearch = () => {
        if (!email) return;
        refetch();
    };

    const formatDate = (isoDate) => {
        return new Date(isoDate).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
    };


    const updateRole = async (user, role) => {
        const confirm = await Swal.fire({
            title: `Make ${role === "admin" ? "Admin" : "User"}?`,
            text: user.email,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Confirm",
        });

        if (!confirm.isConfirmed) return;

        await axiosSecure.patch(`/users/${user._id}/role`, { role });

        Swal.fire("Success", `Role updated to ${role}`, "success");
        refetch();
    };

    return (
        <div className="bg-white rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Make Admin</h2>

            {/* Search box */}
            <div className="flex gap-2 mb-6 max-w-md">
                <input
                    type="text"
                    placeholder="Search by email"
                    className="input input-bordered w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />
                <button
                    onClick={handleSearch}
                    className="btn bg-[#CAEB66] text-black"
                >
                    Search
                </button>
            </div>

            {/* Result */}
            {isFetching && <Loading />}

            {users.length === 0 && !isFetching && (
                <p className="text-gray-500">No user found</p>
            )}

            {users.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Created At</th>
                                <th>Role</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.email}</td>
                                    <td>{formatDate(user.created_at)}</td>
                                    <td>
                                        <span
                                            className={`badge ${user.role === "admin"
                                                ? "badge-success"
                                                : "badge-neutral"
                                                }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="text-center space-x-2">
                                        {user.role !== "admin" ? (
                                            <button
                                                onClick={() => updateRole(user, "admin")}
                                                className="btn btn-xs btn-outline"
                                            >
                                                Make Admin
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => updateRole(user, "user")}
                                                className="btn btn-xs btn-outline"
                                            >
                                                Remove Admin
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

export default MakeAdmin;