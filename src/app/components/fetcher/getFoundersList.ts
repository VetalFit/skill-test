import { Founder } from './getFounderById';

export type Founders = {
	list: Founder[];
	count: number;
};

const getFoundersList = async (): Promise<Founders> => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/founder`
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error:', error);
	}
	return {
		list: [],
		count: 0,
	};
};

export default getFoundersList;
