import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import web from './utils/web';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollar } from '@fortawesome/free-solid-svg-icons';
import { DEVISE } from './utils/content';

const stripePromise = loadStripe('pk_test_51PKHq0Cmi4dDiaj2gYS0zzSa6vBlSg3uNAfbBfiTiDBHGTxhVuhrOQTFtfkwRfDO7XVqijMXcYoUzGoGKKuzYWcU00wMA4k9j3');

const CheckoutForm = ({ onPaymentSuccess, amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [proc, setProc] = useState(false);
 
    const handleSubmit = async (event) => {
        event.preventDefault();
        setProc(true)
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: card,
        });

        if (error) {
            console.log('Payment method creation error:', error);
            return;
        }

        web.post('/payments', {
            amount: amount,
            payment_method: paymentMethod.id,
        })
        .then(response => {
            console.log('Payment created successfully:', response.data);
            onPaymentSuccess(); 
            setProc(false)
        })
        .catch(error => {
            console.error('There was an error creating the payment!', error);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="paiement">
            <div className="text-left m-1">
                <label>Amount : </label>
                <input
                    type="text"
                    value={`${DEVISE} ${amount}`}
                    className="form-control" placeholder={amount}
                    disabled
                />
            </div>
            <div className="p-3">
                <CardElement  />
            </div>
            <button  type="submit" disabled={!stripe} className="bg-cyan-500 hover:bg-cyan-400 text-white text-lg px-4 py-3 rounded-2xl w-1/2 focus:outline-none">
            { proc ? 'Processing..' : 'VALIDER'}
            </button> 
     
        </form>
    );
};

const PaymentForm = ({setStatusPaid, onPrintAndProceed, mustPay}) => {
    const [showForm, setShowForm] = useState(false);

    const handlePaymentSuccess = () => {
        setStatusPaid("Payment réussi avec succès")
        setShowForm(false);
        onPrintAndProceed();
    };

    return (
        <div>
            {showForm ? (
                <Elements stripe={stripePromise}>
                    <CheckoutForm onPaymentSuccess={handlePaymentSuccess} amount = {mustPay} />
                </Elements>
            ) : (
                <div className="flex">
                     <button onClick={() => setShowForm(true)} class="bg-cyan-500 hover:bg-cyan-400 m-2 text-white text-lg px-4 py-3 rounded-2xl w-1/2 focus:outline-none">
                        Payer ({DEVISE})
                    </button>

                    <button onClick={() => onPrintAndProceed()} class="bg-gray-400 hover:bg-blue-400 m-2 text-white text-lg px-4 py-3 rounded-2xl w-1/2 focus:outline-none">
                        Payer cash
                    </button>
                </div>
            )}
        </div>
    );
};

export default PaymentForm;

//const container = document.getElementById(PAGE_PAYMENT_ID);
//const root = createRoot(container);
//root.render(<PaymentForm />);
