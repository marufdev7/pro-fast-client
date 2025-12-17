import { Elements } from '@stripe/react-stripe-js';
import React from 'react';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Payment = () => {
    return (
        <Elements stripe={stripePromise}>

        </Elements>
    );
};

export default Payment;