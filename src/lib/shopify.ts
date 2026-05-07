
const SHOPIFY_STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function shopifyFetch(query: string, variables = {}) {
  const domain = SHOPIFY_STORE_DOMAIN?.trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
  const token = SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim();

  if (!domain || !token || domain === '' || token === '') {
    throw new Error('Shopify Configuration Missing: Please set VITE_SHOPIFY_STORE_DOMAIN and VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN in your environment settings.');
  }

  const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Shopify API Error Details:', errorText);
    
    if (response.status === 401) {
      throw new Error(`Shopify Unauthorized (401): Your Storefront Access Token is invalid or missing permissions. 
        IMPORTANT: Use the "Storefront Access Token" from the "Sales Channels > Headless" (or Storefront) section in Shopify Admin. 
        Do NOT use the "Admin API Access Token" or "API Secret Key".`);
    }
    
    throw new Error(`Shopify API request failed with status ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  if (data.errors) {
    throw new Error(data.errors[0].message);
  }
  return data.data;
}

export const createShopifyCheckout = async (
  lineItems: { variantId: string, quantity: number }[], 
  discountCode?: string, 
  metadata?: { note?: string, attributes?: { key: string, value: string }[] },
  buyerIdentity?: { email?: string, phone?: string }
) => {
  const query = `
    mutation cartCreate($input: CartInput) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lines: lineItems.map(item => ({
        merchandiseId: item.variantId,
        quantity: item.quantity
      })),
      ...(discountCode ? { discountCodes: [discountCode] } : {}),
      note: metadata?.note || "Order from Headless Storefront",
      attributes: metadata?.attributes || [],
      buyerIdentity: (buyerIdentity?.email || (buyerIdentity?.phone && buyerIdentity.phone.trim() !== '')) ? {
        email: buyerIdentity?.email?.trim() || undefined,
        phone: buyerIdentity?.phone && buyerIdentity.phone.trim() !== '' 
          ? (() => {
              const p = buyerIdentity.phone.trim().replace(/\s+/g, '');
              if (p.startsWith('+')) return p;
              if (/^\d{10}$/.test(p)) return `+91${p}`;
              if (/^91\d{10}$/.test(p)) return `+${p}`;
              return p.startsWith('+') ? p : `+${p}`;
            })()
          : undefined
      } : undefined
    }
  };

  const data = await shopifyFetch(query, variables);
  
  if (data.cartCreate.userErrors && data.cartCreate.userErrors.length > 0) {
    const userError = data.cartCreate.userErrors[0];
    // Provide a more helpful message for the "Merchandise does not exist" error
    if (userError.message.includes('does not exist')) {
      throw new Error(`Shopify Error: The Product Variant ID (${lineItems[0].variantId}) is invalid. Please ensure you have replaced the placeholder IDs in src/constants.ts with real GIDs from your Shopify Admin.`);
    }
    throw new Error(`Shopify Cart Error: ${userError.message} (${userError.field})`);
  }

  return {
    id: data.cartCreate.cart.id,
    webUrl: data.cartCreate.cart.checkoutUrl
  };
};

export const getShopifyProducts = async () => {
  const query = `
    {
      products(first: 50) {
        edges {
          node {
            id
            title
            handle
            description
            productType
            collections(first: 5) {
              edges {
                node {
                  title
                }
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                }
              }
            }
            variants(first: 5) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch(query);
  return data.products.edges.map(({ node }: any) => {
    const variant = node.variants.edges[0]?.node;
    const images = node.images.edges.map((edge: any) => edge.node.url);
    const mainImage = images[0] || "https://images.unsplash.com/photo-1616948055677-83a37803e7f4?auto=format&fit=crop&q=80&w=800";
    const collections = node.collections.edges.map((edge: any) => edge.node.title.toLowerCase());
    
    // Categorize based on collections first, then fallback to productType
    let category: "perfume" | "candle" | "aura" = "perfume";
    const type = node.productType.toLowerCase();

    const isCandle = collections.some((c: string) => c.includes('candle')) || type.includes('candle');
    const isSacred = collections.some((c: string) => c.includes('aura') || c.includes('puja') || c.includes('sacred') || c.includes('ritual')) || 
                    type.includes('aura') || type.includes('puja') || type.includes('ritual');
    const isFragrance = collections.some((c: string) => c.includes('fragrance') || c.includes('perfume') || c.includes('niche')) || 
                        type.includes('perfume') || type.includes('fragrance');

    if (isCandle) {
      category = "candle";
    } else if (isSacred) {
      category = "aura";
    } else if (isFragrance) {
      category = "perfume";
    } else {
      // Default fallback based on type if no collection match
      if (type.includes('candle')) category = "candle";
      else if (type.includes('aura') || type.includes('puja')) category = "aura";
    }

    return {
      id: node.id,
      shopifyVariantId: variant?.id,
      name: node.title,
      category,
      price: variant ? parseFloat(variant.price.amount) : 0,
      rating: 4.8, 
      image: mainImage,
      images: images.length > 0 ? images : [mainImage],
      description: node.description
    };
  });
};
