'use client';

import React, { useTransition } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from '@/components/ui/card';
import type { Product } from '@/app/page';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import useTriggerUseEffect from '@/hooks/useTriggerUseEffect';

export interface ProductStorage {
	product: Product;
	amount: number;
	total: number;
}

const CardProduct = ({ product }: { product: Product }) => {
	const router = useRouter();
	const { setTriggerUseEffect } = useTriggerUseEffect();
	const [isPending, startTransition] = useTransition();

	const addItemToStorage = () => {
		try {
			const productPrice = Math.floor(product.price);
			const newProduct: ProductStorage = {
				product: {
					...product,
					price: productPrice,
				},
				amount: productPrice,
				total: 1,
			};

			startTransition(() => {
				const cart = localStorage.getItem('cart');

				if (cart) {
					const parsedCart: ProductStorage[] = JSON.parse(cart);
					const existingProduct = parsedCart.find((value) => {
						return value.product.id === newProduct.product.id;
					});

					if (existingProduct) {
						parsedCart.map((value) => {
							if (value.product.id === newProduct.product.id) {
								value.amount += newProduct.product.price;
								value.total += 1;
							}

							return value;
						});
						localStorage.setItem('cart', JSON.stringify(parsedCart));
					} else {
						parsedCart.push(newProduct);
						localStorage.setItem('cart', JSON.stringify(parsedCart));
					}
				} else {
					localStorage.setItem('cart', JSON.stringify([newProduct]));
				}
			});
		} finally {
			router.refresh();

			const randomNumberString = String(Math.floor(Math.random() * 10000));
			setTriggerUseEffect(randomNumberString);
		}
	};

	return (
		<Card className='p-8 break-inside-avoid group'>
			<CardContent className='p-0 flex flex-col space-y-6'>
				<div className='bg-zinc-100 relative p-10 grid place-items-center rounded-lg overflow-hidden'>
					<img
						src={product.image}
						alt='product img'
						width={350}
						height={350}
						className='object-cover w-[200px] h-[200px] rounded-lg mix-blend-multiply'
					/>

					<div className='hidden group-hover:block transition duration-200 absolute bottom-6 left-6 right-6'>
						{/* TODO: add to cart */}
						<Button
							disabled={isPending}
							isLoading={isPending}
							loadingText='Adding to cart'
							onClick={addItemToStorage}
							className='w-full rounded-none bg-zinc-900 hover:bg-zinc-900/90'
						>
							ADD TO CART
						</Button>
					</div>
				</div>
				<div className='flex flex-col space-y-1'>
					<CardDescription className='text-zinc-800'>
						{product.title}
					</CardDescription>
					<CardTitle className='text-md font-normal text-zinc-800'>
						${product.price}
					</CardTitle>
				</div>
			</CardContent>
		</Card>
	);
};

export default CardProduct;
