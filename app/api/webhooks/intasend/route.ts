import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    console.log(req.body)
    return new NextResponse(req.body, { status: 200 })
}