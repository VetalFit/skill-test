import styles from './page.module.css';
import searchCompanies from './components/fetcher/searchCompanies';
import CompaniesCards from './components/cardsCompanies/CompaniesCards';
import Pagination from './components/pagination/Pagination';
import AddFounderButton from './components/buttons/addFounder/AddFounder';
import AddCompanyButton from './components/buttons/addCompany/AddCompany';

export default async function Home({
	searchParams,
}: {
	searchParams: Record<string, string>;
}) {
	const itemsPerPage = 20;
	const companies = await searchCompanies();
	const currentOffset = parseInt(searchParams.offset || '0', 10);

	const { count, list } = companies;
	const totalPages = Math.ceil(count / itemsPerPage);

	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<div className={styles.title}>Companies</div>
				<div className={styles.buttonsContainer}>
					<AddFounderButton /> <AddCompanyButton />
				</div>
				<p>Results: {count}</p>
				<div className={styles.projects}>
					{list ? (
						<CompaniesCards companies={list} />
					) : (
						<p>Nothing found</p>
					)}
				</div>

				<Pagination
					totalPages={totalPages}
					itemsPerPage={itemsPerPage}
					currentOffset={currentOffset}
					// searchParams={new URLSearchParams(searchParams)}
					location="company"
				/>
			</main>
		</div>
	);
}


// 'use client';
// import React, { useState, useEffect } from 'react';
// import styles from './page.module.css';
// import searchCompanies, {
// 	Companies,
// } from './components/fetcher/searchCompanies';
// import CompaniesCards from './components/cardsCompanies/CompaniesCards';
// import Pagination from './components/pagination/Pagination';
// import AddFounderButton from './components/buttons/addFounder/AddFounder';
// import AddCompanyButton from './components/buttons/addCompany/AddCompany';

// export default function Home({
// 	searchParams,
// }: {
// 	searchParams: Record<string, string>;
// }) {
// 	const itemsPerPage = 20;
// 	const currentOffset = parseInt(searchParams.offset || '0', 10);
// 	const [companies, setCompanies] = useState<Companies>({
// 		count: 0,
// 		list: [],
// 	});
// 	const totalPages = Math.ceil(companies.count / itemsPerPage);

// 	const fetchCompanies = async () => {
// 		try {
// 			const fetchedCompanies = await searchCompanies();
// 			setCompanies(fetchedCompanies);
// 			console.log('function');
// 		} catch (error) {
// 			console.error('Error fetching companies:', error);
// 		}
// 	};

// 	useEffect(() => {
// 		console.log('Fetching companies...');
// 		fetchCompanies();
// 	}, []);

// 	return (
// 		<div className={styles.page}>
// 			<main className={styles.main}>
// 				<div className={styles.title}>Companies</div>
// 				<div className={styles.buttonsContainer}>
// 					<AddFounderButton />
// 					<AddCompanyButton updateCompanyList={fetchCompanies} />
// 				</div>
// 				<p>Results: {companies.count}</p>
// 				<div className={styles.projects}>
// 					{companies.list.length > 0 ? (
// 						<CompaniesCards companies={companies.list} />
// 					) : (
// 						<p>Nothing found</p>
// 					)}
// 				</div>

// 				<Pagination
// 					totalPages={totalPages}
// 					itemsPerPage={itemsPerPage}
// 					currentOffset={currentOffset}
// 					location="company"
// 				/>
// 			</main>
// 		</div>
// 	);
// }
