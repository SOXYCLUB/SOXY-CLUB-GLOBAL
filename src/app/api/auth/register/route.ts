import { NextRequest, NextResponse } from "next/server";
import { customerCreate, customerAccessTokenCreate } from "@/lib/shopify-customer";
import { setAuthCookie } from "@/lib/auth-cookies";

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json();

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Create customer in Shopify
    await customerCreate(email, password, firstName, lastName);

    // Auto-login: get access token
    const token = await customerAccessTokenCreate(email, password);
    if (!token) {
      return NextResponse.json(
        { error: "Account created but login failed" },
        { status: 500 }
      );
    }

    // Set httpOnly cookie
    await setAuthCookie(token.accessToken);

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Registration failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
