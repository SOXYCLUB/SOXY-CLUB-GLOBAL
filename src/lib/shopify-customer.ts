import { shopifyFetch } from "./shopify";

// ── Types ──────────────────────────────────────────────

export interface CustomerAddress {
  id: string;
  firstName: string | null;
  lastName: string | null;
  address1: string | null;
  address2: string | null;
  city: string | null;
  province: string | null;
  zip: string | null;
  country: string | null;
  phone: string | null;
}

export interface AddressInput {
  firstName?: string;
  lastName?: string;
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  zip?: string;
  country?: string;
  phone?: string;
}

export interface CustomerOrder {
  id: string;
  orderNumber: number;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  statusUrl: string;
  totalPriceV2: { amount: string; currencyCode: string };
  lineItems: {
    edges: {
      node: {
        title: string;
        quantity: number;
      };
    }[];
  };
  successfulFulfillments: {
    trackingCompany: string | null;
    trackingInfo: {
      number: string | null;
      url: string | null;
    }[];
  }[];
}

export interface Customer {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  defaultAddress: CustomerAddress | null;
  addresses: { edges: { node: CustomerAddress }[] };
  orders: { edges: { node: CustomerOrder }[] };
}

interface CustomerUserError {
  code: string;
  field: string[];
  message: string;
}

// ── 1. Register (customerCreate) ───────────────────────

export async function customerCreate(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer { id email firstName lastName }
        customerUserErrors { code field message }
      }
    }
  `;

  type Res = {
    customerCreate: {
      customer: { id: string; email: string; firstName: string; lastName: string } | null;
      customerUserErrors: CustomerUserError[];
    };
  };

  const data = await shopifyFetch<Res>(query, {
    input: { email, password, firstName, lastName },
  });

  if (data.customerCreate.customerUserErrors.length > 0) {
    throw new Error(
      data.customerCreate.customerUserErrors.map((e) => e.message).join("\n")
    );
  }

  return data.customerCreate.customer;
}

// ── 2. Login (customerAccessTokenCreate) ───────────────

export async function customerAccessTokenCreate(email: string, password: string) {
  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken { accessToken expiresAt }
        customerUserErrors { code field message }
      }
    }
  `;

  type Res = {
    customerAccessTokenCreate: {
      customerAccessToken: { accessToken: string; expiresAt: string } | null;
      customerUserErrors: CustomerUserError[];
    };
  };

  const data = await shopifyFetch<Res>(query, {
    input: { email, password },
  });

  if (data.customerAccessTokenCreate.customerUserErrors.length > 0) {
    throw new Error(
      data.customerAccessTokenCreate.customerUserErrors.map((e) => e.message).join("\n")
    );
  }

  return data.customerAccessTokenCreate.customerAccessToken;
}

// ── 3. Logout (customerAccessTokenDelete) ──────────────

export async function customerAccessTokenDelete(accessToken: string) {
  const query = `
    mutation customerAccessTokenDelete($customerAccessToken: String!) {
      customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
        deletedAccessToken
        userErrors { field message }
      }
    }
  `;

  type Res = {
    customerAccessTokenDelete: {
      deletedAccessToken: string | null;
      userErrors: { field: string[]; message: string }[];
    };
  };

  const data = await shopifyFetch<Res>(query, {
    customerAccessToken: accessToken,
  });

  return data.customerAccessTokenDelete.deletedAccessToken;
}

// ── 4. Renew token (customerAccessTokenRenew) ─────────

export async function customerAccessTokenRenew(accessToken: string) {
  const query = `
    mutation customerAccessTokenRenew($customerAccessToken: String!) {
      customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
        customerAccessToken { accessToken expiresAt }
        userErrors { field message }
      }
    }
  `;

  type Res = {
    customerAccessTokenRenew: {
      customerAccessToken: { accessToken: string; expiresAt: string } | null;
      userErrors: { field: string[]; message: string }[];
    };
  };

  const data = await shopifyFetch<Res>(query, {
    customerAccessToken: accessToken,
  });

  return data.customerAccessTokenRenew.customerAccessToken;
}

// ── 5. Get customer profile + orders + addresses ──────

