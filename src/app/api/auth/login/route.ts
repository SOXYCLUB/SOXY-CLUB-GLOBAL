import { NextRequest, NextResponse } from "next/server";
import { customerAccessTokenCreate, customerRecover } from "@/lib/shopify-customer";
import { setAuthCookie } from "@/lib/auth-cookies";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Password recovery flow
    if (body.recover) {
      if (!body.email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
      }
      try {
        await customerRecover(body.email);
      } catch {
        // Don't reveal if email exists
      }
      return NextResponse.json({ success: true });
    }

    // Normal login flow
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const token = await customerAccessTokenCreate(email, password);
    if (!token) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    await setAuthCookie(token.accessToken);

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
