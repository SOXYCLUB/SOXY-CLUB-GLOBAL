import { NextRequest, NextResponse } from "next/server";
import { customerAddressCreate } from "@/lib/shopify-customer";
import { getAuthCookie } from "@/lib/auth-cookies";

export async function POST(request: NextRequest) {
  try {
    const token = await getAuthCookie();
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const address = await request.json();

    const result = await customerAddressCreate(token, address);

    return NextResponse.json({ success: true, address: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create address";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
