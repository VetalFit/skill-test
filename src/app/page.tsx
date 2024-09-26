// import styles from './page.module.css';
// import searchCompanies from './components/fetcher/searchCompanies';
// import CompaniesCards from './components/cardsCompanies/CompaniesCards';
// import Pagination from './components/pagination/Pagination';
// import AddFounderButton from './components/buttons/addFounder/AddFounder';
// import AddCompanyButton from './components/buttons/addCompany/AddCompany';
// import SearchParamsBlock from './components/searchParamsBlock/SearchParamsBlock';
// import FoundersList from './components/buttons/founders/Founders';

// export default async function Home({
// 	searchParams,
// }: {
// 	searchParams: Record<string, string>;
// }) {
// 	const itemsPerPage = 5;
// 	const companies = await searchCompanies(new URLSearchParams(searchParams));
// 	const currentOffset = parseInt(searchParams.offset || '0', 10);

// 	const { count, list } = companies;
// 	const totalPages = Math.ceil(count / itemsPerPage);

// 	return (
// 		<div className={styles.page}>
// 			<main className={styles.main}>
// 				<div className={styles.title}>Companies</div>
// 				<div className={styles.buttonsContainer}>
// 					<AddFounderButton /> <AddCompanyButton />
// 					<FoundersList />
// 				</div>
// 				<div className={styles.searchbarWrapper}>
// 					<SearchParamsBlock
// 						count={count}
// 						searchParams={searchParams}
// 						searchField={'name'}
// 					/>
// 				</div>
// 				<div className={styles.projects}>
// 					{list ? (
// 						<CompaniesCards companies={list} />
// 					) : (
// 						<p>Nothing found</p>
// 					)}
// 				</div>

// 				<Pagination
// 					totalPages={totalPages}
// 					itemsPerPage={itemsPerPage}
// 					currentOffset={currentOffset}
// 					searchParams={searchParams}
// 					location=""
// 				/>
// 			</main>
// 		</div>
// 	);
// }

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

export default function Home({
	searchParams,
}: {
	searchParams: Record<string, string>;
}) {
	const itemsPerPage = 10;
	const currentOffset = parseInt(searchParams.offset || '0', 10);
	const [companies, setCompanies] = useState<Companies>({} as Companies);
	const [totalPages, setTotalPages] = useState(0);

	const fetchCompanies = async () => {
		const data = await searchCompanies(new URLSearchParams(searchParams));
		setCompanies(data);
		setTotalPages(Math.ceil(data.count / itemsPerPage));
	};

	useEffect(() => {
		fetchCompanies();
	}, [searchParams]);

	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<div className={styles.title}>Companies</div>
				<div className={styles.buttonsContainer}>
					<AddFounderButton />{' '}
					<AddCompanyButton updateCompanyList={fetchCompanies} />
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
						<p>Nothing found</p>
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
