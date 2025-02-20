import { NextResponse } from "next/server";
import Stripe from "stripe";
import db from "./../../../../Lib/db"; // Ensure you have a database connection setup

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET() {
  try {
    const payments = await stripe.paymentIntents.list({ limit: 10 });

    // Fetch user details for each payment using metadata.userId
    const enrichedPayments = await Promise.all(
      payments.data.map(async (payment) => {
        let user = null;

        // Ensure metadata contains a userId
        if (payment.metadata.userId) {
          user = await db.user.findUnique({ where: { _id: payment.metadata.userId } });
        }

        return {
          id: payment.id,
          amount: payment.amount,
          currency: payment.currency,
          status: payment.status,
          created: payment.created,
          user: user ? { name: `${user.firstName} ${user.lastName}`, email: user.email } : null,
        };
      })
    );

    return NextResponse.json({ data: enrichedPayments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json({ error: "Failed to fetch payment data" }, { status: 500 });
  }
}
