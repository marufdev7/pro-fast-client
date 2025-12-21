import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_paymentKey);

const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    );
};

export default Payment;