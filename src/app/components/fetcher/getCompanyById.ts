import { Company } from "./searchCompanies";

const getCompanyById = async (
	companyId: string | undefined
): Promise<Company | undefined> => {
	try {
		const response = await fetch(
			`http://localhost:3000/api/company/${companyId}`
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error:', error);
	}
};

export default getCompanyById;