import { Employee } from './getEmployeesList';

const getEmployeeById = async (
	employeeId: string | undefined
): Promise<Employee | undefined> => {
	try {
		const response = await fetch(
			`http://localhost:3000/api/employee/${employeeId}`
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error:', error);
	}
};

export default getEmployeeById;
