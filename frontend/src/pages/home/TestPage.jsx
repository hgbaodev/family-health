import { loadStripe } from "@stripe/stripe-js";
import { api } from "~/config/api";

const stripePromise = loadStripe(
  "pk_test_51QE6TrKbGoIIRrN3ys4qtuhqSbNCyAFS0u4IcsuWfmjOzsrQrjWFKj1dQTFHEFt0GXTvgw0VzgM8OTsivEk5bViv00HE6J8GAe"
);

const TestPage = () => {
    const handleClick = async () => {
        const stripe = await stripePromise;

        const response = await api('/payments/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: 5000 }) 
        });

        const session = await response.json();
        const result = await stripe.redirectToCheckout({ sessionId: session.id });

        if (result.error) {
            alert(result.error.message);
        }
    };

    return (
        <button role="link" onClick={handleClick}>
            Checkout with Stripe
        </button>
    );
};

export default TestPage;
