import Stripe from 'stripe';
const key = process.env.PRIVATE_KEY;

export default class PaymentService {
    constructor() {
        this.stripe = new Stripe(key)
    };

    createPaymentIntent = async(data) => {
        const paymentIntent = this.stripe.paymentIntents.create(data)
        return paymentIntent
    };
};