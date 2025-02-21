import { NextResponse, NextRequest } from "next/server";
import dbConnect from "../../../../../Lib/db";
import Booking from "../../../../../Lib/Models/Booking";
import User from "../../../../../Lib/Models/user";
import Clinic from "../../../../../Lib/Models/Addclinic";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { userId } = body;

        if (!userId) {
            return NextResponse.json({ message: "userId is required" }, { status: 400 });
        }

        await dbConnect();

        const user = await User.findById(userId);
        if (!user || !user.clinicId) {
            return NextResponse.json({ message: "User or associated clinic not found" }, { status: 404 });
        }

        const clinic = await Clinic.findById(user.clinicId);
        if (!clinic) {
            return NextResponse.json({ message: "Clinic not found" }, { status: 404 });
        }

        const bookings = await Booking.find({ clinicName: clinic.clinicName });
console.log(bookings)
        return NextResponse.json(
            { message: "Bookings fetched successfully", bookings },
            { status: 200 }

        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error fetching bookings", error },
            { status: 500 }
        );
    }
};
