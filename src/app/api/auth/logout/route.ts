import { NextResponse } from "next/server";
import { customerAccessTokenDelete } from "@/lib/shopify-customer";
import { getAuthCookie, deleteAuthCookie } from "@/lib/auth-cookies";

export async function POST() {
  try {
    const token = await getAuthCookie();

    if (token) {
      // Best-effort: delete token on Shopify side
      try {
        await customerAccessTokenDelete(token);
      } catch {
        // Ignore errors — token may already be expired
      }
    }

    await deleteAuthCookie();

    return NextResponse.json({ success: true });
  } catch {
    // Always clear cookie even if something fails
    await deleteAuthCookie();
    return NextResponse.json({ success: true });
  }
}
