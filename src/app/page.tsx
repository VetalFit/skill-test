'use client';
import styles from './page.module.css';
import searchCompanies, {
	Companies,
} from './components/fetcher/searchCompanies';
import CompaniesCards from './components/cardsCompanies/CompaniesCards';
import Pagination from './components/pagination/Pagination';
import AddFounderButton from './components/buttons/addFounder/AddFounder';
import AddCompanyButton from './components/buttons/addCompany/AddCompany';
import SearchParamsBlock from './components/searchParamsBlock/SearchParamsBlock';
import FoundersList from './components/buttons/founders/Founders';
import { useEffect, useState } from 'react';
import LoadingSpinner from './components/loadingSpinner/LoadingSpinner';

export default function Home({
	searchParams,
}: {
	searchParams: Record<string, string>;
}) {
	const itemsPerPage = 10;
	const currentOffset = parseInt(searchParams.offset || '0', 10);
	const [companies, setCompanies] = useState<Companies>({} as Companies);
	const [totalPages, setTotalPages] = useState(0);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const fetchCompanies = async () => {
		setIsLoading(true);
		try {
			await searchData();
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const searchData = async () => {
		try {
			const data = await searchCompanies(
				new URLSearchParams(searchParams)
			);
			setCompanies(data);
			setTotalPages(Math.ceil(data.count / itemsPerPage));
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		fetchCompanies();
	}, []);

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
		<div className={styles.page}>
			<main className={styles.main}>
				<div className={styles.title}>Companies</div>
				<div className={styles.buttonsContainer}>
					<AddFounderButton />{' '}
					<AddCompanyButton updateCompanyList={searchData} />
					<FoundersList />
				</div>
				<div className={styles.searchbarWrapper}>
					<SearchParamsBlock
						count={companies.count}
						searchParams={searchParams}
						searchField={'name'}
					/>
				</div>
				<div className={styles.projects}>
					{companies.list ? (
						<CompaniesCards companies={companies.list} />
					) : (
						<p className={styles.employeesContainer}>
							No employees found
						</p>
					)}
				</div>

				<Pagination
					totalPages={totalPages}
					itemsPerPage={itemsPerPage}
					currentOffset={currentOffset}
					searchParams={searchParams}
					location=""
				/>
			</main>
		</div>
	);
}
