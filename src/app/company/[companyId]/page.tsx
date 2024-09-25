'use client';
import { useEffect, useState } from 'react';
import getCompanyById from '@/app/components/fetcher/getCompanyById';
import { Employees } from '@/app/components/fetcher/getEmployeesList';
import styles from './page.module.css';
import CloseButton from '../../components/buttons/closeBtn/CloseButton';
import DeleteCompanyButton from '../../components/buttons/deleteCompanyBtn/DeleteCompanyButton';
import DeleteEmployeeButton from '@/app/components/buttons/deleteEmployeeBtn/DeleteEmployeeButton';
import AddEmployeeButton from '@/app/components/buttons/addEmployee/AddEmployee';
import Link from 'next/link';
import ChangeCompanyInfo from '@/app/components/buttons/changeCompanyInfo/changeCompanyInfo';
import ChangeEmployeeInfo from '@/app/components/changeEmployeeInfo/ChangeEmployeeInfo';
import SearchParamsBlock from '@/app/components/searchParamsBlock/SearchParamsBlock';
import Pagination from '@/app/components/pagination/Pagination';
import searchEmployee from '@/app/components/fetcher/searchEmployees';
import LoadingSpinner from '@/app/components/loadingSpinner/LoadingSpinner';

export default function Page({
	params,
	searchParams,
}: {
	params: { companyId: string };
	searchParams: Record<string, string>;
}) {
	const [company, setCompany] = useState<any>(null);
	const [employees, setEmployees] = useState<Employees>({
		list: [],
		count: 0,
	});
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const itemsPerPage = 20;
	const currentOffset = parseInt(searchParams.offset || '0', 10);
	const totalPages = Math.ceil(employees.count / itemsPerPage);

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const companyData = await getCompanyById(params.companyId);
			setCompany(companyData);
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [params.companyId]);

	const searchData = async () => {
		const employeesData = await searchEmployee(
			new URLSearchParams(searchParams)
		);
		if (employeesData) setEmployees(employeesData);
	};

	useEffect(() => {
		searchData();
	}, [searchParams]);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div>
			<div className={styles.wrapperTitle}>
				<div className={styles.companyName}>{company?.name}</div>
			</div>
			<div className={styles.buttonsContainer}>
				<AddEmployeeButton companyId={params.companyId} />
				<ChangeCompanyInfo
					companyId={params.companyId}
					onSuccess={fetchData}
				/>
				<DeleteCompanyButton companyId={params.companyId} />
			</div>
			<div className={styles.searchbarWrapper}>
				<SearchParamsBlock
					count={employees.count}
					searchParams={searchParams}
					searchField={'firstName'}
				/>
			</div>
			{employees && employees.count > 0 ? (
				<div className={styles.employeesContainer}>
					{employees.list.map((employee) => (
						<div key={employee.id} className={styles.employeeCard}>
							<div className={styles.employeeInfo}>
								<Link
									href={`/employee/${employee.id}`}
									className={styles.employeeTitle}
								>
									{employee.firstName} {employee.lastName}
								</Link>
								<p>{employee.position}</p>

								<div className={styles.technologyContainer}>
									technology:{' '}
									{employee.technologies.map(
										(tech: string, index: number) => (
											<span
												key={index}
												className={
													styles.technologyPill
												}
											>
												{tech}
											</span>
										)
									)}
								</div>
							</div>
							<div className={styles.btnWrapper}>
								<ChangeEmployeeInfo
									companyId={params.companyId}
									employeeId={employee.id}
									onSuccess={fetchData}
								/>
								<DeleteEmployeeButton
									employeeId={employee.id}
									refreshEmployeesList={fetchData}
								/>
							</div>
						</div>
					))}
				</div>
			) : (
				<p className={styles.employeesContainer}>No employees found</p>
			)}
			<Pagination
				totalPages={totalPages}
				itemsPerPage={itemsPerPage}
				currentOffset={currentOffset}
				searchParams={searchParams}
				location="company"
			/>
			<CloseButton />
		</div>
	);
}
