import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { use, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading/Loading';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { parcelId } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();
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

    const price = parcelInfo.cost;
    const amountInCents = price * 100;
    // console.log(amountInCents);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (pmError) {
            setError(pmError.message);
        }
        else {
            setError('');
            // console.log("Payment Method", paymentMethod);

            // create payment intent on the server
            const res = await axiosSecure.post('/create-payment-intent', {
                amount: amountInCents,
                parcelId
            });

            const clientSecret = res.data.clientSecret;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email,
                    },
                }
            });

            if (result.error) {
                setError(result.error.message);
            }
            else {
                setError('');
                if (result.paymentIntent.status === 'succeeded') {
                    // console.log(result);
                    const transactionId = result.paymentIntent.id;

                    // mark parcel as paid and create payment history
                    const paymentData = {
                        parcelId,
                        email: user?.email,
                        amount: amountInCents,
                        transactionId: transactionId,
                        paymentMethod: result.paymentIntent.payment_method_types
                    };

                    const paymentRes = await axiosSecure.post('/payments', paymentData);
                    if (paymentRes.data.insertedId) {
                       await Swal.fire({
                            icon: "success",
                            title: "Payment Successful",
                           text: "Your parcel payment has been completed.",
                            html: `<p>Transaction ID: <strong>${transactionId}</strong></p>`,
                            confirmButtonText: "Go to My Parcels",
                       });
                        navigate('/dashboard/my-parcels');
                        card.clear();
                    }
                }
            }
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
                    Pay ${price} Now
                </button>

                {error && <p className="text-red-500 text-sm">{error}</p>}

            </form>
        </div>
    );
};

export default PaymentForm;