const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

const endpoint = `https://${domain}/api/2024-01/graphql.json`;

type ShopifyError = {
  message: string;
  extensions?: { code?: string };
};

type ShopifyResponse<T> = {
  data: T;
  errors?: ShopifyError[];
};

export async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
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
    throw new Error(
      json.errors
        .map((e) => e.message || e.extensions?.code || "Unknown Shopify error")
        .join("\n")
    );
  }

  return json.data;
}

// Cart 输入类型（替代已弃用的 Checkout API）
interface CartInput {
  email?: string;
  countryCode?: string;
  customerAccessToken?: string;
  lines: {
    merchandiseId: string;
    quantity: number;
  }[];
  attributes?: {
    key: string;
    value: string;
  }[];
}

// 创建 Cart 并获取 checkoutUrl（Shopify Cart API）
export async function createCart(input: CartInput) {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  type CartResponse = {
    cartCreate: {
      cart: {
        id: string;
        checkoutUrl: string;
        totalQuantity: number;
        cost: {
          totalAmount: {
            amount: string;
            currencyCode: string;
          };
        };
      } | null;
      userErrors: {
        field: string[];
        message: string;
      }[];
    };
  };

  const buyerIdentity: Record<string, unknown> = {
    countryCode: input.countryCode || "MY",
  };
  if (input.email) {
    buyerIdentity.email = input.email;
  }
  if (input.customerAccessToken) {
    buyerIdentity.customerAccessToken = input.customerAccessToken;
  }

  const data = await shopifyFetch<CartResponse>(query, {
    input: {
      lines: input.lines,
      buyerIdentity,
      attributes: input.attributes || [],
    },
  });

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(
      data.cartCreate.userErrors.map((e) => e.message).join("\n")
    );
  }

  return data.cartCreate.cart;
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
