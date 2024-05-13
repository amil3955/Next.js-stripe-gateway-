import React from 'react';
import { Button, buttonVariants } from './ui/button';
import Link from 'next/link';
import { ArrowRightIcon, ShoppingCart } from 'lucide-react';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Cart from './Cart';

const Navbar = async () => {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	return (
		<nav className='sticky border-b border-b-zinc-300'>
			<div className='max-w-7xl mx-auto py-6 px-4'>
				<div className='flex justify-between items-center'>
					<Link href='/'>
						<h1 className='relative tracking-tight text-balance font-bold !leading-tight text-zinc-900 text-2xl text-center'>
							<span className='bg-blue-600 px-2 text-white'>WEI</span>
							Ecommerce
						</h1>
					</Link>
					<div className='flex flex-row items-center space-x-4'>
						{user ? (
							<>
								<Link
									href='/history'
									className={buttonVariants({ size: 'sm', variant: 'ghost' })}
								>
									History
								</Link>
								<Link
									className={buttonVariants({
										size: 'sm',
										variant: 'ghost',
									})}
									href='/api/auth/logout'
								>
									Sign out
								</Link>
							</>
						) : (
							<Link
								className={buttonVariants({
									variant: 'ghost',
									className: 'hidden sm:flex items-center gap-1',
								})}
								href='/api/auth/login'
							>
								Log in
								<ArrowRightIcon className='ml-1.5 h-4 w-4' />
							</Link>
						)}
						<div className='h-8 w-px bg-zinc-200 hidden sm:block' />
						{/* Cart */}
						<Cart />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
