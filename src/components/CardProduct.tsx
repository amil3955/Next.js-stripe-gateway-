'use client';

import React from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from '@/components/ui/card';
import type { Product } from '@/app/page';
import { Button } from './ui/button';

const CardProduct = ({ product }: { product: Product }) => {
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
						<Button className='w-full rounded-none bg-zinc-900 hover:bg-zinc-900/90'>
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
