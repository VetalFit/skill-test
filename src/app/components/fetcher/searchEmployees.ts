import { Employees } from './getEmployeesList';

const searchEmployee = async (
	queryParams: URLSearchParams,
	companyId: string
): Promise<Employees> => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/company/${companyId}/employee/?${queryParams}`
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

export default searchEmployee;
