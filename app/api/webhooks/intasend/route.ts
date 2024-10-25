import { retrieveCheckOut } from "@/lib/actions/checkout.action";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json() 
    
    const checkout = await retrieveCheckOut({ apiRef: body.api_ref})

    if(!checkout || body.challenge !== '12345678') {
        console.log(checkout)
        console.log(body)
        return new NextResponse('Bad Request', { status: 400})
    }

    if(body.state === 'COMPLETE' || body.state === 'FAILED') {
        checkout.state = body.state
        checkout.failedReason = body.failed_reason || ''

        await checkout.save()
    }

    return new NextResponse('Successfully', { status: 200 })
}