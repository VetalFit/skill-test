export type Employee = {
	id: string;
	firstName: string;
	lastName: string;
	companyId: {};
	position: string;
};

export type Employees = {
	list: Employee[];
	count: number;
};

const getEmployeesListInCompany = async (
	companyId: string | undefined
): Promise<Employees | undefined> => {
	try {
		const response = await fetch(
			`http://localhost:3000/api/company/${companyId}/employee`
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error:', error);
	}
};

export default getEmployeesListInCompany;
