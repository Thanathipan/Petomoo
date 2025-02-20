import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from "../../../../../Lib/db";
import Payment from "../../../../../Lib/Models/Payment";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    const { paymentIntentId, userId, amount } = req.body;

    try {
      // Retrieve the payment intent from Stripe
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      // Save the payment details to MongoDB
      const payment = new Payment({
        transactionId: paymentIntent.id,
        userId,
        amount: paymentIntent.amount / 100, // Convert amount from cents to dollars
        status: paymentIntent.status,
        createdAt: new Date(),
      });

      await payment.save();

      res.status(200).json({ success: true, payment });
    } catch (error) {
      console.error('Error confirming payment:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}