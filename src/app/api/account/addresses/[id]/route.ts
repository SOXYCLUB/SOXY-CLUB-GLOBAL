import { NextRequest, NextResponse } from "next/server";
import { customerAddressUpdate, customerAddressDelete } from "@/lib/shopify-customer";
import { getAuthCookie } from "@/lib/auth-cookies";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const token = await getAuthCookie();
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { id } = await context.params;
    const addressId = `gid://shopify/MailingAddress/${id}`;
    const address = await request.json();

    const result = await customerAddressUpdate(token, addressId, address);

    return NextResponse.json({ success: true, address: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update address";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const token = await getAuthCookie();
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { id } = await context.params;
    const addressId = `gid://shopify/MailingAddress/${id}`;

    await customerAddressDelete(token, addressId);

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete address";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
