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
import ChangeEmployeeInfo from '@/app/components/buttons/changeEmployeeInfo/ChangeEmployeeInfo';
import SearchParamsBlock from '@/app/components/searchParamsBlock/SearchParamsBlock';
import Pagination from '@/app/components/pagination/Pagination';
import searchEmployee from '@/app/components/fetcher/searchEmployees';
import LoadingSpinner from '@/app/components/loadingSpinner/LoadingSpinner';
import { Company } from '@/app/components/fetcher/searchCompanies';

export default function Page({
	params,
	searchParams,
}: {
	params: { companyId: string };
	searchParams: Record<string, string>;
}) {
	const [company, setCompany] = useState<Company | undefined>(undefined);
	const [employees, setEmployees] = useState<Employees>({} as Employees);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const itemsPerPage = 10;
	const currentOffset = parseInt(searchParams.offset || '0', 10);
	const totalPages = Math.ceil(employees.count / itemsPerPage);

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const companyData = await getCompanyById(params.companyId);
			setCompany(companyData);
			await searchData();
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
			new URLSearchParams(searchParams),
			params.companyId
		);
		if (employeesData) setEmployees(employeesData);
	};

	useEffect(() => {
		searchData();
	}, [searchParams]);

	if (isLoading) {
		return (
			<div className={styles.spinnerOverlay}>
				<LoadingSpinner />
			</div>
		);
	}

	return (
		<div>
			<div className={styles.wrapperTitle}>
				<div className={styles.companyName}>{company?.name}</div>
			</div>
			<div className={styles.buttonsContainer}>
				<AddEmployeeButton
					companyId={params.companyId}
					onSuccess={fetchData}
				/>
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
					searchField={'firstName,lastName'}
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
				location={`/company/${params.companyId}`}
			/>
			<CloseButton />
		</div>
	);
}
