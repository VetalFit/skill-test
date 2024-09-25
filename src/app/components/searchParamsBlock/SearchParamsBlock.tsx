'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './SearchParamsBlock.module.css';
import Searchbar from '../searchbar/Searchbar';

function SearchParamsBlock({
	count,
	searchParams,
	searchField,
}: {
	count: number;
	searchParams: { [key: string]: string | undefined };
	searchField: string;
}) {
	const query = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const handleCheckboxChange = async () =>
		{
			const modifiedQueryParams = new URLSearchParams(
				Array.from(query.entries())
			);
			router.push(`${pathname}/?${modifiedQueryParams}`);
		};

	return (
		<div className={styles.wrapper}>
			<div className={styles.results}>
				<p className={styles.resultsCounter}>Results: {count}</p>
			</div>
			<div className={styles.searchHeader}>
				<div className={styles.searchBlock}>
					<Searchbar
						initialSearch={searchParams.search}
						searchField={searchField}
					/>
					<div className={styles.fullTextBlock}>
						<input
							onChange={handleCheckboxChange}
							className={styles.checkbox}
							type="checkbox"
						/>
						<label htmlFor="">Full Text Search</label>
					</div>
				</div>
			</div>
			<div className={styles.checkboxWrapper}></div>
		</div>
	);
}

export default SearchParamsBlock;
