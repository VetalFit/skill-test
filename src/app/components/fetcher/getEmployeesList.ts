export type Employee = {
	id: string;
	firstName: string;
	lastName: string;
	companyId: {
		name: string;
		id: string;
	};
	position: string;
	technologies: string[];
};

export type Employees = {
	list: Employee[];
	count: number;
};

const getEmployeesListInCompany = async (
	companyId: string
): Promise<Employees | undefined> => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/company/${companyId}/employee`
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('No companyId provided:', error);
	}
};

export default getEmployeesListInCompany;
