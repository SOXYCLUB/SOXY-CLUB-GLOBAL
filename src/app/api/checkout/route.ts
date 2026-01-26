import { NextRequest, NextResponse } from "next/server";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan, firstName, lastName, email, phone, address, city, state, postalCode, country } = body;

    // 创建 Shopify Checkout
    const checkoutResponse = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
      body: JSON.stringify({
        query: `
          mutation checkoutCreate($input: CheckoutCreateInput!) {
            checkoutCreate(input: $input) {
              checkout {
                id
                webUrl
              }
              checkoutUserErrors {
                code
                field
                message
              }
            }
          }
        `,
        variables: {
          input: {
            email: email,
            shippingAddress: {
              firstName: firstName,
              lastName: lastName,
              address1: address,
              city: city,
              province: state || "",
              zip: postalCode,
              country: country,
              phone: phone,
            },
            customAttributes: [
              { key: "plan", value: plan },
            ],
          },
        },
      }),
    });

    const checkoutData = await checkoutResponse.json();

    if (checkoutData.errors) {
      console.error("Shopify GraphQL Errors:", checkoutData.errors);
      return NextResponse.json(
        { error: "Failed to create checkout", details: checkoutData.errors },
        { status: 400 }
      );
    }

    const { checkoutCreate } = checkoutData.data;

    if (checkoutCreate.checkoutUserErrors && checkoutCreate.checkoutUserErrors.length > 0) {
      console.error("Checkout User Errors:", checkoutCreate.checkoutUserErrors);
      return NextResponse.json(
        { error: "Checkout validation failed", details: checkoutCreate.checkoutUserErrors },
        { status: 400 }
      );
    }

    // 返回 checkout URL，用户将被重定向到此 URL 完成支付
    return NextResponse.json({
      checkoutUrl: checkoutCreate.checkout?.webUrl,
      checkoutId: checkoutCreate.checkout?.id,
    });
  } catch (error) {
    console.error("Checkout API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
