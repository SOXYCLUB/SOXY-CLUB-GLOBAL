import { NextRequest, NextResponse } from "next/server";
import { shopifyFetch, createCart } from "@/lib/shopify";
import { getAuthCookie } from "@/lib/auth-cookies";

// 产品 ID 映射
const productIds: Record<string, string> = {
  starter: "8110079279140",
  smart: "8110080163876",
  pro: "8110080786468",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan } = body;

    const productId = productIds[plan];
    if (!productId) {
      return NextResponse.json({ error: "Invalid plan selected" }, { status: 400 });
    }

    // 查询产品的 Variant ID
    type ProductQueryResponse = {
      product: {
        id: string;
        title: string;
        variants: {
          edges: { node: { id: string } }[];
        };
      } | null;
    };

    const productData = await shopifyFetch<ProductQueryResponse>(
      `query getProduct($id: ID!) {
        product(id: $id) {
          id
          title
          variants(first: 1) {
            edges { node { id } }
          }
        }
      }`,
      { id: `gid://shopify/Product/${productId}` }
    );

    const variantId = productData.product?.variants?.edges?.[0]?.node?.id;
    if (!variantId) {
      return NextResponse.json(
        { error: "Product variant not found" },
        { status: 400 }
      );
    }

    // 读取登录用户的 access token（如果已登录）
    const customerAccessToken = await getAuthCookie();

    // 使用 Cart API 创建购物车
    const cart = await createCart({
      customerAccessToken,
      lines: [{ merchandiseId: variantId, quantity: 1 }],
      attributes: [{ key: "plan", value: plan }],
    });

    if (!cart?.checkoutUrl) {
      return NextResponse.json(
        { error: "Failed to create cart" },
        { status: 500 }
      );
    }

    // 返回 checkout URL，用户将被重定向到此 URL 完成支付
    return NextResponse.json({
      checkoutUrl: cart.checkoutUrl,
      cartId: cart.id,
    });
  } catch (error) {
    console.error("Checkout API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
