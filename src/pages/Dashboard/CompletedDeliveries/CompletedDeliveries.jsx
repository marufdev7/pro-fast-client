import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const CompletedDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data = {}, isLoading } = useQuery({
        queryKey: ["completed-deliveries", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/riders/completed-deliveries?email=${user?.email}`
            );
            return res.data;
        },
    });

    const cashoutMutation = useMutation({
        mutationFn: (amount) =>
            axiosSecure.post(`/riders/cashout?email=${user?.email}`, {
                amount,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries(["completed-deliveries", user?.email]);
            Swal.fire("Success", "Cashout requested", "success");
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || "Cashout failed";
            Swal.fire("Error", errorMessage, "error");
        },
    });

    if (isLoading) {
        return <Loading />;
    };

    const { deliveries, totalEarning, minCashoutAmount } = data;
    console.log(data);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Completed Deliveries</h2>

            <div className="mb-4 flex justify-between items-center">
                <p className="font-semibold">
                    Total Earning: <span className="text-green-600">৳{totalEarning}</span>
                </p>

                <button
                    className="btn btn-success btn-sm"
                    disabled={totalEarning < minCashoutAmount}
                    onClick={() => cashoutMutation.mutate(totalEarning)}
                >
                    Cash Out
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Tracking ID</th>
                            <th>Name</th>
                            <th>Picked At</th>
                            <th>Delivered At</th>
                            <th>Delivered From</th>
                            <th>Delivered to</th>
                            <th>Cost</th>
                            <th>Earning</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deliveries.map((d) => (
                            <tr key={d._id}>
                                <td>{d.tracking_id}</td>
                                <td>{d.name}</td>
                                <td>{new Date(d.picked_up_at).toLocaleString()}</td>
                                <td>{new Date(d.delivered_at).toLocaleString()}</td>
                                <td>{d.senderWarehouse}</td>
                                <td>{d.receiverWarehouse}</td>
                                <td>৳{d.cost}</td>
                                <td className="text-green-600">৳{d.earning}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompletedDeliveries;