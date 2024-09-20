import getCompanyById from '@/app/components/fetcher/getCompanyById';
import styles from './page.module.css';
import getEmployeesList from '@/app/components/fetcher/getEmployeesList';
import CloseButton from '../../components/buttons/closeBtn/CloseButton';
import Link from 'next/link';
import DeleteCompanyButton from '../../components/buttons/deleteCompanyBtn/DeleteCompanyButton';
import DeleteEmployeeButton from '@/app/components/buttons/deleteEmployeeBtn/DeleteEmployeeButton';
import AddEmployeeButton from '@/app/components/buttons/addEmployee/AddEmployee';

export default async function Page({
	params,
}: {
	params: { companyId: string };
}) {
	const company = await getCompanyById(params.companyId);
	const employeesData = await getEmployeesList(params.companyId);
	const employees = employeesData?.list;

	return (
		<div>
			<div className={styles.wrapperTitle}>
				<div className={styles.companyName}>{company?.name}</div>
			</div>
			<div className={styles.buttonsContainer}>
				<div className={styles.addButton}>
					<AddEmployeeButton />
				</div>
				<DeleteCompanyButton companyId={params.companyId} />
			</div>
			{employees && employees.length > 0 ? (
				<div className={styles.employeesContainer}>
					<p className={styles.resultsCounter}>
						Results: {employeesData?.count}
					</p>
					{employees.map((employee) => (
						<div key={employee.id} className={styles.employeeCard}>
							<div className={styles.employeeInfo}>
								<Link
									href={`/employee/${employee.id}`}
									className={styles.employeeTitle}
								>
									{employee.firstName} {employee.lastName}
								</Link>
								<p>{employee.position}</p>
							</div>
							<div className={styles.deleteEmployee}>
								<DeleteEmployeeButton
									employeeId={employee.id}
								/>
							</div>
						</div>
					))}
				</div>
			) : (
				<p className={styles.employeesContainer}>No employees found</p>
			)}
			<CloseButton />
		</div>
	);
}
