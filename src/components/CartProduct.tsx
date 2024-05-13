import { X } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from './ui/button';

const CartProduct = () => {
	const [count, setCount] = useState<number>(1);

	const handleCount = (type: 'increment' | 'decrement') => {
		if (type === 'increment') {
			setCount((prev) => prev + 1);
		}

		if (type === 'decrement') {
			if (count > 1) {
				setCount((prev) => prev - 1);
			}
		}
	};

	const handleDelete = () => {
		console.info('product deleted');
	};

	return (
		<div className='flex flex-row items-start w-full space-x-5 border-b border-b-zinc-200 pb-8 relative'>
			<img
				src='https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
				alt='product img'
				width={350}
				height={350}
				className='object-cover w-[80px] h-[80px] mix-blend-multiply'
			/>
			<div className='flex flex-col justify-between items-start w-full space-y-6 mt-3'>
				<div className='flex justify-between w-full space-x-8'>
					<h4 className='text-sm font-normal text-zinc-900'>Title</h4>
				</div>
				<div className='flex justify-between items-center space-x-8 w-full'>
					<div className='flex space-x-4 border border-zinc-200 py-0.5 px-2 font-light text-zinc-900'>
						<button
							onClick={() => handleCount('decrement')}
							type='button'
						>
							-
						</button>
						<span aria-hidden='true'>{count}</span>
						<button
							onClick={() => handleCount('increment')}
							type='button'
						>
							+
						</button>
					</div>
					<p className='font-light text-zinc-900'>$22</p>
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
