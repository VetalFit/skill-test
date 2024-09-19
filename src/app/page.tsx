// import Image from 'next/image';
import styles from './page.module.css';
import searchCompanies from './components/fetcher/searchCompanies';
import CompaniesCards from './components/cardsCompanies/CompaniesCards';
import Pagination from './components/pagination/Pagination';

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
			{/* <a
						className={styles.primary}
						href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Image
							className={styles.logo}
							src="https://nextjs.org/icons/vercel.svg"
							alt="Vercel logomark"
							width={20}
							height={20}
						/>
						Deploy now
					</a> */}
			{/* <a
						href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
						target="_blank"
						rel="noopener noreferrer"
						className={styles.secondary}
					>
						Read our docs
					</a> */}

			{/* <div className={styles.searchbarWrapper}>
						<SearchBar
							count={count}
							initialSearch={searchParams.search}
						/>
					</div> */}
			<main className={styles.main}>
				<div className={styles.title}>Companies</div>
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
			{/* <footer className={styles.footer}>
				<a
					href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="https://nextjs.org/icons/file.svg"
						alt="File icon"
						width={16}
						height={16}
					/>
					Learn
				</a>
				<a
					href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="https://nextjs.org/icons/window.svg"
						alt="Window icon"
						width={16}
						height={16}
					/>
					Examples
				</a>
				<a
					href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="https://nextjs.org/icons/globe.svg"
						alt="Globe icon"
						width={16}
						height={16}
					/>
					Go to nextjs.org →
				</a>
			</footer> */}
		</div>
	);
}
