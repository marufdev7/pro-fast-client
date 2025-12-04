
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData } from "react-router";

const SendParcel = ({ currentUserName = "", }) => {
    const { register, handleSubmit, watch, getValues, formState: { errors }, reset, } = useForm({
        defaultValues: {
            type: "document",
            title: "",
            weight: "",
            senderName: currentUserName,
            senderContact: "",
            senderWarehouse: "",
            senderAddress: "",
            senderRegion: "",
            pickupInstruction: "",
            receiverName: "",
            receiverContact: "",
            receiverWarehouse: "",
            receiverAddress: "",
            receiverRegion: "",
            deliveryInstruction: "",
        },
    });

    const [calculatedCost, setCalculatedCost] = useState(null);
    const [showConfirmBox, setShowConfirmBox] = useState(false);
    const warehouses = useLoaderData();

    // Derive unique regions and districts from warehouses data
    const uniqueRegions = [...new Set(warehouses.map((w) => w.region))];
    const getDistrictsByRegion = (region) => warehouses
        .filter((w) => w.region === region)
        .map((w) => w.district);

    const parcelType = watch("type");
    const senderRegion = watch("senderRegion");
    const receiverRegion = watch("receiverRegion");

    const senderDistricts = getDistrictsByRegion(senderRegion);
    const receiverDistricts = getDistrictsByRegion(receiverRegion);


    const calculateCost = (values) => {
        const type = values.type;
        const base = type === "document" ? 50 : 100;
        const weight = parseFloat(values.weight) || 0;
        const weightCost = type === "non-document" ? Math.max(0, weight) * 20 : 0;
        return Math.round(base + weightCost);
    };

    const onSubmit = (values) => {
        const cost = calculateCost(values);
        setCalculatedCost(cost);
        toast(`Delivery Cost: ${cost} BDT`, {
            icon: "📦",
            position: "top-center",
        });
        setShowConfirmBox(true);
    };

    const handleConfirm = async () => {
        const toastId = toast.loading("Submitting parcel...", { position: "top-center" });
        try {
            const payload = {
                ...getValues(),
                cost: calculatedCost,
                creation_date: new Date().toLocaleString(),
            };

            // simulate async submission (replace with real API / Firebase call)
            console.log("Submitting parcel:", payload);
            await new Promise((resolve) => setTimeout(resolve, 800));

            toast.success("Parcel saved successfully", { id: toastId, position: "top-center" });
            setShowConfirmBox(false);
            setCalculatedCost(null);
            reset();
        } catch (err) {
            console.error("Failed to submit parcel:", err);
            toast.error("Failed to save parcel", { id: toastId, position: "top-center" });
        }
    };

    return (
        <div className="pt-8 pb-8 text-xl">
            <Toaster />

            <div className="bg-white rounded-2xl p-8 shadow-sm">
                {/* Title */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-emerald-800">Send Parcel</h1>
                    <hr className="my-4 border-gray-200" />
                    <p className="text-md text-emerald-900 font-semibold">
                        Enter your parcel details
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Parcel Info */}
                    <div className="border-t border-b border-gray-100 py-6">
                        <div className="flex items-center gap-6 mb-6">
                            <label className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    value="document"
                                    {...register("type", { required: true })}
                                    className="w-4 h-4"
                                />
                                <span className="ml-2 text-sm">Document</span>
                            </label>

                            <label className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    value="non-document"
                                    {...register("type", { required: true })}
                                    className="w-4 h-4"
                                />
                                <span className="ml-2 text-sm">Not-Document</span>
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Parcel Name
                                </label>
                                <input
                                    {...register("title", { required: "Parcel name is required" })}
                                    placeholder="Parcel Name"
                                    className="w-full border rounded-md px-3 py-2 text-sm placeholder-gray-400"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Parcel Weight (KG)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    {...register("weight", { valueAsNumber: true })}
                                    placeholder="Parcel Weight (KG)"
                                    className={`w-full border rounded-md px-3 py-2 text-sm placeholder-gray-400 ${parcelType === "document" ? "opacity-60" : ""
                                        }`}
                                    disabled={parcelType === "document"}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sender / Receiver */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Sender */}
                        <div>
                            <h3 className="font-semibold text-emerald-900 mb-4">
                                Sender Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Sender Name
                                    </label>
                                    <input
                                        {...register("senderName", { required: "Sender name is required" })}
                                        placeholder="Sender Name"
                                        className="w-full border rounded-md px-3 py-2 text-sm"
                                    />
                                    {errors.senderName && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.senderName.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Your Region</label>
                                    <select
                                        {...register("senderRegion", { required: "Select region" })}
                                        className="w-full border rounded-md px-3 py-2 text-sm"
                                    >
                                        <option value="">Select your region</option>
                                        {uniqueRegions.map((region) => (
                                            <option key={region} value={region}>{region}</option>
                                        ))}
                                    </select>
                                    {errors.senderRegion && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.senderRegion.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Sender Pickup Warehouse
                                    </label>
                                    <select
                                        {...register("senderWarehouse", { required: "Select pickup warehouse" })}
                                        className="w-full border rounded-md px-3 py-2 text-sm"
                                    >
                                        <option value="">Select Warehouse</option>
                                        {senderRegion &&
                                            senderDistricts.map((district) => (
                                                <option key={district} value={district}>{district}</option>
                                            ))}
                                    </select>
                                    {errors.senderWarehouse && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.senderWarehouse.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Sender Contact No
                                    </label>
                                    <input
                                        {...register("senderContact", { required: "Contact is required" })}
                                        placeholder="Sender Contact No"
                                        className="w-full border rounded-md px-3 py-2 text-sm"
                                    />
                                    {errors.senderContact && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.senderContact.message}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm text-gray-600 mb-1">Address</label>
                                    <input
                                        {...register("senderAddress", { required: "Address is required" })}
                                        placeholder="Address"
                                        className="w-full border rounded-md px-3 py-2 text-sm"
                                    />
                                    {errors.senderAddress && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.senderAddress.message}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Pickup Instruction
                                    </label>
                                    <textarea
                                        {...register("pickupInstruction", { required: "Provide pickup instruction" })}
                                        placeholder="Pickup Instruction"
                                        className="w-full border rounded-md                   px-3 py-2 text-sm h-24"
                                    />
                                    {errors.pickupInstruction && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.pickupInstruction.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Receiver */}
                        <div>
                            <h3 className="font-semibold text-emerald-900 mb-4">
                                Receiver Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Receiver Name
                                    </label>
                                    <input
                                        {...register("receiverName", { required: "Receiver name is required" })}
                                        placeholder="Receiver Name"
                                        className="w-full border rounded-md px-3 py-2 text-sm"
                                    />
                                    {errors.receiverName && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.receiverName.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Receiver Region
                                    </label>
                                    <select
                                        {...register("receiverRegion", { required: "Select region" })}
                                        className="w-full border rounded-md px-3 py-2 text-sm"
                                    >
                                        <option value="">Select your region</option>
                                        {uniqueRegions.map((region) => (
                                            <option key={region} value={region}>{region}</option>
                                        ))}
                                    </select>
                                    {errors.receiverRegion && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.receiverRegion.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Receiver Delivery Warehouse
                                    </label>
                                    <select
                                        {...register("receiverWarehouse", { required: "Select delivery warehouse" })}
                                        className="w-full border rounded-md px-3 py-2 text-sm"
                                    >
                                        <option value="">Select Warehouse</option>
                                        {receiverRegion &&
                                            receiverDistricts.map((district) => (
                                                <option key={district} value={district}>{district}</option>
                                            ))}
                                    </select>
                                    {errors.receiverWarehouse && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.receiverWarehouse.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Receiver Contact No
                                    </label>
                                    <input
                                        {...register("receiverContact", { required: "Contact is required" })}
                                        placeholder="Receiver Contact No"
                                        className="w-full border rounded-md px-3 py-2 text-sm"
                                    />
                                    {errors.receiverContact && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.receiverContact.message}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Receiver Address
                                    </label>
                                    <input
                                        {...register("receiverAddress", { required: "Address is required" })}
                                        placeholder="Address"
                                        className="w-full border rounded-md px-3 py-2 text-sm"
                                    />
                                    {errors.receiverAddress && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.receiverAddress.message}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Delivery Instruction
                                    </label>
                                    <textarea
                                        {...register("deliveryInstruction", { required: "Provide delivery instruction" })}
                                        placeholder="Delivery Instruction"
                                        className="w-full border rounded-md px-3 py-2 text-sm h-24"
                                    />
                                    {errors.deliveryInstruction && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.deliveryInstruction.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Note + Button */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <p className="text-sm text-gray-600">* PickUp Time 4pm-7pm Approx.</p>
                        <button
                            type="submit"
                            className="bg-lime-400 hover:bg-lime-500 text-emerald-900 font-semibold px-5 py-3 rounded-md"
                        >
                            Proceed to Confirm Booking
                        </button>
                    </div>
                </form>

                {/* Confirm box */}
                {showConfirmBox && (
                    <div className="mt-6 p-4 border rounded-md bg-gray-50">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Delivery Cost: <span className="font-semibold">{calculatedCost} BDT</span>
                                </p>
                                <p className="text-xs text-gray-500">
                                    Please confirm to save the booking.
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setShowConfirmBox(false)}
                                    className="px-4 py-2 border rounded-md text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    className="px-4 py-2 bg-emerald-700 text-white rounded-md text-sm"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default SendParcel;