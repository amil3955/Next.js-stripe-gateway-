import { Button } from '@/components/ui/button';
import React from 'react';

const Page = () => {
	return (
		<div>
			<Button
				type='button'
				isLoading={true}
				loadingText='Loading'
				disabled={true}
			>
				Button
			</Button>
		</div>
	);
};

export default Page;
