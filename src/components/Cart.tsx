'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Button, buttonVariants } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import CartProduct from './CartProduct';
import { ProductStorage } from './CardProduct';
import { useRouter } from 'next/navigation';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { createCheckoutSession } from '@/actions/cart.action';
import useTriggerUseEffect from '@/hooks/useTriggerUseEffect';

const Cart = () => {
	const { user } = useKindeBrowserClient();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [cart, setCart] = useState<string | null>(null);
	const { triggerUseEffect, setTriggerUseEffect } = useTriggerUseEffect();
	const products: ProductStorage[] = JSON.parse(cart || '[]');

	useEffect(() => {
		let cartStorage = localStorage.getItem('cart');
		setCart(cartStorage);
	}, [triggerUseEffect]);

	const totalPrice = products.reduce((total, curr) => total + curr.amount, 0);

	const handleCheckout = () => {
		console.info(user);
		if (!user) {
			router.push('/api/auth/login?post_login_redirect_url=/');
		} else {
			// TODO: implement
			startTransition(async () => {
				const res = await createCheckoutSession(products);
				if (res?.url) {
					router.push(res.url);
				}
			});
		}
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant='ghost'
					size='icon'
				>
					<ShoppingCart className='w-4 h-4' />
				</Button>
			</SheetTrigger>
			<SheetContent className='flex flex-col space-y-2 px-0'>
				<SheetHeader className='px-4'>
					<SheetTitle className='font-medium text-zinc-900'>CART</SheetTitle>
				</SheetHeader>
				<div className='px-4'>
					<hr className='h-px w-full bg-zinc-400' />
				</div>
				{/* PRODUCTS */}
				{!products.length ? (
					<div className='flex flex-col items-center space-y-3'>
						<h1 className='font-normal text-zinc-900 text-center'>
							There are currently no items in your cart.
						</h1>
						<a
							href='/'
							className={buttonVariants({
								variant: 'outline',
								className: 'rounded-none',
							})}
						>
							Search From New Items
						</a>
					</div>
				) : (
					<ScrollArea className='mx-1 px-3 h-full'>
						<div className='flex flex-col space-y-8'>
							{products.map((currentProduct) => (
								<CartProduct
									key={currentProduct.product.id}
									currentProduct={currentProduct}
								/>
							))}
						</div>
					</ScrollArea>
				)}
				{/* FOOTER */}
				{products.length ? (
					<div className='flex items-end px-4 h-[100px]'>
						{/* HANDLE CHECKOUT */}
						<Button
							disabled={isPending}
							isLoading={isPending}
							loadingText='Processing'
							type='button'
							onClick={handleCheckout}
							className='bg-zinc-900 hover:bg-zinc-900/90 rounded-none w-full py-7 flex items-center space-x-2 font-normal'
						>
							<span>CHECKOUT</span>
							<div className='w-[8px] h-px bg-white' />
							<span>${totalPrice}</span>
						</Button>
					</div>
				) : null}
			</SheetContent>
		</Sheet>
	);
};

export default Cart;
