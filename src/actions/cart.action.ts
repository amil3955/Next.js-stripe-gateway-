'use server';

import { Product } from "@/app/page";
import { ProductStorage } from "@/components/CardProduct";
import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const createCheckoutSession = async (products: ProductStorage[]) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error('You need to be logged in');
  }

  const createProductPromises = products.map(({ product }) => {
    return stripe.products.create({
      name: product.title,
      images: [product.image],
      default_price_data: {
        currency: 'USD',
        unit_amount: product.price * 100,
      }
    })
  })
  const productsCreated = await Promise.all(createProductPromises);

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
    mode: 'payment',
    shipping_address_collection: {
      allowed_countries: ['US', 'ID']
    },
    metadata: {
      userId: user.id,
    },
    line_items: productsCreated.map((product) => {
      const quantity = products.find(({ product: currProduct }) => currProduct.title === product.name)?.total || 1;

      return {
        price: product.default_price as string,
        quantity
      }
    })
  })

  return { url: stripeSession.url }
}