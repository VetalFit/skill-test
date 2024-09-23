import { Employees } from './getEmployeesList';

const searchEmployee = async (
	queryParams: URLSearchParams
): Promise<Employees> => {
	try {
		const response = await fetch(
			`http://localhost:3000/api/employee/?${queryParams}`
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
