import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading/Loading';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { parcelId } = useParams();
    const axiosSecure = useAxiosSecure();
    const [error, setError] = useState('');

    const { isPending, data: parcelInfo = {} } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    });

    if (isPending) {
        return <Loading />;
    }

    console.log(parcelInfo);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setError(error.message);
        }
        else {
            setError('');
            console.log("Payment Method", paymentMethod);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md shadow-xl rounded-lg p-6 space-y-4 bg-white"
            >
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    Checkout
                </h2>

                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": { color: "#aab7c4" },
                            },
                            invalid: { color: "#9e2146" },
                        },
                    }}
                    className="p-3 border rounded-md"
                />

                <button
                    type="submit"
                    disabled={!stripe}
                    className="w-full py-2 rounded-md font-semibold text-gray-900 bg-[#CAEB66] hover:bg-[#bdde59] transition-colors cursor-pointer"
                >
                    Pay Now
                </button>

                {error && <p className="text-red-500 text-sm">{error}</p>}

            </form>
        </div>
    );
};

export default PaymentForm;