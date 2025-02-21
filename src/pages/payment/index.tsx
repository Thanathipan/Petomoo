"use client"

import Payment from "../../../Components/Payment/Payment"
import ConvertToSubcurrency from "../../../Lib/ConvertToSubcurrency"
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js"
import '../../app/globals.css'
import { useRouter, useSearchParams } from "next/navigation"
import axios from "axios"
import { useEffect, useState } from "react"
import "./payment.css"

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    console.error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined")
}

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
    ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
    : Promise.reject(new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined"));

const PaymentPage = () => {
    const searchParams = useSearchParams();
    const bookingId = searchParams ? String(searchParams.get("b")) : '';
    const userId = searchParams ? String(searchParams.get("u")) : '';

    const amount: number = 400

    return (
        <div className="payment-container">
            <div className="payment-box">
                <div className="payment-header">
                    <h2 className="payment-amount">
                        to pay <span className="bold-text"> LKR {amount}</span>
                    </h2>
                </div>
                <Elements
                    stripe={stripePromise}
                    options={{
                        mode: 'payment',
                        amount: ConvertToSubcurrency(amount),
                        currency: 'usd'
                    }}
                >
                    <Payment finalAmount={amount} bookingId={bookingId} userId={userId} />
                </Elements>
            </div>
        </div>
    )
}

export default PaymentPage
