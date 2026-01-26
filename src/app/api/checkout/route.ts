import { NextRequest, NextResponse } from "next/server";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

// 产品 ID 映射
const productIds: Record<string, string> = {
  starter: "8110079279140",
  smart: "8110080163876",
  pro: "8110080786468",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan, firstName, lastName, email, phone, address, city, state, postalCode, country } = body;

    const productId = productIds[plan];
    if (!productId) {
      return NextResponse.json({ error: "Invalid plan selected" }, { status: 400 });
    }

    // 首先查询产品的 Variant ID
    const productResponse = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
      body: JSON.stringify({
        query: `
          query getProduct($id: ID!) {
            product(id: $id) {
              id
              title
              variants(first: 1) {
                edges {
                  node {
                    id
                  }
                }
              }
            }
          }
        `,
        variables: {
          id: `gid://shopify/Product/${productId}`,
        },
      }),
    });

    const productData = await productResponse.json();

    if (productData.errors) {
      console.error("Shopify Product Query Errors:", productData.errors);
      return NextResponse.json(
        { error: "Failed to fetch product", details: productData.errors },
        { status: 400 }
      );
    }

    const variantId = productData.data?.product?.variants?.edges?.[0]?.node?.id;

    if (!variantId) {
      console.error("No variant found for product:", productId);
      return NextResponse.json(
        { error: "Product variant not found" },
        { status: 400 }
      );
    }

    // 创建 Shopify Checkout 并添加产品
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
            lineItems: [
              {
                variantId: variantId,
                quantity: 1,
              },
            ],
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
