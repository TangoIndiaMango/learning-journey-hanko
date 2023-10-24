import { getuserID } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"

const settingsUrl = process.env.NEXTAUTH_URL + '/settings'
export async function GET() {
    try {
        const userId = await getuserID()
        if (!userId) {
            return new NextResponse('unauthorized user', { status: 401 })
        }

        const userSubscription = await prisma.userSubscription.findUnique({
            where: {
                userId: userId
            }
        })
        // cancel sunbscription or manage subscription

        if (userSubscription && userSubscription.stripeCustomerId) {

            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl
            })
            return NextResponse.json({ url: stripeSession.url })
        }

        // first time subscribe

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ['card'],
            mode: "subscription",
            billing_address_collection: 'auto',
            //customer_email: userId ?? '',
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: " Learning ourney Pro",
                            description: "unlimited course generation"
                        },
                        unit_amount: 2000,
                        recurring: {
                            interval: "month"
                        }
                    },
                    quantity: 1,
                }
            ],
            metadata: {
                userId: userId,
            },
        })
        return NextResponse.json({ url: stripeSession.url })

    } catch (error) {
        console.log("[STRIPE ERROR]", error)
        return new NextResponse("internal server error", {status:500})

    }
}