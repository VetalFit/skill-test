import { Founder } from './getFounderById';

export type Company = {
	id: string;
	name: string;
	founder: Founder;
};

export type Companies = {
	list: Company[];
	count: number;
};

const searchCompanies = async (
	queryParams: URLSearchParams
): Promise<Companies> => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/company/?${queryParams}`
		);
		const data = await response.json();
		const companyData = data;
		return companyData;
	} catch (error) {
		console.error('Error:', error);
	}
	return {
		list: [],
		count: 0,
	};
};

export default searchCompanies;
