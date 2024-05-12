'use client';

import React from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from '@/components/ui/card';
import type { Product } from '@/app/page';

const CardProduct = ({ product }: { product: Product }) => {
	return (
		<Card className='p-8 break-inside-avoid'>
			<CardContent className='p-0 flex flex-col space-y-6'>
				<div className='bg-zinc-100 relative p-10 grid place-items-center rounded-lg overflow-hidden'>
					<img
						src={product.image}
						alt='product img'
						width={350}
						height={350}
						className='object-cover w-[200px] h-[200px] rounded-lg mix-blend-multiply'
					/>
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
