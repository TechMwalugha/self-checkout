import { retrieveCheckOut } from "@/lib/actions/checkout.action";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json() 
    
    const checkout = await retrieveCheckOut({ apiRef: body.apiRef})

    if(!checkout || body.challenge == '12345678') {
        console.log(checkout)
        console.log(body)
        return new NextResponse('Bad Request', { status: 400})
    }

    if(body.status === 'COMPLETE' || body.status === 'FAILED') {
        checkout.state = body.status
        checkout.failedReason = body.failed_reason

        await checkout.save()
    }

    return new NextResponse('Successfully', { status: 200 })
}