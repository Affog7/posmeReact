import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { createRoot } from 'react-dom/client';
import store from './utils/store';
import { PAGE_PAYMENT_ID } from './utils/content';
import web from './utils/web';

const stripePromise = loadStripe('pk_test_51PKHq0Cmi4dDiaj2gYS0zzSa6vBlSg3uNAfbBfiTiDBHGTxhVuhrOQTFtfkwRfDO7XVqijMXcYoUzGoGKKuzYWcU00wMA4k9j3');

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [amount, setAmount] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: card,
        });

        if (error) {
            console.error('Payment method creation error:', error);
            return;
        }

        web.post('/payments', {
            amount: amount,
            payment_method: paymentMethod.id,
        })
        .then(response => {
            console.log('Payment created successfully:', response.data);
        })
        .catch(error => {
            console.error('There was an error creating the payment!', error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Amount</label>
                <input
                    type="text"
                    value={amount}
                    className="form-control"
                    onChange={e => setAmount(e.target.value)}
                    required
                />
            </div>
            <div>
                <CardElement />
            </div>
            <button type="submit" disabled={!stripe}>Submit</button>
        </form>
    );
};

const PaymentForm = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default PaymentForm; 
const container =  document.getElementById(PAGE_PAYMENT_ID) 

const root = createRoot(container); 
root.render(<PaymentForm  />);