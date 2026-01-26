const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

const endpoint = `https://${domain}/api/2024-01/graphql.json`;

type ShopifyResponse<T> = {
  data: T;
  errors?: { message: string }[];
};

async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json: ShopifyResponse<T> = await response.json();

  if (json.errors) {
    console.error("Shopify API Errors:", json.errors);
    throw new Error(json.errors.map((e) => e.message).join("\n"));
  }

  return json.data;
}

// Checkout 输入类型
interface CheckoutInput {
  email: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    province?: string;
    zip: string;
    country: string;
    phone: string;
  };
  lineItems?: {
    variantId: string;
    quantity: number;
  }[];
  customAttributes?: {
    key: string;
    value: string;
  }[];
}

// 创建 Checkout（不带商品，用于订阅场景）
export async function createCheckout(input: CheckoutInput) {
  const query = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
          totalPriceV2 {
            amount
            currencyCode
          }
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  type CheckoutResponse = {
    checkoutCreate: {
      checkout: {
        id: string;
        webUrl: string;
        totalPriceV2: {
          amount: string;
          currencyCode: string;
        };
      } | null;
      checkoutUserErrors: {
        code: string;
        field: string[];
        message: string;
      }[];
    };
  };

  const checkoutInput: Record<string, unknown> = {
    email: input.email,
    shippingAddress: input.shippingAddress,
    customAttributes: input.customAttributes || [],
  };

  if (input.lineItems && input.lineItems.length > 0) {
    checkoutInput.lineItems = input.lineItems;
  }

  const data = await shopifyFetch<CheckoutResponse>(query, { input: checkoutInput });

  if (data.checkoutCreate.checkoutUserErrors.length > 0) {
    throw new Error(
      data.checkoutCreate.checkoutUserErrors.map((e) => e.message).join("\n")
    );
  }

  return data.checkoutCreate.checkout;
}

// 获取所有产品
export async function getProducts() {
  const query = `
    query Products {
      products(first: 10) {
        edges {
          node {
            id
            title
            description
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 5) {
              edges {
                node {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  type ProductsResponse = {
    products: {
      edges: {
        node: {
          id: string;
          title: string;
          description: string;
          handle: string;
          priceRange: {
            minVariantPrice: {
              amount: string;
              currencyCode: string;
            };
          };
          variants: {
            edges: {
              node: {
                id: string;
                title: string;
                priceV2: {
                  amount: string;
                  currencyCode: string;
                };
              };
            }[];
          };
          images: {
            edges: {
              node: {
                url: string;
                altText: string | null;
              };
            }[];
          };
        };
      }[];
    };
  };

  const data = await shopifyFetch<ProductsResponse>(query);
  return data.products.edges.map((edge) => edge.node);
}

// 通过 handle 获取单个产品
export async function getProductByHandle(handle: string) {
  const query = `
    query ProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        description
        handle
        variants(first: 10) {
          edges {
            node {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
            }
          }
        }
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
      }
    }
  `;

  type ProductResponse = {
    productByHandle: {
      id: string;
      title: string;
      description: string;
      handle: string;
      variants: {
        edges: {
          node: {
            id: string;
            title: string;
            priceV2: {
              amount: string;
              currencyCode: string;
            };
          };
        }[];
      };
      images: {
        edges: {
          node: {
            url: string;
            altText: string | null;
          };
        }[];
      };
    } | null;
  };

  const data = await shopifyFetch<ProductResponse>(query, { handle });
  return data.productByHandle;
}
