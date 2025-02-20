import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const POST = async (req: NextResponse) => {
  try {
    const { amount } = await req.json();

    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true }
    });

    return NextResponse.json({ clientSecret: payment.client_secret })
  } catch (error) {
    console.error('Internal Error:', error)
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}

export default async function handler(req: NextRequest) {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const paymentId = searchParams.get('paymentId');

    if (!paymentId || typeof paymentId !== "string") {
      return NextResponse.json({ error: "Invalid Payment ID" }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);

    if (!paymentIntent) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    const paymentData = {
      paymentId: paymentIntent.id,
      userId: paymentIntent.metadata.userId || "N/A",
      userName: paymentIntent.metadata.userName || "N/A",
      userEmail: paymentIntent.receipt_email || "N/A",
      price: paymentIntent.amount / 100,
    };

    return NextResponse.json({ paymentData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error", details: error }, { status: 500 });
  }
}
