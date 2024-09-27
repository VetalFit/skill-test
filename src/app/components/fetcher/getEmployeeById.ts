import { Employee } from './getEmployeesList';

const getEmployeeById = async (
	employeeId: string
): Promise<Employee | undefined> => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/employee/${employeeId}`
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('No employeeId provided:', error);
	}
};

export default getEmployeeById;
