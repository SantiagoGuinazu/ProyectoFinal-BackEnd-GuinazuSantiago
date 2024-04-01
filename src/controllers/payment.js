import Stripe from 'stripe'
const key = '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'

export default class PaymentService {
    constructor() {
        this.stripe = new Stripe(key)
    }

    createPaymentIntent = async(data) => {
        const paymentIntent = this.stripe.paymentIntents.create(data)
        return paymentIntent
    }
}