export async function getCustomer(accessToken: string): Promise<Customer> {
  const query = `
    query getCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        firstName
        lastName
        email
        phone
        defaultAddress {
          id firstName lastName address1 address2 city province zip country phone
        }
        addresses(first: 10) {
          edges {
            node {
              id firstName lastName address1 address2 city province zip country phone
            }
          }
        }
        orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {
          edges {
            node {
              id
              orderNumber
              processedAt
              financialStatus
              fulfillmentStatus
              statusUrl
              totalPriceV2 { amount currencyCode }
              lineItems(first: 5) {
                edges {
                  node { title quantity }
                }
              }
              successfulFulfillments(first: 5) {
                trackingCompany
                trackingInfo {
                  number
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  type Res = { customer: Customer | null };

  const data = await shopifyFetch<Res>(query, { customerAccessToken: accessToken });

  if (!data.customer) {
    throw new Error("Invalid or expired token");
  }

  return data.customer;
}

// ── 6. Password recovery (customerRecover) ────────────

export async function customerRecover(email: string) {
  const query = `
    mutation customerRecover($email: String!) {
      customerRecover(email: $email) {
        customerUserErrors { code field message }
      }
    }
  `;

  type Res = {
    customerRecover: {
      customerUserErrors: CustomerUserError[];
    };
  };

  const data = await shopifyFetch<Res>(query, { email });

  if (data.customerRecover.customerUserErrors.length > 0) {
    throw new Error(
      data.customerRecover.customerUserErrors.map((e) => e.message).join("\n")
    );
  }
}

// ── 7. Update customer profile (customerUpdate) ──────

export async function customerUpdate(
  accessToken: string,
  input: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
  }
) {
  const query = `
    mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
      customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
        customer { id firstName lastName email phone }
        customerAccessToken { accessToken expiresAt }
        customerUserErrors { code field message }
      }
    }
  `;

  type Res = {
    customerUpdate: {
      customer: { id: string; firstName: string; lastName: string; email: string; phone: string | null } | null;
      customerAccessToken: { accessToken: string; expiresAt: string } | null;
      customerUserErrors: CustomerUserError[];
    };
  };

  const data = await shopifyFetch<Res>(query, {
    customerAccessToken: accessToken,
    customer: input,
  });

  if (data.customerUpdate.customerUserErrors.length > 0) {
    throw new Error(
      data.customerUpdate.customerUserErrors.map((e) => e.message).join("\n")
    );
  }

  return {
    customer: data.customerUpdate.customer,
    accessToken: data.customerUpdate.customerAccessToken,
  };
}

// ── 8. Create address (customerAddressCreate) ────────

export async function customerAddressCreate(
  accessToken: string,
  address: AddressInput
) {
  const query = `
    mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
      customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
        customerAddress { id }
        customerUserErrors { code field message }
      }
    }
  `;

  type Res = {
    customerAddressCreate: {
      customerAddress: { id: string } | null;
      customerUserErrors: CustomerUserError[];
    };
  };

  const data = await shopifyFetch<Res>(query, {
    customerAccessToken: accessToken,
    address,
  });

  if (data.customerAddressCreate.customerUserErrors.length > 0) {
    throw new Error(
      data.customerAddressCreate.customerUserErrors.map((e) => e.message).join("\n")
    );
  }

  return data.customerAddressCreate.customerAddress;
}

// ── 9. Update address (customerAddressUpdate) ────────

export async function customerAddressUpdate(
  accessToken: string,
  addressId: string,
  address: AddressInput
) {
  const query = `
    mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
      customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
        customerAddress { id }
        customerUserErrors { code field message }
      }
    }
  `;

  type Res = {
    customerAddressUpdate: {
      customerAddress: { id: string } | null;
      customerUserErrors: CustomerUserError[];
    };
  };

  const data = await shopifyFetch<Res>(query, {
    customerAccessToken: accessToken,
    id: addressId,
    address,
  });

  if (data.customerAddressUpdate.customerUserErrors.length > 0) {
    throw new Error(
      data.customerAddressUpdate.customerUserErrors.map((e) => e.message).join("\n")
    );
  }

  return data.customerAddressUpdate.customerAddress;
}

// ── 10. Delete address (customerAddressDelete) ───────

export async function customerAddressDelete(
  accessToken: string,
  addressId: string
) {
  const query = `
    mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
      customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
        deletedCustomerAddressId
        customerUserErrors { code field message }
      }
    }
  `;

  type Res = {
    customerAddressDelete: {
      deletedCustomerAddressId: string | null;
      customerUserErrors: CustomerUserError[];
    };
  };

  const data = await shopifyFetch<Res>(query, {
    customerAccessToken: accessToken,
    id: addressId,
  });

  if (data.customerAddressDelete.customerUserErrors.length > 0) {
    throw new Error(
      data.customerAddressDelete.customerUserErrors.map((e) => e.message).join("\n")
    );
  }

  return data.customerAddressDelete.deletedCustomerAddressId;
}

// ── 11. Set default address (customerDefaultAddressUpdate) ──

export async function customerDefaultAddressUpdate(
  accessToken: string,
  addressId: string
) {
  const query = `
    mutation customerDefaultAddressUpdate($customerAccessToken: String!, $addressId: ID!) {
      customerDefaultAddressUpdate(customerAccessToken: $customerAccessToken, addressId: $addressId) {
        customer { id }
        customerUserErrors { code field message }
      }
    }
  `;

  type Res = {
    customerDefaultAddressUpdate: {
      customer: { id: string } | null;
      customerUserErrors: CustomerUserError[];
    };
  };

  const data = await shopifyFetch<Res>(query, {
    customerAccessToken: accessToken,
    addressId,
  });

  if (data.customerDefaultAddressUpdate.customerUserErrors.length > 0) {
    throw new Error(
      data.customerDefaultAddressUpdate.customerUserErrors.map((e) => e.message).join("\n")
    );
  }

  return data.customerDefaultAddressUpdate.customer;
}
