import { NextResponse } from "next/server";
import { getCustomer } from "@/lib/shopify-customer";
import { getAuthCookie, deleteAuthCookie } from "@/lib/auth-cookies";

export async function GET() {
  try {
    const token = await getAuthCookie();

    if (!token) {
      return NextResponse.json({ customer: null });
    }

    const customer = await getCustomer(token);
    return NextResponse.json({ customer });
  } catch {
    // Token is invalid or expired — silently clear cookie
    await deleteAuthCookie();
    return NextResponse.json({ customer: null });
  }
}
