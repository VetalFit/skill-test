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

const searchCompanies = async (): Promise<Companies> => {
	try {
		const response = await fetch('http://localhost:3000/api/company');
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
