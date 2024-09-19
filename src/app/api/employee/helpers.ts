import Employee from '@/db/models/employee.model';

export const mapEmployee = (employee: InstanceType<typeof Employee>) => {
	return {
		id: employee._id,
		firstName: employee.firstName,
		lastName: employee.lastName,
		companyId: employee.companyId
			? { name: employee.companyId.name, id: employee.companyId.id }
			: null,
		position: employee.position,
	};
};
