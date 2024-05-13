import { X } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { ProductStorage } from './CardProduct';
import { useRouter } from 'next/navigation';
import useTriggerUseEffect from '@/hooks/useTriggerUseEffect';

const CartProduct = ({
	currentProduct,
}: {
	currentProduct: ProductStorage;
}) => {
	const router = useRouter();
	const [count, setCount] = useState<number>(currentProduct.total);
	const { setTriggerUseEffect } = useTriggerUseEffect();

	const handleCount = (type: 'increment' | 'decrement') => {
		try {
			const cart = localStorage.getItem('cart');

			if (cart) {
				const parsedCart: ProductStorage[] = JSON.parse(cart);

				if (type === 'increment') {
					setCount((prev) => prev + 1);
					parsedCart.map((value) => {
						if (value.product.id === currentProduct.product.id) {
							value.total += 1;
							value.amount += currentProduct.product.price;
						}
						return value;
					});
				} else if (type === 'decrement') {
					if (count > 1) {
						setCount((prev) => prev - 1);
						parsedCart.map((value) => {
							if (value.product.id === currentProduct.product.id) {
								value.total -= 1;
								value.amount -= currentProduct.product.price;
							}
							return value;
						});
					}
				}

				localStorage.setItem('cart', JSON.stringify(parsedCart));
			}
		} finally {
			router.refresh();

			const randomNumberString = String(Math.floor(Math.random() * 10000));
			setTriggerUseEffect(randomNumberString);
		}
	};

	const handleDelete = () => {
		try {
			const cart = localStorage.getItem('cart');

			if (cart) {
				const parsedCart: ProductStorage[] = JSON.parse(cart);
				const newCart = parsedCart.filter(
					(value) => value.product.id !== currentProduct.product.id
				);
				localStorage.setItem('cart', JSON.stringify(newCart));
			}
		} finally {
			router.refresh();

			const randomNumberString = String(Math.floor(Math.random() * 10000));
			setTriggerUseEffect(randomNumberString);
		}
	};

	return (
		<div className='flex flex-row items-start w-full space-x-5 border-b border-b-zinc-200 pb-8 relative'>
			<div className='w-[100px]'>
				<img
					src={currentProduct.product.image}
					alt='product img'
					className='object-cover w-[100px] h-[80px] mix-blend-multiply'
				/>
			</div>
			<div className='flex flex-col justify-between items-start w-full space-y-6 mt-3'>
				<div className='flex justify-between w-full space-x-8'>
					<h4 className='text-sm font-normal text-zinc-900 max-w-[200px]'>
						{currentProduct.product.title}
					</h4>
				</div>
				<div className='flex justify-between items-center space-x-8 w-full'>
					<div className='flex space-x-4 border border-zinc-200 py-0.5 px-2 font-light text-zinc-900'>
						<button
							onClick={() => handleCount('decrement')}
							type='button'
							className='outline-none border-none'
						>
							-
						</button>
						<span aria-hidden='true'>{count}</span>
						<button
							onClick={() => handleCount('increment')}
							type='button'
							className='outline-none border-none'
						>
							+
						</button>
					</div>
					<p className='font-light text-zinc-900'>${currentProduct.amount}</p>
				</div>
			</div>

			{/* delete product */}
			<div className='absolute top-0 right-0'>
				<Button
					size='sm'
					variant='ghost'
					type='button'
					onClick={handleDelete}
				>
					<X className='w-3.5 h-3.5 text-zinc-600' />
				</Button>
			</div>
		</div>
	);
};

export default CartProduct;
