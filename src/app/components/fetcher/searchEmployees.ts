import { Employees } from './getEmployeesList';

const searchEmployee = async (
	queryParams: URLSearchParams,
	companyId: string
): Promise<Employees | undefined> => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/company/${companyId}/employee/?${queryParams}`
		);
		const data = await response.json();
		const companyData = data;
		return companyData;
	} catch (error) {
		console.error('No employeeId provided:', error);
	}
};

export default searchEmployee;
