import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BeARiderForm = ({ serviceCenters }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: user?.displayName || "",
            email: user?.email || "",
            age: "",
            nid: "",
            contact: "",
            region: "",
            district: "",
            warehouse: "",
            bike_brand: "",
            bike_registration: "",
        },
    });

    const selectedRegion = watch("region");
    const selectedDistrict = watch("district");

    const onSubmit = async (data) => {
        const riderData = {
            ...data,
            name: user?.displayName,
            email: user?.email,
            status: "pending",
            application_date: new Date().toLocaleString(),
        };
        console.log(riderData);

        Swal.fire({
            title: "⏳ Submitting application...",
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => Swal.showLoading(),
        });



        try {
            axiosSecure.post('/riders', riderData)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            title: "✅ Application Submitted",
                            text: "Your rider application is now pending review.",
                            icon: "success",
                            confirmButtonText: "OK",
                        });
                        // reset();
                    }
                })

        } catch (err) {
            console.error("Failed to submit:", err);
            Swal.fire({
                title: "❌ Submission Failed",
                text: "Please try again later.",
                icon: "error",
                confirmButtonText: "Retry",
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 p-4 m-2 rounded-2xl md:p-6 md:m-0 shadow"
        >
            <h2 className="text-xl font-bold mb-4">🚴‍♂️ Be A Rider</h2>

            {/* Prefilled name/email */}
            <input
                type="text"
                value={user?.displayName}
                readOnly
                className="input input-bordered w-full"
            />
            <input
                type="email"
                value={user?.email}
                readOnly
                className="input input-bordered w-full"
            />

            {/* Age */}
            <div>
                <input
                    {...register("age", { required: "Age is required" })}
                    type="number"
                    placeholder="Your Age"
                    className="input input-bordered w-full"
                />
                {errors.age && (
                    <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>
                )}
            </div>

            {/* NID */}
            <div>
                <input
                    {...register("nid", { required: "NID number is required" })}
                    type="text"
                    placeholder="NID No"
                    className="input input-bordered w-full"
                />
                {errors.nid && (
                    <p className="text-red-500 text-xs mt-1">{errors.nid.message}</p>
                )}
            </div>

            {/* Contact */}
            <div>
                <input
                    {...register("contact", { required: "Contact number is required" })}
                    type="text"
                    placeholder="Contact Number"
                    className="input input-bordered w-full"
                />
                {errors.contact && (
                    <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>
                )}
            </div>

            {/* Region dropdown */}
            <div>
                <select
                    {...register("region", { required: "Region is required" })}
                    className="select select-bordered w-full"
                >
                    <option value="">Select Region</option>
                    {[...new Set(serviceCenters.map((w) => w.region))].map((region) => (
                        <option key={region} value={region}>
                            {region}
                        </option>
                    ))}
                </select>
                {errors.region && (
                    <p className="text-red-500 text-xs mt-1">{errors.region.message}</p>
                )}
            </div>

            {/* District dropdown */}
            <div>
                <select
                    {...register("district", { required: "District is required" })}
                    className="select select-bordered w-full"
                >
                    <option value="">Select District</option>
                    {[...new Set(
                        serviceCenters
                            .filter(
                                (w) => w.region === selectedRegion && w.status === "active"
                            )
                            .map((w) => w.district)
                    )].map((district) => (
                        <option key={district} value={district}>
                            {district}
                        </option>
                    ))}
                </select>
                {errors.district && (
                    <p className="text-red-500 text-xs mt-1">{errors.district.message}</p>
                )}
            </div>

            {/* Warehouse dropdown */}
            <div>
                <select
                    {...register("warehouse", { required: "Warehouse is required" })}
                    className="select select-bordered w-full"
                >
                    <option value="">Select Warehouse</option>
                    {serviceCenters
                        .filter(
                            (w) =>
                                w.region === selectedRegion &&
                                w.district === selectedDistrict &&
                                w.status === "active"
                        )
                        .map((w, idx) => (
                            <option key={idx} value={w.city}>
                                {w.city}
                            </option>
                        ))}
                </select>
                {errors.warehouse && (
                    <p className="text-red-500 text-xs mt-1">{errors.warehouse.message}</p>
                )}
            </div>

            {/* Optional bike info */}
            <input
                {...register("bike_brand")}
                type="text"
                placeholder="Bike Brand (optional)"
                className="input input-bordered w-full"
            />
            <input
                {...register("bike_registration")}
                type="text"
                placeholder="Bike Registration No (optional)"
                className="input input-bordered w-full"
            />

            <button
                type="submit"
                className="btn bg-lime-400 hover:bg-lime-500 text-emerald-900 font-semibold px-5 py-3 rounded-md w-full"
            >
                Submit
            </button>
        </form>
    );
};

export default BeARiderForm;