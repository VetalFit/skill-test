import { Company } from './searchCompanies';

const getCompanyById = async (
	companyId: string
): Promise<Company | undefined> => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/company/${companyId}`
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('No companyId provided:', error);
	}
};

export default getCompanyById;
