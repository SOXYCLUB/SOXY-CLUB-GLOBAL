import { NextRequest, NextResponse } from "next/server";
import { customerUpdate } from "@/lib/shopify-customer";
import { getAuthCookie, setAuthCookie } from "@/lib/auth-cookies";

export async function PUT(request: NextRequest) {
  try {
    const token = await getAuthCookie();
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { firstName, lastName, email, phone, password } = await request.json();

    const input: Record<string, string> = {};
    if (firstName !== undefined) input.firstName = firstName;
    if (lastName !== undefined) input.lastName = lastName;
    if (email !== undefined) input.email = email;
    if (phone !== undefined) input.phone = phone;
    if (password !== undefined) input.password = password;

    const result = await customerUpdate(token, input);

    // If password or email changed, Shopify returns a new access token
    if (result.accessToken) {
      await setAuthCookie(result.accessToken.accessToken);
    }

    return NextResponse.json({ success: true, customer: result.customer });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Update failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
