import CardProduct from '@/components/CardProduct';
import axios from 'axios';
import React from 'react';

export interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: {
		rate: number;
		count: number;
	};
}

const getProducts = async (): Promise<Product[]> => {
	const res = await axios.get('https://fakestoreapi.com/products');
	return res.data as Product[];
};

const Page = async () => {
	const products = await getProducts();

	return (
		<section className='max-w-7xl mx-auto py-10 px-4'>
			<div className='columns-1 min-[700px]:columns-2 xl:columns-3 space-y-8 gap-x-8'>
				{products.map((product) => (
					<CardProduct
						product={product}
						key={product.id}
					/>
				))}
			</div>
		</section>
	);
};

export default Page;
