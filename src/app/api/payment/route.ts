import { NextResponse } from "next/server";
import Payment from "../../../../Lib/Models/Payment";
import dbConnect from "../../../../Lib/db";
import User from "../../../../Lib/Models/user";


export const POST = async (req: NextResponse) => {
  try {
    const body = await req.json()
    const { paymentId, userId, bookingId, status, amount } = body;

    await dbConnect()
    let updatedStatus = ''
    if (status === 'succeeded') {
      updatedStatus = 'paid'
    } else {
      updatedStatus = 'failed'
    }

    const newPayment = new Payment({
      paymentId,
      userId,
      bookingId,
      status: updatedStatus,
      amount
    });

    const savedPaymentData = await newPayment.save();
    console.log(newPayment)

    return NextResponse.json({ payment: savedPaymentData })
  } catch (error) {
    console.log('Internal Error:', error)
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}

export const GET = async () => {
  try {
    await dbConnect();
    
    // Fetch payments
    const payments = await Payment.find().sort({ createdAt: -1 });

    // Extract unique user IDs from payments
    const userIds = [...new Set(payments.map(payment => payment.userId.toString()))];

    // Fetch users based on extracted IDs
    const users = await User.find(
      { _id: { $in: userIds } }).select('_id firstName lastName email')

    // Create a user lookup map (userId -> user details)
    const userMap = new Map(users.map(user => [user._id.toString(), {firstName: user.firstName, lastName: user.lastName, email: user.email, id: user._id}]));

    // Merge payment data with user details (only firstName, lastName, email)
    const mergedPaymentData = payments.map(payment => ({
      ...payment.toObject(),
      user: userMap.get(payment.userId.toString() || null)
    }));

    return NextResponse.json(
      { 
        message: 'Payments and user details fetched successfully.',
        payments: mergedPaymentData
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch payments and user details.', error },
      { status: 500 }
    );
  }
};
