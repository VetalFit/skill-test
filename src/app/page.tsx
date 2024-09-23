import styles from './page.module.css';
import searchCompanies from './components/fetcher/searchCompanies';
import CompaniesCards from './components/cardsCompanies/CompaniesCards';
import Pagination from './components/pagination/Pagination';
import AddFounderButton from './components/buttons/addFounder/AddFounder';
import AddCompanyButton from './components/buttons/addCompany/AddCompany';
import SearchParamsBlock from './components/searchParamsBlock/SearchParamsBlock';

export default async function Home({
	searchParams,
}: {
	searchParams: Record<string, string>;
}) {
	const itemsPerPage = 20;
	const companies = await searchCompanies(new URLSearchParams(searchParams));
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
				<div className={styles.searchbarWrapper}>
					<SearchParamsBlock
						count={count}
						searchParams={searchParams}
						searchField={'name'}
					/>
				</div>
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
					searchParams={searchParams}
					location="company"
				/>
			</main>
		</div>
	);
}
