import { NextRequest, NextResponse } from "next/server";
import { customerDefaultAddressUpdate } from "@/lib/shopify-customer";
import { getAuthCookie } from "@/lib/auth-cookies";

export async function PUT(request: NextRequest) {
  try {
    const token = await getAuthCookie();
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { addressId } = await request.json();
    if (!addressId) {
      return NextResponse.json({ error: "addressId is required" }, { status: 400 });
    }

    // Reconstruct full GID if only numeric part is provided
    const fullId = addressId.startsWith("gid://")
      ? addressId
      : `gid://shopify/MailingAddress/${addressId}`;

    await customerDefaultAddressUpdate(token, fullId);

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to set default address";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
